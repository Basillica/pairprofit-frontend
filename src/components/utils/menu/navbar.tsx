import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  Setter,
} from "solid-js";
import { useNavigate } from "@solidjs/router";
import { authService } from "../../../oauth/manager";
import { PostServiceRequestForm } from "../modals";

export const NavBar: Component<{
  expanded: Accessor<boolean>;
  setExpanded: Setter<boolean>;
  setOpenLogout: Setter<boolean>;
  openLogout: Accessor<boolean>;
}> = (props) => {
  const navigate = useNavigate();
  const [addRequest, setAddRequest] = createSignal<boolean>(false);

  const toggleSidebar = () => {
    props.setExpanded(!props.expanded());
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

  const handleLogout = (
    e: MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: Element;
    }
  ) => {
    e.stopPropagation();
    // the logout dialog will not be opened if you are not already logged in
    if (!authService.getUserAuthToken()) {
      return;
    }
    props.setOpenLogout(true);
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

  return (
    <nav class="top-section">
      <PostServiceRequestForm isOpen={addRequest} closeModal={setAddRequest} />
      <div class="top-section-left">
        <button id="sidebar-toggle-btn" onClick={toggleSidebar}>
          <i class="fas fa-bars"></i>
        </button>
        <input type="text" placeholder="Search" class="desktop-search-bar" />
      </div>
      <div class="top-section-right">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-2 rounded-full"
          onClick={() => setAddRequest(true)}
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
        <button
          class="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-2 rounded-full"
          onClick={(e) => handleLogout(e)}
        >
          <i class="fas fa-right-from-bracket"></i>
        </button>
      </div>
    </nav>
  );
};
