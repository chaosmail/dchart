"use strict";
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var aChart;
(function (aChart) {
    var Chart2D = (function (_super) {
        __extends(Chart2D, _super);
        function Chart2D() {
            _super.apply(this, arguments);
            this.data = [];
            this.solver = new dChart.Solver2D();
        }
        Chart2D.prototype.parseDataAttr = function (node) {
            if (value.nodeValue === undefined || value.nodeValue === null || value.nodeValue.trim() === "") {
                return;
            }

            var scope = angular.element(node).scope();

            if (scope === undefined || scope === null) {
                return;
            }

            var scopeVars = value.nodeValue.split('.');

            var scopeDataElem = scope.$parent;

            var scopeDataFound = 0;

            _.map(scopeVars, function (value) {
                if (scopeDataElem.hasOwnProperty(value)) {
                    scopeDataElem = scopeDataElem[value];
                    scopeDataFound++;
                }
            });

            if (!scopeDataFound) {
                return;
            } else if (typeof (scopeDataElem) === "function") {
                this.solver.fn = scopeDataElem;
            } else {
                this.data = scopeDataElem;
            }
        };
        return Chart2D;
    })(dChart.Chart2D);
    aChart.Chart2D = Chart2D;
})(aChart || (aChart = {}));
//@ sourceMappingURL=angular-dchart.js.map
