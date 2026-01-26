import { curl } from "../..";
import { log } from "../../logger";

export function hook_curl_msnprintf() {
  const curl_msnprintf = curl.getExportByName("curl_msnprintf");
  Interceptor.attach(curl_msnprintf, {
    onEnter: function (args) {
      this.buffer = args[0];
    },

    onLeave(retval) {
      const formattedString = this.buffer.readUtf8String(); 
      log(`[curl_msnprintf] return value: ${formattedString}`);
    },
  });
}