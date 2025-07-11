import { Accessor, Component, For, Show } from 'solid-js';
import image_styles from './style.module.css';

export const PreviewImages: Component<{
    attachments: Accessor<
        | {
              type: string;
              url: string;
              name: string;
          }[]
        | undefined
    >;
    handleRemoveImage: (name: string) => void;
}> = (props) => {
    return (
        <div class={image_styles.preview_gallery}>
            <For each={props.attachments()!}>
                {(attachment, id) => (
                    <Show when={attachment.url !== ''}>
                        <div
                            class={image_styles.image_container}
                            id={`image-element-${id()}`}
                        >
                            {attachment.type === 'application/pdf' ? (
                                <a
                                    href={attachment.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Sample PDF
                                </a>
                            ) : (
                                <img
                                    class={image_styles.preview_image}
                                    src={attachment.url}
                                    alt={attachment.name}
                                />
                            )}
                            <button
                                class={image_styles.remove_button}
                                aria-label="Remove image"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    props.handleRemoveImage(attachment.name);
                                }}
                            >
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </Show>
                )}
            </For>
        </div>
    );
};
