import { createSignal } from "solid-js";
import { PersistentSidebar } from "../../../components/utils/menu";

export const RootLayout = (props: any) => {
  const [expanded, setExpanded] = createSignal(
    window.innerWidth > 768 ? false : true
  );

  return (
    <>
      <div
        class="bg-gray-100 font-inter"
        style={{ "overflow-x": "hidden", "flex-grow": 1, width: "100vw" }}
      >
        <div
          id="content"
          style={{
            "overflow-x": "hidden",
            overflow: "scroll",
            "scrollbar-width": "none",
            "flex-grow": 1,
            "min-height": "100vh",
          }}
        >
          {props.children}
        </div>
        <PersistentSidebar expanded={expanded} setExpanded={setExpanded} />
      </div>

      <footer
        class="site-footer"
        style={{
          "flex-shrink": 0,
          "background-color": "#2c3e50",
          color: "#ecf0f1",
          padding: "3rem 0",
        }}
      >
        <div class="footer-container">
          <div class="footer-section about">
            <h4>About Us</h4>
            <p>
              We are a passionate team dedicated to providing you with the best
              email experience. Our mission is to simplify your communication
              and connect you with what matters most.
            </p>
          </div>
          <div class="footer-section links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#inbox">Inbox</a>
              </li>
              <li>
                <a href="#starred">Starred</a>
              </li>
              <li>
                <a href="#sent">Sent</a>
              </li>
              <li>
                <a href="#drafts">Drafts</a>
              </li>
              <li>
                <a href="#trash">Trash</a>
              </li>
            </ul>
          </div>
          <div class="footer-section social">
            <h4>Follow Us</h4>
            <div class="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
              >
                <i class="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                aria-label="Twitter"
              >
                <i class="fab fa-twitter"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
              >
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
              >
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div class="footer-section contact">
            <h4>Contact Us</h4>
            <p>
              <i class="fas fa-map-marker-alt"></i> 123 Email St, Regensburg,
              Germany
            </p>
            <p>
              <i class="fas fa-phone"></i> +49 123 456 7890
            </p>
            <p>
              <i class="fas fa-envelope"></i>{" "}
              <a href="mailto:info@emailapp.com">info@emailapp.com</a>
            </p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>
            &copy; <span id="current-year"></span> Your Email App. All rights
            reserved.
          </p>
          <ul class="bottom-links">
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
            <li>
              <a href="#sitemap">Sitemap</a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};
