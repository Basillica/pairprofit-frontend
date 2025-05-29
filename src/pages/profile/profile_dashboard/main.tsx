import { createSignal, For } from "solid-js";
import css_module from "./style.module.css"; // Ensure this path is correct

// --- Data Interfaces (same as before) ---
interface SalesMetric {
  value: string;
  change: number;
  chartData: number[];
}

interface OrderMetric {
  value: string;
  change: number;
}

interface MarketShareItem {
  name: string;
  color: string;
}

interface WeatherData {
  city: string;
  description: string;
  temperature: string;
  lowTemp: string;
  highTemp: string;
  iconClass: string;
}

interface Project {
  id: string;
  name: string;
  progress: number;
  timeSpent: string;
  initial: string;
  bgColor: string;
}

interface Product {
  id: number;
  name: string;
  subText: string;
  revenue: string;
  percentage: number;
  imageUrl: string;
}

interface SharedFile {
  id: number;
  fileName: string;
  owner: string;
  fileIconClass: string;
}

export const ProfileDashboard = () => {
  // --- Signals for Dashboard Data (same as before) ---
  const [sales] = createSignal<SalesMetric>({
    value: "$47K",
    change: 3.5,
    chartData: [5, 8, 12, 10, 15, 18, 16, 20],
  });

  const [totalOrder] = createSignal<OrderMetric>({
    value: "58.4K",
    change: -13.8,
  });

  const [marketShare] = createSignal<MarketShareItem[]>([
    { name: "Samsung", color: "#3B82F6" }, // Tailwind blue-500
    { name: "Huawei", color: "#22C55E" }, // Tailwind green-500
    { name: "Apple", color: "#6B7280" }, // Tailwind gray-500
  ]);

  const [weather] = createSignal<WeatherData>({
    city: "New York City",
    description: "Sunny",
    temperature: "31°",
    lowTemp: "22°",
    highTemp: "25°",
    iconClass: "fas fa-cloud-sun",
  });

  const [projects] = createSignal<Project[]>([
    {
      id: "F",
      name: "Falcon",
      progress: 90,
      timeSpent: "58:20:00",
      initial: "F",
      bgColor: "#3B82F6",
    },
    {
      id: "R",
      name: "Reign",
      progress: 78,
      timeSpent: "31:50:00",
      initial: "R",
      bgColor: "#22C55E",
    },
    {
      id: "B",
      name: "Bootst4",
      progress: 79,
      timeSpent: "25:20:00",
      initial: "B",
      bgColor: "#EF4444",
    }, // Red-500
    {
      id: "R2",
      name: "Raven",
      progress: 38,
      timeSpent: "12:50:00",
      initial: "R",
      bgColor: "#F59E0B",
    }, // Amber-500
    {
      id: "S",
      name: "Slick",
      progress: 40,
      timeSpent: "21:20:00",
      initial: "S",
      bgColor: "#8B5CF6",
    }, // Violet-500
  ]);

  const [storageUsage] = createSignal({
    usedMB: 1465,
    totalGB: 2,
    segments: [
      { label: "Regular", sizeMB: 895, color: "#3B82F6" },
      { label: "System", sizeMB: 379, color: "#22C55E" },
      { label: "Shared", sizeMB: 192, color: "#6B7280" },
    ],
  });

  const [bestSellingProducts] = createSignal<Product[]>([
    {
      id: 1,
      name: "Raven Pro",
      subText: "Landing",
      revenue: "$1311",
      percentage: 41,
      imageUrl: "https://picsum.photos/seed/raven/30",
    },
    {
      id: 2,
      name: "Apex Drone",
      subText: "Technology",
      revenue: "$980",
      percentage: 32,
      imageUrl: "https://picsum.photos/seed/drone/30",
    },
    {
      id: 3,
      name: "Aqua Watch",
      subText: "Wearables",
      revenue: "$750",
      percentage: 27,
      imageUrl: "https://picsum.photos/seed/watch/30",
    },
  ]);

  const [sharedFiles, _] = createSignal<SharedFile[]>([
    {
      id: 1,
      fileName: "apple-smart-watch.png",
      owner: "Antony. Just Now",
      fileIconClass: "far fa-file-image",
    },
    {
      id: 2,
      fileName: "project-brief.pdf",
      owner: "You. Yesterday",
      fileIconClass: "far fa-file-pdf",
    },
    {
      id: 3,
      fileName: "meeting-notes.docx",
      owner: "Alice. 2 days ago",
      fileIconClass: "far fa-file-word",
    },
  ]);

  // Helper to calculate total used storage for the progress bar
  const calculateTotalUsedMB = () => {
    return storageUsage().segments.reduce((sum, seg) => sum + seg.sizeMB, 0);
  };

  // Helper to calculate free space
  const calculateFreeSpaceMB = () => {
    return storageUsage().totalGB * 1024 - calculateTotalUsedMB();
  };

  return (
    <div class="min-h-screen bg-gray-100 p-4 font-sans antialiased">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div class={`${css_module.card}`}>
          <div class="p-4">
            <div class="flex justify-between items-start">
              <div>
                <h6 class="text-xs font-semibold uppercase text-gray-500 mb-1">
                  Weekly Sales
                </h6>
                <h3 class="text-3xl font-bold text-gray-800">
                  {sales().value}
                </h3>
              </div>
              <div
                class={`flex items-center text-sm ${
                  sales().change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                <i
                  class={`fas fa-caret-${
                    sales().change >= 0 ? "up" : "down"
                  } mr-1`}
                ></i>
                <span>{Math.abs(sales().change)}%</span>
              </div>
            </div>
            <div class={`${css_module.sparkline_chart}`}>
              <For each={sales().chartData}>
                {(value) => (
                  <div
                    class={`${css_module.sparkline_bar} bg-blue-500`}
                    style={{ height: `${value * 2}px` }}
                  ></div>
                )}
              </For>
            </div>
          </div>
        </div>

        {/* Total Order Card */}
        <div class={`${css_module.card}`}>
          <div class="p-4">
            <div class="flex justify-between items-start">
              <div>
                <h6 class="text-xs font-semibold uppercase text-gray-500 mb-1">
                  Total Order
                </h6>
                <h3 class="text-3xl font-bold text-gray-800">
                  {totalOrder().value}
                </h3>
              </div>
              <div
                class={`flex items-center text-sm ${
                  totalOrder().change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                <i
                  class={`fas fa-caret-${
                    totalOrder().change >= 0 ? "up" : "down"
                  } mr-1`}
                ></i>
                <span>{Math.abs(totalOrder().change)}%</span>
              </div>
            </div>
            {/* Simple graphic placeholder */}
            <div class="w-full h-10 bg-gray-200 rounded-md mt-4"></div>
          </div>
        </div>

        {/* Market Share Card */}
        <div class={`${css_module.card}`}>
          <div class="p-4">
            <h6 class="text-xs font-semibold uppercase text-gray-500 mb-3">
              Market Share
            </h6>
            <div class="flex items-center justify-between">
              {/* Placeholder for Donut Chart */}
              <div class={`${css_module.donut_chart_placeholder}`}>
                <div
                  class={`${css_module.donut_center_text} bg-white text-gray-800`}
                >
                  <span class="block font-bold text-xl">26M</span>
                </div>
              </div>
              <ul class="list-none p-0 m-0 ml-4">
                <For each={marketShare()}>
                  {(item) => (
                    <li class="flex items-center mb-1 last:mb-0">
                      <span
                        class={`${css_module.color_dot}`}
                        style={{ "background-color": item.color }}
                      ></span>
                      <small class="ml-2 text-gray-600">{item.name}</small>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </div>
        </div>

        {/* Weather Card */}
        <div class={`${css_module.card}`}>
          <div class="p-4">
            <h6 class="text-xs font-semibold uppercase text-gray-500 mb-1">
              Weather
            </h6>
            <div class="flex justify-between items-center">
              <div>
                <h5 class="font-bold text-xl text-gray-800 mb-0">
                  {weather().city}
                </h5>
                <small class="text-gray-600">{weather().description}</small>
                <p class="text-gray-600 text-sm mb-0">Precipitation: 50%</p>
              </div>
              <div class="text-right">
                <i
                  class={`${weather().iconClass} ${
                    css_module.weather_icon
                  } text-yellow-500`}
                ></i>
                <h3 class="font-bold text-3xl text-gray-800 mb-0">
                  {weather().temperature}
                </h3>
                <small class="text-gray-600">
                  {weather().lowTemp} / {weather().highTemp}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Middle Row: Running Projects & Total Sales Chart */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Running Projects */}
        <div class="lg:col-span-1">
          {" "}
          {/* Take 1/3 on large screens */}
          <div class={`${css_module.card} h-full`}>
            <div
              class={`${css_module.card_header} flex justify-between items-center`}
            >
              <h5 class="font-semibold text-lg text-gray-800 mb-0">
                Running Projects
              </h5>
              <h5 class="font-semibold text-lg text-gray-500 mb-0">
                Working Time
              </h5>
            </div>
            <div class="p-4">
              <ul class="list-none p-0 m-0">
                <For each={projects()}>
                  {(project) => (
                    <li class="flex items-center mb-3 last:mb-0">
                      <div
                        class={`${css_module.project_initial_avatar}`}
                        style={{ "background-color": project.bgColor }}
                      >
                        {project.initial}
                      </div>
                      <div class="flex-grow ml-3 mr-3">
                        <h6 class="font-medium text-gray-800 mb-1">
                          {project.name}
                        </h6>
                        <div class="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            class="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span class="text-gray-500 text-sm">
                        {project.timeSpent}
                      </span>
                    </li>
                  )}
                </For>
              </ul>
              <div class="text-center mt-3">
                <a
                  href="#"
                  class="text-blue-500 text-sm font-medium hover:underline"
                >
                  Show all projects &gt;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Total Sales Chart */}
        <div class="lg:col-span-2">
          {" "}
          {/* Take 2/3 on large screens */}
          <div class={`${css_module.card} h-full`}>
            <div
              class={`${css_module.card_header} flex justify-between items-center`}
            >
              <h5 class="font-semibold text-lg text-gray-800 mb-0">
                Total Sales
              </h5>
              <div class="flex items-center">
                <select class="form-select text-sm p-1 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mr-2">
                  <option>January</option>
                  <option>February</option>
                </select>
                <button class="text-gray-500 hover:text-gray-700 p-2 rounded-md">
                  <i class="fas fa-ellipsis-h text-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Row */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Storage Usage */}
        <div class="lg:col-span-1">
          <div class={`${css_module.card} h-full`}>
            <div class="p-4">
              <h6 class="text-gray-800 text-base font-semibold mb-3">
                Using Storage{" "}
                <span class="font-bold">{calculateTotalUsedMB()} MB</span> of{" "}
                <span class="font-bold">{storageUsage().totalGB} GB</span>
              </h6>
              {/* Storage Progress Bar */}
              <div class="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div class="flex h-full">
                  <For each={storageUsage().segments}>
                    {(segment) => (
                      <div
                        class="h-full"
                        style={{
                          width: `${
                            (segment.sizeMB / (storageUsage().totalGB * 1024)) *
                            100
                          }%`,
                          "background-color": segment.color,
                          "border-top-left-radius":
                            segment.label === "Regular" ? "9999px" : "0",
                          "border-bottom-left-radius":
                            segment.label === "Regular" ? "9999px" : "0",
                          "border-top-right-radius":
                            segment.label === "Free" ? "9999px" : "0", // Adjusted for free space
                          "border-bottom-right-radius":
                            segment.label === "Free" ? "9999px" : "0", // Adjusted for free space
                        }}
                      ></div>
                    )}
                  </For>
                  {/* Free Space Segment */}
                  <div
                    class="h-full bg-gray-300 rounded-r-full"
                    style={{
                      width: `${
                        (calculateFreeSpaceMB() /
                          (storageUsage().totalGB * 1024)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              {/* Storage Legend */}
              <div class="flex flex-wrap justify-between text-sm text-gray-600">
                <For each={storageUsage().segments}>
                  {(segment) => (
                    <span class="mr-4 mb-2">
                      <span
                        class={`${css_module.color_dot}`}
                        style={{ "background-color": segment.color }}
                      ></span>
                      {segment.label} ({segment.sizeMB}MB)
                    </span>
                  )}
                </For>
                <span class="mr-4 mb-2">
                  <span
                    class={`${css_module.color_dot}`}
                    style={{ "background-color": "#ccc" }}
                  ></span>
                  Free ({calculateFreeSpaceMB()}MB)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Running out of space? */}
        <div class="lg:col-span-1">
          <div
            class={`${css_module.card} ${css_module.space_warning_card} h-full text-red-800`}
          >
            <div class="p-6">
              {" "}
              {/* Increased padding for this card */}
              <h5 class="text-xl font-bold mb-3">Running out of your space?</h5>
              <p class="mb-4 text-base">
                Your storage will be running out soon. Get more space and
                powerful productivity features.
              </p>
              <a
                href="#"
                class="font-bold text-red-800 hover:underline flex items-center"
              >
                Upgrade storage{" "}
                <i class="fas fa-chevron-right ml-2 text-sm"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Best Selling Products & Shared Files Column */}
        <div class="lg:col-span-1 flex flex-col gap-4">
          {" "}
          {/* Use flex-col to stack cards */}
          {/* Best Selling Products */}
          <div class={`${css_module.card}`}>
            <div class="p-4">
              <h6 class="text-gray-800 text-base font-semibold mb-3">
                Best Selling Products
              </h6>
              <ul class="list-none p-0 m-0">
                <For each={bestSellingProducts()}>
                  {(product) => (
                    <li class="flex items-center mb-3 last:mb-0">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        class="rounded-md mr-3"
                        style={{
                          width: "40px",
                          height: "40px",
                          "object-fit": "cover",
                        }}
                      />
                      <div class="flex-grow">
                        <h6 class="text-gray-800 text-sm mb-0 font-medium">
                          {product.name}
                        </h6>
                        <small class="text-gray-500 text-xs">
                          {product.subText}
                        </small>
                      </div>
                      <span class="font-bold text-gray-800 text-sm mr-3">
                        {product.revenue}
                      </span>
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.percentage}%
                      </span>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </div>
          {/* Shared Files */}
          <div class={`${css_module.card}`}>
            <div class="p-4">
              <h6 class="text-gray-800 text-base font-semibold mb-3 flex justify-between items-center">
                Shared Files
                <a href="#" class="text-blue-500 text-sm hover:underline">
                  View All
                </a>
              </h6>
              <ul class="list-none p-0 m-0">
                <For each={sharedFiles()}>
                  {(file) => (
                    <li class="flex items-center mb-2 last:mb-0">
                      <i
                        class={`${file.fileIconClass} text-xl mr-3 text-gray-500`}
                      ></i>
                      <div class="flex-grow">
                        <h6 class="text-gray-800 text-sm mb-0 font-medium">
                          {file.fileName}
                        </h6>
                        <small class="text-gray-500 text-xs">
                          {file.owner}
                        </small>
                      </div>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
