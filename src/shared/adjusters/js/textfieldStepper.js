var fluid_1_5 = fluid_1_5 || {};

(function ($, fluid) {

    /*******************************************
     * A custom adjuster used to increment or  *
     * decrement a given value by a given step *
     *******************************************/

    fluid.defaults("gpii.textfieldStepper", {
        gradeNames: ["fluid.textfieldSlider.textfield", "gpii.textfieldStepper.buttons", "autoInit"],
        selectors: {
            textfield: ".gpii-textfieldStepper-field",
        },
        events: {
            modelChanged: null,
            afterRender: null
        },
        listeners: {
            modelChanged: "{that}.refreshView"
        },
        model: {
            value: null
        },
        range: {
            min: -Infinity,
            max: Infinity,
            step: 1
        },
        invokers: {
            refreshView: {
                funcName: "gpii.textfieldStepper.refreshView",
                args: ["{that}"]
            }
        },
        finalInitFunction: "gpii.textfieldStepper.finalInit",
        renderOnInit: true
    });

    gpii.textfieldStepper.finalInit = function (that) {
        that.applier.modelChanged.addListener("value", function (newModel) {
            that.events.modelChanged.fire(newModel.value);
        });

        if (that.options.renderOnInit) {
            that.refreshView();
        }
    };

    gpii.textfieldStepper.refreshView = function (that) {
        that.locate("textfield").val(that.model.value);
        that.events.afterRender.fire(that);
    };

    fluid.defaults("gpii.textfieldStepper.buttons", {
        gradeNames: ["fluid.viewComponent", "autoInit"],
        selectors: {
            inc: ".gpii-textfieldStepper-increment",
            dec: ".gpii-textfieldStepper-decrement"
        },
        events: {
            modelChanged: null
        },
        listeners: {
            onCreate: {
                listener: "gpii.textfieldStepper.buttons.init",
                args: "{that}"
            },
            "onCreate.inc": {
                "this": "{that}.dom.inc",
                "method": "click",
                "args": ["{that}.increment"]
            },
            "onCreate.dec": {
                "this": "{that}.dom.dec",
                "method": "click",
                "args": ["{that}.decrement"]
            }
        },
        range: {} // should be used to specify the min, max range and step e.g. {min: 0, max: 100, step: 5}
    });

    gpii.textfieldStepper.buttons.init = function (that) {
        that.increment = function () {
            var newValue = that.model.value + that.options.range.step;
            that.applier.requestChange("value", newValue);
        };

        that.decrement = function () {
            var newValue = that.model.value - that.options.range.step;
            that.applier.requestChange("value", newValue);
        };

        that.applier.guards.addListener({path: "value", transactional: true}, function (model, changeRequest) {
            var val = changeRequest.value;
            if (typeof val === "string") {
                changeRequest.value = parseInt(val, 10);
            }
        });
    };

    fluid.defaults("gpii.uiOptions.textfieldStepper", {
        gradeNames: ["gpii.textfieldStepper", "fluid.uiOptions.modelRelay", "autoInit"],
        range: "{fluid.uiOptions.panels}.options.range"
    });

})(jQuery, fluid_1_5);
