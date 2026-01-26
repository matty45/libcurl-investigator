import { curl } from "../..";
import { log } from "../../logger";

export function hook_curl_share_init() {
  const curl_share_init = curl.getExportByName("curl_share_init");

  Interceptor.attach(curl_share_init, {

    onLeave(retval) {
      log(`[curl_share_init] return value: ${retval}`);
    },

  });
}