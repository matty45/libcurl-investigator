import { curl } from "../..";
import { log } from "../../logger";

export function hook_curl_global_init_mem() {
  const curl_global_init_mem = curl.getExportByName("curl_global_init_mem");

  Interceptor.attach(curl_global_init_mem, {
    onEnter(args) {
      const flags = args[0];
      const curl_malloc_callback = args[1]
      const curl_free_callback = args[2]
      const curl_realloc_callback = args[3];
      const curl_strdup_callback = args[4];
      const curl_calloc_callback = args[5];

      log(`[curl_global_init_mem] flags: ${flags} curl_malloc_callback: ${curl_malloc_callback} curl_free_callback: ${curl_free_callback} curl_realloc_callback: ${curl_realloc_callback} curl_strdup_callback: ${curl_strdup_callback} curl_calloc_callback: ${curl_calloc_callback}`);
    },

    onLeave(retval) {
      if (retval.toInt32() != 0) {
        log(`[curl_global_init_mem] failed: ${retval}`);
      }
    },

  });
}