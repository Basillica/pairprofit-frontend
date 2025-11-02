import { Component } from 'solid-js';

export const Cleaning: Component<{
    active: boolean;
}> = (props) => {
    return (
        <svg
            // width="24"
            // height="24"
            class={`w-6 h-6 ${
                props.active ? 'text-[#1376a1]' : 'text-gray-800'
            }`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M19.56 11.36 13 8.44V7c0-.55-.45-1-1-1s-1-.45-1-1 .45-1 1-1 1 .45 1 1h2c0-1.84-1.66-3.3-3.56-2.95-1.18.22-2.15 1.17-2.38 2.35-.3 1.56.6 2.94 1.94 3.42v.63l-6.56 2.92c-.88.38-1.44 1.25-1.44 2.2v.01C3 14.92 4.08 16 5.42 16H7v6h10v-6h1.58c1.34 0 2.42-1.08 2.42-2.42v-.01c0-.95-.56-1.82-1.44-2.21M15 20H9v-5h6zm3.58-6H17v-1H7v1H5.42c-.46 0-.58-.65-.17-.81l6.75-3 6.75 3c.42.19.28.81-.17.81"
                fill="#000"
            />
        </svg>
    );
};

export const Settings: Component<{
    active: boolean;
}> = (props) => {
    return (
        <svg
            // width="24"
            // height="24"
            class={`w-6 h-6 ${
                props.active ? 'text-[#1376a1]' : 'text-gray-800'
            }`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.062 7.938 9 5.127l-2.842-2.84C6.738 2.102 7.358 2 8 2a6 6 0 0 1 5.743 7.743L20 16a2.827 2.827 0 1 1-4 4l-6.257-6.257a6 6 0 0 1-7.458-7.576L5.124 9l2.813-.937z"
                fill="#1376A1"
            />
        </svg>
    );
};

export const Transport: Component<{
    active: boolean;
}> = (props) => {
    return (
        <svg
            // width="24"
            // height="24"
            class={`w-6 h-6 ${
                props.active ? 'text-[#1376a1]' : 'text-gray-800'
            }`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2 3v-.75a.75.75 0 0 0-.75.75zm11 0h.75a.75.75 0 0 0-.75-.75zm0 6v-.75a.75.75 0 0 0-.75.75zM2 3.75h11v-1.5H2zM12.25 3v16h1.5V3zm-9.5 14V3h-1.5v14zM13 9.75h5v-1.5h-5zM21.25 13v4h1.5v-4zm-7.5 6V9h-1.5v10zm5.134.884a1.25 1.25 0 0 1-1.768 0l-1.06 1.06a2.75 2.75 0 0 0 3.889 0zm-1.768-1.768a1.25 1.25 0 0 1 1.768 0l1.06-1.06a2.75 2.75 0 0 0-3.889 0zM6.884 19.884a1.25 1.25 0 0 1-1.768 0l-1.06 1.06a2.75 2.75 0 0 0 3.889 0zm-1.768-1.768a1.25 1.25 0 0 1 1.768 0l1.06-1.06a2.75 2.75 0 0 0-3.889 0zm13.768 0c.244.244.366.563.366.884h1.5c0-.703-.269-1.408-.805-1.945zm.366.884c0 .321-.122.64-.366.884l1.061 1.06A2.74 2.74 0 0 0 20.75 19zM16 18.25h-3v1.5h3zm1.116 1.634A1.24 1.24 0 0 1 16.75 19h-1.5c0 .703.269 1.408.805 1.945zM16.75 19c0-.321.122-.64.366-.884l-1.061-1.06A2.74 2.74 0 0 0 15.25 19zm-11.634.884A1.24 1.24 0 0 1 4.75 19h-1.5c0 .703.269 1.408.805 1.945zM4.75 19c0-.321.122-.64.366-.884l-1.06-1.06A2.74 2.74 0 0 0 3.25 19zm8.25-.75H8v1.5h5zm-6.116-.134c.244.244.366.563.366.884h1.5c0-.703-.269-1.408-.805-1.945zM7.25 19c0 .321-.122.64-.366.884l1.06 1.06A2.74 2.74 0 0 0 8.75 19zm14-2c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0 0 22.75 17zM18 9.75A3.25 3.25 0 0 1 21.25 13h1.5A4.75 4.75 0 0 0 18 8.25zM1.25 17A2.75 2.75 0 0 0 4 19.75v-1.5c-.69 0-1.25-.56-1.25-1.25z"
                fill="#000"
            />
            <path
                d="M2 8h3m-3 4h5"
                stroke="#000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};

export const Personal: Component<{
    active: boolean;
}> = (props) => {
    return (
        <svg
            // width="24"
            // height="24"
            class={`w-6 h-6 ${
                props.active ? 'text-[#1376a1]' : 'text-gray-800'
            }`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.625 6.75c-.184 2.478-2.062 4.5-4.125 4.5-2.062 0-3.944-2.021-4.125-4.5-.187-2.578 1.64-4.5 4.125-4.5 2.484 0 4.313 1.969 4.125 4.5"
                stroke="#000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M13.5 14.25c-4.078 0-8.217 2.25-8.983 6.497-.094.512.197 1.003.733 1.003h16.5c.536 0 .826-.491.734-1.003-.767-4.247-4.906-6.497-8.984-6.497Z"
                stroke="#000"
                stroke-width="1.5"
                stroke-miterlimit="10"
            />
            <path
                d="M4.125 8.25v5.25m2.625-2.625H1.5"
                stroke="#000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};

export const Event: Component<{
    active: boolean;
}> = (props) => {
    return (
        <svg
            // width="24"
            // height="24"
            class={`w-6 h-6 ${
                props.active ? 'text-[#1376a1]' : 'text-gray-800'
            }`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#a)">
                <path
                    d="M5 22q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 20V6q0-.824.588-1.412A1.93 1.93 0 0 1 5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v6h-2v-2H5v10h7v2zm14 2q-1.825 0-3.187-1.137A4.9 4.9 0 0 1 14.1 20h1.55q.326 1.1 1.238 1.8.913.7 2.112.7 1.45 0 2.475-1.025A3.37 3.37 0 0 0 22.5 19q0-1.45-1.025-2.475A3.37 3.37 0 0 0 19 15.5q-.724 0-1.35.262-.625.262-1.1.738H18V18h-4v-4h1.5v1.425a5.2 5.2 0 0 1 1.575-1.037A4.8 4.8 0 0 1 19 14q2.075 0 3.538 1.463Q24.001 16.925 24 19q0 2.074-1.463 3.538Q21.075 24.002 19 24"
                    fill="#000"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const Painting: Component<{
    active: boolean;
}> = (props) => {
    return (
        <svg
            class={`w-6 h-6 ${
                props.active ? 'text-[#1376a1]' : 'text-gray-800'
            }`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M19 6h1a2 2 0 0 1 2 2 5 5 0 0 1-5 5h-5v2m-2 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};

export const Repairs: Component<{
    active: boolean;
}> = (props) => {
    return (
        <i
            class="fa-solid fa-screwdriver-wrench"
            style={`w-6 h-6 ${
                props.active ? 'text-[#1376a1]' : 'text-gray-800'
            }`}
        ></i>
    );
};

export const Trending: Component<{
    active: boolean;
}> = (props) => {
    return (
        <svg
            // width="24"
            // height="24"
            class={`w-6 h-6 ${
                props.active ? 'text-[#1376a1]' : 'text-gray-800'
            }`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M19.5 14.505c0 4.575-3.787 8.254-8.362 7.98-4.702-.28-7.92-4.802-7.315-9.528.367-2.875 1.715-5.34 3.182-7.252.255-.334.517 2.352.778 2.056.263-.304 2.696-4.514 3.542-5.993a.52.52 0 0 1 .771-.16c1.7 1.283 7.404 6.1 7.404 12.897"
                fill="#FF6723"
            />
            <path
                d="M17.25 16.388c0 3.032-2.64 5.468-5.85 5.358-3.464-.117-5.84-3.288-5.332-6.554C6.803 10.509 11.61 7.5 11.61 7.5s5.64 3.53 5.64 8.888"
                fill="#FFB02E"
            />
        </svg>
    );
};
