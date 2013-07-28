declare module dChart.Utils {
    class Elem {
        static getFloat(value: Element): number;
        static getSize(value: Element): Size;
        static getColor(value: Element): Color;
        static getDate(value: Element): Date;
    }
    class Color {
        public value: string;
        constructor(value: string);
        public get(): string;
        public RGB();
        public HSL();
        public HCL();
        public LAB();
    }
    class Size {
        public value: number;
        constructor(value: number);
        public get(): string;
        public sub(d: Size): Size;
        public add(d: Size): Size;
        public mul(d: Size): Size;
        public div(d: Size): Size;
    }
    interface IStyle {
        get();
    }
    class LineStyle implements IStyle {
        public stroke: Color;
        public strokeWidth: Size;
        public strokeOpacity: number;
        public get(): string;
    }
    class AreaStyle implements IStyle {
        public fill: Color;
        public fillOpacity: number;
        public get(): string;
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
    class Point {
        public lineStyle: dChart.Utils.LineStyle;
        public areaStyle: dChart.Utils.AreaStyle;
        public normalize(value: any): void;
        public parse(elem: Element): void;
    }
    class Point1D extends Point {
        public x: number;
        constructor(x?: number);
        public normalize(value: any): void;
        public parse(elem: Element): void;
    }
    class Point2D extends Point {
        public x: number;
        public y: number;
        constructor(x?: number, y?: number);
        public parse(elem: Element): void;
    }
    class Point2DTime extends Point {
        public x: number;
        public t: Date;
        constructor(x?: number, t?: Date);
        public parse(elem: Element): void;
    }
    class Point3D extends Point {
        public x: number;
        public y: number;
        public z: number;
        constructor(x?: number, y?: number, z?: number);
        public parse(elem: Element): void;
    }
    class Point3DTime extends Point {
        public x: number;
        public y: number;
        public t: Date;
        constructor(x?: number, y?: number, t?: Date);
        public parse(elem: Element): void;
    }
    class Axis {
        public axisLabel: string;
        public clamp: boolean;
        public range: number[];
        public rangeAuto: boolean;
        public scale: string;
        public align: string;
        public labelAlign: string;
        public nice: number[];
        public ticks: number;
        public ticksFormat: string[];
        public visible: boolean;
        constructor(axisLabel: string);
        public draw(length: dChart.Utils.Size, min: number, max: number): void;
    }
    class DataSet {
        public dataSetLabel: string;
        public data: Point[];
        public label: string;
        public solver: dChart.Solver.ISolver;
        public interpolate: string;
        public visible: boolean;
        public lineStyle: dChart.Utils.LineStyle;
        public areaStyle: dChart.Utils.AreaStyle;
        constructor(dataSetLabel: string);
        public Point(): Point;
        public recalculate(): void;
        public parse(elem: Element): void;
        public min(axis: string): number;
        public max(axis: string): number;
        public parseDataAttr(value: Node): void;
    }
    class DataSet2D extends DataSet {
        public data: Point2D[];
        public solver: dChart.Solver.ISolver2D;
        public Point(): Point2D;
        public recalculate(): void;
        public min(axis: string): number;
        public max(axis: string): number;
    }
    class DataSet3D extends DataSet {
        public data: Point3D[];
        public solver: dChart.Solver.ISolver3D;
        public Point(): Point3D;
        public recalculate(): void;
        public min(axis: string): number;
        public max(axis: string): number;
    }
    class Chart {
        public chartWidth: dChart.Utils.Size;
        public chartHeight: dChart.Utils.Size;
        public chartMarginLeft: dChart.Utils.Size;
        public chartMarginRight: dChart.Utils.Size;
        public chartMarginTop: dChart.Utils.Size;
        public chartMarginBottom: dChart.Utils.Size;
        public chartTitle: string;
        public chartDescription: string;
        constructor(chartWidth?: dChart.Utils.Size, chartHeight?: dChart.Utils.Size);
    }
    class Chart2D extends Chart {
        public dataSets: DataSet2D[];
        public xAxis: Axis;
        public yAxis: Axis;
        public drawAxis(): void;
        public min(axis?: string): number;
        public max(axis?: string): number;
    }
    class Chart3D extends Chart {
        public dataSets: DataSet3D[];
        public chartDepth: dChart.Utils.Size;
        public xAxis: Axis;
        public yAxis: Axis;
        public zAxis: Axis;
        public drawAxis(): void;
        public min(axis?: string): number;
        public max(axis?: string): number;
    }
}
