import { curl } from "../..";
import { CurlShareOptions } from "../../globals/curl_share_opts";
import { log } from "../../logger";

export function hook_curl_share_setopt() {
  const curl_share_setopt = curl.getExportByName("curl_share_setopt");
  Interceptor.attach(curl_share_setopt, {
    onEnter(args) {
      const handle = args[0];
      const curloption = args[1].toInt32();
      const curloptionname = CurlShareOptions[curloption];
      const parameter = args[2];

      log(`[curl_share_setopt] handle: ${handle} option: ${curloptionname} - ${curloption}  parameter: ${parameter} `);
    },
    onLeave(retval) {
      if (retval.toInt32() != 0)
        log(`[curl_share_setopt] failed: ${retval}`);

    },
  });
}