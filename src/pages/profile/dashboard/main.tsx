import { JSX, onMount } from 'solid-js';
import css_module from './style.module.css'
import { Chart, registerables } from 'chart.js';
import L from 'leaflet';

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
    <div class="col-md-6 col-lg-3">
        <div class={`${css_module.summary_card}`}>
            <div class={`${css_module.summary_card_icon} ${props.iconBgClass}`}>
                <i class={props.iconClass}></i>
            </div>
            <div class={`${css_module.summary_card_content}`}>
                <h2 class={`${css_module.summary_card_title}`}>{props.title}</h2>
                <p class={`${css_module.summary_card_value}`}>{props.value}</p>
            </div>
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
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Income (€)',
              data: [2500, 3000, 3200, 3800, 4000, 4500, 5000, 4800, 5200, 5500, 6000, 6500],
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
                label: (tooltipItem) => `Income: €${tooltipItem.formattedValue}`,
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
          maintainAspectRatio: true,
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
                  const total = dataset.data.reduce((prev, curr) => prev + curr, 0);
                  const currentValue = dataset.data[tooltipItem.dataIndex];
                  const percentage = Math.round((currentValue / total) * 100);
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
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
  
        // Sample customer data with coordinates
        const customerLocations: CustomerLocation[] = [
          { name: 'Customer 1', coordinates: [51.05, 13.73] }, // Dresden
          { name: 'Customer 2', coordinates: [50.85, 10.45] }, // Weimar
          { name: 'Customer 3', coordinates: [51.51, 9.93] }, // Göttingen
          { name: 'Customer 4', coordinates: [52.52, 13.40] }, // Berlin
          { name: 'Customer 5', coordinates: [48.13, 11.58] }, // Munich
        ];
  
        // Add markers for each customer location
        customerLocations.forEach((customer) => {
          L.marker(customer.coordinates).addTo(map).bindPopup(customer.name);
        });
      }
  });

  return (
    <div class='container-fluid'>
        <p class={`${css_module.dashboard_title}`}>Service Provider Dashboard</p>
        <div class="flex flex-wrap -mx-2">
            <div class="col-lg-8">
                <div class={`${css_module.contact_card}`}>
                    <h2 class={`${css_module.contact_title}`}>Contact Information</h2>
                    <p class={`${css_module.contact_details}`}>
                    <span class={`${css_module.contact_name}`}>Service Provider Name:</span> John Smith<br />
                    <span class={`${css_module.contact_name}`}>Email:</span> john.smith@example.com<br />
                    <span class={`${css_module.contact_name}`}>Phone:</span> +49 123 4567890<br />
                    <span class={`${css_module.contact_name}`}>Address:</span> 123 Main Street, Erfurt, Germany
                    </p>
                </div>
            </div>
            <div class="col-lg-4">
                <div class={`${css_module.contact_card}`}>
                    <h2 class={`${css_module.contact_title}`}>Contact Information</h2>
                    <p class={`${css_module.contact_details}`}>
                    <span class={`${css_module.contact_name}`}>Service Provider Name:</span> John Smith<br />
                    <span class={`${css_module.contact_name}`}>Email:</span> john.smith@example.com<br />
                    <span class={`${css_module.contact_name}`}>Phone:</span> +49 123 4567890<br />
                    <span class={`${css_module.contact_name}`}>Address:</span> 123 Main Street, Erfurt, Germany
                    </p>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap -mx-2">
            <SummaryCard iconClass="fas fa-dollar-sign" iconBgClass={`${css_module.income_icon}`} title="Total Income" value="€45,231.89" />
            <SummaryCard
                iconClass="fas fa-check-circle"
                iconBgClass={`${css_module.tasks_completed_icon}`}
                title="Tasks Completed"
                value="12,540"
            />
            <SummaryCard
                iconClass="fas fa-exclamation-circle"
                iconBgClass={`${css_module.tasks_open_icon}`}
                title="Tasks Open"
                value="342"
            />
            <SummaryCard iconClass="fas fa-phone" iconBgClass={`${css_module.contact_icon}`} title="Contact Views" value="5,678" />
        </div>
        <div class="flex flex-wrap -mx-2">
            <div class="col-lg-6">
                <div class={`${css_module.charter_card}`}>
                    <h2 class={`${css_module.chart_title}`}>Income Over Time</h2>
                    <canvas id={`income_chart_canvas`} class={`${css_module.income_chart_canvas}`} ref={incomeChartCanvas}></canvas>
                </div>

                <div class={`${css_module.latest_items_grid}`} style={"margin-bottom: 90px"}>
                    <LatestItemCard
                        title="Contact 1"
                        details={
                        <>
                            <span class={`${css_module.contact_name}`}>Name:</span> Michael Brown<br />
                            <span class={`${css_module.contact_name}`}>Email:</span> michael.brown@example.com<br />
                            <span class={`${css_module.contact_name}`}>Phone:</span> +49 987 6543210
                        </>
                        }
                    />
                    <LatestItemCard
                        title="Contact 2"
                        details={
                        <>
                            <span class={`${css_module.contact_name}`}>Name:</span> Sarah Williams<br />
                            <span class={`${css_module.contact_name}`}>Email:</span> sarah.williams@example.com<br />
                            <span class={`${css_module.contact_name}`}>Phone:</span> +49 876 5432109
                        </>
                        }
                    />
                </div>
                <div class={`${css_module.latest_items_grid}`} style={"margin-bottom: 20px"}>
                    <LatestItemCard
                        title="Contact 1"
                        details={
                        <>
                            <span class={`${css_module.contact_name}`}>Name:</span> Michael Brown<br />
                            <span class={`${css_module.contact_name}`}>Email:</span> michael.brown@example.com<br />
                            <span class={`${css_module.contact_name}`}>Phone:</span> +49 987 6543210
                        </>
                        }
                    />
                    <LatestItemCard
                        title="Contact 2"
                        details={
                        <>
                            <span class={`${css_module.contact_name}`}>Name:</span> Sarah Williams<br />
                            <span class={`${css_module.contact_name}`}>Email:</span> sarah.williams@example.com<br />
                            <span class={`${css_module.contact_name}`}>Phone:</span> +49 876 5432109
                        </>
                        }
                    />
                </div>
            </div>
            <div class="col-lg-6">
                <div class={`${css_module.charter_card}`}>
                    <h2 class={`${css_module.chart_title}`}>Task Status</h2>
                    <canvas id={`tasks_chart_canvas`} class={`${css_module.tasks_chart_canvas}`}  ref={tasksChartCanvas}></canvas>
                </div>
            </div>
        </div>


        <div class="flex flex-wrap -mx-2">
            <div class={css_module.chart_card}>
              <div class={css_module.chart_card_new} ref={mapDiv}></div>
            </div>
              {/* <div class={`${css_module.chart_card}`}>
                  <h2 class={`${css_module.chart_title}`}>Customer Locations</h2>
                  <div id="map" class={`${css_module.map}`}>
                    hello world
                  </div>
              </div> */}
            {/* </div> */}
        </div>

        
        <div class="flex flex-wrap -mx-2">
            <div class="col-lg-6">
                <div class={`${css_module.contact_card}`}>
                    <h2 class={`${css_module.contact_title}`}>Contact Information</h2>
                    <p class={`${css_module.contact_details}`}>
                    <span class={`${css_module.contact_name}`}>Service Provider Name:</span> John Smith<br />
                    <span class={`${css_module.contact_name}`}>Email:</span> john.smith@example.com<br />
                    <span class={`${css_module.contact_name}`}>Phone:</span> +49 123 4567890<br />
                    <span class={`${css_module.contact_name}`}>Address:</span> 123 Main Street, Erfurt, Germany
                    </p>
                </div>
            </div>
            <div class="col-lg-6">
                <div class={`${css_module.contact_card}`}>
                    <h2 class={`${css_module.contact_title}`}>Contact Information</h2>
                    <p class={`${css_module.contact_details}`}>
                    <span class={`${css_module.contact_name}`}>Service Provider Name:</span> John Smith<br />
                    <span class={`${css_module.contact_name}`}>Email:</span> john.smith@example.com<br />
                    <span class={`${css_module.contact_name}`}>Phone:</span> +49 123 4567890<br />
                    <span class={`${css_module.contact_name}`}>Address:</span> 123 Main Street, Erfurt, Germany
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}