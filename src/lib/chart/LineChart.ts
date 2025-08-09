import { ChartConfiguration, ChartTypeRegistry, ChartEvent } from 'chart.js';
import { BaseChartClass } from './BaseChartClass';
import { resetZoom } from 'chartjs-plugin-zoom';

type IgnoreRangeType = {
    type: keyof ChartTypeRegistry;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    xMax: string;
    xMin: string;
    yMax: number;
    yMin: number;
    xScaleID: string;
    yScaleID: string;
    enter?: ({ element }: { element: any }) => boolean;
    leave?: ({ element }: { element: any }) => boolean;
    click?: ({ element }: { element: any }) => void;
};

export type ChartProps = {
    chartType: string;
    yLabel: string;
    xLabel: string;
    ignoreRanges: { yMax: number; yMin: number }[];
    yMax: number;
    yMin: number;
    zoom: boolean;
    zoomAction: () => void;
    onHover: (e: ChartEvent, zoomEnabled: boolean) => void;
};

export class LineChart extends BaseChartClass {
    private zoom: boolean;
    private element: any; // AnnotationElement;
    private lastEvent: any;
    private ignoreRanges: { yMax: number; yMin: number }[];
    private yMax: number;
    private yMin: number;
    private chartProps: ChartProps;
    private onHover: (e: ChartEvent, zoomEnabled: boolean) => void;
    private zoomAction: () => void;
    constructor(props: ChartProps) {
        super(props.chartType);
        this.zoom = props.zoom;
        this.ignoreRanges = props.ignoreRanges;
        this.yMax = props.yMax;
        this.yMin = props.yMin;
        this.chartProps = props;
        this.zoomAction = props.zoomAction;
        this.onHover = props.onHover;
    }

    drag(moveX: number, moveY: number) {
        this.element.x += moveX;
        this.element.y += moveY;
        this.element.x2 += moveX;
        this.element.y2 += moveY;
        this.element.centerX += moveX;
        this.element.centerY += moveY;
        if (this.element.elements && this.element.elements.length) {
            for (const subEl of this.element.elements) {
                subEl.x += moveX;
                subEl.y += moveY;
                subEl.x2 += moveX;
                subEl.y2 += moveY;
                subEl.centerX += moveX;
                subEl.centerY += moveY;
                subEl.bX += moveX;
                subEl.bY += moveY;
            }
        }
    }

    handleElementDragging(event: any) {
        if (!this.lastEvent || !this.element) {
            return;
        }
        const moveX = event.x - this.lastEvent.x;
        const moveY = event.y - this.lastEvent.y;
        this.drag(moveX, moveY);
        this.lastEvent = event;
        return true;
    }

    handleDrag(event: any) {
        if (this.element) {
            switch (event.type) {
                case 'mousemove':
                    return this.handleElementDragging(event);
                case 'mouseout':
                case 'mouseup':
                    this.lastEvent = undefined;
                    break;
                case 'mousedown':
                    this.lastEvent = event;
                    break;
                default:
            }
        }
    }

    getAnnotations() {
        let ignoreRanges: IgnoreRangeType[] = [];
        let ranges = [
            {
                yMax: 12,
                yMin: 15,
            },
            {
                yMax: 20,
                yMin: 25,
            },
        ];
        for (let index = 0; index < ranges.length; index++) {
            const element = ranges[index];
            ignoreRanges.push({
                type: 'box' as keyof ChartTypeRegistry,
                backgroundColor: 'rgba(250, 170, 0, 0.05)',
                borderColor: '#FAAA00',
                borderWidth: 1,
                xMax: 'December',
                xMin: 'January',
                yMax: element.yMax,
                yMin: element.yMin,
                xScaleID: 'x',
                yScaleID: 'y',
            });
        }
        return ignoreRanges;
    }

    getConfig(): ChartConfiguration {
        return {
            type: 'line' as keyof ChartTypeRegistry,
            // data: this.setupData(),
            // plugins: [this.dragger()],
            options: {
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: this.chartProps.yLabel,
                        },
                        min: this.yMin,
                        max: this.yMax,
                        stacked: true,
                    },
                    x: {
                        title: {
                            display: true,
                            text: this.chartProps.xLabel,
                        },
                    },
                },
                // events: ["mousedown", "mouseup", "mousemove", "mouseout"],

                responsive: true,
                onHover: (e: any) => console.log(e),
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'start',
                        maxHeight: 20,
                        maxWidth: 20,
                    },
                    title: {
                        display: true,
                        text: 'Line Chart',
                    },
                    zoom: {
                        zoom: {
                            drag: {
                                enabled: this.zoom,
                                backgroundColor: '#FAAA001A',
                                borderColor: '#FAAA00',
                                borderWidth: 2,
                            },
                            mode: 'x',
                            onZoom: this.zoomAction,
                        },
                    },
                    // @ts-ignore
                    annotation: {
                        common: {
                            drawTime: 'beforeDatasetsDraw',
                        },
                        // @ts-ignore
                        annotations: { ...this.getAnnotations() },
                    },
                },
            },
        };
    }

    setupData() {
        const dataset = {
            labels: this.getMonths(),
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [
                        232, 454, 656, 767, 687, 5, 343, 34, 456, 365, 433, 232,
                    ],
                    borderColor: this.CHART_COLORS.red,
                    backgroundColor: this.transparentize(
                        this.CHART_COLORS.red,
                        0.5
                    ),
                },
                {
                    label: 'Dataset 2',
                    data: [
                        43, 343, 656, 34, 767, 899, 67, 789, 56, 56, 234, 657,
                    ],
                    borderColor: this.CHART_COLORS.blue,
                    backgroundColor: this.transparentize(
                        this.CHART_COLORS.blue,
                        0.5
                    ),
                },
            ],
        };
        return dataset;
    }

    getActions() {
        let smooth = false;
        return [
            {
                name: 'Randomize',
                handler(chart: any) {
                    chart.data.datasets.forEach((dataset: any) => {
                        dataset.data = [
                            43, 343, 656, 34, 767, 899, 67, 789, 56, 56, 234,
                            657,
                        ];
                    });
                    chart.update();
                },
            },
            {
                name: 'Update',
                handler(chart: any) {
                    chart.data.datasets.forEach((dataset: any) => {
                        dataset.data = [
                            232, 454, 656, 767, 687, 5, 343, 34, 456, 365, 433,
                            232,
                        ];
                    });
                    chart.update();
                },
            },
            {
                name: 'Smooth',
                handler(chart: any) {
                    smooth = !smooth;
                    chart.options.elements.line.tension = smooth ? 0.4 : 0;
                    chart.update();
                },
            },
            {
                name: 'Reset Zoom',
                handler(chart: any) {
                    resetZoom(chart, chart.options.plugins.zoom.zoom.mode);
                },
            },
        ];
    }

    updateData(chart: any, label: string, data: number[]) {
        let c = chart.data.datasets.find((item: any) => item.label === label);
        c.data = data;
        chart.update();
    }

    updateIgnoreRanges(
        chart: any,
        ranges: {
            yMax: number;
            yMin: number;
        }[]
    ) {
        let annotations: IgnoreRangeType[] = [];
        for (let index = 0; index < ranges.length; index++) {
            const element = ranges[index];
            annotations.push({
                type: 'box' as keyof ChartTypeRegistry,
                backgroundColor: 'rgba(250, 170, 0, 0.05)',
                borderColor: '#FAAA00',
                borderWidth: 1,
                xMax: '',
                xMin: 'January',
                yMax: element.yMax,
                yMin: element.yMin,
                xScaleID: 'x',
                yScaleID: 'y',
            });
        }

        chart.options.plugins.annotation = {
            annotations: { ...annotations },
        };
        chart.update();
    }
}
