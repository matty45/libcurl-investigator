import { hook_curl_easy_init } from "./hooks/curl/curl_easy_init";
import { hook_curl_easy_setopt } from "./hooks/curl/curl_easy_setopt";


export const curl_easy_init_ptr: NativePointer = ptr("0x144f13cb0");

export const curl_easy_setopt_ptr: NativePointer = ptr("0x144f158a0");

//Optional Proxy
export const proxy_url = ""

// Bypass ssl pinning
export const bypass_ssl_pinning = false;

// Enable built-in libcurl debug components
export const libcurl_debug = true;

// Execute hooks
hook_curl_easy_init()
hook_curl_easy_setopt()

