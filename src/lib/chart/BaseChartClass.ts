import colorLib from '@kurkle/color';

export enum ChartType {
    LineChart = <any>'LineChart',
    PieChart = <any>'PieChart',
    BarChart = <any>'BarChart',
    AreaChart = <any>'AreaChart',
    RadarChart = <any>'RadarChart',
}

export const stringToEnumValue = <ET extends Record<string, any>, T>(
    enumObj: ET,
    str: string
): T => {
    const key = Object.keys(enumObj).find((k) => {
        const enumValue = (enumObj as any)[k];
        return String(enumValue) === str;
    });

    if (key) {
        return (enumObj as any)[key];
    } else {
        throw new Error(
            `String "${str}" does not correspond to any value in the provided enum.`
        );
    }
};

export class BaseChartClass {
    private colors: string[] = [
        '#4dc9f6',
        '#f67019',
        '#f53794',
        '#537bc4',
        '#acc236',
        '#166a8f',
        '#00a950',
        '#58595b',
        '#8549ba',
    ];
    private months: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    CHART_COLORS = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)',
    };

    private NAMED_COLORS: string[] = [
        this.CHART_COLORS.red,
        this.CHART_COLORS.orange,
        this.CHART_COLORS.yellow,
        this.CHART_COLORS.green,
        this.CHART_COLORS.blue,
        this.CHART_COLORS.purple,
        this.CHART_COLORS.grey,
    ];

    private chartType: ChartType;
    constructor(chartType: string) {
        this.chartType = stringToEnumValue(ChartType, chartType);
    }

    getColors(): string[] {
        return this.colors;
    }

    getMonths(): string[] {
        return this.months;
    }

    getChartType(): ChartType {
        return this.chartType;
    }

    getNamedColors(): string[] {
        return this.NAMED_COLORS;
    }

    transparentize(value: string, opacity: number) {
        var alpha = opacity === undefined ? 0.5 : 1 - opacity;
        return colorLib(value).alpha(alpha).rgbString();
    }
}
