import { CurlOptions } from "../../globals/curl_opts";
import { log } from "../../logger";

enum curl_debug_infotype {
  CURLINFO_TEXT = 0,
  CURLINFO_HEADER_IN,/* 1 */
  CURLINFO_HEADER_OUT,/* 2 */
  CURLINFO_DATA_IN,/* 3 */
  CURLINFO_DATA_OUT,/* 4 */
  CURLINFO_SSL_DATA_IN,/* 5 */
  CURLINFO_SSL_DATA_OUT,/* 6 */
  CURLINFO_END
}
const debugCallback = new NativeCallback((handle, infoType: curl_debug_infotype, data, size, userptr) => {

  log(`[CURL DEBUG ${handle} - ${curl_debug_infotype[infoType]}]: ${data.readCString(size)}`);
  return 0; // Return 0 for success  
}, 'int', ['pointer', 'int', 'pointer', 'int', 'pointer']);

const curl_easy_setopt_ptr = Process.getModuleByName("libcurl.dll").getExportByName('curl_easy_setopt');
const curl_easy_setopt = new NativeFunction(curl_easy_setopt_ptr, 'int', ['pointer', 'int', 'pointer']);

export function EnableDebugForCurlHandle(easy_handle: NativePointer) {
  // Debug callback function signature: int debug_callback(CURL *handle, curl_debug_infotype type, char *data, size_t size, void *userptr)  


  // Enable verbose mode  
  curl_easy_setopt(easy_handle, CurlOptions.Verbose, ptr(1));

  // Set debug function  
  curl_easy_setopt(easy_handle, CurlOptions.DebugFunction, debugCallback);

  // Set debug data (optional user pointer)  
  curl_easy_setopt(easy_handle, CurlOptions.DebugData, ptr(0));

}
