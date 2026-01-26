import { curl } from "../..";
import { log } from "../../logger";

export function hook_curl_easy_perform() {
  const curl_easy_perform = curl.getExportByName("curl_easy_perform");

  Interceptor.attach(curl_easy_perform, {
    onEnter(args) {
      const handle = args[0];
      log(`[curl_easy_perform] CURL* handle: ${handle}`);
    },

    onLeave(retval) {
      if (retval.toInt32() != 0) 
        log(`[curl_easy_perform] failed: ${retval}`);  
    },

  });
}
