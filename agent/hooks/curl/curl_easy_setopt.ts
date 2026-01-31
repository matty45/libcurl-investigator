import { curl } from "../..";
import { CurlOptions } from "../../globals/curl_opts";
import { log } from "../../logger";

let original_write_function_callback: ((buffer: NativePointer, size: number, nmemb: number, userdata: NativePointer) => number) | null = null;
let original_header_function_callback = null;

export function hook_curl_easy_setopt() {
  const curl_easy_setopt = curl.getExportByName("curl_easy_setopt");
  Interceptor.attach(curl_easy_setopt, {
    onEnter(args) {
      const handle = args[0];
      const curloption = args[1].toInt32();
      const parameter = args[2];

      // Log with the assigned ID  
      switch (curloption) {
        case CurlOptions.Url: // CURLOPT_URL  

          log(`URL: ${parameter.readUtf8String()}`);
          break;

        case CurlOptions.HttpGet: // CURLOPT_URL  
          log(`HTTP-METHOD: GET`);
          break;

        case CurlOptions.Post: // CURLOPT_URL  
          log(`HTTP-METHOD: POST`);
          break;

        case CurlOptions.UserAgent:
          log(`USER-AGENT: ${parameter.readUtf8String()}`);
          break;

        case CurlOptions.PostFields:
          log(`REQUEST-POST-DATA: ${parameter.readUtf8String()}`);
          break;

        case CurlOptions.PostFieldSize:
          log(`REQUEST-POST-DATA-SIZE: ${parameter.toInt32()}`);
          break;

        case CurlOptions.HttpVersion:
          log(`HTTP-VERSION: ${parameter.toInt32()}`);
          break;

        case CurlOptions.HttpHeader:
          print_request_headers(parameter)
          break;


        case CurlOptions.WriteFunction:
          log(`Original WriteFunc: ${parameter} Offset: ${parameter.sub(Process.mainModule.base)}`);

          // Store the original callback (only once)
          if (parameter.toInt32() !== 0 && !original_write_function_callback) {
            original_write_function_callback = new NativeFunction(parameter, "uint", [
              "pointer",
              "uint",
              "uint",
              "pointer",
            ]);
          }

          // Replace with our callback
          args[2] = replacement_write_callback;
          break;
          
        case CurlOptions.HeaderFunction:
          log(`Original HeaderFunc: ${parameter} Offset: ${parameter.sub(Process.mainModule.base)}`);
          break;

        default:
          log(`Unhandled option: ${CurlOptions[curloption]} - param: ${parameter}`);
          break;
      }

    },
    onLeave(retval) {
      if (retval.toInt32() != 0)
        log(`[curl_easy_setopt] failed: ${retval}`);
    },
  });
}

function print_request_headers(param: any) {
  const slistPointer = ptr(param);
  const headers = [];
  let current = slistPointer;

  while (!current.isNull()) {
    try {
      // curl_slist structure: [data_pointer, next_pointer]
      const headerStringPointer = current.readPointer();
      if (!headerStringPointer.isNull()) {
        const headerString = headerStringPointer.readUtf8String();
        if (headerString) {
          headers.push(headerString);
        }
      }

      // Move to next node in the linked list
      current = current.add(Process.pointerSize).readPointer();
    } catch (e: any) {
      console.error(`Error reading header: ${e.message}`);
      break;
    }
  }

  if (headers.length > 0) {
    log(`REQUEST-HEADERS: ${headers.join(", ")}`);
  }
}

const replacement_write_callback = new NativeCallback(
  (buffer, size, nmemb, userdata) => {
    const totalSize = size * nmemb;

    if (totalSize > 0) {
      const data = buffer.readCString(totalSize);
      console.log(`Response data (${totalSize} bytes): ` + data);
    }

    // Call the original callback if it exists
    if (original_write_function_callback) {
      return original_write_function_callback(buffer, size, nmemb, userdata);
    }

    return totalSize; // Return bytes processed if no original callback
  },
  "uint",
  ["pointer", "uint", "uint", "pointer"],
);