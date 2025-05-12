import { Component } from "solid-js";
import css_class from './style.module.css'

export const PrimaryButton: Component<{
    text: string,
    handleClick: (e: MouseEvent & {
        currentTarget: HTMLButtonElement;
        target: Element;
    }) => void
}> = (props) => {
    return (
        <button class={css_class.custom_button} onClick={(e) => props.handleClick(e)}>
            {props.text}
        </button>
    )
}