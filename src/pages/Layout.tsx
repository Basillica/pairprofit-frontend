import { createSignal } from "solid-js";
import { PersistentSidebar } from "../components/utils/menu";

export const RootLayout = (props: any) => {
  const [expanded, setExpanded] = createSignal(
    window.innerWidth > 768 ? false : true
  );
  return (
    // <main class="container" style={"width: 100vw"}>
    <div class="bg-gray-100 font-inter" style={{ "overflow-x": "hidden" }}>
      {/* <NavBar /> */}
      <div
        id="content"
        style={{
          "margin-left": window.innerWidth > 768 ? "0px" : "0px",
          "margin-top": window.innerWidth <= 768 ? "calc(0px + 0px)" : "2px",
          "background-color": "white",
          "overflow-x": "hidden",
          overflow: "scroll",
          "scrollbar-width": "none",
        }}
      >
        {props.children}
      </div>

      <PersistentSidebar expanded={expanded} setExpanded={setExpanded} />
    </div>
  );
};
