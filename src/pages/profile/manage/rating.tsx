import { For, Show, Component } from "solid-js";

// Helper component for rendering stars
export const StarRating: Component<{
  rating: number;
}> = (props) => {
  const fullStars = Math.floor(props.rating);
  const halfStar = props.rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div class="stars">
      <For each={Array(fullStars)}>
        {() => <span class="star">&#9733;</span>}
      </For>
      <Show when={halfStar}>
        {/* For simplicity, using a full star for half. For true half, use SVG or specific font icons. */}
        <span class="star">&#9733;</span>
      </Show>
      <For each={Array(emptyStars)}>
        {() => <span class="star empty">&#9734;</span>}
      </For>
    </div>
  );
};
