import {
  createSignal,
  createEffect,
  createMemo,
  Component,
  Accessor,
  Setter,
} from "solid-js";
import { useNavigate } from "@solidjs/router";
import "./menustyles.css";

export const PersistentSidebar: Component<{
  expanded: Accessor<boolean>;
  setExpanded: Setter<boolean>;
}> = (props) => {
  const navigate = useNavigate();
  const [settingsExpanded, setSettingsExpanded] = createSignal(false);
  const [profileExpanded, setProfileExpanded] = createSignal(false);

  const toggleSidebar = () => {
    props.setExpanded(!props.expanded());
  };

  const toggleSettingsSubmenu = () => {
    setSettingsExpanded(!settingsExpanded());
  };

  const toggleProfileSubmenu = () => {
    setProfileExpanded(!profileExpanded());
  };

  const handleUserProfile = (
    e: MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: Element;
    }
  ) => {
    e.stopPropagation();
    navigate("/profile/dashboard");
  };

  createEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        props.setExpanded(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarClass = createMemo(() => ({
    collapsed: !props.expanded(),
    expanded: props.expanded(),
  }));

  return (
    <>
      <div class="top-section">
        <div class="top-section-left">
          <button id="sidebar-toggle-btn" onClick={toggleSidebar}>
            <i class="fas fa-bars"></i>
          </button>
          <input type="text" placeholder="Search" class="desktop-search-bar" />
        </div>
        <div class="top-section-right">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-2 rounded-full"
            onClick={() => navigate("")}
          >
            <i class="fas fa-plus"></i>
          </button>

          <div class="relative inline-flex">
            <button
              id="dropdown-trigger"
              type="button"
              class="flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
              onClick={() => {
                const dropdownMenu = document.getElementById("dropdown-menu");
                dropdownMenu?.classList.toggle("hidden");
                const isExpanded = dropdownMenu?.classList.contains("hidden")
                  ? "false"
                  : "true";
                document
                  .getElementById("dropdown-trigger")
                  ?.setAttribute("aria-expanded", isExpanded);
              }}
            >
              <div class="relative inline-block">
                <i class="fas fa-bell"></i>
                <div class="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-semibold flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
                  9+
                </div>
              </div>
            </button>

            <div
              id="dropdown-menu"
              class="transition-opacity duration-300 absolute z-10 mt-10 bg-white shadow-md rounded-lg origin-top-right hidden overflow-y-auto"
              style={{
                "margin-left": "-200px",
                width: "290px",
                "max-height": "650px",
              }} // Added maxHeight for scrollability
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-trigger"
            >
              <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center justify-between mb-4">
                  <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Latest Customers
                  </h5>
                  <a
                    href="#"
                    class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    View all
                  </a>
                </div>
                <div class="flow-root">
                  <ul
                    role="list"
                    class="divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    <li class="py-3 sm:py-4">
                      <div class="flex items-center">
                        <div class="shrink-0">
                          <img
                            class="w-8 h-8 rounded-full"
                            src="https://picsum.photos/50"
                            alt="Neil image"
                          />
                        </div>
                        <div class="flex-1 min-w-0 ms-4">
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Neil Sims
                          </p>
                          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                          </p>
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          $320
                        </div>
                      </div>
                    </li>
                    <li class="py-3 sm:py-4">
                      <div class="flex items-center ">
                        <div class="shrink-0">
                          <img
                            class="w-8 h-8 rounded-full"
                            src="https://picsum.photos/50"
                            alt="Bonnie image"
                          />
                        </div>
                        <div class="flex-1 min-w-0 ms-4">
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Bonnie Green
                          </p>
                          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                          </p>
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          $3467
                        </div>
                      </div>
                    </li>
                    <li class="py-3 sm:py-4">
                      <div class="flex items-center">
                        <div class="shrink-0">
                          <img
                            class="w-8 h-8 rounded-full"
                            src="https://picsum.photos/50"
                            alt="Michael image"
                          />
                        </div>
                        <div class="flex-1 min-w-0 ms-4">
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Michael Gough
                          </p>
                          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                          </p>
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          $67
                        </div>
                      </div>
                    </li>
                    <li class="py-3 sm:py-4">
                      <div class="flex items-center ">
                        <div class="shrink-0">
                          <img
                            class="w-8 h-8 rounded-full"
                            src="https://picsum.photos/50"
                            alt="Lana image"
                          />
                        </div>
                        <div class="flex-1 min-w-0 ms-4">
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Lana Byrd
                          </p>
                          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                          </p>
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          $367
                        </div>
                      </div>
                    </li>
                    <li class="pt-3 pb-0 sm:pt-4">
                      <div class="flex items-center ">
                        <div class="shrink-0">
                          <img
                            class="w-8 h-8 rounded-full"
                            src="https://picsum.photos/50"
                            alt="Thomas image"
                          />
                        </div>
                        <div class="flex-1 min-w-0 ms-4">
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Thomes Lean
                          </p>
                          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                          </p>
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          $2367
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <button
            class="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-2 rounded-full"
            onClick={(e) => handleUserProfile(e)}
          >
            <i class="fas fa-user"></i>
          </button>
        </div>
      </div>

      {/* <div class="mobile-search-bar">
        <input type="text" placeholder="Search"/>
      </div> */}

      <div
        id="sidebar-container"
        classList={sidebarClass()}
        onMouseOver={() => window.innerWidth > 768 && props.setExpanded(true)}
        onMouseLeave={() => window.innerWidth > 768 && props.setExpanded(false)}
      >
        <a href="#">
          <i class="fas fa-home"></i> <span>Home</span>
        </a>
        <a href="#">
          <i class="fas fa-book"></i> <span>About</span>
        </a>
        <div class="submenu-wrapper">
          <a href="#" class="has-submenu" onClick={toggleSettingsSubmenu}>
            <i class="fas fa-cog"></i> <span>Settings</span>{" "}
            <i
              class={`fas fa-chevron-${
                settingsExpanded() ? "down" : "right"
              } chevron`}
            ></i>
          </a>
          <div class={`submenu ${settingsExpanded() ? "expanded" : ""}`}>
            <a href="#">Sub-Setting 1</a>
            <a href="#">Sub-Setting 2</a>
            <a href="#">Sub-Setting 3</a>
          </div>
        </div>
        <a href="#">
          <i class="fas fa-envelope"></i> <span>Contact</span>
        </a>
        <div class="submenu-wrapper">
          <a href="#" class="has-submenu" onClick={toggleProfileSubmenu}>
            <i class="fas fa-user"></i> <span>Profile</span>{" "}
            <i
              class={`fas fa-chevron-${
                profileExpanded() ? "down" : "right"
              } chevron`}
            ></i>
          </a>
          <div class={`submenu ${profileExpanded() ? "expanded" : ""}`}>
            <a href="#">Edit Profile</a>
            <a href="#">View Activity</a>
            <a href="#">Logout</a>
          </div>
        </div>
      </div>
    </>
  );
};

export const Cards: Component = () => {
  return (
    <div class="container-fluid text-center">
      <div class="row gy-4" style={"margin-bottom: 10px"}>
        <div class="col-12 md:w-4/12 px-2">
          <div class="card">
            <img
              src="https://picsum.photos/200"
              class="card-img-top"
              alt="Card 1-1"
            />
            <div class="card-body">
              <h5 class="card-title">Card 1-1</h5>
              <p class="card-text">First card in the first row.</p>
              <a href="#" class="btn btn-primary">
                Details
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 md:w-4/12 px-2">
          <div class="card">
            <img
              src="https://picsum.photos/200"
              class="card-img-top"
              alt="Card 1-2"
            />
            <div class="card-body">
              <h5 class="card-title">Card 1-2</h5>
              <p class="card-text">Second card in the first row.</p>
              <a href="#" class="btn btn-success">
                View
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 md:w-4/12 px-2">
          <div class="card">
            <img
              src="https://picsum.photos/200"
              class="card-img-top"
              alt="Card 1-3"
            />
            <div class="card-body">
              <h5 class="card-title">Card 1-3</h5>
              <p class="card-text">Third card in the first row.</p>
              <a href="#" class="btn btn-warning">
                Explore
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="row gy-4" style={"margin-bottom: 10px"}>
        <div class="col-12 col-md-3">
          <div class="card">
            <img
              src="https://picsum.photos/200"
              class="card-img-top"
              alt="Card 2-1"
            />
            <div class="card-body">
              <h5 class="card-title">Card 2-1</h5>
              <p class="card-text">First card in the second row.</p>
              <a href="#" class="btn btn-info">
                Info
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="card">
            <img
              src="https://picsum.photos/200"
              class="card-img-top"
              alt="Card 2-2"
            />
            <div class="card-body">
              <h5 class="card-title">Card 2-2</h5>
              <p class="card-text">Second card in the second row.</p>
              <a href="#" class="btn btn-secondary">
                Check
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="card">
            <img
              src="https://picsum.photos/200"
              class="card-img-top"
              alt="Card 2-3"
            />
            <div class="card-body">
              <h5 class="card-title">Card 2-3</h5>
              <p class="card-text">Third card in the second row.</p>
              <a href="#" class="btn btn-danger">
                Alert
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="card">
            <img
              src="https://picsum.photos/200"
              class="card-img-top"
              alt="Card 2-4"
            />
            <div class="card-body">
              <h5 class="card-title">Card 2-4</h5>
              <p class="card-text">Fourth card in the second row.</p>
              <a href="#" class="btn btn-dark">
                Action
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="row gy-4" style={"margin-bottom: 10px"}>
        <div class="col-12 col-md-5ths">
          <div class="card">
            <img
              src="https://picsum.photos/200"
              class="card-img-top"
              alt="Card 3-1"
            />
            <div class="card-body">
              <h5 class="card-title">Card 3-1</h5>
              <p class="card-text">First card in the third row.</p>
              <a href="#" class="btn btn-primary">
                Go
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-5ths">
          <div class="card">
            <img
              src="https://picsum.photos/200"
              class="card-img-top"
              alt="Card 3-2"
            />
            <div class="card-body">
              <h5 class="card-title">Card 3-2</h5>
              <p class="card-text">Second card in the third row.</p>
              <a href="#" class="btn btn-success">
                See
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-5ths">
          <div class="card">
            <img
              src="https://picsum.photos/200"
              class="card-img-top"
              alt="Card 3-3"
            />
            <div class="card-body">
              <h5 class="card-title">Card 3-3</h5>
              <p class="card-text">Third card in the third row.</p>
              <a href="#" class="btn btn-warning">
                Find
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-5ths">
          <div class="card">
            <img
              src="https://picsum.photos/200"
              class="card-img-top"
              alt="Card 3-4"
            />
            <div class="card-body">
              <h5 class="card-title">Card 3-4</h5>
              <p class="card-text">Fourth card in the third row.</p>
              <a href="#" class="btn btn-info">
                Look
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-5ths">
          <div class="card">
            <img
              src="https://picsum.photos/200"
              class="card-img-top"
              alt="Card 3-5"
            />
            <div class="card-body">
              <h5 class="card-title">Card 3-5</h5>
              <p class="card-text">Fifth card in the third row.</p>
              <a href="#" class="btn btn-secondary">
                Try
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="row gy-4" style={"margin-bottom: 10px"}>
        <div class="col-12 col-md-6">
          <div class="card">
            <img
              src="https://picsum.photos/200"
              class="card-img-top"
              alt="Card 4-1"
            />
            <div class="card-body">
              <h5 class="card-title">Card 4-1</h5>
              <p class="card-text">First card in the fourth row.</p>
              <a href="#" class="btn btn-danger">
                Stop
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="card">
            <img
              src="https://picsum.photos/200"
              class="card-img-top"
              alt="Card 4-2"
            />
            <div class="card-body">
              <h5 class="card-title">Card 4-2</h5>
              <p class="card-text">Second card in the fourth row.</p>
              <a href="#" class="btn btn-dark">
                End
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
