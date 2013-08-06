/// <reference path="../../../d.ts/DefinitelyTyped/d3/d3.d.ts" />

module dChart.Utils {

    export class Animation {

        static animateAlongPath(path:any) {

            var p = path.node(),
                len = p.getTotalLength();

            return function(t) {
                var pos = p.getPointAtLength(Math.floor(len*t));

                return "translate("+pos.x+","+pos.y+")";
            };
        }
    }
}