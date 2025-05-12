import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import css_class from './style.module.css';

export const NavBar = () =>  {
  const [expanded, setExpanded] = createSignal(window.innerWidth > 768 ? false : true);
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setExpanded(!expanded());
  };

  const handleUserProfile = (e: MouseEvent & {
    currentTarget: HTMLButtonElement;
    target: Element;
  }) => {
    e.stopPropagation();
    console.log("222222222222222222222")
    navigate("/profile")
  }

  return (
      <nav class={css_class.top_section}>
          <div class={css_class.top_section_left}>
              <button id="sidebar_toggle_btn" onClick={toggleSidebar}>
                  <i class="fas fa-bars"></i>
              </button>
              <input type="text" placeholder="Search" class="desktop_search_bar" />
          </div>
          <div class={css_class.top_section_rightbb}>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => navigate("")}><i class="fas fa-plus"></i></button>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => navigate("")}><i class="fas fa-bell"></i></button>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={(e) => handleUserProfile(e)}><i class="fas fa-user"></i></button>
          </div>
      </nav>
  );
}