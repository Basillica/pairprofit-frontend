import { createSignal } from 'solid-js';
import css_class from './style.module.css';

export const NavBar = () =>  {
  const [expanded, setExpanded] = createSignal(window.innerWidth > 768 ? false : true);

  const toggleSidebar = () => {
    console.log("......................")
    setExpanded(!expanded());
  };

  return (
    <>
        <nav class={css_class.top_section}>
            <div class={css_class.top_section_left}>
                <button id="sidebar_toggle_btn" onClick={toggleSidebar}>
                    <i class="fas fa-bars"></i>
                </button>
                <input type="text" placeholder="Search" class="desktop_search_bar" />
            </div>
            <div class={css_class.top_section_right}>
                <button><i class="fas fa-plus"></i></button>
                <button><i class="fas fa-bell"></i></button>
                <button><i class="fas fa-user"></i></button>
            </div>
        </nav>
        {/* <div class={css_class.mobile_search_bar}>
            <input type="text" placeholder="Search"/>
        </div> */}
    </>
  );
}