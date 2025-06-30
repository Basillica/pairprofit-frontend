import { createSignal, createMemo, For, Show, Component } from "solid-js";
import paginationStyles from "./style.module.css";

/**
 * Pagination Component for SolidJS
 * @param {object} props
 * @param {number} props.itemsPerPage - Number of items to display per page.
 * @param {number} props.totalItems - Total number of items in the list.
 * @param {number} [props.initialPage=1] - The page to start on.
 * @param {number} [props.maxPagesToShow=5] - Maximum number of page links to display (including ellipsis).
 * @param {(page: number) => void} props.onPageChange - Callback function when the page changes. Receives the new page number.
 */
export const Pagination: Component<{
  initialPage: number;
  totalItems: number;
  itemsPerPage: number;
  maxPagesToShow: number;
  onPageChange: (newPage: number, offset: number, limit: number) => void;
}> = (props) => {
  const [currentPage, setCurrentPage] = createSignal(props.initialPage || 1);
  const limit = createMemo(() => props.itemsPerPage);
  const offset = createMemo(() => {
    return (currentPage() - 1) * limit();
  });
  // Memoized total pages calculation - re-runs only when totalItems or itemsPerPage changes
  const totalPages = createMemo(() => {
    return Math.ceil(props.totalItems / props.itemsPerPage);
  });

  // Memoized array of page numbers to display in the pagination bar
  const displayedPageNumbers = createMemo(() => {
    const pages = [];
    const max = props.maxPagesToShow || 5; // Default to 5 pages shown

    let startPage = Math.max(1, currentPage() - Math.floor(max / 2));
    let endPage = Math.min(totalPages(), startPage + max - 1);

    // Adjust startPage if we're at the end of the range
    if (endPage - startPage + 1 < max) {
      startPage = Math.max(1, endPage - max + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    // Add actual page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages()) {
      if (endPage < totalPages() - 1) {
        pages.push("...");
      }
      pages.push(totalPages());
    }

    return pages;
  });

  // Function to handle page change
  const goToPage = (pageNumber: number) => {
    const total = totalPages();
    if (
      pageNumber >= 1 &&
      pageNumber <= total &&
      pageNumber !== currentPage()
    ) {
      setCurrentPage(pageNumber);
      props.onPageChange && props.onPageChange(pageNumber, offset(), limit());
    }
  };

  // Event handlers for Previous/Next buttons
  const goToPrevPage = () => goToPage(currentPage() - 1);
  const goToNextPage = () => goToPage(currentPage() + 1);

  return (
    <div class="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={goToPrevPage}
        disabled={currentPage() === 1}
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <div class="flex space-x-1">
        <For each={displayedPageNumbers()}>
          {(page) => (
            <Show
              when={page === "..."}
              fallback={
                <button
                  onClick={() => goToPage(Number(page))}
                  class={`${
                    paginationStyles.paginationLink
                  } px-3 py-1 rounded-md hover:bg-blue-100 text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
                  ${
                    Number(page) === currentPage()
                      ? paginationStyles.active
                      : ""
                  }`}
                >
                  {page}
                </button>
              }
            >
              <span class="px-3 py-1 text-gray-500">...</span>
            </Show>
          )}
        </For>
      </div>

      <button
        onClick={goToNextPage}
        disabled={currentPage() === totalPages()}
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};
