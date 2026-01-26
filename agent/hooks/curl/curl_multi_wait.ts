import { curl } from "../..";
import { log } from "../../logger";

export function hook_curl_multi_wait() {
  const curl_multi_wait = curl.getExportByName("curl_multi_wait");

  Interceptor.attach(curl_multi_wait, {
    onEnter(args) {
      const multi_handle = args[0]
      const extra_fds = args[1]
      const extra_nfds = args[2]
      const timeout_ms = args[3]
      const numfds = args[4]

      log(`[curl_multi_wait] multi_handle: ${multi_handle} extra_fds: ${extra_fds} extra_nfds: ${extra_nfds} timeout_ms: ${timeout_ms.toInt32()} numfds: ${numfds}`);
    },
    onLeave(retval) {
      if (retval.toInt32() != 0) {
        log(`[curl_multi_wait] failed: ${retval}`);
      }
    }
  });

}
