import { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { LoginStore, StepTransitions } from './types';
import { Flag } from './svg';

export const ForgotPasswordCard: Component<{
    loginStore: LoginStore;
}> = (props) => {
    const [email, setEmail] = createSignal('');

    const InputField = ({ value, onChange, placeholder }: any) => {
        return (
            <div class="self-stretch flex items-center h-11 px-3 rounded-lg border border-slate-300">
                <input
                    type={'email'}
                    value={value()}
                    onInput={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    class="w-full text-gray-900 text-sm font-normal leading-snug focus:outline-none placeholder-gray-500 bg-transparent"
                />
            </div>
        );
    };

    const handleSendEmail = () => {
        // performs something
        props.loginStore.updateStore(
            'currentStep',
            StepTransitions.VerifyAccount
        );
        props.loginStore.updateStore('updatingPassword', true);
    };

    return (
        <div class="bg-light-bg flex justify-center items-center min-h-screen m-0 font-sans p-4 bg-[#FCFCFD]">
            <div class="bg-white rounded-xl shadow-lg shadow-card-shadow p-10 w-full max-w-md text-center">
                <div class="justify-center items-center flex mb-10">
                    <Flag />
                </div>

                <h1 class="text-2xl font-semibold text-gray-800 mb-2">
                    Forgot Password
                </h1>
                <p class="text-sm text-gray-500 mb-8">
                    Enter your email below to verify your password
                </p>

                <div class="self-stretch flex flex-col justify-start items-start gap-8 pb-8">
                    <div class="self-stretch flex flex-col justify-start items-start gap-4">
                        <InputField
                            label="Email Address"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={setEmail}
                        />
                    </div>
                </div>

                <button
                    onClick={handleSendEmail}
                    class="w-full py-3 rounded-lg font-semibold transition duration-200 bg-[#1376A1] text-white cursor-pointer"
                >
                    Send Email
                </button>
                <div class="flex justify-center items-center gap-1 pt-4">
                    <a
                        href="#"
                        class="text-sm font-semibold text-[#1376A1] hover:no-underline cursor-pointer"
                        onClick={() =>
                            props.loginStore.updateStore(
                                'currentStep',
                                StepTransitions.ClientWelcomeBack
                            )
                        }
                    >
                        Back to Login
                    </a>

                    <div class="text-[#1376A1]">
                        <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.37495 13.28L10.9933 8.9333C11.5387 8.41997 11.5387 7.57997 10.9933 7.06664L6.37495 2.71997"
                                stroke="#1376A1"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
