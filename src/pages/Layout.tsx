import { createSignal } from "solid-js";
import { PersistentSidebar } from "../components/utils/menu";

export const RootLayout = (props: any) => {
      const [expanded, setExpanded] = createSignal(window.innerWidth > 768 ? false : true);
    return(
        <main class="container" style={"width: 100vw"}>
            {/* <NavBar /> */}
            <div id="content" style={{ "margin-left": expanded() && window.innerWidth > 768 ? '0px' : '10px', "margin-top": window.innerWidth <= 768 ? 'calc(0px + 0px)' : '0px', "background-color": "white", width: "95.5vw", "overflow-x": "hidden", overflow: "scroll", "scrollbar-width": "none"}}>
                {/* <Cards /> */}
                {props.children}
            </div>
            <PersistentSidebar expanded={expanded} setExpanded={setExpanded}/>
        </main>
    )
}