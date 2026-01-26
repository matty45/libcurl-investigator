import { hook_curl_easy_init } from "./hooks/curl/curl_easy_init";



//Initialize globals
export const curl = Process.getModuleByName("libcurl.dll"); // Change this depending on the OS you are using!  

// Execute hooks
hook_curl_easy_init()