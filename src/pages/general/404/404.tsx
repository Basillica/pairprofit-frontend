import { Component } from 'solid-js';
import css_class from './style.module.css';

export const Page404: Component = () => {
    return (
        <div class={css_class.error_container}>
            <h1 class={css_class.error_code}>404</h1>
            <p class={css_class.error_message}>
                Sorry, the page you are looking for could not be found.
            </p>
            <a href="/" class={css_class.home_button}>
                Back to Home
            </a>
        </div>
    );
};
