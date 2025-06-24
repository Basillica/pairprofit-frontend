import { ChartConfiguration, ChartTypeRegistry } from "chart.js";
import { BaseChartClass } from "./BaseChartClass";
import { resetZoom } from "chartjs-plugin-zoom";
import { ChartProps } from "./LineChart";

export class ScatterPlot extends BaseChartClass {
    private zoom: boolean;
    private zoomAction: () => void;
    private seed = Date.now();
    constructor(props: ChartProps) {
        super(props.chartType);
        this.zoom = props.zoom;
        this.zoomAction = props.zoomAction;
    }

    getConfig(): ChartConfiguration {
        return {
            type: "scatter" as keyof ChartTypeRegistry,
            data: this.setupData(),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: "bottom",
                        align: "start",
                        maxHeight: 20,
                        maxWidth: 20,
                    },
                    title: {
                        display: true,
                        text: "Scatter Chart",
                    },
                    zoom: {
                        zoom: {
                            drag: {
                                enabled: this.zoom,
                                backgroundColor: "#FAAA001A",
                                borderColor: "#FAAA00",
                                borderWidth: 2,
                            },
                            mode: "x",
                            onZoom: this.zoomAction,
                        },
                    },
                },
            },
        };
    }

    setupData() {
        return {
            datasets: [
                {
                    label: "Dataset 1",
                    data: this.bubbles(), //[232, 454, 656, 767, 687, 5, 343, 34, 456, 365, 433, 232],
                    borderColor: this.CHART_COLORS.red,
                    backgroundColor: this.transparentize(this.CHART_COLORS.red, 0.5),
                },
                {
                    label: "Dataset 2",
                    data: this.bubbles(), //[43, 343, 656, 34, 767, 899, 67, 789, 56, 56, 234, 657],
                    borderColor: this.CHART_COLORS.blue,
                    backgroundColor: this.transparentize(this.CHART_COLORS.blue, 0.5),
                },
            ],
        };
    }

    getActions() {
        return [
            {
                name: "Reset Zoom",
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

    bubbles() {
        return this.points(
            [232, 454, 656, 767, 687, 5, 343, 34, 456, 365, 433, 232],
            [43, 343, 656, 34, 767, 899, 67, 789, 56, 56, 234, 657]
        ).map((pt) => {
            pt.x = this.rand(0, 1000);
            return pt;
        });
    }

    points(xs: number[], ys: number[]) {
        return xs.map((x, i) => ({ x, y: ys[i] }));
    }

    rand(min: number, max: number) {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return min + (this.seed / 233280) * (max - min);
    }

    updateIgnoreRanges(
        chart: any,
        ranges: {
            yMax: number;
            yMin: number;
        }[]
    ) {
        chart.update();
    }
}
