import { curl } from "../..";
import { log } from "../../logger";

export function hook_curl_mvaprintf() {
  const curl_mvaprintf = curl.getExportByName("curl_mvaprintf");
  Interceptor.attach(curl_mvaprintf, {
    onLeave(retval) {
      log(`[curl_mvaprintf] return value: ${retval.readUtf8String()}`);
    },
  });
}