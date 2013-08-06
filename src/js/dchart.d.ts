declare module dChart {
    interface IPoint {
        stroke: string;
        strokeWidth: number;
        strokeOpacity: number;
        fill: string;
        fillOpacity: number;
        label: string;
    }
    interface IPoint1D extends IPoint {
        x: number;
    }
    interface IPoint2D extends IPoint {
        x: number;
        y: number;
    }
    interface IPoint2DTime extends IPoint {
        t: number;
        y: number;
    }
    interface IPoint3D extends IPoint {
        x: number;
        y: number;
        z: number;
    }
    interface IPoint3DTime extends IPoint {
        t: number;
        y: number;
        z: number;
    }
    interface IPointMap {
        stroke: string;
        strokeWidth: string;
        strokeOpacity: string;
        fill: string;
        fillOpacity: string;
    }
    interface IPoint1DMap extends IPointMap {
        x: string;
    }
    interface IPoint2DMap extends IPointMap {
        x: string;
        y: string;
    }
    interface IPoint2DTimeMap extends IPointMap {
        t: string;
        y: string;
    }
    interface IPoint3DMap extends IPointMap {
        x: string;
        y: string;
        z: string;
    }
    interface IPoint3DTimeMap extends IPointMap {
        t: string;
        y: string;
        z: string;
    }
    class Point {
        public lineStyle: dChart.Utils.LineStyle;
        public areaStyle: dChart.Utils.AreaStyle;
        constructor();
        public normalize(value: any): void;
        public map(value: any, map: IPointMap): void;
        public parse(elem: Element): void;
    }
    class Point1D extends Point {
        public x: number;
        constructor(x?: number);
        public normalize(value: any): void;
        public map(value: any, map: IPoint1DMap): void;
        public parse(elem: Element): void;
    }
    class Point2D extends Point {
        public x: number;
        public y: number;
        constructor(x?: number, y?: number);
        public normalize(value: any): void;
        public map(value: any, map: IPoint2DMap): void;
        public parse(elem: Element): void;
    }
    class Point2DTime extends Point {
        public t: Date;
        public y: number;
        constructor(t?: Date, y?: number);
        public normalize(value: any): void;
        public map(value: any, map: IPoint2DTimeMap): void;
        public parse(elem: Element): void;
    }
    class Point3D extends Point {
        public x: number;
        public y: number;
        public z: number;
        constructor(x?: number, y?: number, z?: number);
        public normalize(value: any): void;
        public map(value: any, map: IPoint3DMap): void;
        public parse(elem: Element): void;
    }
    class Point3DTime extends Point {
        public t: Date;
        public y: number;
        public z: number;
        constructor(t?: Date, y?: number, z?: number);
        public normalize(value: any): void;
        public map(value: any, map: IPoint3DTimeMap): void;
        public parse(elem: Element): void;
    }
}
declare module dChart.Utils {
    class LineStyle {
        public stroke: string;
        public strokeWidth: number;
        public strokeOpacity: number;
        public strokeLinecap: string;
        public strokeDasharray: string;
        public normalize(value: any): void;
    }
    class AreaStyle extends LineStyle {
        public fill: string;
        public fillOpacity: number;
        public normalize(value: any): void;
    }
    class SymbolStyle extends AreaStyle {
        public type: string;
        public size: number;
        public normalize(value: any): void;
    }
    class FontStyle extends AreaStyle {
        public fontFamily: string;
        public fontSize: number;
        public fontWeight: string;
        public normalize(value: any): void;
    }
}
declare module dChart {
    interface IAxis {
        label: string;
        labelAlign: string;
        labelOffset: number;
        gridStyle: dChart.Utils.LineStyle;
        scale: string;
        autorange: boolean;
        ticks: number;
        range: number[];
        domain: number[];
    }
    class Axis {
        public svg: D3.Selection;
        public svgLabel: D3.Selection;
        public gridStyle: dChart.Utils.LineStyle;
        public label: string;
        public labelOffset: number;
        public range: number[];
        public domain: number[];
        public autorange: boolean;
        public showGrid: boolean;
        public scale: string;
        public length: number;
        public height: number;
        public orientation: string;
        public align: string;
        public labelAlign: string;
        public ticks: number;
        public ticksFormat: string[];
        public tickValues: number[];
        public tickSubdivide: boolean;
        public tickSize: number[];
        public tickPadding: number;
        public visible: boolean;
        constructor();
        public addScaleFn(fn: string, args: any): void;
        public setOrientation(orientation?: string): Axis;
        public setDomain(domain: number[]): Axis;
        public setRange(range: number[]): Axis;
        public setAlign(align: string): Axis;
        public setLabelAlign(labelAlign: string): Axis;
        public getScale();
        public getAxis(): D3.Axis;
        public clear(): void;
        public draw(container: D3.Selection, min: number, max: number): void;
        public redraw(min?: number, max?: number): void;
        public normalize(value: any): void;
    }
    class xAxis extends Axis {
        public orientation: string;
        constructor();
        public redraw(min?: number, max?: number): void;
    }
    class yAxis extends Axis {
        public orientation: string;
        constructor();
        public redraw(min?: number, max?: number): void;
    }
    class zAxis extends Axis {
        public orientation: string;
    }
}
declare module dChart.Utils {
    class Elem {
        static getFloat(value: Element): number;
        static getColor(value: Element): string;
        static getDate(value: Element): Date;
    }
}
declare module dChart.Utils {
    interface ISolver {
        min: number;
        max: number;
        step: number;
        fn: any;
    }
    interface ISolver1D extends ISolver {
        solve: (min?: number, max?: number, step?: number) => any[];
    }
    interface ISolver2D extends ISolver {
        solve: (min?: number, max?: number, step?: number) => any[];
    }
    interface ISolver3D extends ISolver {
        solve: (min?: number, max?: number, step?: number) => any[];
    }
    class Solver {
        public min: number;
        public max: number;
        public step: number;
        public fn: any;
        constructor();
        public solve(min?: number, max?: number, step?: number): any[];
        public normalize(value: any): void;
    }
    class Solver1D extends Solver implements ISolver1D {
        public solve(min?: number, max?: number, step?: number): any[];
    }
    class Solver2D extends Solver implements ISolver2D {
        public solve(min?: number, max?: number, step?: number): any[];
    }
}
declare module dChart.Utils {
    interface IDataSrc {
        url: string;
        dataType: string;
        map: any;
    }
    class Loader {
        public url: string;
        public dataType: string;
        public map: any;
        public getData(callback: (data: any, map: any) => void): void;
        public normalize(value: any): void;
    }
}
declare module dChart {
    interface IDataSetFn extends dChart.Utils.ISolver {
        fn: string;
    }
    interface IDataSet {
        lineStyle: dChart.Utils.LineStyle;
        areaStyle: dChart.Utils.AreaStyle;
        symbolStyle: dChart.Utils.SymbolStyle;
        fontStyle: dChart.Utils.FontStyle;
        interpolate: string;
        label: string;
        dataSrc: dChart.Utils.IDataSrc;
        dataFn: IDataSetFn;
        data: dChart.IPoint[];
    }
    class DataSet {
        public chart: any;
        public showLine: boolean;
        public showArea: boolean;
        public showSymbol: boolean;
        public showValues: boolean;
        public solver: dChart.Utils.Solver;
        public data: any[];
        public label: string;
        public interpolate: string;
        public visible: boolean;
        public lineStyle: dChart.Utils.LineStyle;
        public areaStyle: dChart.Utils.AreaStyle;
        public symbolStyle: dChart.Utils.SymbolStyle;
        public fontStyle: dChart.Utils.FontStyle;
        constructor(chart: any);
        public parse(elem: Element): void;
        public normalize(value: any): void;
        public clear(): void;
        public calculate(): void;
        public min(axis: string): number;
        public max(axis: string): number;
    }
}
declare module dChart.Utils {
    class Transition {
        public duration: number;
        public delay: number;
        public ease: string;
        public normalize(value: any): void;
    }
}
declare module dChart {
    interface IChart {
        elem: string;
        label: string;
        description: string;
        fontStyle: dChart.Utils.FontStyle;
        width: number;
        height: number;
        marginTop: number;
        marginLeft: number;
        marginBottom: number;
        marginRight: number;
        transition: dChart.Utils.Transition;
        dataSets: dChart.IDataSet[];
    }
    interface IChart2DAxis {
        x: dChart.IAxis;
        y: dChart.IAxis;
    }
    interface IChart2D extends IChart {
        axis: IChart2DAxis;
    }
    interface IChart3DAxis {
        x: dChart.IAxis;
        y: dChart.IAxis;
        z: dChart.IAxis;
    }
    interface IChart3D extends IChart {
        axis: IChart3DAxis;
    }
    class Chart {
        public svg: D3.Selection;
        public container: D3.Selection;
        public axisContainer: D3.Selection;
        public dataContainer: D3.Selection;
        public labelContainer: D3.Selection;
        public elem: Element;
        public elemId: string;
        public marginLeft: number;
        public marginRight: number;
        public marginTop: number;
        public marginBottom: number;
        public width: number;
        public height: number;
        public nettoWidth: number;
        public nettoHeight: number;
        public showTransition: boolean;
        public transition: dChart.Utils.Transition;
        public svgLabel: D3.Selection;
        public label: string;
        public svgDescription: D3.Selection;
        public description: string;
        public fontStyle: dChart.Utils.FontStyle;
        public dataSets: dChart.DataSet[];
        public format: any;
        constructor();
        public clear(): void;
        public getPoint(): dChart.Point;
        public getSolver(): dChart.Utils.Solver;
        public redraw(): void;
        public draw(): void;
        public drawAxis(): void;
        public redrawAxis(): void;
        public drawData(): void;
        public redrawData(): void;
        public normalize(value: any): void;
        public recalculate(): void;
    }
    class Chart2D extends Chart {
        public xAxis: dChart.xAxis;
        public yAxis: dChart.yAxis;
        public getPoint(): dChart.Point2D;
        public getSolver(): dChart.Utils.Solver2D;
        public redraw(): void;
        public drawAxis(): void;
        public redrawAxis(): void;
        public drawData(): void;
        public redrawData(): void;
        public min(axis?: string): number;
        public max(axis?: string): number;
        public normalize(value: any): void;
    }
    class Chart3D extends Chart {
        public dataSets: dChart.DataSet[];
        public depth: number;
        public xAxis: dChart.xAxis;
        public yAxis: dChart.yAxis;
        public zAxis: dChart.zAxis;
        public getPoint(): dChart.Point3D;
        public drawAxis(): void;
        public redrawAxis(): void;
        public drawData(): void;
        public redrawData(): void;
        public min(axis?: string): number;
        public max(axis?: string): number;
        public normalize(value: any): void;
    }
    class LineChart extends Chart2D {
        public svgLineContainer: D3.Selection[];
        public svgSymbolContainer: D3.Selection[];
        public svgLine: D3.Selection[];
        constructor(config?: IChart2D);
        public drawData(): void;
        public redrawData(): void;
    }
    class AreaChart extends Chart2D {
        public svgAreaContainer: D3.Selection[];
        public svgSymbolContainer: D3.Selection[];
        public svgArea: D3.Selection[];
        constructor(config?: IChart2D);
        public drawData(): void;
        public redrawData(): void;
    }
    class BarChart extends Chart2D {
        public svgRectContainer: D3.Selection[];
        constructor(config?: IChart2D);
        public drawData(): void;
        public redrawData(): void;
    }
    class ScatterChart extends Chart2D {
        public svgScatterContainer: D3.Selection[];
        constructor(config?: IChart2D);
        public drawData(): void;
        public redrawData(): void;
    }
    class PieChart extends Chart {
        public svgPieContainer: D3.Selection[];
        public numPoints: number;
        public colorScale: any;
        constructor(config?: IChart);
        public getPoint(): dChart.Point1D;
        public getSolver(): dChart.Utils.Solver1D;
        public drawData(): void;
        public redrawData(): void;
    }
}
