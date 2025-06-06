import { Component } from "solid-js";
import input_styles from "./style.module.css";

// Helper component for dynamic input fields (Service Areas & Skills)
export const DynamicInputGroup: Component<{
  name: string;
  placeholder: string;
  onRemove: () => void;
  onInput: () => void;
  value: string;
}> = (props) => {
  return (
    <div class={input_styles.dynamic_input_group}>
      <input
        type="text"
        name={props.name}
        class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder={props.placeholder}
        value={props.value}
        onInput={props.onInput} // Propagate input changes
      />
      <button
        type="button"
        class="remove-dynamic-input-btn text-red-600 hover:text-red-800 text-sm font-medium"
        onClick={props.onRemove}
      >
        Remove
      </button>
    </div>
  );
};
