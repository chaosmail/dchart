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
    class Doc {
        static css(code: string): void;
    }
    class Elem {
        static getFloat(value: Element): number;
        static getColor(value: Element): string;
        static getDate(value: Element): Date;
    }
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
}
declare module dChart {
    interface IAxis {
        label: string;
        labelAlign: string;
        labelOffset: number;
        grid: boolean;
        scale: string;
        autorange: boolean;
        ticks: number;
        range: number[];
        domain: number[];
    }
    interface ITickSize {
        major: number;
        minor: number;
        end: number;
    }
    class Axis {
        public svg: D3.Selection;
        public svgLabel: D3.Selection;
        public label: string;
        public labelOffset: number;
        public range: number[];
        public domain: number[];
        public autorange: boolean;
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
        public tickSize: ITickSize;
        public tickPadding: number;
        public visible: boolean;
        constructor(orientation?: string, length?: number);
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
}
declare module dChart.Solver {
    interface ISolver {
        min: number;
        max: number;
        step: number;
    }
    interface ISolver2D extends ISolver {
        fn: (x: number) => number;
        solve: (min?: number, max?: number, step?: number) => dChart.Point2D[];
    }
    interface ISolver3D extends ISolver {
        fn: (x: number, y: number) => number;
        solve: (min?: number, max?: number, step?: number) => dChart.Point3D[];
    }
    class Solver2D implements ISolver2D {
        public min: number;
        public max: number;
        public step: number;
        public fn(x: number): number;
        public solve(min?: number, max?: number, step?: number): dChart.Point2D[];
    }
    class Solver3D implements ISolver3D {
        public min: number;
        public max: number;
        public step: number;
        public fn(x: number, y: number): number;
        public solve(min?: number, max?: number, step?: number): dChart.Point3D[];
    }
}
declare module dChart {
    interface IDataSetFn extends dChart.Solver.ISolver {
        fn: string;
    }
    interface IDataSet {
        lineStyle: dChart.Utils.LineStyle;
        areaStyle: dChart.Utils.AreaStyle;
        dotStyle: dChart.Utils.AreaStyle;
        dotRadius: number;
        interpolate: string;
        label: string;
        dataFn: IDataSetFn;
        data: dChart.IPoint[];
    }
    interface IDataSet2D extends IDataSet {
        data: dChart.IPoint2D[];
    }
    interface IDataSet2DTime extends IDataSet {
        data: dChart.IPoint2DTime[];
    }
    interface IDataSet3D extends IDataSet {
        data: dChart.IPoint3D[];
    }
    interface IDataSet3DTime extends IDataSet {
        data: dChart.IPoint3DTime[];
    }
    class DataSet {
        public showLine: boolean;
        public showArea: boolean;
        public showDots: boolean;
        public dotRadius: number;
        public data: dChart.Point[];
        public label: string;
        public solver: dChart.Solver.ISolver;
        public interpolate: string;
        public visible: boolean;
        public lineStyle: dChart.Utils.LineStyle;
        public areaStyle: dChart.Utils.AreaStyle;
        public dotStyle: dChart.Utils.AreaStyle;
        constructor();
        public recalculate(): void;
        public parse(elem: Element): void;
        public normalize(value: any): void;
        public min(axis: string): number;
        public max(axis: string): number;
    }
    class DataSet2D extends DataSet {
        public data: dChart.Point2D[];
        public solver: dChart.Solver.ISolver2D;
        public recalculate(): void;
        public min(axis: string): number;
        public max(axis: string): number;
        public normalize(value: any): void;
    }
    class DataSet3D extends DataSet {
        public data: dChart.Point3D[];
        public solver: dChart.Solver.ISolver3D;
        public recalculate(): void;
        public min(axis: string): number;
        public max(axis: string): number;
        public normalize(value: any): void;
    }
}
declare module dChart {
    interface IChart {
        elem: string;
        label: string;
        description: string;
        width: number;
        height: number;
        marginTop: number;
        marginLeft: number;
        marginBottom: number;
        marginRight: number;
        dataSets: dChart.IDataSet[];
    }
    interface IChart2DAxis {
        x: dChart.IAxis;
        y: dChart.IAxis;
    }
    interface IChart2D extends IChart {
        axis: IChart2DAxis;
        dataSets: dChart.IDataSet2D[];
    }
    interface IChart3DAxis {
        x: dChart.IAxis;
        y: dChart.IAxis;
        z: dChart.IAxis;
    }
    interface IChart3D extends IChart {
        axis: IChart3DAxis;
        dataSets: dChart.IDataSet3D[];
    }
    class Chart {
        public svg: D3.Selection;
        public container: D3.Selection;
        public axisContainer: D3.Selection;
        public dataContainer: D3.Selection;
        public labelContainer: D3.Selection;
        public descriptionContainer: D3.Selection;
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
        public label: string;
        public description: string;
        constructor(config?: IChart);
        public clear(): void;
        public redraw(): void;
        public draw(): void;
        public drawAxis(): void;
        public redrawAxis(): void;
        public drawData(): void;
        public redrawData(): void;
        public normalize(value: any): void;
    }
    class Chart2D extends Chart {
        public dataSets: dChart.DataSet2D[];
        public xAxis: dChart.Axis;
        public yAxis: dChart.Axis;
        constructor(config?: IChart2D);
        public drawAxis(): void;
        public redrawAxis(): void;
        public drawData(): void;
        public redrawData(): void;
        public min(axis?: string): number;
        public max(axis?: string): number;
        public normalize(value: any): void;
    }
    class Chart3D extends Chart {
        public dataSets: dChart.DataSet3D[];
        public depth: number;
        public xAxis: dChart.Axis;
        public yAxis: dChart.Axis;
        public zAxis: dChart.Axis;
        constructor(config?: IChart3D);
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
        public svgLine: D3.Selection[];
        constructor(config?: IChart2D);
        public drawData(): void;
        public redrawData(): void;
    }
}
