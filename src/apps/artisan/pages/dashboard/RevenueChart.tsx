import { Component, onMount } from 'solid-js';
import Chart, { ChartConfiguration } from 'chart.js/auto';

export const RevenueChart: Component<{
    totalRevenue: string;
    dateRange: string;
}> = (props) => {
    let chartRef: HTMLCanvasElement | undefined;

    // Chart Data
    const chartData = {
        labels: ['01', '02', '03', '04', '05', '06', '07'],
        datasets: [
            {
                label: 'Revenue',
                data: [18000, 24000, 16000, 32000, 28000, 40000, 35000],
                borderColor: '#373F63', // Blue-600/700
                borderWidth: 1,

                // --- PLOT MODIFICATIONS FOR DOTS AND STRAIGHT LINES ---
                tension: 0, // 0 for straight lines (linear plot)
                pointRadius: 4, // Show points with a radius of 4px
                // -----------------------------------------------------

                fill: true, // Enable gradient fill for the area
                pointBackgroundColor: '#0C4A6E', // Color the dots
                pointHitRadius: 5,
                backgroundColor: undefined as any,
            },
        ],
    };

    /**
     * Creates a linear gradient for the chart background area.
     * This function is called by Chart.js during the drawing process.
     * @param context The ScriptableContext provided by Chart.js
     */
    const createGradient = (context: any) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
            return;
        }

        // Gradient goes from the top of the chartArea to the bottom
        const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
        );

        // Gradient colors matching the visual style (light blue to transparent)
        gradient.addColorStop(0, 'rgba(14, 165, 233, 0.4)'); // Sky-500 with opacity
        gradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.1)');
        gradient.addColorStop(1, 'rgba(14, 165, 233, 0)'); // Transparent

        return gradient;
    };

    // Chart Configuration
    const chartConfig: ChartConfiguration = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: (context) => `$${context.formattedValue}`,
                    },
                },
            },
            scales: {
                y: {
                    min: 0,
                    max: 40000,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10000,
                        color: '#94A3B8',
                        callback: function (value) {
                            return value === 0
                                ? '0'
                                : `${(value as number) / 1000}k`;
                        },
                    },
                    grid: {
                        color: '#E2E8F0',
                    },
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94A3B8' },
                },
            },
        },
    };

    // SolidJS Lifecycle: Initialize Chart.js on component mount
    onMount(() => {
        if (chartRef) {
            chartConfig.data.datasets[0].backgroundColor = createGradient;
            new Chart(chartRef, chartConfig);
        } else {
            console.error('Chart canvas ref not found.');
        }
    });

    return (
        // Using 'class' as the SolidJS standard requires
        <div class="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm h-[420px] flex flex-col">
            {/* Header */}
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 flex-shrink-0">
                <div class="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-0">
                    <h3 class="text-lg font-medium text-slate-700">
                        Total Revenue on:
                    </h3>
                    <h2 class="text-2xl font-bold text-gray-900">
                        {props.totalRevenue}
                    </h2>
                </div>

                {/* Date Range Selector (Button element) */}
                <button
                    class="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center"
                    aria-label="Select date range"
                >
                    <span>{props.dateRange}</span>
                    {/* Icon Placeholder (Down Arrow) */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {/* Chart Canvas Area */}
            <div class="relative flex-grow min-h-0">
                <canvas
                    ref={chartRef}
                    aria-label="Monthly Revenue Chart"
                    // SolidJS style attribute
                    style={{
                        'flex-grow': '1',
                        width: '100%',
                        'min-height': '0',
                    }}
                ></canvas>
            </div>
        </div>
    );
};
