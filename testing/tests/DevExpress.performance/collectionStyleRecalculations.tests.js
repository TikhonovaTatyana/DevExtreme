"use strict";

require("../../helpers/qunitPerformanceExtension.js");

require("common.css!");

var $ = require("jquery"),
    resizeCallbacks = require("core/utils/window").resizeCallbacks;

require("ui/accordion");
require("ui/tabs");

QUnit.testStart(function() {
    $("#qunit-fixture").html('<div id="element"></div>');
});

QUnit.performanceTest("dxTabs should force minimum relayout count on creation", function(assert) {
    var measureFunction = function() {
        $("#element").dxTabs({
            items: [1, 2, 3],
            scrollingEnabled: false
        });
    };

    assert.measureStyleRecalculation(measureFunction, 3);
});

QUnit.performanceTest("dxTabs without scrolling should not force relayout on dxshown event", function(assert) {
    $("#element").dxTabs({
        items: [1, 2, 3],
        scrollingEnabled: false
    });

    var measureFunction = function() {
        resizeCallbacks.fire();
    };

    assert.measureStyleRecalculation(measureFunction, 0);
});

QUnit.performanceTest("Accordion should force minimum relayout count on creation", function(assert) {
    var measureFunction = function() {
        $("#element").dxAccordion({
            items: [1, 2, 3, 4, 5, 6, 7]
        });
    };

    assert.measureStyleRecalculation(measureFunction, 10);
});

QUnit.performanceTest("Accordion should force minimum relayout count on selection change", function(assert) {
    var $element = $("#element").dxAccordion({
        items: [1, 2, 3, 4, 5, 6, 7]
    });

    var measureFunction = function() {
        $element.dxAccordion("option", "selectedIndex", 1);
    };

    assert.measureStyleRecalculation(measureFunction, 5);
});
