/** d3-styles - v0.0.1 - Sat Aug 03 2013 22:34:27
 *  (c) 2013 Christoph Körner, office@chaosmail.at, http://chaosmail.at
 *  License: MIT
 */
'use strict';

d3.selection.prototype.lineStyle = function(arg) {

    if (typeof arg === "function") {

        this.style("stroke",function(d,i) {
            var res = arg(d,i);
            return res.hasOwnProperty("stroke") ? res.stroke : "";
        });
        this.style("stroke-width",function(d,i) {
            var res = arg(d,i);
            return res.hasOwnProperty("strokeWidth") ? res.strokeWidth : "";
        });
        this.style("stroke-opacity",function(d,i) {
            var res = arg(d,i);
            return res.hasOwnProperty("strokeOpacity") ? res.strokeOpacity : "";
        });
        this.style("stroke-linecap",function(d,i) {
            var res = arg(d,i);
            return res.hasOwnProperty("strokeLinecap") ? res.strokeLinecap : "";
        });
        this.style("stroke-dasharray",function(d,i) {
            var res = arg(d,i);
            return res.hasOwnProperty("strokeDasharray") ? res.strokeDasharray : "";
        });
    }
    else {
        if (arg.hasOwnProperty("stroke")) {
            this.style("stroke",arg.stroke);
        }

        if (arg.hasOwnProperty("strokeWidth")) {
            this.style("stroke-width",arg.strokeWidth);
        }

        if (arg.hasOwnProperty("strokeOpacity")) {
            this.style("stroke-opacity",arg.strokeOpacity);
        }

        if (arg.hasOwnProperty("strokeLinecap")) {
            this.style("stroke-linecap",arg.strokeLinecap);
        }

        if (arg.hasOwnProperty("strokeDasharray")) {
            this.style("stroke-dasharray",arg.strokeDasharray);
        }
    }

    return this;
};

d3.selection.prototype.areaStyle = function(arg) {

    this.lineStyle(arg);

    if (typeof arg === "function") {

        this.style("fill",function(d,i) {
            var res = arg(d,i);
            return res.hasOwnProperty("fill") ? res.fill : "";
        });
        this.style("fill-opacity",function(d,i) {
            var res = arg(d,i);
            return res.hasOwnProperty("fillOpacity") ? res.fillOpacity : "";
        });
    }
    else {
        if (arg.hasOwnProperty("fill")) {
            this.style("fill",arg.fill);
        }

        if (arg.hasOwnProperty("fillOpacity")) {
            this.style("fill-opacity",arg.fillOpacity);
        }
    }

    return this;
};

d3.selection.prototype.fontStyle = function(arg) {

    this.areaStyle(arg);

    if (typeof arg === "function") {

        this.style("font-family",function(d,i) {
            var res = arg(d,i);
            return res.hasOwnProperty("fontFamily") ? res.fontFamily : "";
        });
        this.style("font-size",function(d,i) {
            var res = arg(d,i);
            return res.hasOwnProperty("fontSize") ? res.fontSize : "";
        });
        this.style("font-weight",function(d,i) {
            var res = arg(d,i);
            return res.hasOwnProperty("fontWeight") ? res.fontWeight : "";
        });
    }
    else {
        if (arg.hasOwnProperty("fontFamily")) {
            this.style('font-family', arg.fontFamily)
        }

        if (arg.hasOwnProperty("fontSize")) {
            this.style('font-size', arg.fontSize)
        }

        if (arg.hasOwnProperty("fontWeight")) {
            this.style('font-weight', arg.fontWeight)
        }
    }

    return this;
};