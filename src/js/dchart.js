var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dChart;
(function (dChart) {
    var Point = (function () {
        function Point() {
            this.lineStyle = new dChart.Utils.LineStyle();
            this.areaStyle = new dChart.Utils.AreaStyle();
        }
        Point.prototype.normalize = function (value) {
            if (value.hasOwnProperty("stroke")) {
                this.lineStyle.stroke = new dChart.Utils.Color(value.stroke);
            }

            if (value.hasOwnProperty("strokeWidth")) {
                this.lineStyle.strokeWidth = new dChart.Utils.Size(parseFloat(value.strokeWidth));
            }

            if (value.hasOwnProperty("strokeOpacity")) {
                this.lineStyle.strokeOpacity = parseFloat(value.strokeOpacity);
            }

            if (value.hasOwnProperty("fill")) {
                this.areaStyle.fill = new dChart.Utils.Color(value.fill);
            }

            if (value.hasOwnProperty("fillOpacity")) {
                this.areaStyle.fillOpacity = parseFloat(value.fillOpacity);
            }
        };

        Point.prototype.map = function (value, map) {
            if (value.hasOwnProperty(map.stroke)) {
                this.lineStyle.stroke = new dChart.Utils.Color(value[map.stroke]);
            }

            if (value.hasOwnProperty(map.strokeWidth)) {
                this.lineStyle.strokeWidth = new dChart.Utils.Size(parseFloat(value[map.strokeWidth]));
            }

            if (value.hasOwnProperty(map.strokeOpacity)) {
                this.lineStyle.strokeOpacity = parseFloat(value[map.strokeOpacity]);
            }

            if (value.hasOwnProperty(map.fill)) {
                this.areaStyle.fill = new dChart.Utils.Color(value[map.fill]);
            }

            if (value.hasOwnProperty(map.fillOpacity)) {
                this.areaStyle.fillOpacity = parseFloat(value[map.fillOpacity]);
            }
        };

        Point.prototype.parse = function (elem) {
            var _this = this;
            _.map(elem.attributes, function (value) {
                if (value.nodeName.match(/^stroke$/i)) {
                    _this.lineStyle.stroke = dChart.Utils.Elem.getColor(value);
                    return;
                } else if (value.nodeName.match(/^stroke-width$/i)) {
                    _this.lineStyle.strokeWidth = dChart.Utils.Elem.getSize(value);
                    return;
                } else if (value.nodeName.match(/^stroke-opacity$/i)) {
                    _this.lineStyle.strokeOpacity = dChart.Utils.Elem.getFloat(value);
                    return;
                } else if (value.nodeName.match(/^fill$/i)) {
                    _this.areaStyle.fill = dChart.Utils.Elem.getColor(value);
                    return;
                } else if (value.nodeName.match(/^fill-opacity$/i)) {
                    _this.areaStyle.fillOpacity = dChart.Utils.Elem.getFloat(value);
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
            _super.prototype.normalize.call(this, value);

            if (value.hasOwnProperty("x")) {
                this.x = parseFloat(value.x);
            } else if (value.hasOwnProperty("y")) {
                this.x = parseFloat(value.y);
            } else if (value.hasOwnProperty("val")) {
                this.x = parseFloat(value.val);
            }
            if (value.hasOwnProperty("value")) {
                this.x = parseFloat(value.value);
            }
        };

        Point1D.prototype.map = function (value, map) {
            _super.prototype.map.call(this, value, map);

            if (value.hasOwnProperty(map.x)) {
                this.x = parseFloat(value[map.x]);
            }
        };

        Point1D.prototype.parse = function (elem) {
            var _this = this;
            _super.prototype.parse.call(this, elem);

            _.map(elem.attributes, function (value) {
                if (value.nodeName.match(/^x$/i)) {
                    _this.x = dChart.Utils.Elem.getFloat(value);
                    return;
                } else if (value.nodeName.match(/^y|val|value$/i)) {
                    _this.x = dChart.Utils.Elem.getFloat(value);
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
        Point2D.prototype.normalize = function (value) {
            _super.prototype.normalize.call(this, value);

            if (value.hasOwnProperty("x")) {
                this.x = parseFloat(value.x);
            }

            if (value.hasOwnProperty("y")) {
                this.y = parseFloat(value.y);
            } else if (value.hasOwnProperty("val")) {
                this.y = parseFloat(value.val);
            }
            if (value.hasOwnProperty("value")) {
                this.y = parseFloat(value.value);
            }
        };

        Point2D.prototype.map = function (value, map) {
            _super.prototype.map.call(this, value, map);

            if (value.hasOwnProperty(map.x)) {
                this.x = parseFloat(value[map.x]);
            }

            if (value.hasOwnProperty(map.y)) {
                this.y = parseFloat(value[map.y]);
            }
        };

        Point2D.prototype.parse = function (elem) {
            var _this = this;
            _super.prototype.parse.call(this, elem);

            _.map(elem.attributes, function (value) {
                if (value.nodeName.match(/^x$/i)) {
                    _this.x = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^y|val|value$/i)) {
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
        function Point2DTime(t, y) {
            _super.call(this);
            this.t = t;
            this.y = y;
        }
        Point2DTime.prototype.normalize = function (value) {
            _super.prototype.normalize.call(this, value);

            if (value.hasOwnProperty("x")) {
                this.t = new Date(value.x);
            } else if (value.hasOwnProperty("t")) {
                this.t = new Date(value.t);
            } else if (value.hasOwnProperty("time")) {
                this.t = new Date(value.time);
            } else if (value.hasOwnProperty("date")) {
                this.t = new Date(value.date);
            }

            if (value.hasOwnProperty("y")) {
                this.y = parseFloat(value.y);
            } else if (value.hasOwnProperty("val")) {
                this.y = parseFloat(value.val);
            }
            if (value.hasOwnProperty("value")) {
                this.y = parseFloat(value.value);
            }
        };

        Point2DTime.prototype.map = function (value, map) {
            _super.prototype.map.call(this, value, map);

            if (value.hasOwnProperty(map.t)) {
                this.t = new Date(value[map.t]);
            }

            if (value.hasOwnProperty(map.y)) {
                this.y = parseFloat(value[map.y]);
            }
        };

        Point2DTime.prototype.parse = function (elem) {
            var _this = this;
            _super.prototype.parse.call(this, elem);

            _.map(elem.attributes, function (value) {
                if (value.nodeName.match(/^x|t|time|date$/i)) {
                    _this.t = dChart.Utils.Elem.getDate(value);
                    return;
                } else if (value.nodeName.match(/^y|val|value$/i)) {
                    _this.y = dChart.Utils.Elem.getFloat(value);
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
        Point3D.prototype.normalize = function (value) {
            _super.prototype.normalize.call(this, value);

            if (value.hasOwnProperty("x")) {
                this.x = parseFloat(value.x);
            }

            if (value.hasOwnProperty("y")) {
                this.y = parseFloat(value.y);
            }

            if (value.hasOwnProperty("z")) {
                this.z = parseFloat(value.z);
            }
        };

        Point3D.prototype.map = function (value, map) {
            _super.prototype.map.call(this, value, map);

            if (value.hasOwnProperty(map.x)) {
                this.x = parseFloat(value[map.x]);
            }

            if (value.hasOwnProperty(map.y)) {
                this.y = parseFloat(value[map.y]);
            }

            if (value.hasOwnProperty(map.z)) {
                this.z = parseFloat(value[map.z]);
            }
        };

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
        function Point3DTime(t, y, z) {
            _super.call(this);
            this.t = t;
            this.y = y;
            this.z = z;
        }
        Point3DTime.prototype.normalize = function (value) {
            _super.prototype.normalize.call(this, value);

            if (value.hasOwnProperty("x")) {
                this.t = new Date(value.x);
            } else if (value.hasOwnProperty("t")) {
                this.t = new Date(value.t);
            } else if (value.hasOwnProperty("time")) {
                this.t = new Date(value.time);
            } else if (value.hasOwnProperty("date")) {
                this.t = new Date(value.date);
            }

            if (value.hasOwnProperty("y")) {
                this.y = parseFloat(value.y);
            }

            if (value.hasOwnProperty("z")) {
                this.z = parseFloat(value.z);
            }
        };

        Point3DTime.prototype.map = function (value, map) {
            _super.prototype.map.call(this, value, map);

            if (value.hasOwnProperty(map.t)) {
                this.t = new Date(value[map.t]);
            }

            if (value.hasOwnProperty(map.y)) {
                this.y = parseFloat(value[map.y]);
            }

            if (value.hasOwnProperty(map.z)) {
                this.z = parseFloat(value[map.z]);
            }
        };

        Point3DTime.prototype.parse = function (elem) {
            var _this = this;
            _super.prototype.parse.call(this, elem);

            _.map(elem.attributes, function (value) {
                if (value.nodeName.match(/^x|t|time|date$/i)) {
                    _this.t = new Date(value.nodeValue);
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
        return Point3DTime;
    })(Point);
    dChart.Point3DTime = Point3DTime;
})(dChart || (dChart = {}));
var dChart;
(function (dChart) {
    (function (Utils) {
        var Doc = (function () {
            function Doc() {
            }
            Doc.css = function (code) {
                var style = document.createElement('style');

                style.type = 'text/css';

                if (style.styleSheet) {
                    style.styleSheet.cssText = code;
                } else {
                    style.innerHTML = code;
                }

                document.body.appendChild(style);
            };
            return Doc;
        })();
        Utils.Doc = Doc;

        var Elem = (function () {
            function Elem() {
            }
            Elem.getFloat = function (value) {
                return parseFloat(value.nodeValue);
            };

            Elem.getSize = function (value) {
                return new Size(parseFloat(value.nodeValue));
            };

            Elem.getColor = function (value) {
                return new Color(value.nodeValue);
            };

            Elem.getDate = function (value) {
                return new Date(value.nodeValue);
            };
            return Elem;
        })();
        Utils.Elem = Elem;

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
        Utils.Color = Color;

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
        Utils.Size = Size;

        var LineStyle = (function () {
            function LineStyle() {
            }
            LineStyle.prototype.get = function () {
                return "";
            };
            return LineStyle;
        })();
        Utils.LineStyle = LineStyle;

        var AreaStyle = (function () {
            function AreaStyle() {
            }
            AreaStyle.prototype.get = function () {
                return "";
            };
            return AreaStyle;
        })();
        Utils.AreaStyle = AreaStyle;
    })(dChart.Utils || (dChart.Utils = {}));
    var Utils = dChart.Utils;
})(dChart || (dChart = {}));
var dChart;
(function (dChart) {
    var Axis = (function () {
        function Axis(orientation, length) {
            this.range = [0, 1];
            this.domain = [0, 1];
            this.autorange = true;
            this.scale = d3.scale.linear();
            this.length = new dChart.Utils.Size(1);
            this.orientation = "x";
            this.align = "start";
            this.labelAlign = "end";
            this.ticks = 10;
            this.tickSubdivide = false;
            this.tickSize = {
                major: 1,
                minor: 0,
                end: 0
            };
            this.visible = true;
            if (orientation) {
                this.setOrientation(orientation);
            }

            if (length) {
                this.length = new dChart.Utils.Size(length);
            }
        }
        Axis.prototype.setScale = function (scale) {
            if (typeof scale === "undefined") { scale = "linear"; }
            this.scale = (scale.match(/^identity$/i)) ? d3.scale.identity() : (scale.match(/^pow|power$/i)) ? d3.scale.pow() : (scale.match(/^sqrt$/)) ? d3.scale.sqrt() : (scale.match(/^log$/)) ? d3.scale.log() : (scale.match(/^quantize/)) ? d3.scale.quantize() : (scale.match(/^quantile$/)) ? d3.scale.quantile() : (scale.match(/^treshold$/)) ? d3.scale.treshold() : d3.scale.linear();

            this.scale.domain(this.domain).range(this.range);

            return this;
        };

        Axis.prototype.addScaleFn = function (fn, args) {
            if (this.scale[fn] && typeof this.scale[fn] === "function") {
                this.scale[fn](args);
            }
        };

        Axis.prototype.setOrientation = function (orientation) {
            if (typeof orientation === "undefined") { orientation = "x"; }
            this.orientation = (orientation.match(/^y|v|vertical$/i)) ? "y" : (orientation.match(/^z$/i)) ? "z" : "x";

            return this;
        };

        Axis.prototype.setDomain = function (domain) {
            if (typeof domain === "undefined") { domain = [0, 1]; }
            this.domain = domain;

            return this;
        };

        Axis.prototype.setRange = function (range) {
            if (typeof range === "undefined") { range = [0, this.length.value]; }
            this.range = range;

            return this;
        };

        Axis.prototype.setLabelAlign = function (labelAlign) {
            this.labelAlign = (labelAlign.match(/^top|left|start$/i)) ? "start" : (labelAlign.match(/^bottom|right|end$/i)) ? "end" : "center";

            return this;
        };

        Axis.prototype.getAxis = function () {
            return d3.svg.axis().scale(this.scale).orient(this.labelAlign).ticks(this.ticks);
        };

        Axis.prototype.clear = function () {
            if (this.svg) {
                this.svg.remove();
            }
        };

        Axis.prototype.draw = function (container, min, max) {
            this.clear();

            this.svg = container.append("g").attr("class", "dchart-axis, dchart-axis-" + this.orientation);

            this.redraw(min, max);
        };

        Axis.prototype.redraw = function (min, max) {
            if (this.autorange === true) {
                this.range = [min, max];
            }

            var pos = this.align === "center" ? this.length.value * 0.5 : this.align === "start" ? 0 : this.length.value;

            var labelOrient = this.align === "start" ? "top" : "bottom";

            var labelPos = this.labelAlign === "start" ? 0 : this.labelAlign === "center" ? this.length.value * 0.5 : this.length.value;

            this.svg.call(this.getAxis());
        };

        Axis.prototype.normalize = function (value) {
            if (value.hasOwnProperty("label")) {
                this.label = value.label;
            }

            if (value.hasOwnProperty("labelAlign")) {
                this.setLabelAlign(value.labelAlign);
            }

            if (value.hasOwnProperty("autorange")) {
                this.autorange = value.autorange;
            }

            if (value.hasOwnProperty("ticks")) {
                this.ticks = parseInt(value.ticks, 10);
            }

            if (value.hasOwnProperty("scale")) {
                this.setScale(value.scale);
            }

            if (value.hasOwnProperty("range")) {
                this.setRange(value.range);
            }

            if (value.hasOwnProperty("domain")) {
                this.setDomain(value.domain);
            }
        };
        return Axis;
    })();
    dChart.Axis = Axis;
})(dChart || (dChart = {}));
var dChart;
(function (dChart) {
    (function (Solver) {
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
                    data.push(new dChart.Point2D(x, this.fn(x)));
                }

                return data;
            };
            return Solver2D;
        })();
        Solver.Solver2D = Solver2D;

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
                    data.push(new dChart.Point3D(x, y, this.fn(x, y)));
                }

                return data;
            };
            return Solver3D;
        })();
        Solver.Solver3D = Solver3D;
    })(dChart.Solver || (dChart.Solver = {}));
    var Solver = dChart.Solver;
})(dChart || (dChart = {}));
var dChart;
(function (dChart) {
    var DataSet = (function () {
        function DataSet(config) {
            this.data = [];
            this.label = "";
            this.interpolate = "linear";
            this.visible = true;
            this.lineStyle = new dChart.Utils.LineStyle();
            this.areaStyle = new dChart.Utils.AreaStyle();
            if (config) {
                this.normalize(config);
            }
        }
        DataSet.prototype.recalculate = function () {
        };

        DataSet.prototype.parse = function (elem) {
            var _this = this;
            _.map(elem.attributes, function (value) {
                if (value.nodeName.match(/^label$/i)) {
                    _this.label = value.nodeValue;
                    return;
                } else if (value.nodeName.match(/^interpolate$/i)) {
                    _this.interpolate = value.nodeValue;
                    return;
                } else if (value.nodeName.match(/^stroke$/i)) {
                    _this.lineStyle.stroke = new dChart.Utils.Color(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^stroke-width$/i)) {
                    _this.lineStyle.strokeWidth = new dChart.Utils.Size(parseFloat(value.nodeValue));
                    return;
                } else if (value.nodeName.match(/^stroke-opacity$/i)) {
                    _this.lineStyle.strokeOpacity = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^fill$/i)) {
                    _this.areaStyle.fill = new dChart.Utils.Color(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^fill-opacity$/i)) {
                    _this.areaStyle.fillOpacity = parseFloat(value.nodeValue);
                    return;
                }
            });
        };

        DataSet.prototype.normalize = function (value) {
            if (value.hasOwnProperty("stroke")) {
                this.lineStyle.stroke = new dChart.Utils.Color(value.stroke);
            }

            if (value.hasOwnProperty("strokeWidth")) {
                this.lineStyle.strokeWidth = new dChart.Utils.Size(parseFloat(value.strokeWidth));
            }

            if (value.hasOwnProperty("strokeOpacity")) {
                this.lineStyle.strokeOpacity = parseFloat(value.strokeOpacity);
            }

            if (value.hasOwnProperty("fill")) {
                this.areaStyle.fill = new dChart.Utils.Color(value.fill);
            }

            if (value.hasOwnProperty("fillOpacity")) {
                this.areaStyle.fillOpacity = parseFloat(value.fillOpacity);
            }
        };

        DataSet.prototype.min = function (axis) {
            return 0.0;
        };

        DataSet.prototype.max = function (axis) {
            return 0.0;
        };
        return DataSet;
    })();
    dChart.DataSet = DataSet;

    var DataSet2D = (function (_super) {
        __extends(DataSet2D, _super);
        function DataSet2D() {
            _super.apply(this, arguments);
            this.data = [];
            this.solver = new dChart.Solver.Solver2D();
        }
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

        DataSet2D.prototype.normalize = function (value) {
            var _this = this;
            _super.prototype.normalize.call(this, value);

            if (value.hasOwnProperty("data")) {
                _.map(value.data, function (config) {
                    var p = new dChart.Point2D();
                    p.normalize(config);
                    _this.data.push(p);
                });
            }

            if (value.hasOwnProperty("dataFn")) {
            }
        };
        return DataSet2D;
    })(DataSet);
    dChart.DataSet2D = DataSet2D;

    var DataSet3D = (function (_super) {
        __extends(DataSet3D, _super);
        function DataSet3D() {
            _super.apply(this, arguments);
            this.data = [];
            this.solver = new dChart.Solver.Solver3D();
        }
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

        DataSet3D.prototype.normalize = function (value) {
            var _this = this;
            _super.prototype.normalize.call(this, value);

            if (value.hasOwnProperty("data")) {
                _.map(value.data, function (config) {
                    var p = new dChart.Point3D();
                    p.normalize(config);
                    _this.data.push(p);
                });
            }

            if (value.hasOwnProperty("dataFn")) {
            }
        };
        return DataSet3D;
    })(DataSet);
    dChart.DataSet3D = DataSet3D;
})(dChart || (dChart = {}));
"use strict";
var dChart;
(function (dChart) {
    var Chart = (function () {
        function Chart(config) {
            this.marginLeft = new dChart.Utils.Size(10);
            this.marginRight = new dChart.Utils.Size(10);
            this.marginTop = new dChart.Utils.Size(10);
            this.marginBottom = new dChart.Utils.Size(10);
            this.width = new dChart.Utils.Size(400);
            this.height = new dChart.Utils.Size(400);
            var css = '.dchart-axis path,' + '.dchart-axis line {' + '         fill: none;' + '         stroke: black;' + '         shape-rendering: crispEdges;' + '     }' + ' .dchart-axis text,' + ' .dchart-axis-label text {' + '         font-family: sans-serif;' + '         font-size: 11px;' + '     }';

            dChart.Utils.Doc.css(css);
        }
        Chart.prototype.clear = function () {
            if (this.svg) {
                this.svg.remove();
            }
        };

        Chart.prototype.redraw = function () {
            this.drawAxis();
            this.drawData();
        };

        Chart.prototype.draw = function () {
            this.clear();

            this.svg = d3.select(this.elem).append("svg").attr("width", this.width.value).attr("height", this.height.value).attr("id", "dchart-" + this.elemId);

            this.container = this.svg.append("g").attr("class", "dchart-container").attr("transform", "translate(" + this.marginLeft.value + ", " + this.marginTop.value + ")");

            this.axisContainer = this.container.append("g").attr("class", "dchart-container-axis");

            this.dataContainer = this.container.append("g").attr("class", "dchart-container-data");

            this.labelContainer = this.container.append("g").attr("class", "dchart-container-label");

            this.descriptionContainer = this.container.append("g").attr("class", "dchart-container-description");

            this.redraw();
        };

        Chart.prototype.drawAxis = function () {
        };

        Chart.prototype.drawData = function () {
        };

        Chart.prototype.normalize = function (value) {
            if (value.hasOwnProperty("elem")) {
                this.elemId = value.elem;
                this.elem = document.getElementById(value.elem);
            }

            if (value.hasOwnProperty("label")) {
                this.label = value.label;
            }

            if (value.hasOwnProperty("description")) {
                this.description = value.description;
            }

            if (value.hasOwnProperty("width")) {
                this.width = new dChart.Utils.Size(parseFloat(value.width));
            }

            if (value.hasOwnProperty("height")) {
                this.height = new dChart.Utils.Size(parseFloat(value.height));
            }

            if (value.hasOwnProperty("marginTop")) {
                this.marginTop = new dChart.Utils.Size(parseFloat(value.marginTop));
            }

            if (value.hasOwnProperty("marginLeft")) {
                this.marginLeft = new dChart.Utils.Size(parseFloat(value.marginLeft));
            }

            if (value.hasOwnProperty("marginBottom")) {
                this.marginBottom = new dChart.Utils.Size(parseFloat(value.marginBottom));
            }

            if (value.hasOwnProperty("marginRight")) {
                this.marginRight = new dChart.Utils.Size(parseFloat(value.marginRight));
            }
        };
        return Chart;
    })();
    dChart.Chart = Chart;

    var Chart2D = (function (_super) {
        __extends(Chart2D, _super);
        function Chart2D(config) {
            _super.call(this, config);
            this.dataSets = [];
            this.xAxis = new dChart.Axis("x");
            this.yAxis = new dChart.Axis("y");

            var width = (new dChart.Utils.Size(this.width.value)).sub(this.marginLeft).sub(this.marginRight);
            var height = (new dChart.Utils.Size(this.height.value)).sub(this.marginTop).sub(this.marginBottom);

            this.xAxis.length = width;
            this.yAxis.length = height;
        }
        Chart2D.prototype.drawAxis = function () {
            _super.prototype.drawAxis.call(this);

            var min = [this.min("x"), this.min("y")];
            var max = [this.max("x"), this.max("y")];

            this.xAxis.draw(this.axisContainer, min[0], max[0]);
            this.yAxis.draw(this.axisContainer, min[1], max[1]);
        };

        Chart2D.prototype.drawData = function () {
            _super.prototype.drawData.call(this);
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

        Chart2D.prototype.normalize = function (value) {
            var _this = this;
            _super.prototype.normalize.call(this, value);

            if (value.hasOwnProperty("dataSets")) {
                this.dataSets = [];

                _.map(value.dataSets, function (config) {
                    _this.dataSets.push(new dChart.DataSet2D(config));
                });
            }

            if (value.hasOwnProperty("axis")) {
                var axis = value.axis;

                if (axis.hasOwnProperty("x")) {
                    this.xAxis.normalize(axis.x);
                }

                if (axis.hasOwnProperty("y")) {
                    this.yAxis.normalize(axis.y);
                }
            }
        };
        return Chart2D;
    })(Chart);
    dChart.Chart2D = Chart2D;

    var Chart3D = (function (_super) {
        __extends(Chart3D, _super);
        function Chart3D(config) {
            _super.call(this, config);
            this.dataSets = [];
            this.depth = new dChart.Utils.Size(400);
            this.xAxis = new dChart.Axis("x");
            this.yAxis = new dChart.Axis("y");
            this.zAxis = new dChart.Axis("z");

            var width = new dChart.Utils.Size(this.width.value).sub(this.marginLeft).sub(this.marginRight);
            var height = new dChart.Utils.Size(this.height.value).sub(this.marginTop).sub(this.marginBottom);

            this.xAxis.length = width;
            this.yAxis.length = height;
            this.zAxis.length = this.depth;
        }
        Chart3D.prototype.drawAxis = function () {
            _super.prototype.drawAxis.call(this);

            var min = [this.min("x"), this.min("y"), this.min("z")];
            var max = [this.max("x"), this.max("y"), this.min("z")];

            this.xAxis.draw(this.axisContainer, min[0], max[0]);
            this.yAxis.draw(this.axisContainer, min[1], max[1]);
            this.zAxis.draw(this.axisContainer, min[2], max[2]);
        };

        Chart3D.prototype.drawData = function () {
            _super.prototype.drawData.call(this);
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

        Chart3D.prototype.normalize = function (value) {
            var _this = this;
            _super.prototype.normalize.call(this, value);

            if (value.hasOwnProperty("dataSets")) {
                this.dataSets = [];

                _.map(value.dataSets, function (config) {
                    _this.dataSets.push(new dChart.DataSet3D(config));
                });
            }

            if (value.hasOwnProperty("axis")) {
                var axis = value.axis;

                if (axis.hasOwnProperty("x")) {
                    this.xAxis.normalize(axis.x);
                }

                if (axis.hasOwnProperty("y")) {
                    this.yAxis.normalize(axis.y);
                }

                if (axis.hasOwnProperty("z")) {
                    this.zAxis.normalize(axis.z);
                }
            }
        };
        return Chart3D;
    })(Chart);
    dChart.Chart3D = Chart3D;

    var LineChart = (function (_super) {
        __extends(LineChart, _super);
        function LineChart(config) {
            _super.call(this, config);

            if (config) {
                this.normalize(config);
                this.draw();
            }

            console.log(this);
        }
        return LineChart;
    })(Chart2D);
    dChart.LineChart = LineChart;
})(dChart || (dChart = {}));
