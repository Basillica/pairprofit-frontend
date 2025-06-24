import { ChartConfiguration } from "chart.js";
import { BaseChartClass } from "./BaseChartClass";
import { resetZoom } from "chartjs-plugin-zoom";
import { ChartProps } from "./LineChart";

export class BarChart extends BaseChartClass {
  private zoom: boolean;
  private zoomAction: () => void;
  constructor(props: ChartProps) {
    super(props.chartType);
    this.zoom = props.zoom;
    this.zoomAction = props.zoomAction;
  }

  getConfig(): ChartConfiguration {
    return {
      type: "bar",
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
            text: "Bar Chart - Stacked",
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
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    };
  }

  setupData() {
    return {
      labels: this.getMonths(),
      datasets: [
        {
          label: "Dataset 1",
          data: [232, 454, 656, 767, 687, 5, 343, 34, 456, 365, 433, 232],
          borderColor: this.CHART_COLORS.red,
          backgroundColor: this.transparentize(this.CHART_COLORS.red, 0.5),
        },
        {
          label: "Dataset 2",
          data: [43, 343, 656, 34, 767, 899, 67, 789, 56, 56, 234, 657],
          borderColor: this.CHART_COLORS.blue,
          backgroundColor: this.transparentize(this.CHART_COLORS.blue, 0.5),
        },
      ],
    };
  }

  getActions() {
    let smooth = false;
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
