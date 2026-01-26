import { hook_curl_easy_getinfo } from "./curl/curl_easy_getinfo"
import { hook_curl_easy_init } from "./curl/curl_easy_init"
import { hook_curl_easy_perform } from "./curl/curl_easy_perform"
import { hook_curl_easy_setopt } from "./curl/curl_easy_setopt"
import { hook_curl_getenv } from "./curl/curl_getenv"
import { hook_curl_global_init_mem } from "./curl/curl_global_init_mem"
import { hook_curl_maprintf } from "./curl/curl_maprintf"
import { hook_curl_msnprintf } from "./curl/curl_msnprintf"
import { hook_curl_multi_add_handle } from "./curl/curl_multi_add_handle"
import { hook_curl_multi_info_read } from "./curl/curl_multi_info_read"
import { hook_curl_multi_init } from "./curl/curl_multi_init"
import { hook_curl_multi_perform } from "./curl/curl_multi_perform"
import { hook_curl_multi_wait } from "./curl/curl_multi_wait"
import { hook_curl_mvaprintf } from "./curl/curl_mvaprintf"
import { hook_curl_share_init } from "./curl/curl_share_init"
import { hook_curl_share_setopt } from "./curl/curl_share_setopt"
import { hook_curl_strnequal } from "./curl/curl_strnequal"

export function initialize_hooks() {
    hook_curl_easy_init()
    hook_curl_easy_perform()
    hook_curl_easy_setopt()
    hook_curl_easy_getinfo()
    hook_curl_global_init_mem()
    hook_curl_multi_add_handle()
    hook_curl_multi_init()
    hook_curl_multi_wait()
    hook_curl_multi_perform()
    hook_curl_multi_info_read()
    hook_curl_maprintf()
    hook_curl_mvaprintf()
    hook_curl_msnprintf()
    hook_curl_getenv()
    hook_curl_share_init()
    hook_curl_share_setopt()
    hook_curl_strnequal()
}