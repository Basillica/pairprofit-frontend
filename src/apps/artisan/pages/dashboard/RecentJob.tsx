import { Component, For } from 'solid-js';

type JobStatus = 'Completed' | 'Cancelled' | 'Pending';

export interface JobHistoryItem {
    id: number;
    title: string;
    location: string;
    date: string;
    amount: string;
    status: JobStatus;
}

interface RecentJobHistoryProps {
    jobs: JobHistoryItem[];
}

const StatusPill: Component<{ status: JobStatus }> = (props) => {
    let bgColor: string;
    let textColor: string;

    switch (props.status) {
        case 'Completed':
            bgColor = 'bg-green-100/70';
            textColor = 'text-green-600';
            break;
        case 'Cancelled':
            bgColor = 'bg-red-100/70';
            textColor = 'text-red-600';
            break;
        case 'Pending':
            bgColor = 'bg-yellow-100/70';
            textColor = 'text-yellow-600';
            break;
        default:
            bgColor = 'bg-slate-100';
            textColor = 'text-slate-600';
    }

    return (
        // Note the use of 'class' here as required by SolidJS
        <span
            class={`
        px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap 
        ${bgColor} ${textColor}
      `}
            aria-label={`Status: ${props.status}`}
        >
            {props.status}
        </span>
    );
};

const JobRowOrCard: Component<JobHistoryItem> = (job) => {
    // Common classes for text/data
    const dataClass = 'text-base font-normal text-slate-600';
    const headerClass = 'text-sm font-medium text-gray-900';

    return (
        <>
            {/* A. Desktop/Table Row View (visible on lg screens and up) 
          Uses a custom-width grid definition for accurate column alignment.
      */}
            {/* <div
                class="hidden lg:grid grid-cols-[250px_158px_234px_241px_156px] items-center py-4 px-6 border-b border-gray-100 last:border-b-0"
                role="row"
                aria-rowindex={job.id + 1} // Assuming header is row 1
            > */}
            <div
                class="hidden lg:grid grid-cols-[2fr_1.2fr_1.5fr_1.2fr_1fr] items-center py-4 px-6 border-b border-gray-100 last:border-b-0"
                role="row"
                aria-rowindex={job.id + 1}
            >
                <div class={dataClass} role="cell">
                    {job.title}
                </div>
                <div class={dataClass} role="cell">
                    {job.location}
                </div>
                <div class={dataClass} role="cell">
                    {job.date}
                </div>
                <div class={dataClass} role="cell">
                    {job.amount}
                </div>
                <div role="cell">
                    <StatusPill status={job.status} />
                </div>
            </div>

            {/* B. Mobile/Card View (visible on screens smaller than lg) 
          A stacked, single-column layout using flexbox.
      */}
            <div
                class="lg:hidden flex flex-col gap-3 p-4 border-b border-gray-200 last:border-b-0"
                role="listitem"
            >
                <div class="flex justify-between items-start">
                    <div class="flex flex-col">
                        <div class={`text-lg font-semibold text-gray-900`}>
                            {job.title}
                        </div>
                        <div class={`${dataClass} mt-1`}>{job.location}</div>
                    </div>
                    <StatusPill status={job.status} />
                </div>

                <div class="flex justify-between items-center text-sm">
                    <div class="flex flex-col">
                        <span class={headerClass}>Amount</span>
                        <span class={dataClass}>{job.amount}</span>
                    </div>
                    <div class="flex flex-col text-right">
                        <span class={headerClass}>Date</span>
                        <span class={dataClass}>{job.date}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export const RecentJobHistory: Component<RecentJobHistoryProps> = (props) => {
    const headerTextClass = 'text-xl md:text-2xl font-semibold text-gray-900';
    const viewAllClass =
        'text-base font-semibold text-sky-700 hover:text-sky-800 transition-colors';

    return (
        <div
            class="w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            role="table"
            aria-label="Recent Job History"
        >
            {/* Header Section (Text and Link/Button) */}
            <div class="flex justify-between items-center p-4 md:p-6 border-b border-gray-100">
                <h2 class={headerTextClass}>Recent Job History</h2>
                {/* 'View All' is a navigational link */}
                <a href="#" class={viewAllClass}>
                    View All
                </a>
            </div>

            {/* Table/List Body */}
            <div class="w-full">
                {/* Desktop Table Header (Visible only on lg screens and up) */}
                {/* <div
                    class="hidden lg:grid grid-cols-[250px_158px_234px_241px_156px] bg-white text-gray-900 font-medium border-b border-gray-200"
                    role="rowgroup"
                > */}
                <div
                    class="hidden lg:grid grid-cols-[2fr_1.2fr_1.5fr_1.2fr_1fr] bg-white text-gray-900 font-medium border-b border-gray-200"
                    role="rowgroup"
                >
                    {/* Using text elements styled as header cells */}
                    <div class="py-3 px-6 text-left" role="columnheader">
                        Job Title
                    </div>
                    <div class="py-3 px-6 text-left" role="columnheader">
                        Location
                    </div>
                    <div class="py-3 px-6 text-left" role="columnheader">
                        Date
                    </div>
                    <div class="py-3 px-6 text-left" role="columnheader">
                        Amount
                    </div>
                    <div class="py-3 px-6 text-left" role="columnheader">
                        Status
                    </div>
                </div>

                <div role="rowgroup">
                    <For each={props.jobs}>
                        {(job) => <JobRowOrCard {...job} />}
                    </For>
                </div>
            </div>
        </div>
    );
};
