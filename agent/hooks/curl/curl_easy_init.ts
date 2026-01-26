import { curl } from "../..";
import { log } from "../../logger";

export function hook_curl_easy_init() {
  const curl_easy_init = curl.getExportByName("curl_easy_init");

  Interceptor.attach(curl_easy_init, {

    onLeave(retval) {
      log(`[curl_easy_init] return value: ${retval}`);
    },

  });
}