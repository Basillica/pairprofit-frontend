import { JSX, onMount } from 'solid-js';
import css_module from './style.module.css';
import { Chart, registerables } from 'chart.js';
import L from 'leaflet'; // Make sure Leaflet CSS is also imported globally or in your App.css

Chart.register(...registerables);

interface SummaryCardProps {
    iconClass: string;
    iconBgClass: string;
    title: string;
    value: string | number;
}

interface CustomerLocation {
    name: string;
    coordinates: [number, number];
}

const SummaryCard = (props: SummaryCardProps) => {
    return (
        // Removed the outer div here, as SummaryCard itself is a block.
        // The margin/padding will be handled by the grid system.
        <div class={`${css_module.summary_card}`}>
            <div class={`${css_module.summary_card_icon} ${props.iconBgClass}`}>
                <i class={props.iconClass}></i>
            </div>
            <div class={`${css_module.summary_card_content}`}>
                <h2 class={`${css_module.summary_card_title}`}>
                    {props.title}
                </h2>
                <p class={`${css_module.summary_card_value}`}>{props.value}</p>
            </div>
        </div>
    );
};

interface LatestItemCardProps {
    title: string;
    details: JSX.Element;
}

const LatestItemCard = (props: LatestItemCardProps) => {
    return (
        <div class={`${css_module.latest_item_card}`}>
            <h3 class={`${css_module.latest_item_title}`}>{props.title}</h3>
            <p class={`${css_module.latest_item_details}`}>{props.details}</p>
        </div>
    );
};

export const ServiceProviderDashboard = () => {
    let incomeChartCanvas: HTMLCanvasElement | undefined;
    let tasksChartCanvas: HTMLCanvasElement | undefined;
    let mapDiv: HTMLDivElement | undefined;

    onMount(() => {
        if (incomeChartCanvas) {
            const incomeChartCtx = incomeChartCanvas.getContext('2d');
            new Chart(incomeChartCtx!, {
                type: 'line',
                data: {
                    labels: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                    ],
                    datasets: [
                        {
                            label: 'Income (€)',
                            data: [
                                2500, 3000, 3200, 3800, 4000, 4500, 5000, 4800,
                                5200, 5500, 6000, 6500,
                            ],
                            backgroundColor: '#10b981',
                            borderColor: '#10b981',
                            borderWidth: 3,
                            fill: false,
                            pointRadius: 5,
                            pointHoverRadius: 7,
                            pointBackgroundColor: '#10b981',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Set to false for better control with CSS
                    plugins: {
                        title: {
                            display: false,
                        },
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: '#fff',
                            titleColor: '#1e293b',
                            bodyColor: '#374151',
                            borderColor: '#e5e7eb',
                            borderWidth: 1,
                            cornerRadius: 4,
                            displayColors: false,
                            callbacks: {
                                label: (tooltipItem) =>
                                    `Income: €${tooltipItem.formattedValue}`,
                            },
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                color: '#4b5563',
                            },
                        },
                        y: {
                            grid: {
                                color: '#e5e7eb',
                            },
                            ticks: {
                                color: '#4b5563',
                                callback: (value) => `€${value}`,
                            },
                        },
                    },
                },
            });
        }

        if (tasksChartCanvas) {
            const tasksChartCtx = tasksChartCanvas.getContext('2d');
            new Chart(tasksChartCtx!, {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'Open'],
                    datasets: [
                        {
                            label: 'Tasks',
                            data: [12540, 342],
                            backgroundColor: ['#3b82f6', '#f59e0b'],
                            borderWidth: 0,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Set to false for better control with CSS
                    plugins: {
                        title: {
                            display: false,
                        },
                        legend: {
                            position: 'center',
                            labels: {
                                color: '#4b5563',
                                usePointStyle: true,
                                padding: 20,
                            },
                        },
                        tooltip: {
                            backgroundColor: '#fff',
                            titleColor: '#1e293b',
                            bodyColor: '#374151',
                            borderColor: '#e5e7eb',
                            borderWidth: 1,
                            cornerRadius: 4,
                            callbacks: {
                                label: (tooltipItem) => {
                                    const dataset = tooltipItem.dataset;
                                    const total = dataset.data.reduce(
                                        (prev, curr) => prev + curr,
                                        0
                                    );
                                    const currentValue =
                                        dataset.data[tooltipItem.dataIndex];
                                    const percentage = Math.round(
                                        (currentValue / total) * 100
                                    );
                                    return `${tooltipItem.label}: ${currentValue} (${percentage}%)`;
                                },
                            },
                        },
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                    },
                },
            });
        }

        if (mapDiv) {
            // Initialize Leaflet Map
            const map = L.map(mapDiv).setView([50.94, 11.09], 6); // Erfurt, Germany
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            // Sample customer data with coordinates
            const customerLocations: CustomerLocation[] = [
                { name: 'Customer 1', coordinates: [51.05, 13.73] }, // Dresden
                { name: 'Customer 2', coordinates: [50.85, 10.45] }, // Weimar
                { name: 'Customer 3', coordinates: [51.51, 9.93] }, // Göttingen
                { name: 'Customer 4', coordinates: [52.52, 13.4] }, // Berlin
                { name: 'Customer 5', coordinates: [48.13, 11.58] }, // Munich
            ];

            // Add markers for each customer location
            customerLocations.forEach((customer) => {
                L.marker(customer.coordinates)
                    .addTo(map)
                    .bindPopup(customer.name);
            });
        }
    });

    return (
        // Added a main container for the dashboard
        <div class={css_module.dashboard_container}>
            <p class={`${css_module.dashboard_title}`}>
                Service Provider Dashboard
            </p>

            {/* Row 1: Contact Cards */}
            <div class="flex flex-wrap -mx-2">
                {' '}
                {/* Negative margin to offset inner padding */}
                <div class="w-full lg:w-6/12 px-2">
                    <div class={`${css_module.contact_card}`}>
                        <h2 class={`${css_module.contact_title}`}>
                            Your Contact Information
                        </h2>
                        <p class={`${css_module.contact_details}`}>
                            <span class={`${css_module.contact_name}`}>
                                Service Provider Name:
                            </span>{' '}
                            John Smith
                            <br />
                            <span class={`${css_module.contact_name}`}>
                                Email:
                            </span>{' '}
                            john.smith@example.com
                            <br />
                            <span class={`${css_module.contact_name}`}>
                                Phone:
                            </span>{' '}
                            +49 123 4567890
                            <br />
                            <span class={`${css_module.contact_name}`}>
                                Address:
                            </span>{' '}
                            123 Main Street, Erfurt, Germany
                        </p>
                    </div>
                </div>
                <div class="w-full lg:w-6/12 px-2">
                    <div class={`${css_module.contact_card}`}>
                        <h2 class={`${css_module.contact_title}`}>
                            Support Contact
                        </h2>
                        <p class={`${css_module.contact_details}`}>
                            <span class={`${css_module.contact_name}`}>
                                Support Name:
                            </span>{' '}
                            Jane Doe
                            <br />
                            <span class={`${css_module.contact_name}`}>
                                Email:
                            </span>{' '}
                            support@example.com
                            <br />
                            <span class={`${css_module.contact_name}`}>
                                Phone:
                            </span>{' '}
                            +49 987 6543210
                            <br />
                            <span class={`${css_module.contact_name}`}>
                                Hours:
                            </span>{' '}
                            Mon-Fri, 9 AM - 5 PM (CET)
                        </p>
                    </div>
                </div>
            </div>

            {/* Row 2: Summary Cards */}
            <div class="flex flex-wrap -mx-2">
                <div class="w-full sm:w-6/12 lg:w-3/12 px-2">
                    <SummaryCard
                        iconClass="fas fa-dollar-sign"
                        iconBgClass={`${css_module.income_icon}`}
                        title="Total Income"
                        value="€45,231.89"
                    />
                </div>
                <div class="w-full sm:w-6/12 lg:w-3/12 px-2">
                    <SummaryCard
                        iconClass="fas fa-check-circle"
                        iconBgClass={`${css_module.tasks_completed_icon}`}
                        title="Tasks Completed"
                        value="12,540"
                    />
                </div>
                <div class="w-full sm:w-6/12 lg:w-3/12 px-2">
                    <SummaryCard
                        iconClass="fas fa-exclamation-circle"
                        iconBgClass={`${css_module.tasks_open_icon}`}
                        title="Open Tasks"
                        value="342"
                    />
                </div>
                <div class="w-full sm:w-6/12 lg:w-3/12 px-2">
                    <SummaryCard
                        iconClass="fas fa-users" // Changed icon to represent views better
                        iconBgClass={`${css_module.contact_icon}`}
                        title="Profile Views" // Renamed for clarity
                        value="5,678"
                    />
                </div>
            </div>

            {/* Row 3: Charts and Map */}
            <div class="flex flex-wrap -mx-2">
                <div class="w-full lg:w-6/12 px-2">
                    <div class={`${css_module.chart_card}`}>
                        <h2 class={`${css_module.chart_title}`}>
                            Income Over Time
                        </h2>
                        <canvas
                            id={`income_chart_canvas`}
                            class={`${css_module.income_chart_canvas}`}
                            ref={incomeChartCanvas}
                        ></canvas>
                    </div>
                </div>
                <div class="w-full lg:w-6/12 px-2">
                    <div class={`${css_module.chart_card}`}>
                        <h2 class={`${css_module.chart_title}`}>
                            Customer Locations
                        </h2>
                        <div
                            ref={mapDiv}
                            class={`${css_module.map_container}`}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Row 4: Task Status Chart and Latest Items */}
            <div class="flex flex-wrap -mx-2">
                <div class="w-full lg:w-6/12 px-2">
                    <div class={`${css_module.chart_card}`}>
                        <h2 class={`${css_module.chart_title}`}>
                            Task Status Overview
                        </h2>
                        <canvas
                            id={`tasks_chart_canvas`}
                            class={`${css_module.tasks_chart_canvas}`}
                            ref={tasksChartCanvas}
                        ></canvas>
                    </div>
                </div>
                <div class="w-full lg:w-6/12 px-2">
                    <div class={`${css_module.latest_items_wrapper}`}>
                        <h2 class={`${css_module.latest_section_title}`}>
                            Latest Customer Interactions
                        </h2>
                        <div class={`${css_module.latest_items_grid}`}>
                            <LatestItemCard
                                title="New Inquiry - John Doe"
                                details={
                                    <>
                                        <span
                                            class={`${css_module.contact_name}`}
                                        >
                                            Service:
                                        </span>{' '}
                                        Plumbing Repair
                                        <br />
                                        <span
                                            class={`${css_module.contact_name}`}
                                        >
                                            Date:
                                        </span>{' '}
                                        May 28, 2025
                                    </>
                                }
                            />
                            <LatestItemCard
                                title="Service Completed - Jane Smith"
                                details={
                                    <>
                                        <span
                                            class={`${css_module.contact_name}`}
                                        >
                                            Service:
                                        </span>{' '}
                                        Electrical Installation
                                        <br />
                                        <span
                                            class={`${css_module.contact_name}`}
                                        >
                                            Date:
                                        </span>{' '}
                                        May 27, 2025
                                    </>
                                }
                            />
                            <LatestItemCard
                                title="Feedback Received - Robert Green"
                                details={
                                    <>
                                        <span
                                            class={`${css_module.contact_name}`}
                                        >
                                            Service:
                                        </span>{' '}
                                        Carpentry Work
                                        <br />
                                        <span
                                            class={`${css_module.contact_name}`}
                                        >
                                            Rating:
                                        </span>{' '}
                                        5 Stars
                                    </>
                                }
                            />
                            <LatestItemCard
                                title="Appointment Scheduled - Emily White"
                                details={
                                    <>
                                        <span
                                            class={`${css_module.contact_name}`}
                                        >
                                            Service:
                                        </span>{' '}
                                        HVAC Maintenance
                                        <br />
                                        <span
                                            class={`${css_module.contact_name}`}
                                        >
                                            Date:
                                        </span>{' '}
                                        June 1, 2025
                                    </>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
