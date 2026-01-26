import { curl } from "../..";
import { log } from "../../logger";

export function hook_curl_getenv() {
  const curl_getenv = curl.getExportByName("curl_getenv");

  Interceptor.attach(curl_getenv, {
    onEnter: function (args) {
      // Store the environment variable name  
      this.varName = args[0].readUtf8String();
      log(`[curl_getenv] looking for env var: ${this.varName}`);
    },
    onLeave: function (retval) {
      if (!retval.isNull()) {
        // Read the returned environment variable value  
        const varValue = retval.readUtf8String();
        log(`[curl_getenv] env var value: ${varValue}`);
      } else {
        log(`[curl_getenv] env var not found`);
      }
    }
  });
}