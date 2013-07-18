(function ($, fluid) {
    fluid.defaults("catOptions.primarySchema", {
        gradeNames: ["fluid.uiOptions.schema", "autoInit"],
        schema: {
            "catOptions.size": {
                "type": "number",
                "default": 1,
                "minimum": 1,
                "maximum": 10,
                "divisibleBy": 1
            }
        }
    });

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
            min: 1,
            max: 2
        },
         
        selectors: {
            catSizeSlider: "#size",
            label: ".catpanel-size-label"
        },
                 
        protoTree: {
            "catSizeSlider": {
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
        },
         
        classnameMap: null, // must be supplied by implementors
        controlValues: {
            textFont: ["default", "times", "comic", "arial", "verdana"]
        }
    });

    fluid.defaults("catOptions.auxSchema", {
        gradeNames: ["fluid.uiOptions.auxSchema", "autoInit"],
        auxiliarySchema: {
            "namespace": "catOptions",
            "templatePrefix": "../pages/catOptionsPanel/html/",
            "catSize": {
                "type": "catOptions.size"
            },
             
            "enactors": [
                {
                    "type": "catOptions.enactors.catSize"
                }
            ],
             
            "panels": [
                {
                    "type": "catOptions.panel",
                    "container": ".catOptions-catSizePanel",  // the css selector in the template where the panel is rendered
                    "template": "./catPanel.html"
                }
            ]
        }
    });
})(jQuery, fluid);
