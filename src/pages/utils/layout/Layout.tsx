import { createSignal } from 'solid-js';
import { PersistentSidebar } from '../../../components/utils/menu';
import { AppContextProvider } from '../../../state';
import { OAuthContextProvider } from '../../../oauth';
import layout_css from './style.module.css';

export const RootLayout = (props: any) => {
    const [expanded, setExpanded] = createSignal(false);
    const [query] = createSignal('');

    return (
        <>
            <div
                class="bg-gray-100 font-inter"
                style={{
                    'overflow-x': 'hidden',
                    'flex-grow': 1,
                    width: '100vw',
                }}
            >
                <AppContextProvider url="" query={query}>
                    <OAuthContextProvider>
                        <div
                            id="content"
                            style={{
                                overflow: 'scroll',
                                'overflow-x': 'hidden',
                                'scrollbar-width': 'none',
                                'flex-grow': 1,
                                'min-height': '100vh',
                                width:
                                    window.innerWidth > 768 ? '97vw' : '100vw',
                                'margin-right':
                                    window.innerWidth > 768 ? '15px' : '',
                                'margin-left':
                                    window.innerWidth > 768 ? '40px' : '',
                            }}
                        >
                            {props.children}
                        </div>
                    </OAuthContextProvider>
                </AppContextProvider>
                <PersistentSidebar
                    expanded={expanded}
                    setExpanded={setExpanded}
                />
            </div>

            <footer
                class={layout_css.site_footer}
                style={{
                    'flex-shrink': 0,
                    'background-color': '#2c3e50',
                    color: '#ecf0f1',
                    padding: '0.5rem 0',
                }}
            >
                <div class={layout_css.footer_container}></div>
                <div class={`${layout_css.footer_bottom}`}>
                    <p>
                        &copy; <span id="current-year"></span> PairProfit
                        Platform. All rights reserved.
                    </p>
                    <div class={`${layout_css.footer_section} social`}>
                        <div class={layout_css.social_icons}>
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
                    <ul class={layout_css.bottom_links}>
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
