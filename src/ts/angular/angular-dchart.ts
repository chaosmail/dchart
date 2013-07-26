"use strict";

/// <reference path="../../../d.ts/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../../d.ts/DefinitelyTyped/angularjs/angular.d.ts" />

/// <reference path="../../ts/dchart.ts" />

module aChart {

    export class Chart2D extends dChart.Chart2D  {

        data:dChart.Point2D[] = [];
        solver:dChart.ISolver2D = new dChart.Solver2D();

        parseDataAttr(value:Node) {

            if (value.nodeValue===undefined || value.nodeValue === null || value.nodeValue.trim() === "") {
                return;
            }

            // Access the Data from Element's parent scope
            var scope = angular.element(value.nodeValue).scope();

            if (scope===undefined || scope===null) {
                return;
            }

            // Split the data Values
            // e.g. blabla.foo.bar
            var scopeVars = value.nodeValue.split('.');

            // Element, to search for the Data Var
            var scopeDataElem = scope.$parent;

            // Count, how many data Vars are found
            var scopeDataFound = 0;

            // Map the Data Element scope._dataSets.dataSet
            _.map(scopeVars, function (value) {

                if (scopeDataElem.hasOwnProperty(value)) {

                    scopeDataElem = scopeDataElem[value];
                    scopeDataFound++;
                }
            });

            if (!scopeDataFound) {
                return;
            }
            // Link the Data Function from the parent scope to the solver fn
            else if (typeof(scopeDataElem) === "function") {

                this.solver.fn = scopeDataElem;
            }
            // Link the Data Array from the parent scope to the data var
            // TODO: Can we make better binding here?
            else {

                //this.data = scopeDataElem;
            }
        }
    }
}