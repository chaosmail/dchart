/** dchart - v0.0.4 - Mon Aug 05 2013 16:01:27
 *  (c) 2013 Christoph Körner, office@chaosmail.at, http://chaosmail.at
 *  License: MIT
 */
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
            if (value.hasOwnProperty("lineStyle")) {
                var lineStyle = new dChart.Utils.LineStyle();
                lineStyle.normalize(value.lineStyle);
                this.lineStyle = lineStyle;
            }

            if (value.hasOwnProperty("areaStyle")) {
                var areaStyle = new dChart.Utils.AreaStyle();
                areaStyle.normalize(value.areaStyle);
                this.areaStyle = areaStyle;
            }
        };

        Point.prototype.map = function (value, map) {
            if (value.hasOwnProperty(map.stroke)) {
                this.areaStyle.stroke = value[map.stroke];
            }

            if (value.hasOwnProperty(map.strokeWidth)) {
                this.areaStyle.strokeWidth = parseFloat(value[map.strokeWidth]);
            }

            if (value.hasOwnProperty(map.strokeOpacity)) {
                this.areaStyle.strokeOpacity = parseFloat(value[map.strokeOpacity]);
            }

            if (value.hasOwnProperty(map.fill)) {
                this.areaStyle.fill = value[map.fill];
            }

            if (value.hasOwnProperty(map.fillOpacity)) {
                this.areaStyle.fillOpacity = parseFloat(value[map.fillOpacity]);
            }
        };

        Point.prototype.parse = function (elem) {
            var _this = this;
            _.map(elem.attributes, function (value) {
                if (value.nodeName.match(/^stroke$/i)) {
                    _this.areaStyle.stroke = dChart.Utils.Elem.getColor(value);
                    return;
                } else if (value.nodeName.match(/^stroke-width$/i)) {
                    _this.areaStyle.strokeWidth = dChart.Utils.Elem.getFloat(value);
                    return;
                } else if (value.nodeName.match(/^stroke-opacity$/i)) {
                    _this.areaStyle.strokeOpacity = dChart.Utils.Elem.getFloat(value);
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
        var LineStyle = (function () {
            function LineStyle() {
                this.stroke = "red";
                this.strokeWidth = 1;
                this.strokeOpacity = 1;
                this.strokeLinecap = "butt";
                this.strokeDasharray = "0";
            }
            LineStyle.prototype.normalize = function (value) {
                if (value.hasOwnProperty("stroke")) {
                    this.stroke = value.stroke;
                }

                if (value.hasOwnProperty("strokeWidth")) {
                    this.strokeWidth = parseFloat(value.strokeWidth);
                }

                if (value.hasOwnProperty("strokeOpacity")) {
                    this.strokeOpacity = parseFloat(value.strokeOpacity);
                }

                if (value.hasOwnProperty("strokeLinecap")) {
                    this.strokeLinecap = value.strokeLinecap;
                }

                if (value.hasOwnProperty("strokeDasharray")) {
                    this.strokeDasharray = value.strokeDasharray;
                }
            };
            return LineStyle;
        })();
        Utils.LineStyle = LineStyle;

        var AreaStyle = (function (_super) {
            __extends(AreaStyle, _super);
            function AreaStyle() {
                _super.apply(this, arguments);
                this.fill = "blue";
                this.fillOpacity = 1;
            }
            AreaStyle.prototype.normalize = function (value) {
                _super.prototype.normalize.call(this, value);

                if (value.hasOwnProperty("fill")) {
                    this.fill = value.fill;
                }

                if (value.hasOwnProperty("fillOpacity")) {
                    this.fillOpacity = parseFloat(value.fillOpacity);
                }
            };
            return AreaStyle;
        })(LineStyle);
        Utils.AreaStyle = AreaStyle;

        var SymbolStyle = (function (_super) {
            __extends(SymbolStyle, _super);
            function SymbolStyle() {
                _super.apply(this, arguments);
                this.type = "circle";
                this.size = 1;
            }
            SymbolStyle.prototype.normalize = function (value) {
                _super.prototype.normalize.call(this, value);

                if (value.hasOwnProperty("type")) {
                    this.type = value.type;
                }

                if (value.hasOwnProperty("size")) {
                    this.size = parseFloat(value.size);
                }
            };
            return SymbolStyle;
        })(AreaStyle);
        Utils.SymbolStyle = SymbolStyle;

        var FontStyle = (function (_super) {
            __extends(FontStyle, _super);
            function FontStyle() {
                _super.apply(this, arguments);
                this.fontFamily = "sans-serif";
                this.fontSize = 11;
                this.fontWeight = "normal";
            }
            FontStyle.prototype.normalize = function (value) {
                _super.prototype.normalize.call(this, value);

                if (value.hasOwnProperty("fontFamily")) {
                    this.fontFamily = value.fontFamily;
                }

                if (value.hasOwnProperty("fontWeight")) {
                    this.fontWeight = value.fontWeight;
                }

                if (value.hasOwnProperty("fontSize")) {
                    this.fontSize = parseFloat(value.fontSize);
                }
            };
            return FontStyle;
        })(AreaStyle);
        Utils.FontStyle = FontStyle;
    })(dChart.Utils || (dChart.Utils = {}));
    var Utils = dChart.Utils;
})(dChart || (dChart = {}));
var dChart;
(function (dChart) {
    var Axis = (function () {
        function Axis() {
            this.gridStyle = new dChart.Utils.LineStyle();
            this.labelOffset = 34;
            this.range = [0, 1];
            this.domain = [0, 1];
            this.autorange = true;
            this.showGrid = false;
            this.scale = "linear";
            this.length = 1;
            this.height = 1;
            this.orientation = "x";
            this.align = "start";
            this.labelAlign = "end";
            this.ticks = 10;
            this.tickSubdivide = false;
            this.visible = true;
            this.gridStyle.stroke = "black";
            this.gridStyle.strokeWidth = 1;
            this.gridStyle.strokeOpacity = 0.25;
        }
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
            this.domain = domain;

            return this;
        };

        Axis.prototype.setRange = function (range) {
            this.range = range;

            return this;
        };

        Axis.prototype.setAlign = function (align) {
            this.align = (align.match(/^top|left|start$/i)) ? "start" : (align.match(/^bottom|right|end$/i)) ? "end" : "middle";

            return this;
        };

        Axis.prototype.setLabelAlign = function (labelAlign) {
            this.labelAlign = (labelAlign.match(/^top|left|start$/i)) ? "start" : (labelAlign.match(/^bottom|right|end$/i)) ? "end" : "middle";

            return this;
        };

        Axis.prototype.getScale = function () {
            var d3Scale = (this.scale.match(/^identity$/i)) ? d3.scale.identity() : (this.scale.match(/^pow|power$/i)) ? d3.scale.pow() : (this.scale.match(/^sqrt$/)) ? d3.scale.sqrt() : (this.scale.match(/^log$/)) ? d3.scale.log() : (this.scale.match(/^quantize/)) ? d3.scale.quantize() : (this.scale.match(/^quantile$/)) ? d3.scale.quantile() : (this.scale.match(/^treshold$/)) ? d3.scale.treshold() : d3.scale.linear();

            d3Scale.domain(this.domain).range(this.range);

            return d3Scale;
        };

        Axis.prototype.getAxis = function () {
            var orient = "top";

            if (this.orientation === "x") {
                orient = this.align === "start" ? "top" : "bottom";
            }

            if (this.orientation === "y") {
                orient = this.align === "end" ? "right" : "left";
            }

            var axis = d3.svg.axis().scale(this.getScale()).orient(orient).ticks(this.ticks);

            if (this.showGrid) {
                axis.tickSize(-this.height, 0, 3);
            }

            return axis;
        };

        Axis.prototype.clear = function () {
            if (this.svg) {
                this.svg.remove();
            }
        };

        Axis.prototype.draw = function (container, min, max) {
            this.clear();

            this.svg = container.append("g").attr("class", "dchart-axis dchart-axis-" + this.orientation);

            this.svgLabel = container.append("g").attr("class", "dchart-axis-label dchart-axis-" + this.orientation + "-label").append("text");

            this.redraw(min, max);
        };

        Axis.prototype.redraw = function (min, max) {
            if (typeof min === "undefined") { min = 0; }
            if (typeof max === "undefined") { max = 1; }
            var _this = this;
            if (this.autorange === true) {
                this.setDomain([min, max]);
            }

            this.svg.call(this.getAxis());

            this.svg.selectAll(".tick line").style("fill", "none").style("stroke", function (d, i) {
                return i > 0 ? _this.gridStyle.stroke : "black";
            }).style("stroke-width", function (d, i) {
                return i > 0 ? _this.gridStyle.strokeWidth : 1;
            }).style("stroke-opacity", function (d, i) {
                return i > 0 ? _this.gridStyle.strokeOpacity : 1;
            }).style("stroke-linecap", function (d, i) {
                return i > 0 ? _this.gridStyle.strokeLinecap : "butt";
            }).style("stroke-dasharray", function (d, i) {
                return i > 0 ? _this.gridStyle.strokeDasharray : "0";
            });

            this.svgLabel.text(this.label);

            this.svg.selectAll("path").style("stroke", this.gridStyle.stroke).style("shape-rendering", "crispEdges").style("fill", "none");
            this.svg.selectAll("line").style("stroke", this.gridStyle.stroke).style("shape-rendering", "crispEdges").style("fill", "none");
        };

        Axis.prototype.normalize = function (value) {
            if (value.hasOwnProperty("label")) {
                this.label = value.label;
            }

            if (value.hasOwnProperty("align")) {
                this.setAlign(value.align);
            }

            if (value.hasOwnProperty("labelAlign")) {
                this.setLabelAlign(value.labelAlign);
            }

            if (value.hasOwnProperty("labelOffset")) {
                this.labelOffset = parseInt(value.labelOffset, 10);
            }

            if (value.hasOwnProperty("autorange")) {
                this.autorange = value.autorange;
            }

            if (value.hasOwnProperty("gridStyle")) {
                var lineStyle = new dChart.Utils.LineStyle();
                lineStyle.normalize(value.gridStyle);
                this.gridStyle = lineStyle;

                this.showGrid = true;
            }

            if (value.hasOwnProperty("ticks")) {
                this.ticks = parseInt(value.ticks, 10);
            }

            if (value.hasOwnProperty("scale")) {
                this.scale = value.scale;
            }

            if (value.hasOwnProperty("range")) {
                this.setDomain(value.range);
                this.autorange = false;
            }
        };
        return Axis;
    })();
    dChart.Axis = Axis;

    var xAxis = (function (_super) {
        __extends(xAxis, _super);
        function xAxis() {
            _super.call(this);
            this.orientation = "x";

            this.setAlign("bottom");
            this.setLabelAlign("right");
        }
        xAxis.prototype.redraw = function (min, max) {
            if (typeof min === "undefined") { min = 0; }
            if (typeof max === "undefined") { max = 1; }
            var pos = this.align === "middle" ? this.height * 0.5 : this.align === "start" ? 0 : this.height;

            var labelPos = this.labelAlign === "middle" ? this.length * 0.5 : this.labelAlign === "start" ? 0 : this.length;

            this.svg.attr("transform", "translate(0," + pos + ")");

            this.svgLabel.attr("x", labelPos).attr("y", this.height + this.labelOffset).attr("text-anchor", this.labelAlign);

            this.setRange([0, this.length]);

            _super.prototype.redraw.call(this, min, max);
        };
        return xAxis;
    })(Axis);
    dChart.xAxis = xAxis;

    var yAxis = (function (_super) {
        __extends(yAxis, _super);
        function yAxis() {
            _super.call(this);
            this.orientation = "y";

            this.setAlign("left");
            this.setLabelAlign("top");
        }
        yAxis.prototype.redraw = function (min, max) {
            if (typeof min === "undefined") { min = 0; }
            if (typeof max === "undefined") { max = 1; }
            var pos = this.align === "middle" ? this.height * 0.5 : this.align === "start" ? 0 : this.height;

            var labelPos = this.labelAlign === "middle" ? this.length * 0.5 : this.labelAlign === "start" ? 0 : this.length;

            var labelAlign = this.labelAlign === "start" ? "end" : this.labelAlign === "end" ? "start" : "middle";

            this.svg.attr("transform", "translate(" + pos + ",0)");

            this.svgLabel.attr("x", -labelPos).attr("y", -this.labelOffset).attr("transform", "rotate(-90)").attr("text-anchor", labelAlign);

            this.setRange([this.length, 0]);

            _super.prototype.redraw.call(this, min, max);
        };
        return yAxis;
    })(Axis);
    dChart.yAxis = yAxis;

    var zAxis = (function (_super) {
        __extends(zAxis, _super);
        function zAxis() {
            _super.apply(this, arguments);
            this.orientation = "z";
        }
        return zAxis;
    })(Axis);
    dChart.zAxis = zAxis;
})(dChart || (dChart = {}));
var dChart;
(function (dChart) {
    (function (Utils) {
        var Elem = (function () {
            function Elem() {
            }
            Elem.getFloat = function (value) {
                return parseFloat(value.nodeValue);
            };

            Elem.getColor = function (value) {
                return value.nodeValue;
            };

            Elem.getDate = function (value) {
                return new Date(value.nodeValue);
            };
            return Elem;
        })();
        Utils.Elem = Elem;
    })(dChart.Utils || (dChart.Utils = {}));
    var Utils = dChart.Utils;
})(dChart || (dChart = {}));
var dChart;
(function (dChart) {
    (function (Utils) {
        var Solver = (function () {
            function Solver() {
                this.min = 0;
                this.max = 10;
                this.step = 1;
            }
            Solver.prototype.solve = function (min, max, step) {
                var data = [];

                return data;
            };

            Solver.prototype.normalize = function (value) {
                if (value.hasOwnProperty("min")) {
                    this.min = parseFloat(value.min);
                }

                if (value.hasOwnProperty("max")) {
                    this.max = parseFloat(value.max);
                }

                if (value.hasOwnProperty("min")) {
                    this.step = parseFloat(value.step);
                }

                if (value.hasOwnProperty("fn") && (typeof value.fn === "function")) {
                    this.fn = value.fn;
                }
            };
            return Solver;
        })();
        Utils.Solver = Solver;

        var Solver1D = (function (_super) {
            __extends(Solver1D, _super);
            function Solver1D() {
                _super.apply(this, arguments);
            }
            Solver1D.prototype.solve = function (min, max, step) {
                this.min = min || this.min;
                this.max = max || this.max;
                this.step = step || this.step;

                var x;
                var data = [];

                if (typeof this.fn !== "function") {
                    return data;
                }

                for (x = this.min; x <= this.max; x += this.step) {
                    data.push({ x: this.fn() });
                }

                return data;
            };
            return Solver1D;
        })(Solver);
        Utils.Solver1D = Solver1D;

        var Solver2D = (function (_super) {
            __extends(Solver2D, _super);
            function Solver2D() {
                _super.apply(this, arguments);
            }
            Solver2D.prototype.solve = function (min, max, step) {
                this.min = min || this.min;
                this.max = max || this.max;
                this.step = step || this.step;

                var x;
                var data = [];

                if (typeof this.fn !== "function") {
                    return data;
                }

                for (x = this.min; x <= this.max; x += this.step) {
                    data.push({ x: x, y: this.fn(x) });
                }

                return data;
            };
            return Solver2D;
        })(Solver);
        Utils.Solver2D = Solver2D;
    })(dChart.Utils || (dChart.Utils = {}));
    var Utils = dChart.Utils;
})(dChart || (dChart = {}));
var dChart;
(function (dChart) {
    (function (Utils) {
        var Loader = (function () {
            function Loader() {
                this.url = "";
                this.dataType = "json";
                this.map = {};
            }
            Loader.prototype.getData = function (callback) {
                var _this = this;
                d3.json(this.url, function (response) {
                    callback(response, _this.map);
                });
            };

            Loader.prototype.normalize = function (value) {
                if (value.hasOwnProperty("url")) {
                    this.url = value.url;
                }

                if (value.hasOwnProperty("dataType")) {
                    this.dataType = value.dataType;
                }

                if (value.hasOwnProperty("map")) {
                    this.map = value.map;
                }
            };
            return Loader;
        })();
        Utils.Loader = Loader;
    })(dChart.Utils || (dChart.Utils = {}));
    var Utils = dChart.Utils;
})(dChart || (dChart = {}));
var dChart;
(function (dChart) {
    var DataSet = (function () {
        function DataSet(chart) {
            this.chart = chart;
            this.showLine = true;
            this.showArea = false;
            this.showSymbol = false;
            this.showValues = false;
            this.data = [];
            this.label = "";
            this.interpolate = "linear";
            this.visible = true;
            this.lineStyle = new dChart.Utils.LineStyle();
            this.areaStyle = new dChart.Utils.AreaStyle();
            this.symbolStyle = new dChart.Utils.SymbolStyle();
            this.fontStyle = new dChart.Utils.FontStyle();
        }
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
                    _this.lineStyle.stroke = dChart.Utils.Elem.getColor(value);
                    return;
                } else if (value.nodeName.match(/^stroke-width$/i)) {
                    _this.lineStyle.strokeWidth = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^stroke-opacity$/i)) {
                    _this.lineStyle.strokeOpacity = parseFloat(value.nodeValue);
                    return;
                } else if (value.nodeName.match(/^fill$/i)) {
                    _this.areaStyle.fill = dChart.Utils.Elem.getColor(value);
                    return;
                } else if (value.nodeName.match(/^fill-opacity$/i)) {
                    _this.areaStyle.fillOpacity = parseFloat(value.nodeValue);
                    return;
                }
            });
        };

        DataSet.prototype.normalize = function (value) {
            var _this = this;
            if (value.hasOwnProperty("interpolate")) {
                this.interpolate = value.interpolate;
            }

            if (value.hasOwnProperty("label")) {
                this.label = value.label;
            }

            if (value.hasOwnProperty("symbolStyle")) {
                var symbolStyle = new dChart.Utils.SymbolStyle();
                symbolStyle.normalize(value.symbolStyle);
                this.symbolStyle = symbolStyle;

                this.showSymbol = true;
            }

            if (value.hasOwnProperty("lineStyle")) {
                var lineStyle = new dChart.Utils.LineStyle();
                lineStyle.normalize(value.lineStyle);
                this.lineStyle = lineStyle;

                this.showLine = true;
            }

            if (value.hasOwnProperty("areaStyle")) {
                var areaStyle = new dChart.Utils.AreaStyle();
                areaStyle.normalize(value.areaStyle);
                this.areaStyle = areaStyle;

                this.showArea = true;
            }

            if (value.hasOwnProperty("fontStyle")) {
                var fontStyle = new dChart.Utils.FontStyle();
                fontStyle.normalize(value.fontStyle);
                this.fontStyle = fontStyle;

                this.showValues = true;
            }

            if (value.hasOwnProperty("data") && (typeof value.data === "object")) {
                _.map(value.data, function (config) {
                    var p = _this.chart.getPoint();
                    p.normalize(config);
                    _this.data.push(p);
                });
            }

            if (value.hasOwnProperty("dataFn")) {
                var solver = this.chart.getSolver();
                solver.normalize(value.dataFn);
                var data = solver.solve();

                _.map(data, function (val) {
                    var p = _this.chart.getPoint();
                    p.normalize(val);
                    _this.data.push(p);
                });
            }

            if (value.hasOwnProperty("dataSrc")) {
                var loader = new dChart.Utils.Loader();
                loader.normalize(value.dataSrc);

                loader.getData(function (data, map) {
                    _.map(data, function (val) {
                        var p = _this.chart.getPoint();
                        p.map(val, map);
                        _this.data.push(p);
                    });

                    _this.chart.redraw();
                });
            }
        };

        DataSet.prototype.min = function (axis) {
            return d3.min(this.data, function (d) {
                return d[axis];
            });
        };

        DataSet.prototype.max = function (axis) {
            return d3.max(this.data, function (d) {
                return d[axis];
            });
        };
        return DataSet;
    })();
    dChart.DataSet = DataSet;
})(dChart || (dChart = {}));
var dChart;
(function (dChart) {
    (function (Utils) {
        var Transition = (function () {
            function Transition() {
                this.duration = 150;
                this.delay = 0;
                this.ease = "cubic-in-out";
            }
            Transition.prototype.normalize = function (value) {
                if (value.hasOwnProperty("ease")) {
                    this.ease = value.ease;
                }

                if (value.hasOwnProperty("delay")) {
                    this.delay = parseFloat(value.delay);
                }

                if (value.hasOwnProperty("duration")) {
                    this.duration = parseFloat(value.duration);
                }
            };
            return Transition;
        })();
        Utils.Transition = Transition;
    })(dChart.Utils || (dChart.Utils = {}));
    var Utils = dChart.Utils;
})(dChart || (dChart = {}));
"use strict";
var dChart;
(function (dChart) {
    var Chart = (function () {
        function Chart() {
            this.marginLeft = 50;
            this.marginRight = 10;
            this.marginTop = 10;
            this.marginBottom = 80;
            this.width = 400;
            this.height = 400;
            this.nettoWidth = 340;
            this.nettoHeight = 310;
            this.showTransition = false;
            this.transition = new dChart.Utils.Transition();
            this.fontStyle = new dChart.Utils.FontStyle();
            this.dataSets = [];
            this.format = d3.format("0.2f");
            ;
            this.fontStyle.fontFamily = "sans-serif";
            this.fontStyle.fontSize = 11;
            this.fontStyle.fontWeight = "normal";
            this.fontStyle.stroke = "none";
            this.fontStyle.fill = "black";
        }
        Chart.prototype.clear = function () {
            if (this.svg) {
                this.svg.remove();
            }
        };

        Chart.prototype.getPoint = function () {
            return new dChart.Point();
        };

        Chart.prototype.getSolver = function () {
            return new dChart.Utils.Solver();
        };

        Chart.prototype.redraw = function () {
            this.nettoWidth = this.width - this.marginLeft - this.marginRight;
            this.nettoHeight = this.height - this.marginTop - this.marginBottom;

            this.svg.attr("width", this.width).attr("height", this.height);

            this.container.attr("width", this.nettoWidth).attr("height", this.nettoHeight).attr("transform", "translate(" + this.marginLeft + ", " + this.marginTop + ")");

            this.svgDescription.text(this.description).attr("x", this.nettoWidth * 0.5).attr("y", this.nettoHeight + this.marginBottom - 5).attr("text-anchor", "middle");

            this.svgLabel.text(this.label).attr("x", this.nettoWidth * 0.5).attr("y", this.nettoHeight + this.marginBottom - 20).attr("text-anchor", "middle");

            this.redrawAxis();
            this.redrawData();

            this.container.selectAll('text').fontStyle(this.fontStyle);

            this.svgLabel.fontStyle(this.fontStyle).style('font-size', this.fontStyle.fontSize + 2).style('font-weight', "bold");
        };

        Chart.prototype.draw = function () {
            this.nettoWidth = this.width - this.marginLeft - this.marginRight;
            this.nettoHeight = this.height - this.marginTop - this.marginBottom;

            this.clear();

            this.svg = d3.select(this.elem).append("svg").attr("id", "dchart-" + this.elemId);

            this.container = this.svg.append("g").attr("class", "dchart-container");

            this.axisContainer = this.container.append("g").attr("class", "dchart-container-axis");

            this.dataContainer = this.container.append("g").attr("class", "dchart-container-data");

            this.labelContainer = this.container.append("g").attr("class", "dchart-container-label");

            this.svgLabel = this.labelContainer.append("text");

            this.svgDescription = this.labelContainer.append("text");

            this.drawAxis();
            this.drawData();

            this.redraw();
        };

        Chart.prototype.drawAxis = function () {
        };

        Chart.prototype.redrawAxis = function () {
        };

        Chart.prototype.drawData = function () {
        };

        Chart.prototype.redrawData = function () {
        };

        Chart.prototype.normalize = function (value) {
            var _this = this;
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
                this.width = parseFloat(value.width);
            }

            if (value.hasOwnProperty("height")) {
                this.height = parseFloat(value.height);
            }

            if (value.hasOwnProperty("marginTop")) {
                this.marginTop = parseFloat(value.marginTop);
            }

            if (value.hasOwnProperty("marginLeft")) {
                this.marginLeft = parseFloat(value.marginLeft);
            }

            if (value.hasOwnProperty("marginBottom")) {
                this.marginBottom = parseFloat(value.marginBottom);
            }

            if (value.hasOwnProperty("marginRight")) {
                this.marginRight = parseFloat(value.marginRight);
            }

            if (value.hasOwnProperty("showTransition")) {
                this.showTransition = true;
            }

            if (value.hasOwnProperty("transition")) {
                var transition = new dChart.Utils.Transition();
                transition.normalize(value.transition);
                this.transition = transition;

                this.showTransition = true;
            }

            if (value.hasOwnProperty("fontStyle")) {
                var fontStyle = new dChart.Utils.FontStyle();
                fontStyle.normalize(value.fontStyle);

                this.fontStyle = fontStyle;
            }

            if (value.hasOwnProperty("dataSets")) {
                this.dataSets = [];

                _.map(value.dataSets, function (config) {
                    var dataSet = new dChart.DataSet(_this);
                    dataSet.normalize(config);
                    _this.dataSets.push(dataSet);
                });
            }
        };
        return Chart;
    })();
    dChart.Chart = Chart;

    var Chart2D = (function (_super) {
        __extends(Chart2D, _super);
        function Chart2D() {
            _super.apply(this, arguments);
            this.xAxis = new dChart.xAxis();
            this.yAxis = new dChart.yAxis();
        }
        Chart2D.prototype.getPoint = function () {
            return new dChart.Point2D();
        };

        Chart2D.prototype.getSolver = function () {
            return new dChart.Utils.Solver2D();
        };

        Chart2D.prototype.redraw = function () {
            this.nettoWidth = this.width - this.marginLeft - this.marginRight;
            this.nettoHeight = this.height - this.marginTop - this.marginBottom;

            this.xAxis.length = this.nettoWidth;
            this.xAxis.height = this.nettoHeight;
            this.yAxis.length = this.nettoHeight;
            this.yAxis.height = this.nettoWidth;

            _super.prototype.redraw.call(this);
        };

        Chart2D.prototype.drawAxis = function () {
            var min = [this.min("x"), this.min("y")];
            var max = [this.max("x"), this.max("y")];

            this.xAxis.draw(this.axisContainer, min[0], max[0]);
            this.yAxis.draw(this.axisContainer, min[1], max[1]);
        };

        Chart2D.prototype.redrawAxis = function () {
            var min = [this.min("x"), this.min("y")];
            var max = [this.max("x"), this.max("y")];

            this.xAxis.redraw(min[0], max[0]);
            this.yAxis.redraw(min[1], max[1]);
        };

        Chart2D.prototype.drawData = function () {
        };

        Chart2D.prototype.redrawData = function () {
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
            _super.prototype.normalize.call(this, value);

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
        function Chart3D() {
            _super.apply(this, arguments);
            this.dataSets = [];
            this.depth = 400;
            this.xAxis = new dChart.xAxis();
            this.yAxis = new dChart.yAxis();
            this.zAxis = new dChart.zAxis();
        }
        Chart3D.prototype.getPoint = function () {
            return new dChart.Point3D();
        };

        Chart3D.prototype.drawAxis = function () {
            var min = [this.min("x"), this.min("y"), this.min("z")];
            var max = [this.max("x"), this.max("y"), this.min("z")];

            this.xAxis.draw(this.axisContainer, min[0], max[0]);
            this.yAxis.draw(this.axisContainer, min[1], max[1]);
            this.zAxis.draw(this.axisContainer, min[2], max[2]);
        };

        Chart3D.prototype.redrawAxis = function () {
            var min = [this.min("x"), this.min("y"), this.min("z")];
            var max = [this.max("x"), this.max("y"), this.min("z")];

            this.xAxis.redraw(min[0], max[0]);
            this.yAxis.redraw(min[1], max[1]);
            this.zAxis.redraw(min[2], max[2]);
        };

        Chart3D.prototype.drawData = function () {
        };

        Chart3D.prototype.redrawData = function () {
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
            _super.prototype.normalize.call(this, value);

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

            this.nettoWidth = this.width - this.marginLeft - this.marginRight;
            this.nettoHeight = this.height - this.marginTop - this.marginBottom;

            this.xAxis.length = this.nettoWidth;
            this.xAxis.height = this.nettoHeight;
            this.yAxis.length = this.nettoHeight;
            this.yAxis.height = this.nettoWidth;
            this.zAxis.length = this.depth;
            this.zAxis.height = this.depth;
        };
        return Chart3D;
    })(Chart);
    dChart.Chart3D = Chart3D;

    var LineChart = (function (_super) {
        __extends(LineChart, _super);
        function LineChart(config) {
            _super.call(this);
            this.svgLineContainer = [];
            this.svgSymbolContainer = [];
            this.svgLine = [];

            if (config) {
                this.normalize(config);
                this.draw();
            }

            console.log(this);
        }
        LineChart.prototype.drawData = function () {
            var _this = this;
            _.map(this.dataSets, function (dataSet, key) {
                _this.svgLineContainer[key] = _this.dataContainer.append("g").attr("class", "dchart-data-set dchart-data-set-" + key);

                _this.svgLine[key] = _this.svgLineContainer[key].append("path");

                _this.svgSymbolContainer[key] = _this.dataContainer.append("g");
            });
        };

        LineChart.prototype.redrawData = function () {
            var _this = this;
            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();
            var lineFn = [];

            _.map(this.dataSets, function (dataSet, key) {
                if (dataSet.showLine) {
                    lineFn[key] = d3.svg.line().interpolate(dataSet.interpolate).x(function (d) {
                        return xScale(d.x);
                    }).y(function (d) {
                        return yScale(d.y);
                    });

                    _this.svgLine[key].attr("d", lineFn[key](dataSet.data)).lineStyle(dataSet.lineStyle).style("fill", "none");
                }

                if (dataSet.showSymbol) {
                    var group = _this.svgSymbolContainer[key].selectAll("path").data(dataSet.data, function (d) {
                        return d.x;
                    });

                    var symbol = d3.svg.symbol().type(dataSet.symbolStyle.type);

                    group.exit().remove();

                    group.enter().append("path").areaStyle(dataSet.symbolStyle).attr("transform", function (d) {
                        return "translate(" + xScale(d.x) + "," + yScale(d.y) + ") scale(" + dataSet.symbolStyle.size + ")";
                    }).attr("d", symbol);
                }
            });
        };
        return LineChart;
    })(Chart2D);
    dChart.LineChart = LineChart;

    var AreaChart = (function (_super) {
        __extends(AreaChart, _super);
        function AreaChart(config) {
            _super.call(this);
            this.svgAreaContainer = [];
            this.svgSymbolContainer = [];
            this.svgArea = [];

            if (config) {
                this.normalize(config);
                this.draw();
            }

            console.log(this);
        }
        AreaChart.prototype.drawData = function () {
            var _this = this;
            _.map(this.dataSets, function (dataSet, key) {
                _this.svgAreaContainer[key] = _this.dataContainer.append("g").attr("class", "dchart-data-set dchart-data-set-" + key);

                _this.svgArea[key] = _this.svgAreaContainer[key].append("path");

                _this.svgSymbolContainer[key] = _this.dataContainer.append("g");
            });
        };

        AreaChart.prototype.redrawData = function () {
            var _this = this;
            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();
            var areaFn = [];

            _.map(this.dataSets, function (dataSet, key) {
                areaFn[key] = d3.svg.area().interpolate(dataSet.interpolate).x(function (d) {
                    return xScale(d.x);
                }).y0(_this.nettoHeight).y1(function (d) {
                    return yScale(d.y);
                });

                _this.svgArea[key].attr("d", areaFn[key](dataSet.data)).areaStyle(dataSet.areaStyle);

                if (dataSet.showSymbol) {
                    var group = _this.svgSymbolContainer[key].selectAll("path").data(dataSet.data, function (d) {
                        return d.x;
                    });

                    var symbol = d3.svg.symbol().type(dataSet.symbolStyle.type);

                    group.exit().remove();

                    group.enter().append("path").areaStyle(dataSet.symbolStyle).attr("transform", function (d) {
                        return "translate(" + xScale(d.x) + "," + yScale(d.y) + ") scale(" + dataSet.symbolStyle.size + ")";
                    }).attr("d", symbol);
                }
            });
        };
        return AreaChart;
    })(Chart2D);
    dChart.AreaChart = AreaChart;

    var BarChart = (function (_super) {
        __extends(BarChart, _super);
        function BarChart(config) {
            _super.call(this);
            this.svgRectContainer = [];

            if (config) {
                this.normalize(config);
                this.draw();
            }

            console.log(this);
        }
        BarChart.prototype.drawData = function () {
            var _this = this;
            _.map(this.dataSets, function (dataSet, key) {
                dataSet.showValues = true;

                _this.svgRectContainer[key] = _this.dataContainer.append("g").attr("class", "dchart-data-set dchart-data-set-" + key);
            });
        };

        BarChart.prototype.redrawData = function () {
            var _this = this;
            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();

            _.map(this.dataSets, function (dataSet, key) {
                var group = _this.svgRectContainer[key].selectAll("rect").data(dataSet.data, function (d) {
                    return d.x;
                });

                if (dataSet.data.length === 0) {
                    return;
                }

                var xTickElems = _this.xAxis.svg.selectAll('.tick');
                var xTicks = xTickElems[0].length;

                var start = (_this.nettoWidth / (xTicks + 1)) * 0.5;
                var width = _this.nettoWidth / (xTicks + 1) / _this.dataSets.length;

                if (!_this.showTransition) {
                    group.exit().remove();

                    group.enter().append("rect").areaStyle(dataSet.areaStyle).attr("x", function (d) {
                        return xScale(d.x) - start + key * width;
                    }).attr("y", function (d) {
                        return _this.nettoHeight - yScale(d.y);
                    }).attr("width", function (d) {
                        return width;
                    }).attr("height", function (d) {
                        return Math.abs(yScale(d.y));
                    });
                } else {
                    group.exit().remove();

                    group.enter().append("rect").areaStyle(dataSet.areaStyle).attr("x", function (d) {
                        return xScale(d.x) - start + key * width;
                    }).attr("y", _this.nettoHeight).attr("width", function (d) {
                        return width;
                    }).attr("height", 0).transition().duration(_this.transition.duration).delay(function (d, i) {
                        return i * _this.transition.delay;
                    }).attr("y", function (d) {
                        return _this.nettoHeight - yScale(d.y);
                    }).attr("height", function (d) {
                        return Math.abs(yScale(d.y));
                    });
                }
            });
        };
        return BarChart;
    })(Chart2D);
    dChart.BarChart = BarChart;

    var ScatterChart = (function (_super) {
        __extends(ScatterChart, _super);
        function ScatterChart(config) {
            _super.call(this);
            this.svgScatterContainer = [];

            if (config) {
                this.normalize(config);
                this.draw();
            }

            console.log(this);
        }
        ScatterChart.prototype.drawData = function () {
            var _this = this;
            _.map(this.dataSets, function (dataSet, key) {
                _this.svgScatterContainer[key] = _this.dataContainer.append("g").attr("class", "dchart-data-set dchart-data-set-" + key);
            });
        };

        ScatterChart.prototype.redrawData = function () {
            var _this = this;
            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();

            _.map(this.dataSets, function (dataSet, key) {
                var group = _this.svgScatterContainer[key].selectAll("path").data(dataSet.data, function (d) {
                    return d.x;
                });

                var symbol = d3.svg.symbol().type(dataSet.symbolStyle.type);

                if (!_this.showTransition) {
                    group.exit().remove();

                    group.enter().append("path").areaStyle(dataSet.symbolStyle).attr("transform", function (d) {
                        return "translate(" + xScale(d.x) + "," + yScale(d.y) + ") scale(" + dataSet.symbolStyle.size + ")";
                    }).attr("d", symbol);
                } else {
                    group.exit().remove();

                    group.enter().append("path").areaStyle(dataSet.symbolStyle).attr("transform", function (d) {
                        return "translate(" + xScale(d.x) + "," + yScale(d.y) + ") scale(0)";
                    }).attr("d", symbol).transition().duration(_this.transition.duration).delay(function (d, i) {
                        return i * _this.transition.delay;
                    }).attr("transform", function (d) {
                        return "translate(" + xScale(d.x) + "," + yScale(d.y) + ") scale(" + dataSet.symbolStyle.size + ")";
                    });
                }
            });
        };
        return ScatterChart;
    })(Chart2D);
    dChart.ScatterChart = ScatterChart;

    var PieChart = (function (_super) {
        __extends(PieChart, _super);
        function PieChart(config) {
            _super.call(this);
            this.svgPieContainer = [];
            this.numPoints = 0;
            this.colorScale = d3.scale.category20c();

            if (config) {
                this.normalize(config);
                this.draw();
            }

            console.log(this);
        }
        PieChart.prototype.getPoint = function () {
            var p = new dChart.Point1D();

            p.areaStyle.stroke = "none";
            p.areaStyle.fill = this.colorScale(this.numPoints);

            this.numPoints += 1;

            return p;
        };

        PieChart.prototype.getSolver = function () {
            return new dChart.Utils.Solver1D();
        };

        PieChart.prototype.drawData = function () {
            var _this = this;
            _.map(this.dataSets, function (dataSet, key) {
                dataSet.showValues = true;

                _this.svgPieContainer[key] = _this.dataContainer.append("g").attr("class", "dchart-data-set dchart-data-set-" + key).attr("transform", "translate(" + (_this.nettoWidth * 0.5) + "," + (_this.nettoHeight * 0.5) + ")");
            });
        };

        PieChart.prototype.redrawData = function () {
            var _this = this;
            _.map(this.dataSets, function (dataSet, key) {
                var pie = d3.layout.pie().sort(null).value(function (d) {
                    return d.x;
                });

                var radius = _this.nettoHeight > _this.nettoWidth ? _this.nettoWidth * 0.5 : _this.nettoHeight * 0.5;

                var outerRadius = (key + 1) * radius / _this.dataSets.length;
                var innerRadius = key * radius / _this.dataSets.length;

                var arc = d3.svg.arc().outerRadius(outerRadius).innerRadius(innerRadius);

                var pieces = _this.svgPieContainer[key].selectAll("path").data(pie(dataSet.data)).enter();

                if (!_this.showTransition) {
                    pieces.append("path").attr("d", arc).areaStyle(function (d) {
                        return d.data.areaStyle;
                    });
                    pieces.append("text").text(function (d) {
                        return _this.format(d.value);
                    }).attr("transform", function (d) {
                        return "translate(" + arc.centroid(d) + ")";
                    }).fontStyle(dataSet.fontStyle).style("text-anchor", "middle");
                } else {
                    pieces.append("path").attr("d", arc.outerRadius(innerRadius)).areaStyle(function (d) {
                        return d.data.areaStyle;
                    }).transition().duration(_this.transition.duration).delay(function (d, i) {
                        return i * _this.transition.delay;
                    }).attr("d", arc.outerRadius(outerRadius));
                    pieces.append("text").text(function (d) {
                        return _this.format(d.value);
                    }).style("text-anchor", "middle").fontStyle(dataSet.fontStyle).transition().duration(_this.transition.duration).delay(function (d, i) {
                        return i * _this.transition.delay;
                    }).attr("transform", function (d) {
                        return "translate(" + arc.centroid(d) + ")";
                    });
                }
            });
        };
        return PieChart;
    })(Chart);
    dChart.PieChart = PieChart;
})(dChart || (dChart = {}));