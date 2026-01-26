import { curl } from "../..";
import { log } from "../../logger";

export function hook_curl_strnequal() {
  const curl_strnequal = curl.getExportByName("curl_strnequal");
  Interceptor.attach(curl_strnequal, {
    onEnter(args) {
      const str1 = args[0].readUtf8String();
      const str2 = args[1].readUtf8String();
      const max_len = args[2].toInt32();

      log(`[curl_strnequal] checking if strings are identical: str1: ${str1} str2: ${str2} max_length: ${max_len} `);
    },
    onLeave(retval) {
      if (retval.toInt32() == 0)
        log(`[curl_strnequal] strings are not identical`);
      else
        log(`[curl_strnequal] strings are identical`);

    },
  });
}