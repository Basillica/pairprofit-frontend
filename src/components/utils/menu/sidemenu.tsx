import {
    createSignal,
    createEffect,
    createMemo,
    Component,
    Accessor,
    Setter,
} from 'solid-js';
import './menustyles.css';
import { NavBar } from './navbar';
import { LogoutModal } from '../modals';
import { authService } from '../../../oauth/manager';
import { useNavigate } from '@solidjs/router';

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
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sidebarClass = createMemo(() => ({
        collapsed: !props.expanded(),
        expanded: props.expanded(),
    }));

    const handleLogout = () => {
        authService.clearAuthToken();
        setOpenLogout(false);
        navigate('/login');
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
                onMouseOver={() =>
                    window.innerWidth > 768 && props.setExpanded(true)
                }
                onMouseLeave={() =>
                    window.innerWidth > 768 && props.setExpanded(false)
                }
            >
                <a href="/">
                    <i style="color: blue" class="fas fa-home"></i>{' '}
                    <span>Home</span>
                </a>
                <a href="/about">
                    <i style="color: blue" class="fas fa-book"></i>{' '}
                    <span>About</span>
                </a>
                <div class="submenu-wrapper">
                    <a
                        href="#"
                        class="has-submenu"
                        onClick={toggleSettingsSubmenu}
                    >
                        <i style="color: blue" class="fas fa-cog"></i>{' '}
                        <span>Service Provider</span>{' '}
                        <i
                            class={`fas fa-chevron-${
                                settingsExpanded() ? 'down' : 'right'
                            } chevron`}
                        ></i>
                    </a>
                    <div
                        class={`submenu ${
                            settingsExpanded() ? 'expanded' : ''
                        }`}
                    >
                        <a href="/profiles/manage">Manage Profiles</a>
                        <a href="/profiles/kanban">Manage Tasks</a>
                        <a href="/profiles/dashboard">Account Overview</a>
                        <a href="/profiles/calendar">Manage Calendar</a>
                    </div>
                </div>
                <a href="/contact">
                    <i style="color: blue" class="fas fa-envelope"></i>{' '}
                    <span>Contact</span>
                </a>
                <div class="submenu-wrapper">
                    <a
                        href="#"
                        class="has-submenu"
                        onClick={toggleProfileSubmenu}
                    >
                        <i style="color: blue" class="fas fa-user"></i>{' '}
                        <span>Profile</span>{' '}
                        <i
                            class={`fas fa-chevron-${
                                profileExpanded() ? 'down' : 'right'
                            } chevron`}
                        ></i>
                    </a>
                    <div
                        class={`submenu ${profileExpanded() ? 'expanded' : ''}`}
                    >
                        <a href="/profile/setting">Edit Profile</a>
                        <a href="/profile/dashboard">View Activity</a>
                        <a href="/profile/message">Messages</a>
                        <a href="/profile/inbox">Manage Inbox</a>
                    </div>
                </div>
            </div>
        </>
    );
};
