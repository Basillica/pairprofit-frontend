import { Component } from 'solid-js';

interface PublicNavBarProps {
    companyName: string;
}

export const PublicNavBar: Component<PublicNavBarProps> = (props) => {
    return (
        <nav
            class="w-full p-5 shadow-md flex items-center justify-between"
            style="background-color: #137092"
        >
            <a
                href="/"
                class="flex items-center text-white text-2xl font-bold tracking-wide"
                style={'height: 20px'}
            >
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.21909e-05 0V17.8373C-0.0040347 18.8703 0.194322 19.894 0.58375 20.8495C0.973179 21.8051 1.54601 22.6737 2.26938 23.4057C2.99275 24.1376 3.85241 24.7183 4.79904 25.1146C5.74566 25.5108 6.76062 25.7148 7.78566 25.7148H19.6103V17.0972H10.3311C9.81552 17.0972 9.32099 16.8913 8.95585 16.5245C8.59072 16.1577 8.38476 15.6599 8.38311 15.1404V8.24128H19.5854V0H6.21909e-05Z"
                        fill="#12CFAE"
                    />
                    <path
                        d="M19.6102 34H38.7537V16.0937C38.7537 14.0139 37.9343 12.0191 36.4756 10.5479C35.0168 9.0766 33.0381 8.24922 30.9743 8.24756H19.6102V17.0972H28.6281C29.1447 17.0972 29.6402 17.304 30.0055 17.6722C30.3708 18.0404 30.576 18.5397 30.576 19.0603V25.7148H19.6102V34Z"
                        fill="#373F63"
                    />
                </svg>
                <span style={'padding-left: 10px'}>{props.companyName}</span>
            </a>
            <a
                href="/login"
                class="flex items-center text-white text-base font-bold tracking-wide"
            >
                Login
            </a>
        </nav>
    );
};
