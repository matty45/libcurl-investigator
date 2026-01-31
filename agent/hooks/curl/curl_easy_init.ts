import { bypass_ssl_pinning, curl, libcurl_debug, proxy_url } from "../..";
import { curl_debug_infotypes } from "../../globals/curl_debug_info_types";
import { CurlOptions } from "../../globals/curl_opts";
import { log } from "../../logger";



export function hook_curl_easy_init() {
    const curl_easy_init_ptr = curl.getExportByName("curl_easy_init");
    const curl_easy_setopt = new NativeFunction(curl.getExportByName('curl_easy_setopt'), 'int', ['pointer', 'int', 'pointer']);


    Interceptor.attach(curl_easy_init_ptr, {

        onLeave(retval) {

            if (proxy_url) {
                const buf = Memory.allocUtf8String(proxy_url);
                curl_easy_setopt(retval, CurlOptions.Proxy, buf);

                log(`Set proxy for curl handle: ${retval} to ${proxy_url}`)
            }

            if (bypass_ssl_pinning) {

            }

            if (libcurl_debug) {
                // Enable verbose mode  
                curl_easy_setopt(retval, CurlOptions.Verbose, ptr(1));

                // Set debug function  
                curl_easy_setopt(retval, CurlOptions.DebugFunction, debugCallback);

                // Set debug data (optional user pointer)  
                curl_easy_setopt(retval, CurlOptions.DebugData, ptr(0));

            }

        }
    });
}

// Debug callback for if libcurl_debug is enabled
const debugCallback = new NativeCallback((handle, infoType: curl_debug_infotypes, data, size, userptr) => {

    switch (infoType) {

        case curl_debug_infotypes.CURLINFO_TEXT: // CURLOPT_URL  
            log(`[CURL DEBUG ${handle}]: ${data.readCString(size)}`);
            break;
        case curl_debug_infotypes.CURLINFO_HEADER_OUT:
            log(`[CURL DEBUG ${handle}]: Sending header`);
            break;
        case curl_debug_infotypes.CURLINFO_DATA_OUT:
            log(`[CURL DEBUG ${handle}]: Sending data`);
            break;
        case curl_debug_infotypes.CURLINFO_SSL_DATA_OUT:
            log(`[CURL DEBUG ${handle}]: Sending SSL data`);
            break;
        case curl_debug_infotypes.CURLINFO_HEADER_IN:
            log(`[CURL DEBUG ${handle}]: Recieved header data`);
            break;
        case curl_debug_infotypes.CURLINFO_DATA_IN:
            log(`[CURL DEBUG ${handle}]: Recieved data`);
            break;
        case curl_debug_infotypes.CURLINFO_SSL_DATA_IN:
            log(`[CURL DEBUG ${handle}]: Recieved SSL data`);
            break;

        default:
            log(`CURL DEBUG ${handle}]: Unhandled debug type: ${curl_debug_infotypes[infoType]} - data: ${data}`);
            break;
    }

    return 0; // Return 0 for success  
}, 'int', ['pointer', 'int', 'pointer', 'int', 'pointer']);