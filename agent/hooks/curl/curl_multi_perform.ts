import { curl } from "../..";
import { log } from "../../logger";

export function hook_curl_multi_perform() {
  const curl_multi_perform = curl.getExportByName("curl_multi_perform");

  Interceptor.attach(curl_multi_perform, {
    onEnter(args) {
      const multi_handle = args[0];
      const running_handles = args[1];
      log(`[curl_multi_perform] multi_handle: ${multi_handle} running_handles: ${running_handles}`);
    },

    onLeave(retval) {
      if (retval.toInt32() != 0) 
        log(`[curl_multi_perform] failed: ${retval}`);
    },

  });
}
