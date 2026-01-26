/** 
 * This function will hook all the exports of the module you specify, printing out the names of them and then unhooking them when they get called.
 * @param module The module you want to hook all the exports of.
 */
export function hook_all_module_exports(module : Module) {
    const module_exports = module.enumerateExports();

    module_exports.forEach((module_export) => {
        if (module_export.type === 'function') {
            try {
                const hook = Interceptor.attach(module_export.address, {
                    onEnter: function (args) {
                        console.log(`Function triggered: ${module_export.name}`);
                        // Unhook this specific function immediately  
                        hook.detach();
                    }
                });
            } catch (e) {
                // Skip functions that can't be hooked  
            }
        }
    });
}