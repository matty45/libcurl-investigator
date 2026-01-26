import { curl } from "../..";
import { log } from "../../logger";

export function hook_curl_maprintf() {
  const curl_maprintf = curl.getExportByName("curl_maprintf");
  Interceptor.attach(curl_maprintf, {
    onLeave(retval) {
      log(`[curl_maprintf] return value: ${retval.readUtf8String()}`);
    },
  });
}