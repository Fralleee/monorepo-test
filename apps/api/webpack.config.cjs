const path = require("node:path");

module.exports = (options) => {
    // Get the original externals and filter out @acme/* packages
    const externals = options.externals || [];
    const filteredExternals = externals.filter((external) => {
        if (typeof external === "function") {
            // Return a wrapped function that includes @acme/* packages
            return false;
        }
        return true;
    });

    // Create a new externals function that includes @acme/* packages in the bundle
    const newExternals = (context, callback) => {
        const originalExternals = options.externals || [];

        for (const external of originalExternals) {
            if (typeof external === "function") {
                // NestJS uses a function to externalize node_modules
                return external(context, (err, result) => {
                    if (err) return callback(err);

                    // If the module is from @acme/*, don't externalize it
                    if (context.request?.startsWith("@acme/")) {
                        return callback();
                    }

                    return callback(null, result);
                });
            }
        }

        callback();
    };

    return {
        ...options,
        externals: newExternals,
        resolve: {
            ...options.resolve,
            extensions: [".ts", ".tsx", ".js", ".json"],
            extensionAlias: {
                ".js": [".ts", ".js"],
                ".mjs": [".mts", ".mjs"],
            },
        },
        module: {
            ...options.module,
            rules: [...(options.module?.rules || [])],
        },
    };
};
