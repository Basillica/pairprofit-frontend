import { Component, createSignal, For, Show } from 'solid-js'; // For Solid's reactive loops
import { Portal } from 'solid-js/web';

const StarIcon: Component<{
    filled: boolean;
    onClick: () => void;
}> = (props) => (
    <svg
        class={`w-8 h-8 fill-current cursor-pointer transition-colors duration-200 ${
            props.filled
                ? 'text-yellow-400 hover:text-yellow-500'
                : 'text-gray-300 hover:text-yellow-400'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        onClick={props.onClick}
    >
        <path d="M12 .587l3.642 7.362 8.106 1.176-5.86 5.717 1.385 8.077L12 18.896l-7.373 3.877 1.385-8.077-5.86-5.717 8.106-1.176L12 .587z" />
    </svg>
);

export const ReviewPage = () => {
    const [_, setRating] = createSignal(4);
    const [isVisible] = createSignal(false);
    const handleStarClick = (index: number) => {
        setRating(index + 1);
    };

    return (
        <Portal>
            <Show when={isVisible()}>
                <div class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4">
                    <div class="bg-white rounded-xl shadow-2xl p-8 md:p-12 w-full max-w-2xl transform transition-all duration-300 hover:scale-[1.005] animate-fade-in-up">
                        <div class="text-center mb-10">
                            <h1 class="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                                Leave a Review for John Doe
                            </h1>
                            <p class="text-lg text-gray-600">
                                Share your experience with the service provided.
                            </p>
                        </div>

                        {/* Profile Card (Mini) */}
                        <div class="flex items-center justify-center mb-10">
                            <div class="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                                <img
                                    class="w-16 h-16 rounded-full object-cover border-2 border-indigo-400 p-0.5"
                                    src="https://via.placeholder.com/150/007bff/ffffff?text=JD"
                                    alt="John Doe Profile Picture"
                                />
                                <div>
                                    <h3 class="text-xl font-semibold text-gray-800">
                                        John Doe
                                    </h3>
                                    <p class="text-sm text-gray-500">
                                        Provided: Web Design Service
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form class="space-y-6">
                            {/* Overall Rating */}
                            <div>
                                <label
                                    for="rating-stars"
                                    class="block text-lg font-medium text-gray-800 mb-2"
                                >
                                    Overall Rating
                                </label>
                                <div
                                    class="flex items-center space-x-1"
                                    id="rating-stars"
                                >
                                    {/* Using Solid's For loop for dynamic stars */}
                                    <For each={Array(5).fill(null)}>
                                        {(_, i) => (
                                            <StarIcon
                                                filled={i() < 4} // Example: pre-fill 4 stars
                                                onClick={() =>
                                                    handleStarClick(i())
                                                } // Uncomment and use signals for interactivity
                                            />
                                        )}
                                    </For>
                                </div>
                            </div>

                            {/* Review Title */}
                            <div>
                                <label
                                    for="review-title"
                                    class="block text-lg font-medium text-gray-800 mb-2"
                                >
                                    Review Title
                                </label>
                                <input
                                    type="text"
                                    id="review-title"
                                    name="review-title"
                                    placeholder="e.g., Excellent service, highly recommended!"
                                    class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base outline-none transition-all duration-200 hover:border-gray-400"
                                />
                            </div>

                            {/* Your Review */}
                            <div>
                                <label
                                    for="review-text"
                                    class="block text-lg font-medium text-gray-800 mb-2"
                                >
                                    Your Review
                                </label>
                                <textarea
                                    id="review-text"
                                    name="review-text"
                                    rows="6"
                                    placeholder="Share your detailed experience here. What did you like or dislike? How was the communication?"
                                    class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base resize-y outline-none transition-all duration-200 hover:border-gray-400"
                                ></textarea>
                            </div>

                            {/* Would you recommend? */}
                            <div>
                                <label class="block text-lg font-medium text-gray-800 mb-2">
                                    Would you recommend John Doe?
                                </label>
                                <div class="flex items-center space-x-6">
                                    <div class="flex items-center">
                                        <input
                                            id="recommend-yes"
                                            name="recommendation"
                                            type="radio"
                                            class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300"
                                            checked
                                        />
                                        <label
                                            for="recommend-yes"
                                            class="ml-2 block text-base text-gray-700"
                                        >
                                            Yes
                                        </label>
                                    </div>
                                    <div class="flex items-center">
                                        <input
                                            id="recommend-no"
                                            name="recommendation"
                                            type="radio"
                                            class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300"
                                        />
                                        <label
                                            for="recommend-no"
                                            class="ml-2 block text-base text-gray-700"
                                        >
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Anonymity Option (Optional) */}
                            <div>
                                <div class="flex items-center">
                                    <input
                                        id="anonymous"
                                        name="anonymous"
                                        type="checkbox"
                                        class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label
                                        for="anonymous"
                                        class="ml-2 block text-base text-gray-700"
                                    >
                                        Post anonymously
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div class="pt-6">
                                <button
                                    type="submit"
                                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.01] active:scale-95"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Show>
        </Portal>
    );
};
