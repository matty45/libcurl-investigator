import { curl } from "../..";
import { log } from "../../logger";

export function hook_curl_multi_init() {
  const curl_multi_init = curl.getExportByName("curl_multi_init");

  Interceptor.attach(curl_multi_init, {

    onLeave(retval) {
      log(`[curl_multi_init] return value: ${retval}`);
    },

  });
}
