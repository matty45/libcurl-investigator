import { hook_curl_easy_init } from "./hooks/curl/curl_easy_init";
import { hook_curl_easy_setopt } from "./hooks/curl/curl_easy_setopt";



//Initialize globals/settings
export const curl = Process.getModuleByName("libcurl.dll"); // Change this depending on the OS you are using!  

//Optional Proxy
export const proxy_url = ""

// Bypass ssl pinning
export const bypass_ssl_pinning = false;

// Enable built-in libcurl debug components
export const libcurl_debug = false;

// Execute hooks
hook_curl_easy_init()
hook_curl_easy_setopt()

