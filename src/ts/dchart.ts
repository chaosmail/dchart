/// <reference path="../../d.ts/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../d.ts/DefinitelyTyped/d3/d3.d.ts" />
/// <reference path="point.ts" />
/// <reference path="axis.ts" />
/// <reference path="dataset.ts" />
/// <reference path="Utils/utils.ts" />
/// <reference path="Solver/solver.ts" />
"use strict";

module dChart {

    export interface IChart {

        elem:Element;
        label:string;
        description:string;
        width:number;
        height:number;
        marginTop:number;
        marginLeft:number;
        marginBottom:number;
        marginRight:number;
        dataSets:IDataSet[];
    }

    export interface IChart2D extends IChart {

        axis:{
            x:IAxis;
            y:IAxis;
        }
        dataSets:IDataSet2D[];
    }

    export interface IChart3D extends IChart {

        axis: {
            x:IAxis;
            y:IAxis;
            z:IAxis;
        }
        dataSets:IDataSet3D[];
    }

    export class Chart {

        svg:D3.Selection;
        elem:Element;

        marginLeft:Utils.Size = new Utils.Size(10);
        marginRight:Utils.Size = new Utils.Size(10);
        marginTop:Utils.Size = new Utils.Size(10);
        marginBottom:Utils.Size = new Utils.Size(10);

        width:Utils.Size = new Utils.Size(400);
        height:Utils.Size = new Utils.Size(400);

        label:string;
        description:string;

        constructor(config:IChart) {

            this.draw();
        }

        clear() {

            if (this.svg) {
                this.svg.remove();
            }
        }

        redraw() {

            this.drawAxis();
            this.drawData();
        }

        draw() {

            this.clear();

            this.svg = d3.select(this.elem).append("svg");

            this.redraw();
        }

        drawAxis() {

        }

        drawData() {

        }
    }

    export class Chart2D extends Chart {

        public dataSets:DataSet2D[];

        xAxis:Axis = new Axis("x");
        yAxis:Axis = new Axis("y");

        drawAxis() {
            var min = [this.min("x"),this.min("y")];
            var max = [this.max("x"),this.max("y")];

            var width = (new Utils.Size(this.width.value)).sub(this.marginLeft).sub(this.marginRight);
            var height = (new Utils.Size(this.height.value)).sub(this.marginTop).sub(this.marginBottom);

            this.xAxis.draw(width, min[0], max[0]);
            this.yAxis.draw(height, min[1], max[1]);
        }

        min(axis:string = "x") {
            return d3.min(this.dataSets, (dataSet:DataSet2D) => dataSet.min(axis));
        }

        max(axis:string = "x") {
            return d3.max(this.dataSets, (dataSet:DataSet2D) => dataSet.max(axis));
        }
    }

    export class Chart3D extends Chart {

        public dataSets:DataSet3D[];

        depth:Utils.Size = new Utils.Size(400);

        xAxis:Axis = new Axis("x");
        yAxis:Axis = new Axis("y");
        zAxis:Axis = new Axis("z");

        drawAxis() {
            var min = [this.min("x"),this.min("y"),this.min("z")];
            var max = [this.max("x"),this.max("y"),this.min("z")];

            var width = new Utils.Size(this.width.value).sub(this.marginLeft).sub(this.marginRight);
            var height = new Utils.Size(this.height.value).sub(this.marginTop).sub(this.marginBottom);

            this.xAxis.draw(width, min[0], max[0]);
            this.yAxis.draw(height, min[1], max[1]);
            this.zAxis.draw(this.depth, min[2], max[2]);
        }

        min(axis:string = "x") {
            return d3.min(this.dataSets, (dataSet:DataSet3D) => dataSet.min(axis));
        }

        max(axis:string = "x") {
            return d3.max(this.dataSets, (dataSet:DataSet3D) => dataSet.max(axis));
        }
    }
}