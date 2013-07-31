(function ($, fluid) {
    fluid.defaults("catOptions.panel", {
        gradeNames: ["fluid.uiOptions.panels", "autoInit"],
        preferenceMap: {
            "catOptions.size": {
                "model.value": "default",
                "range.min": "minimum",
                "range.max": "maximum"
            }
        },
         
        range: {
            min: null,
            max: null
        },
         
        selectors: {
            catSizeSlider: "#size",
            label: ".catpanel-size-label"
        },

        protoTree: {
            catSizeSlider: {
                valuebinding: "{value}",
                decorators: {
                    attrs: {
                        min: "{that}.options.range.min",
                        max: "{that}.options.range.max"
                    }
                }
            },
            label: {
                messagekey: "catpanel.catsize"
            }
        }
    });

    catOptions.primarySchema = {
        "catOptions.size": {
            "type": "number",
            "default": 1,
            "minimum": 1,
            "maximum": 10,
            "divisibleBy": 1
        }
    };

    catOptions.auxSchema = {
        namespace: "catOptions",
        //templatePrefix: "",
        //messagePrefix: "",
        catSize: {
            type: "catOptions.size",
            panel: {
                type: "catOptions.panel",
                container: ".catOptions-catSizePanel",
                template: "./catpanel.html",
                message: "./cat_bg.json"
            }
        }
    };
})(jQuery, fluid);
