"use strict";
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dChart;
(function (dChart) {
    var ElementUtils = (function () {
        function ElementUtils() {
        }
        ElementUtils.getFloat = function (regexp, value) {
            if (value.nodeName.match(regexp)) {
                return parseFloat(value.nodeValue);
            }
            return null;
        };

        ElementUtils.getSize = function (regexp, value) {
            if (value.nodeName.match(regexp)) {
                return new Size(parseFloat(value.nodeValue));
            }
            return null;
        };

        ElementUtils.getColor = function (regexp, value) {
            if (value.nodeName.match(regexp)) {
                return new Color(value.nodeValue);
            }
            return null;
        };
        return ElementUtils;
    })();
    dChart.ElementUtils = ElementUtils;

    var Point = (function () {
        function Point() {
            this.lineStyle = new LineStyle();
            this.areaStyle = new AreaStyle();
        }
        Point.prototype.normalize = function (value) {
        };

        Point.prototype.parse = function (elem) {
            var _this = this;
            _.map(elem.attributes, function (value) {
                if (value.nodeName.match(/^stroke$/i)) {
                    _this.lineStyle.stroke = new Color(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^stroke-width$/i)) {
                    _this.lineStyle.strokeWidth = new Size(parseFloat(value.nodeValue));
                    return;
                } else if (value.nodeName.match(/^stroke-opacity$/i)) {
                    _this.lineStyle.strokeOpacity = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^fill$/i)) {
                    _this.areaStyle.fill = new Color(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^fill-opacity$/i)) {
                    _this.areaStyle.fillOpacity = parseFloat(value.nodeValue);
                    return;
                }
            });
        };
        return Point;
    })();
    dChart.Point = Point;

    var Point1D = (function (_super) {
        __extends(Point1D, _super);
        function Point1D(x) {
            _super.call(this);
            this.x = x;
        }
        Point1D.prototype.normalize = function (value) {
            _super.prototype.parse.call(this, value);

            if (typeof (value) === "number") {
                this.x = value;
            }
        };

        Point1D.prototype.parse = function (elem) {
            var _this = this;
            _super.prototype.parse.call(this, elem);

            _.map(elem.attributes, function (value) {
                if (value.nodeName.match(/^x$/i)) {
                    _this.x = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^y$/i)) {
                    _this.x = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^val$/i)) {
                    _this.x = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^value$/i)) {
                    _this.x = parseFloat(value.nodeValue);
                    return;
                }
            });
        };
        return Point1D;
    })(Point);
    dChart.Point1D = Point1D;

    var Point2D = (function (_super) {
        __extends(Point2D, _super);
        function Point2D(x, y) {
            _super.call(this);
            this.x = x;
            this.y = y;
        }
        Point2D.prototype.parse = function (elem) {
            var _this = this;
            _super.prototype.parse.call(this, elem);

            _.map(elem.attributes, function (value) {
                if (value.nodeName.match(/^x$/i)) {
                    _this.x = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^y$/i)) {
                    _this.y = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^val$/i)) {
                    _this.y = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^value$/i)) {
                    _this.y = parseFloat(value.nodeValue);
                    return;
                }
            });
        };
        return Point2D;
    })(Point);
    dChart.Point2D = Point2D;

    var Point2DTime = (function (_super) {
        __extends(Point2DTime, _super);
        function Point2DTime(x, t) {
            _super.call(this);
            this.x = x;
            this.t = t;
        }
        Point2DTime.prototype.parse = function (elem) {
            var _this = this;
            _super.prototype.parse.call(this, elem);

            _.map(elem.attributes, function (value) {
                if (value.nodeName.match(/^x$/i)) {
                    _this.x = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^y$/i)) {
                    _this.t = new Date(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^val$/i)) {
                    _this.t = new Date(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^value$/i)) {
                    _this.t = new Date(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^t$/i)) {
                    _this.t = new Date(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^time$/i)) {
                    _this.t = new Date(value.nodeValue);
                    return;
                }
            });
        };
        return Point2DTime;
    })(Point);
    dChart.Point2DTime = Point2DTime;

    var Point3D = (function (_super) {
        __extends(Point3D, _super);
        function Point3D(x, y, z) {
            _super.call(this);
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Point3D.prototype.parse = function (elem) {
            var _this = this;
            _super.prototype.parse.call(this, elem);

            _.map(elem.attributes, function (value) {
                if (value.nodeName.match(/^x$/i)) {
                    _this.x = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^y$/i)) {
                    _this.y = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^z$/i)) {
                    _this.z = parseFloat(value.nodeValue);
                    return;
                }
            });
        };
        return Point3D;
    })(Point);
    dChart.Point3D = Point3D;

    var Point3DTime = (function (_super) {
        __extends(Point3DTime, _super);
        function Point3DTime(x, y, t) {
            _super.call(this);
            this.x = x;
            this.y = y;
            this.t = t;
        }
        Point3DTime.prototype.parse = function (elem) {
            var _this = this;
            _super.prototype.parse.call(this, elem);

            _.map(elem.attributes, function (value) {
                if (value.nodeName.match(/^x$/i)) {
                    _this.x = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^y$/i)) {
                    _this.y = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^t$/i)) {
                    _this.t = new Date(value.nodeValue);
                    return;
                }
            });
        };
        return Point3DTime;
    })(Point);
    dChart.Point3DTime = Point3DTime;

    var Axis = (function () {
        function Axis(axisLabel) {
            this.axisLabel = axisLabel;
            this.clamp = false;
            this.range = [0, 1];
            this.rangeAuto = true;
            this.scale = "linear";
            this.align = "start";
            this.labelAlign = "end";
            this.nice = [];
            this.ticks = 10;
            this.visible = true;
        }
        Axis.prototype.draw = function (length, min, max) {
            var _this = this;
            if (this.rangeAuto === true) {
                this.range = [min, max];
            }

            var pos = this.align === "center" ? length.value * 0.5 : this.align === "start" ? 0 : length.value;

            var labelOrient = this.align === "start" ? "top" : "bottom";

            var labelPos = this.labelAlign === "start" ? 0 : this.labelAlign === "center" ? length.value * 0.5 : length.value;

            var scale = null;
            switch (this.scale) {
                case "identity":
                    scale = d3.scale.identity();
                    break;

                case "power":
                    scale = d3.scale.pow();
                    break;

                case "sqrt":
                    scale = d3.scale.sqrt();
                    break;

                case "log":
                    scale = d3.scale.log();
                    break;

                case "quantize":
                    scale = d3.scale.quantize();
                    break;

                case "quantile":
                    scale = d3.scale.quantile();
                    break;

                case "treshold":
                    scale = d3.scale.treshold();
                    break;

                case "linear":
                default:
                    scale = d3.scale.linear();
            }

            scale = scale.domain(this.range).range([0, length.value]);

            var axis = d3.svg.axis().scale(scale).orient(labelOrient).ticks(this.ticks);

            if (this.ticksFormat.length > 0) {
                axis.tickFormat(function (d) {
                    return _this.ticksFormat[d];
                });
            }
        };
        return Axis;
    })();
    dChart.Axis = Axis;

    var DataSet = (function () {
        function DataSet(dataSetLabel) {
            this.dataSetLabel = dataSetLabel;
            this.data = [];
            this.interpolate = "linear";
            this.visible = true;
            this.lineStyle = new LineStyle();
            this.areaStyle = new AreaStyle();
        }
        DataSet.prototype.Point = function () {
            return new Point();
        };

        DataSet.prototype.recalculate = function () {
        };

        DataSet.prototype.parse = function (elem) {
            _.map(elem.attributes, function (value) {
                if (value.nodeName.match(/^label$/i)) {
                    this.label = value.nodeValue;
                } else if (value.nodeName.match(/^interpolate$/i)) {
                    this.interpolate = value.nodeValue;
                } else if (value.nodeName.match(/^min$/i)) {
                    this.solver.min = parseFloat(value.nodeValue);
                } else if (value.nodeName.match(/^max$/i)) {
                    this.solver.max = parseFloat(value.nodeValue);
                } else if (value.nodeName.match(/^step$/i)) {
                    this.solver.max = parseFloat(value.nodeValue);
                } else if (value.nodeName.match(/^stroke$/i)) {
                    this.lineStyle.stroke = new Color(value.nodeValue);
                } else if (value.nodeName.match(/^stroke-width$/i)) {
                    this.lineStyle.strokeWidth = new Size(parseFloat(value.nodeValue));
                } else if (value.nodeName.match(/^stroke-opacity$/i)) {
                    this.lineStyle.strokeOpacity = parseFloat(value.nodeValue);
                } else if (value.nodeName.match(/^fill$/i)) {
                    this.areaStyle.fill = new Color(value.nodeValue);
                } else if (value.nodeName.match(/^fill-opacity$/i)) {
                    this.areaStyle.fillOpacity = parseFloat(value.nodeValue);
                } else if (value.nodeName.match(/^data$/i)) {
                    this.parseDataAttr(value);
                }
            });

            _.map(elem.childNodes, function (value) {
                var point = this.Point();
                point.parse(value);

                this.data.push(point);
            });
        };

        DataSet.prototype.min = function (axis) {
            return 0.0;
        };

        DataSet.prototype.max = function (axis) {
            return 0.0;
        };

        DataSet.prototype.parseDataAttr = function (value) {
            if (value.nodeValue === undefined || value.nodeValue === null || value.nodeValue.trim() === "") {
                return;
            }

            var parsedData = [];

            try  {
                parsedData = JSON.parse(value.nodeValue);
            } catch (e) {
            }

            _.map(parsedData, function (value) {
                var point = this.Point();
                point.normalize(value);

                this.data.push(point);
            });
        };
        return DataSet;
    })();
    dChart.DataSet = DataSet;

    var DataSet2D = (function (_super) {
        __extends(DataSet2D, _super);
        function DataSet2D() {
            _super.apply(this, arguments);
            this.data = [];
            this.solver = new Solver2D();
        }
        DataSet2D.prototype.Point = function () {
            return new Point2D();
        };

        DataSet2D.prototype.recalculate = function () {
            this.data = this.solver.solve();
        };

        DataSet2D.prototype.min = function (axis) {
            return d3.min(this.data, function (d) {
                return d[axis];
            });
        };

        DataSet2D.prototype.max = function (axis) {
            return d3.max(this.data, function (d) {
                return d[axis];
            });
        };
        return DataSet2D;
    })(DataSet);
    dChart.DataSet2D = DataSet2D;

    var DataSet3D = (function (_super) {
        __extends(DataSet3D, _super);
        function DataSet3D() {
            _super.apply(this, arguments);
            this.data = [];
            this.solver = new Solver3D();
        }
        DataSet3D.prototype.Point = function () {
            return new Point3D();
        };

        DataSet3D.prototype.recalculate = function () {
            this.data = this.solver.solve();
        };

        DataSet3D.prototype.min = function (axis) {
            return d3.min(this.data, function (d) {
                return d[axis];
            });
        };

        DataSet3D.prototype.max = function (axis) {
            return d3.max(this.data, function (d) {
                return d[axis];
            });
        };
        return DataSet3D;
    })(DataSet);
    dChart.DataSet3D = DataSet3D;

    var Chart = (function () {
        function Chart(chartWidth, chartHeight) {
            if (typeof chartWidth === "undefined") { chartWidth = new Size(400); }
            if (typeof chartHeight === "undefined") { chartHeight = new Size(400); }
            this.chartWidth = chartWidth;
            this.chartHeight = chartHeight;
            this.chartMarginLeft = new Size(10);
            this.chartMarginRight = new Size(10);
            this.chartMarginTop = new Size(10);
            this.chartMarginBottom = new Size(10);
        }
        return Chart;
    })();
    dChart.Chart = Chart;

    var Chart2D = (function (_super) {
        __extends(Chart2D, _super);
        function Chart2D() {
            _super.apply(this, arguments);
            this.xAxis = new Axis("x");
            this.yAxis = new Axis("y");
        }
        Chart2D.prototype.drawAxis = function () {
            var min = this.min();
            var max = this.max();

            var width = (new Size(this.chartWidth.value)).sub(this.chartMarginLeft).sub(this.chartMarginRight);
            var height = (new Size(this.chartHeight.value)).sub(this.chartMarginTop).sub(this.chartMarginBottom);

            this.xAxis.draw(width, min[0], max[0]);
            this.yAxis.draw(height, min[1], max[1]);
        };

        Chart2D.prototype.min = function (axis) {
            if (typeof axis === "undefined") { axis = "x"; }
            return d3.min(this.dataSets, function (dataSet) {
                return dataSet.min(axis);
            });
        };

        Chart2D.prototype.max = function (axis) {
            if (typeof axis === "undefined") { axis = "x"; }
            return d3.max(this.dataSets, function (dataSet) {
                return dataSet.max(axis);
            });
        };
        return Chart2D;
    })(Chart);
    dChart.Chart2D = Chart2D;

    var Chart3D = (function (_super) {
        __extends(Chart3D, _super);
        function Chart3D() {
            _super.apply(this, arguments);
            this.chartDepth = new Size(400);
            this.xAxis = new Axis("x");
            this.yAxis = new Axis("y");
            this.zAxis = new Axis("z");
        }
        Chart3D.prototype.drawAxis = function () {
            var min = this.min();
            var max = this.max();

            var width = new Size(this.chartWidth.value).sub(this.chartMarginLeft).sub(this.chartMarginRight);
            var height = new Size(this.chartHeight.value).sub(this.chartMarginTop).sub(this.chartMarginBottom);

            this.xAxis.draw(width, min[0], max[0]);
            this.yAxis.draw(height, min[1], max[1]);
            this.zAxis.draw(this.chartDepth, min[2], max[2]);
        };

        Chart3D.prototype.min = function (axis) {
            if (typeof axis === "undefined") { axis = "x"; }
            return d3.min(this.dataSets, function (dataSet) {
                return dataSet.min(axis);
            });
        };

        Chart3D.prototype.max = function (axis) {
            if (typeof axis === "undefined") { axis = "x"; }
            return d3.max(this.dataSets, function (dataSet) {
                return dataSet.max(axis);
            });
        };
        return Chart3D;
    })(Chart);
    dChart.Chart3D = Chart3D;

    var Color = (function () {
        function Color(value) {
            this.value = value;
        }
        Color.prototype.get = function () {
            return this.value;
        };

        Color.prototype.RGB = function () {
            return d3.rgb(this.value);
        };

        Color.prototype.HSL = function () {
            return d3.hsl(this.value);
        };

        Color.prototype.HCL = function () {
            return d3.hcl(this.value);
        };

        Color.prototype.LAB = function () {
            return d3.lab(this.value);
        };
        return Color;
    })();
    dChart.Color = Color;

    var Size = (function () {
        function Size(value) {
            this.value = value;
        }
        Size.prototype.get = function () {
            return this.value.toString(10) + "px";
        };

        Size.prototype.sub = function (d) {
            this.value -= d.value;
            return this;
        };

        Size.prototype.add = function (d) {
            this.value += d.value;
            return this;
        };

        Size.prototype.mul = function (d) {
            this.value *= d.value;
            return this;
        };

        Size.prototype.div = function (d) {
            this.value /= d.value;
            return this;
        };
        return Size;
    })();
    dChart.Size = Size;

    var LineStyle = (function () {
        function LineStyle() {
        }
        LineStyle.prototype.get = function () {
            return "";
        };
        return LineStyle;
    })();
    dChart.LineStyle = LineStyle;

    var AreaStyle = (function () {
        function AreaStyle() {
        }
        AreaStyle.prototype.get = function () {
            return "";
        };
        return AreaStyle;
    })();
    dChart.AreaStyle = AreaStyle;

    var Solver2D = (function () {
        function Solver2D() {
            this.min = 0;
            this.max = 10;
            this.step = 1;
        }
        Solver2D.prototype.fn = function (x) {
            return x;
        };

        Solver2D.prototype.solve = function (min, max, step) {
            min = min || this.min;
            max = max || this.max;
            step = step || this.step;

            var x;
            var data = [];

            for (x = min; x <= max; x += step) {
                data.push(new Point2D(x, this.fn(x)));
            }

            return data;
        };
        return Solver2D;
    })();
    dChart.Solver2D = Solver2D;

    var Solver3D = (function () {
        function Solver3D() {
            this.min = 0;
            this.max = 10;
            this.step = 1;
        }
        Solver3D.prototype.fn = function (x, y) {
            return x;
        };

        Solver3D.prototype.solve = function (min, max, step) {
            min = min || this.min;
            max = max || this.max;
            step = step || this.step;

            var x;
            var y;
            var data = [];

            for (x = min; x <= max; x += step) {
                data.push(new Point3D(x, y, this.fn(x, y)));
            }

            return data;
        };
        return Solver3D;
    })();
    dChart.Solver3D = Solver3D;
})(dChart || (dChart = {}));
//@ sourceMappingURL=file:////home/ckoerner/workspace/javascript/dchart/src/ts/dchart.js.map