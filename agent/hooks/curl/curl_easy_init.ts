import { curl } from "../..";
import { log } from "../../logger";
import { EnableDebugForCurlHandle } from "../util/EnableDebugForCurlHandle";




export function hook_curl_easy_init() {
  const curl_easy_init_ptr = curl.getExportByName("curl_easy_init");
  Interceptor.attach(curl_easy_init_ptr, {

    onLeave(retval) {
      log(`[curl_easy_init] return value: ${retval}`);
      EnableDebugForCurlHandle(retval)
    },
  });
}

