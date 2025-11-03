import type { Component } from 'solid-js';
import { For, Show } from 'solid-js';
import styles from './styles.module.css';
import { useNavigate } from '@solidjs/router';
import { useAppContext } from '../state';

export const BreadCrumbComponent: Component = () => {
    const {
        breadCrumb: { breadCrumbs },
    } = useAppContext();
    const navigate = useNavigate();

    const handleClickHome = () => {
        breadCrumbs().forEach((crumb) => {
            if (crumb.default && crumb.handler) {
                crumb.handler();
            }
        });
        navigate('/home');
    };

    return (
        <div style="align-self: stretch; height: 40px; justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex; width: 100%">
            <button
                style="width: 32px; height: 27px; padding: 8px; border-radius: 4px; justify-content: center; align-items: center; gap: 4px; display: flex"
                onClick={() => handleClickHome()}
            >
                <div class={styles.user_param_icon}>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.23438 2.09375L14.6094 7.71875C14.7734 7.85938 14.7734 8.09375 14.6562 8.25781C14.5156 8.42188 14.2812 8.42188 14.1172 8.28125L13.25 7.50781V12.125C13.25 13.1797 12.4062 14 11.375 14H4.625C3.57031 14 2.75 13.1797 2.75 12.125V7.50781L1.85938 8.28125C1.71875 8.42188 1.46094 8.42188 1.34375 8.25781C1.20312 8.09375 1.20312 7.85938 1.36719 7.71875L7.74219 2.09375C7.88281 1.97656 8.09375 1.97656 8.23438 2.09375ZM3.5 12.125C3.5 12.7578 3.99219 13.25 4.625 13.25H6.125V9.5C6.125 9.10156 6.45312 8.75 6.875 8.75H9.125C9.52344 8.75 9.875 9.10156 9.875 9.5V13.25H11.375C11.9844 13.25 12.5 12.7578 12.5 12.125V6.85156L8 2.89062L3.5 6.85156V12.125ZM6.875 13.25H9.125V9.5H6.875V13.25Z"
                            fill="#111111"
                            fill-opacity="0.5"
                        />
                    </svg>
                </div>
            </button>

            <For each={breadCrumbs()}>
                {(crumb) => (
                    <>
                        <div style="width: 5px; justify-content: center; align-items: center; display: flex">
                            <svg
                                width="4"
                                height="8"
                                viewBox="0 0 4 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.67188 3.82812C3.76562 3.92188 3.76562 4.09375 3.67188 4.1875L0.671875 7.1875C0.578125 7.28125 0.40625 7.28125 0.3125 7.1875C0.21875 7.09375 0.21875 6.92188 0.3125 6.82812L3.14062 4L0.3125 1.1875C0.21875 1.09375 0.21875 0.921875 0.3125 0.828125C0.40625 0.734375 0.578125 0.734375 0.671875 0.828125L3.67188 3.82812Z"
                                    fill="#111111"
                                    fill-opacity="0.5"
                                />
                            </svg>
                        </div>
                        w{' '}
                        <Show
                            when={crumb.default}
                            fallback={
                                <button
                                    style="padding: 8px; border-radius: 4px; justify-content: flex-start; align-items: center; gap: 4px; display: flex"
                                    onClick={() => crumb.handler()}
                                >
                                    <div style="color: rgba(17, 17, 17, 0.50); font-size: 14px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                        {crumb.text}
                                    </div>
                                </button>
                            }
                        >
                            <div style="padding: 8px; border-radius: 4px; justify-content: flex-start; align-items: center; gap: 4px; display: flex">
                                <div style="color: black; font-size: 14px; font-family: Segoe UI; font-weight: 400; word-wrap: break-word">
                                    {crumb.text}
                                </div>
                            </div>
                        </Show>
                    </>
                )}
            </For>
        </div>
    );
};
