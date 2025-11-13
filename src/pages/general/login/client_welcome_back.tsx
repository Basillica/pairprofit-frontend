import { Component, createSignal } from 'solid-js';
import { Facebook, Google, Linkedin } from './svg';
import logo from './../../../assets/pairprofit.svg';
import { LoginStore, StepTransitions } from './types';

const VisibilityIcon = (props: any) => (
    <div class="w-5 h-5 text-gray-500 cursor-pointer" onClick={props.onClick}>
        <i class="fas fa-eye text-sm"></i>
    </div>
);

export const WelcomeBackPage: Component<{
    loginStore: LoginStore;
}> = (props) => {
    // 1. State Management
    const [firstName] = createSignal('');
    const [lastName] = createSignal('');
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [confirmPassword] = createSignal('');
    const [acceptedTerms] = createSignal(false);

    // 2. Handler
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Simple validation check
        if (!acceptedTerms()) {
            console.log('You must accept the terms and privacy policy.');
            return;
        }
        if (password() !== confirmPassword()) {
            console.log('Passwords do not match.');
            return;
        }

        console.log({
            firstName: firstName(),
            lastName: lastName(),
            email: email(),
            password: password(),
            termsAccepted: acceptedTerms(),
        });
        props.loginStore.updateStore(
            'currentStep',
            StepTransitions.VerifyAccount
        );
    };

    // 3. Reusable Input Component
    const InputField = ({
        type = 'text',
        value,
        onChange,
        placeholder,
        isPassword = false,
    }: any) => {
        const [showPassword, setShowPassword] = createSignal(false);
        const inputType = isPassword
            ? showPassword()
                ? 'text'
                : 'password'
            : type;

        return (
            <div class="self-stretch flex items-center h-11 px-3 rounded-lg border border-slate-300">
                <input
                    type={inputType}
                    value={value()}
                    onInput={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    class="w-full text-gray-900 text-sm font-normal leading-snug focus:outline-none placeholder-gray-500 bg-transparent"
                />
                {isPassword && (
                    <VisibilityIcon
                        onClick={() => setShowPassword(!showPassword())}
                    />
                )}
            </div>
        );
    };

    return (
        <form
            onSubmit={handleSubmit}
            class="w-full px-4 pt-4 flex flex-col items-center justify-start min-h-screen md:px-12 bg-[#FCFCFD]"
        >
            <div class="w-full flex flex-col justify-start items-right gap-10">
                <div class="w-full flex flex-col justify-start items-right gap-10">
                    {/* <div class="flex items-center text-white text-2xl font-bold tracking-wide mb-10">
                        <Logo />
                        <span class="text-2xl font-bold text-gray-900 text-center leading-snug ml-2">
                            Pairprofit
                        </span>
                    </div> */}
                    <a
                        class="px-4 py-3 text-base font-semibold text-[#1376a1] rounded-lg border border-transparent transition"
                        href="/"
                    >
                        <img
                            src={logo}
                            alt="PairProfit Logo"
                            class="h-7 w-auto"
                        />
                    </a>
                    <div class="flex flex-col justify-start items-center gap-1">
                        <h1 class="text-3xl font-bold text-gray-900 text-center leading-snug">
                            Welcome Back
                        </h1>
                        <p class="text-base text-gray-600 text-center leading-relaxed">
                            Login to PairProfit to continue using it
                        </p>
                    </div>
                    <div class="self-stretch flex flex-col justify-start items-start gap-8">
                        <div class="self-stretch flex flex-col justify-start items-start gap-4">
                            <InputField
                                label="Email"
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={setEmail}
                            />
                            <InputField
                                label="Password"
                                placeholder="Enter password"
                                isPassword
                                value={password}
                                onChange={setPassword}
                            />
                            <button
                                class="self-stretch inline-flex justify-end items-center gap-3"
                                onClick={() =>
                                    props.loginStore.updateStore(
                                        'currentStep',
                                        StepTransitions.ForgotPassword
                                    )
                                }
                            >
                                <span class="text-sky-800 text-sm font-semibold cursor-pointer">
                                    {' '}
                                    Forgot Password?
                                </span>
                            </button>
                        </div>
                        <div class="self-stretch flex flex-col justify-start items-center gap-3">
                            <button
                                type="submit"
                                class="self-stretch h-12 px-4 py-3 bg-cyan-700 rounded-lg inline-flex justify-center items-center gap-2.5 text-white text-base font-semibold leading-relaxed
                                       transition duration-150 hover:bg-[#1376A1] focus:outline-none focus:ring-4 focus:ring-cyan-700/50 cursor-pointer"
                            >
                                Login
                            </button>
                            <div class="self-stretch text-center text-sm leading-snug">
                                <span class="text-slate-800 font-normal">
                                    Don't have an account?{' '}
                                </span>
                                <span
                                    class="text-sky-800 font-semibold cursor-pointer"
                                    onClick={() =>
                                        props.loginStore.updateStore(
                                            'currentStep',
                                            StepTransitions.ClientCreateAccount
                                        )
                                    }
                                >
                                    Sign Up here
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="self-stretch flex flex-col justify-start items-center gap-3">
                        <div class="self-stretch px-6 inline-flex justify-center items-center gap-4">
                            <div class="flex-1 h-px bg-slate-100"></div>
                            <div class="text-gray-700 text-sm font-medium leading-snug">
                                OR
                            </div>
                            <div class="flex-1 h-px bg-slate-100"></div>
                        </div>
                        <div class="self-stretch flex flex-col justify-center items-start gap-4">
                            <button
                                type="button"
                                class="w-full px-6 py-3 bg-slate-50 rounded-full border border-slate-300 inline-flex justify-center items-center gap-2.5 
                                       transition duration-150 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            >
                                <Google />
                                <span class="text-stone-900 text-sm font-semibold leading-snug">
                                    Continue with Google
                                </span>
                            </button>
                            <button
                                type="button"
                                class="w-full px-6 py-3 bg-slate-50 rounded-full border border-slate-300 inline-flex justify-center items-center gap-2.5 
                                       transition duration-150 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            >
                                <Linkedin />
                                <span class="text-stone-900 text-sm font-semibold leading-snug">
                                    Continue with LinkedIn
                                </span>
                            </button>
                            <button
                                type="button"
                                class="w-full px-6 py-3 bg-slate-50 rounded-full border border-slate-300 inline-flex justify-center items-center gap-2.5 
                                       transition duration-150 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            >
                                <Facebook />
                                <span class="text-stone-900 text-sm font-semibold leading-snug">
                                    Continue with Facebook
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};
