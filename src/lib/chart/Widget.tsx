import { Chart, registerables, ChartEvent } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';
import { RadarChart } from './RadarChart';
import { ScatterPlot } from './ScatterPlot';

Chart.register(...registerables, zoomPlugin);

export enum ChartType {
    LineChart = 'LineChart',
    PieChart = 'PieChart',
    BarChart = 'BarChart',
    ScatterPlot = 'ScatterPlot',
    RadarChart = 'RadarChart',
}

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

export function getClassByValue(
    props: ChartProps
): LineChart | BarChart | RadarChart | ScatterPlot {
    switch (props.chartType) {
        case ChartType.LineChart:
            return new LineChart(props);
        case ChartType.BarChart:
            return new BarChart(props);
        case ChartType.RadarChart:
            return new RadarChart(props);
        case ChartType.ScatterPlot:
            return new ScatterPlot(props);
        default:
            throw new Error('Invalid enum value');
    }
}
