import { curl } from "../..";
import { log } from "../../logger";

export function hook_curl_multi_add_handle() {
  const curl_multi_add_handle = curl.getExportByName("curl_multi_add_handle");

  Interceptor.attach(curl_multi_add_handle, {
    onEnter(args) {
      const multi_handle = args[0];
      const easy_handle = args[0];
      log(`[curl_multi_add_handle] multi_handle: ${multi_handle} easy_handle: ${easy_handle}`);
    },

    onLeave(retval) {
      if (retval.toInt32() != 0) 
        log(`[curl_multi_add_handle] failed: ${retval}`);
    },

  });
}
