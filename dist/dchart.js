/** dchart - v0.0.4 - Mon Jul 29 2013 23:46:13
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
                if (typeof value === "undefined") { value = "#000000"; }
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
                if (typeof value === "undefined") { value = 1; }
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
                this.stroke = new Color();
                this.strokeWidth = new Size();
                this.strokeOpacity = 1;
            }
            LineStyle.prototype.get = function () {
                return "";
            };
            return LineStyle;
        })();
        Utils.LineStyle = LineStyle;

        var AreaStyle = (function () {
            function AreaStyle() {
                this.fill = new Color();
                this.fillOpacity = 1;
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
            this.labelOffset = 34;
            this.range = [0, 1];
            this.domain = [0, 1];
            this.autorange = true;
            this.scale = "linear";
            this.length = 1;
            this.height = 1;
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
                this.length = length;
            }
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
                orient = this.align === "end" ? "bottom" : "top";
            }

            if (this.orientation === "y") {
                orient = this.align === "end" ? "right" : "left";
            }

            return d3.svg.axis().scale(this.getScale()).orient(orient).ticks(this.ticks);
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
            if (this.autorange === true) {
                this.setDomain([min, max]);
            }

            if (this.orientation === "x") {
                var pos = this.align === "middle" ? this.height * 0.5 : this.align === "start" ? 0 : this.height;

                var labelPos = this.labelAlign === "middle" ? this.length * 0.5 : this.labelAlign === "start" ? 0 : this.length;

                this.svg.attr("transform", "translate(0," + pos + ")");

                this.svgLabel.attr("x", labelPos).attr("y", this.length + this.labelOffset);

                this.setRange([0, this.length]);
            } else if (this.orientation === "y") {
                var pos = this.align === "middle" ? this.height * 0.5 : this.align === "start" ? 0 : this.height;

                var labelPos = this.labelAlign === "middle" ? this.length * 0.5 : this.labelAlign === "end" ? 0 : this.length;

                this.svg.attr("transform", "translate(" + pos + ",0)");

                this.svgLabel.attr("x", -labelPos).attr("y", -this.labelOffset).attr("transform", "rotate(-90)");

                this.setRange([this.length, 0]);
            }

            this.svg.call(this.getAxis());

            this.svgLabel.text(this.label).attr("text-anchor", this.labelAlign);
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
        function DataSet() {
            this.showDots = true;
            this.showLine = true;
            this.dotsRadius = 3;
            this.data = [];
            this.label = "";
            this.interpolate = "linear";
            this.visible = true;
            this.lineStyle = new dChart.Utils.LineStyle();
            this.areaStyle = new dChart.Utils.AreaStyle();
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
            if (value.hasOwnProperty("interpolate")) {
                this.interpolate = value.interpolate;
            }

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

            if (value.hasOwnProperty("showDots")) {
                this.showDots = value.showDots;
            }

            if (value.hasOwnProperty("showLine")) {
                this.showLine = value.showLine;
            }

            if (value.hasOwnProperty("dotRadius")) {
                this.dotsRadius = value.dotRadius;
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

            if (value.hasOwnProperty("data") && (typeof value.data === "object")) {
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
                this.data = [];

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
            this.marginLeft = 50;
            this.marginRight = 10;
            this.marginTop = 10;
            this.marginBottom = 50;
            this.width = 400;
            this.height = 400;
            this.nettoWidth = 340;
            this.nettoHeight = 340;
            var css = '.dchart-axis path,' + '.dchart-axis line {' + '         fill: none;' + '         stroke: black;' + '         shape-rendering: crispEdges;' + '     }' + ' .dchart-axis text,' + ' .dchart-axis-label text {' + '         font-family: sans-serif;' + '         font-size: 11px;' + '     }';

            dChart.Utils.Doc.css(css);
        }
        Chart.prototype.clear = function () {
            if (this.svg) {
                this.svg.remove();
            }
        };

        Chart.prototype.redraw = function () {
            this.svg.attr("width", this.width).attr("height", this.height);

            this.container.attr("width", this.nettoWidth).attr("height", this.nettoHeight).attr("transform", "translate(" + this.marginLeft + ", " + this.marginTop + ")");

            this.redrawAxis();
            this.redrawData();
        };

        Chart.prototype.draw = function () {
            this.clear();

            this.svg = d3.select(this.elem).append("svg").attr("id", "dchart-" + this.elemId);

            this.container = this.svg.append("g").attr("class", "dchart-container");

            this.axisContainer = this.container.append("g").attr("class", "dchart-container-axis");

            this.dataContainer = this.container.append("g").attr("class", "dchart-container-data");

            this.labelContainer = this.container.append("g").attr("class", "dchart-container-label");

            this.descriptionContainer = this.container.append("g").attr("class", "dchart-container-description");

            this.svg.attr("width", this.width).attr("height", this.height);

            this.container.attr("width", this.nettoWidth).attr("height", this.nettoHeight).attr("transform", "translate(" + this.marginLeft + ", " + this.marginTop + ")");

            this.drawAxis();
            this.drawData();
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

            this.nettoWidth = this.width - this.marginLeft - this.marginRight;
            this.nettoHeight = this.height - this.marginTop - this.marginBottom;

            this.xAxis.length = this.nettoWidth;
            this.xAxis.height = this.nettoHeight;
            this.yAxis.length = this.nettoHeight;
            this.yAxis.height = this.nettoWidth;
        }
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
            var _this = this;
            _super.prototype.normalize.call(this, value);

            if (value.hasOwnProperty("dataSets")) {
                this.dataSets = [];

                _.map(value.dataSets, function (config) {
                    var dataSet = new dChart.DataSet2D();
                    dataSet.normalize(config);
                    _this.dataSets.push(dataSet);
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
            this.depth = 400;
            this.xAxis = new dChart.Axis("x");
            this.yAxis = new dChart.Axis("y");
            this.zAxis = new dChart.Axis("z");

            this.nettoWidth = this.width - this.marginLeft - this.marginRight;
            this.nettoHeight = this.height - this.marginTop - this.marginBottom;

            this.xAxis.length = this.nettoWidth;
            this.xAxis.height = this.nettoHeight;
            this.yAxis.length = this.nettoHeight;
            this.yAxis.height = this.nettoWidth;
            this.zAxis.length = this.depth;
            this.zAxis.height = this.depth;
        }
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
            var _this = this;
            _super.prototype.normalize.call(this, value);

            if (value.hasOwnProperty("dataSets")) {
                this.dataSets = [];

                _.map(value.dataSets, function (config) {
                    var dataSet = new dChart.DataSet3D();
                    dataSet.normalize(config);
                    _this.dataSets.push(dataSet);
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
            this.svgLineContainer = [];
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
            });

            this.redrawData();
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

                    _this.svgLine[key].attr("d", lineFn[key](dataSet.data)).style("stroke", dataSet.lineStyle.stroke.get()).style("fill", "none").style("stroke-width", dataSet.lineStyle.strokeWidth.value).style("stroke-opacity", dataSet.lineStyle.strokeOpacity);
                }

                if (dataSet.showDots) {
                    var group = _this.svgLineContainer[key].selectAll("circle").data(dataSet.data, function (d) {
                        return d.x;
                    });

                    group.exit().remove();

                    group.enter().append("circle").style("stroke", dataSet.lineStyle.stroke.get()).style("fill", dataSet.areaStyle.fill.get()).style("stroke-opacity", dataSet.lineStyle.strokeOpacity).style("fill-opacity", dataSet.areaStyle.fillOpacity).style("stroke-width", dataSet.lineStyle.strokeWidth.value).attr("cx", function (d) {
                        return xScale(d.x);
                    }).attr("cy", function (d) {
                        return yScale(d.y);
                    }).attr("r", function (d) {
                        return dataSet.dotsRadius;
                    });
                }
            });
        };
        return LineChart;
    })(Chart2D);
    dChart.LineChart = LineChart;
})(dChart || (dChart = {}));
