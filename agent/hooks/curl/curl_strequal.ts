import { curl } from "../..";
import { log } from "../../logger";

export function hook_curl_strequal() {
  const curl_strequal = curl.getExportByName("curl_strequal");
  Interceptor.attach(curl_strequal, {
    onEnter(args) {
      const str1 = args[0].readUtf8String();
      const str2 = args[1].readUtf8String();

      log(`[curl_strequal] checking if strings are identical: str1: ${str1} str2: ${str2}`);
    },
    onLeave(retval) {
      if (retval.toInt32() == 0)
        log(`[curl_strequal] strings are not identical`);
      else
        log(`[curl_strequal] strings are identical`);

    },
  });
}