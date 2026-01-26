import { curl } from "../..";
import { log } from "../../logger";

export function hook_curl_multi_info_read() {
  const curl_multi_info_read = curl.getExportByName("curl_multi_info_read");
  Interceptor.attach(curl_multi_info_read, {  
  onEnter: function(args) {  
    // Store the multi handle and messages in queue pointer  
    this.multiHandle = args[0];  
    this.msgsInQueuePtr = args[1];  
    log('[curl_multi_info_read] called!')
  },  
  onLeave: function(retval) {  
    if (!retval.isNull()) {  
      // Read the curl_msg structure returned  
      const msgPtr = retval;  
        
      // curl_msg structure typically contains:  
      // - msg (CURLMSG): message type (e.g., CURLMSG_DONE)  
      // - easy_handle: pointer to the easy handle  
      // - data.result: CURLcode result  
      // - data.whatever: additional data depending on message type  
        
      const msgType = msgPtr.readU32();  
      const easyHandle = msgPtr.add(4).readPointer();  
      const result = msgPtr.add(8).readU32();  
        
      log('[curl_multi_info_read] message:');  
      log(`[curl_multi_info_read] Message type: ${msgType}`);  
      log(`[curl_multi_info_read] Easy handle: ${easyHandle}`);  
      log(`[curl_multi_info_read] Result code: ${result}`);  
        
      // Also read the number of messages remaining  
      const msgsRemaining = this.msgsInQueuePtr.readU32();  
      log(`[curl_multi_info_read] Messages remaining in queue: ${msgsRemaining}`);  
    } else 
      log(`[curl_multi_info_read] No more messages`);  
  }  
});
}