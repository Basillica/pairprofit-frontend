import {
  createSignal,
  createEffect,
  createMemo,
  Component,
  Accessor,
  Setter,
} from "solid-js";
import "./menustyles.css";
import { NavBar } from "./navbar";
import { LogoutModal } from "../modals";
import { authService } from "../../../oauth/manager";
import { useNavigate } from "@solidjs/router";

export const PersistentSidebar: Component<{
  expanded: Accessor<boolean>;
  setExpanded: Setter<boolean>;
}> = (props) => {
  const [settingsExpanded, setSettingsExpanded] = createSignal(false);
  const [profileExpanded, setProfileExpanded] = createSignal(false);
  const [openLogout, setOpenLogout] = createSignal(false);
  const navigate = useNavigate();

  const toggleSettingsSubmenu = () => {
    setSettingsExpanded(!settingsExpanded());
  };

  const toggleProfileSubmenu = () => {
    setProfileExpanded(!profileExpanded());
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

  const handleLogout = () => {
    authService.clearAuthToken();
    setOpenLogout(true);
    navigate("/login");
  };

  return (
    <>
      <NavBar
        expanded={props.expanded}
        setExpanded={props.setExpanded}
        setOpenLogout={setOpenLogout}
        openLogout={openLogout}
      />
      <LogoutModal
        isOpen={openLogout}
        onCancel={() => setOpenLogout(false)}
        onConfirm={handleLogout}
      />
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
