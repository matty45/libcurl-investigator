import { curl } from "../..";
import { CurlInfos } from "../../globals/curl_infos";
import { log } from "../../logger";

export function hook_curl_easy_getinfo() {
  const curl_easy_getinfo = curl.getExportByName("curl_easy_getinfo");
  Interceptor.attach(curl_easy_getinfo, {
    onEnter(args) {
      const handle = args[0];
      const curlinfo = args[1].toInt32();
      const curlinfoname = CurlInfos[curlinfo];
      const parameter = args[2];

      log(`[curl_easy_getinfo] handle: ${handle} option: ${curlinfoname} - ${curlinfo}  parameter: ${parameter} `);
    },
    onLeave(retval) {
      if (retval.toInt32() != 0) {
        log(`[curl_easy_getinfo] failed: ${retval}`);
      }
    },
  });
}