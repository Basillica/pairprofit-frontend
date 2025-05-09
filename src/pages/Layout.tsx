import { createSignal } from "solid-js";
import { NavBar, PersistentSidebar } from "../components/utils/menu";

export const RootLayout = (props: any) => {
      const [expanded, setExpanded] = createSignal(window.innerWidth > 768 ? false : true);
    return(
        <main class="container-fluid">
            <NavBar />
            <div id="content" style={{ "margin-left": expanded() && window.innerWidth > 768 ? '0px' : '0px', "margin-top": window.innerWidth <= 768 ? 'calc(0px + 0px)' : '2px', "background-color": "white", width: "95vw", "overflow-x": "hidden", overflow: "scroll", "scrollbar-width": "none"}}>
                {/* <Cards /> */}
                {props.children}
            </div>
            <PersistentSidebar expanded={expanded} setExpanded={setExpanded}/>
        </main>
    )
}