/// <reference path="../../d.ts/DefinitelyTyped/d3/d3.d.ts" />
/// <reference path="../../lib/d3-styles/dist/d3-styles.d.ts" />
declare module dChart.Utils {
    class Animation {
        static animateAlongPath(path: any): (t: any) => string;
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
    class Filter {
        public key: string;
        public operator: string;
        public value: any;
        public is(object: any): boolean;
        public not(object: any): boolean;
        public normalize(value: any): void;
    }
}
declare module dChart.Utils {
    interface IDataSrc {
        url: string;
        dataType: string;
        map: any;
        filter: Utils.Filter;
    }
    class Loader {
        public url: string;
        public dataType: string;
        public map: any;
        public getData(callback: (data: any, map: any) => void): void;
        public getJsonData(callback: (data: any, map: any) => void): void;
        public getTxtData(callback: (data: any, map: any) => void): void;
        public getCsvData(callback: (data: any, map: any) => void): void;
        public getTsvData(callback: (data: any, map: any) => void): void;
        public normalize(value: any): void;
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
    class Style {
        public clone();
    }
    class LineStyle extends Style {
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
        public stroke: string;
        public normalize(value: any): void;
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
    interface ISvgContainer {
        chart: D3.Selection;
        root: D3.Selection;
        axis: D3.Selection;
        data: D3.Selection;
        label: D3.Selection;
        legend: D3.Selection;
    }
    interface IFontContainer {
        root: dChart.Utils.FontStyle;
        axis: dChart.Utils.FontStyle;
        ticks: dChart.Utils.FontStyle;
        legend: dChart.Utils.FontStyle;
        label: dChart.Utils.FontStyle;
        description: dChart.Utils.FontStyle;
    }
    class Chart {
        public _svg: ISvgContainer;
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
        public label: string;
        public description: string;
        public _font: IFontContainer;
        public fontStyle: dChart.Utils.FontStyle;
        public dataSets: dChart.DataSet[];
        public format: any;
        constructor();
        public clear(): void;
        public initialize(): void;
        public initializeFormat(): void;
        public initializeFonts(): void;
        public setFormat(format: string): Chart;
        public getPoint(): dChart.Point;
        public getSolver(): dChart.Utils.Solver;
        public redraw(): void;
        public draw(): void;
        public drawLabel(): void;
        public redrawLabel(): void;
        public drawLegend(): void;
        public redrawLegend(): void;
        public drawAxis(): void;
        public redrawAxis(): void;
        public drawData(): void;
        public redrawData(): void;
        public normalize(value: any): void;
        public recalculate(): void;
        public unique(axis?: string): any[];
    }
    class Chart2D extends Chart {
        public xAxis: any;
        public yAxis: any;
        public initialize(): void;
        public setFormat(format: string): Chart2D;
        public getPoint(): dChart.Point;
        public getSolver(): dChart.Utils.Solver2D;
        public redraw(): void;
        public drawAxis(): void;
        public redrawAxis(): void;
        public drawData(): void;
        public redrawData(): void;
        public min(axis?: string);
        public max(axis?: string);
        public normalize(value: any): void;
    }
    class Chart3D extends Chart {
        public dataSets: dChart.DataSet[];
        public depth: number;
        public xAxis: any;
        public yAxis: any;
        public zAxis: any;
        public initialize(): void;
        public setFormat(format: string): Chart3D;
        public getPoint(): dChart.Point;
        public drawAxis(): void;
        public redrawAxis(): void;
        public drawData(): void;
        public redrawData(): void;
        public min(axis?: string);
        public max(axis?: string);
        public normalize(value: any): void;
    }
}
declare module dChart {
    interface IPoint {
        stroke: string;
        strokeWidth: number;
        strokeOpacity: number;
        fill: string;
        fillOpacity: number;
        label: string;
        x: number;
        y: number;
        z: number;
        sigma: number;
    }
    interface IPointMap {
        stroke: string;
        strokeWidth: string;
        strokeOpacity: string;
        fill: string;
        fillOpacity: string;
        x: string;
        y: string;
        z: string;
        sigma: string;
    }
    class Point {
        public x: number;
        public y: number;
        public z: number;
        public label: string;
        public lineStyle: dChart.Utils.LineStyle;
        public areaStyle: dChart.Utils.AreaStyle;
        public sigma: number;
        constructor(x?: number, y?: number, z?: number);
        public normalize(value: any): void;
        public map(value: any, map: IPointMap): void;
        public parse(elem: Element): void;
    }
}
declare module dChart {
    interface IAxis {
        label: string;
        labelAlign: string;
        labelOffset: number;
        format: string;
        gridStyle: dChart.Utils.LineStyle;
        fontStyle: dChart.Utils.FontStyle;
        scale: string;
        autorange: boolean;
        ticks: number;
        tickValues: string[];
        range: number[];
        domain: number[];
    }
    class Axis {
        public chart: any;
        public svg: D3.Selection;
        public svgLabel: D3.Selection;
        public lineStyle: dChart.Utils.LineStyle;
        public gridStyle: dChart.Utils.LineStyle;
        public fontStyle: dChart.Utils.FontStyle;
        public label: string;
        public format: any;
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
        public tickValues: number[];
        public tickLabels: string[];
        public tickSubdivide: boolean;
        public tickSize: number[];
        public tickPadding: number;
        public visible: boolean;
        constructor(chart: any);
        public addScaleFn(fn: string, args: any): void;
        public setOrientation(orientation?: string): Axis;
        public setFormat(format: string): Axis;
        public setDomain(domain: number[]): Axis;
        public setRange(range: number[]): Axis;
        public setAlign(align: string): Axis;
        public setLabelAlign(labelAlign: string): Axis;
        public getScale();
        public getAxis();
        public clear(): void;
        public draw(container: D3.Selection, min: number, max: number): void;
        public redraw(min?: number, max?: number): void;
        public normalize(value: any): void;
    }
    class xAxis extends Axis {
        public orientation: string;
        constructor(chart: any);
        public redraw(min?: number, max?: number): void;
    }
    class yAxis extends Axis {
        public orientation: string;
        constructor(chart: any);
        public redraw(min?: number, max?: number): void;
    }
    class zAxis extends Axis {
        public orientation: string;
        constructor(chart: any);
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
        public showLegend: boolean;
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
        public update(value: any): void;
        public updateData(value: any): void;
        public clear(): void;
        public calculate(): void;
        public min(axis: string);
        public max(axis: string);
        public unique(axis: string): any[];
    }
}
declare module dChart {
    class PointChart extends dChart.Chart2D {
        public svgSymbolContainer: D3.Selection[];
        constructor(config?: dChart.IChart2D);
        public drawData(): void;
        public redrawData(): void;
    }
}
declare module dChart {
    class AreaChart extends dChart.PointChart {
        public svgAreaContainer: D3.Selection[];
        public svgArea: D3.Selection[];
        constructor(config?: dChart.IChart2D);
        public drawData(): void;
        public redrawData(): void;
    }
}
declare module dChart {
    class BarChart extends dChart.Chart2D {
        public svgRectContainer: D3.Selection[];
        constructor(config?: dChart.IChart2D);
        public drawData(): void;
        public redrawData(): void;
    }
    class BarChartHorizontal extends dChart.Chart2D {
        public svgRectContainer: D3.Selection[];
        constructor(config?: dChart.IChart2D);
        public drawData(): void;
        public redrawData(): void;
    }
}
declare module dChart {
    class PieChart extends dChart.Chart {
        public svgPieContainer: D3.Selection[];
        public numPoints: number;
        public innerRadius: number;
        public colorScale: any;
        constructor(config?: dChart.IChart);
        public getPoint(): dChart.Point;
        public getSolver(): dChart.Utils.Solver1D;
        public drawData(): void;
        public redrawData(): void;
        public drawLegend(): void;
    }
}
declare module dChart {
    class DoughnutChart extends dChart.PieChart {
        public innerRadius: number;
        public normalize(value: any): void;
    }
}
declare module dChart {
    class LineChart extends dChart.PointChart {
        public svgLineContainer: D3.Selection[];
        public svgLine: D3.Selection[];
        constructor(config?: dChart.IChart2D);
        public drawData(): void;
        public redrawData(): void;
    }
}
declare module dChart {
    class ScatterChart extends dChart.Chart2D {
        public svgScatterContainer: D3.Selection[];
        constructor(config?: dChart.IChart2D);
        public drawData(): void;
        public redrawData(): void;
    }
}
