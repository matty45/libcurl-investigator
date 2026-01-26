import { curl } from "../..";
import { CurlOptions } from "../../globals/curl_opts";
import { log } from "../../logger";

export function hook_curl_easy_setopt() {
  const curl_easy_setopt = curl.getExportByName("curl_easy_setopt");
  Interceptor.attach(curl_easy_setopt, {
    onEnter(args) {
      const handle = args[0];
      const curloption = args[1].toInt32();
      const curloptionname = CurlOptions[curloption];
      const parameter = args[2];

      log(`[curl_easy_setopt] handle: ${handle} option: ${curloptionname} - ${curloption}  parameter: ${parameter} `);
    },
    onLeave(retval) {
      if (retval.toInt32() != 0) {
        log(`[curl_easy_setopt] failed: ${retval}`);
      }
    },
  });
}