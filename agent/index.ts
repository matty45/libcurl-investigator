import { hook_curl_easy_setopt } from "./hooks/curl/curl_easy_setopt";



//Initialize globals
export const curl = Process.getModuleByName("libcurl.dll"); // Change this depending on the OS you are using!  

// Execute hooks
hook_curl_easy_setopt()