import { initialize_hooks } from "./hooks";
import { hook_all_module_exports } from "./hooks/util/all_exports";

//Initialize globals
export const curl = Process.getModuleByName("libcurl.dll"); // Change this depending on the OS you are using!  

// Execute hooks
initialize_hooks()