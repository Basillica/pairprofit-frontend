import { Component, createMemo, createSignal } from 'solid-js';
import { Facebook, Google, Linkedin } from './svg';
import logo from './../../../assets/pairprofit.svg';
import { LoginStore, StepTransitions } from './types';

const VisibilityIcon = (props: any) => (
    // <div class="w-5 h-5 text-gray-500 cursor-pointer" onClick={props.onClick}>
    <div
        class="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
        onClick={props.onClick}
    >
        <i class="fas fa-eye text-sm"></i>
    </div>
);

const CheckboxIcon = ({
    onChange,
    storeKey,
    checked,
}: {
    onChange: any;
    storeKey: string;
    checked: boolean;
}) => {
    const [isChecked, setIsChecked] = createSignal(checked);
    const handleChecked = () => {
        const newValue = !isChecked();
        setIsChecked(newValue);
        onChange(newValue, storeKey);
    };

    return (
        <div
            onClick={handleChecked}
            classList={{
                'w-6 h-6 rounded border flex items-center justify-center cursor-pointer transition-all duration-150 ease-in-out':
                    true,
                'border-sky-800 bg-sky-800': isChecked(), // Styles when checked (blue fill)
                'border-gray-300 bg-white': !isChecked(), // Styles when NOT checked (white fill, gray border)
            }}
        >
            <i
                class="fas fa-check text-white text-xs"
                // Show the checkmark only when checked
                style={{ display: isChecked() ? 'block' : 'none' }}
            ></i>
        </div>
    );
};

const InputField = ({
    type = 'text',
    value,
    onChange,
    placeholder,
    key,
    isPassword = false,
    label,
}: {
    type?: string;
    value: string;
    onChange: any;
    placeholder: string;
    key: string;
    isPassword?: boolean;
    label: string;
}) => {
    const [showPassword, setShowPassword] = createSignal(false);
    const [inputType, setInputType] = createSignal(type);
    const toggleShowPassword = () => {
        setInputType(showPassword() ? 'text' : 'password');
        setShowPassword(!showPassword());
    };

    return (
        // <div class="self-stretch flex items-center h-11 px-3 rounded-lg border border-slate-300 dark:border-gray-700">
        <div class="self-stretch flex items-center h-11 px-3 rounded-lg border border-slate-300">
            <input
                type={inputType()}
                name={label}
                value={value}
                onInput={(e) => onChange(e.target.value, key)}
                placeholder={placeholder}
                class="w-full text-gray-900 text-sm font-normal leading-snug focus:outline-none placeholder-gray-500 bg-transparent"
            />
            {isPassword && <VisibilityIcon onClick={toggleShowPassword} />}
        </div>
    );
};

const isValidEmail = (email: string) => {
    if (!email) return false;
    return /\S+@\S+\.\S+/.test(email);
};

export const SignUpForm: Component<{
    loginStore: LoginStore;
}> = (props) => {
    const isFormValid = createMemo(() => {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            acceptedTerms,
        } = props.loginStore;

        const isNamePresent = firstName.trim() && lastName.trim();
        const isEmailValid = isValidEmail(email);
        const isPasswordPresent =
            password.length >= 8 && confirmPassword.length >= 8;
        const doPasswordsMatch = password === confirmPassword;

        return (
            isNamePresent &&
            isEmailValid &&
            isPasswordPresent &&
            doPasswordsMatch &&
            acceptedTerms
        );
    }, [props.loginStore]);

    // Handler
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log({
            firstName: props.loginStore.firstName,
            lastName: props.loginStore.lastName,
            email: props.loginStore.email,
            password: props.loginStore.password,
            termsAccepted: props.loginStore.acceptedTerms,
        });
        props.loginStore.updateStore(
            'currentStep',
            StepTransitions.VerifyAccount
        );
    };

    const handleInputField = (
        value: string,
        key: keyof Omit<
            LoginStore,
            | 'updateStore'
            | 'setCurrentStep'
            | 'setActiveProfile'
            | 'handleTransition'
        >
    ) => {
        props.loginStore.updateStore(key, value);
    };

    const handleCheckboxChange = (
        newValue: boolean,
        key: keyof Omit<
            LoginStore,
            | 'updateStore'
            | 'setCurrentStep'
            | 'setActiveProfile'
            | 'handleTransition'
        >
    ) => {
        props.loginStore.updateStore(key, newValue);
    };

    return (
        <form
            onSubmit={handleSubmit}
            class="w-full px-4 pt-4 flex flex-col items-center justify-start min-h-screen md:px-12 bg-[#FCFCFD] dark:bg-gray-900"
        >
            <div class="w-full flex flex-col justify-start items-right gap-10">
                <div class="w-full flex flex-col justify-start items-right gap-10">
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
                            Create an Account
                        </h1>
                        <p class="text-base text-gray-600 text-center leading-relaxed">
                            Let's get you started to start connecting
                        </p>
                    </div>
                    <div class="self-stretch flex flex-col justify-start items-start gap-8">
                        <div class="self-stretch flex flex-col justify-start items-start gap-4">
                            <InputField
                                label="First Name"
                                placeholder="Enter your first name"
                                value={props.loginStore.firstName}
                                key="firstName"
                                onChange={handleInputField}
                            />
                            <InputField
                                label="Last Name"
                                placeholder="Enter your last name"
                                value={props.loginStore.lastName}
                                key="lastName"
                                onChange={handleInputField}
                            />
                            <InputField
                                label="Email"
                                type="email"
                                key="email"
                                placeholder="Enter your email address"
                                value={props.loginStore.email}
                                onChange={handleInputField}
                            />
                            <div class="self-stretch inline-flex justify-start items-start gap-4">
                                <div class="flex-1">
                                    <InputField
                                        label="Password"
                                        key="password"
                                        placeholder="Enter password"
                                        isPassword
                                        value={props.loginStore.password}
                                        onChange={handleInputField}
                                    />
                                </div>
                                <div class="flex-1">
                                    <InputField
                                        label="Confirm Password"
                                        placeholder="Confirm password"
                                        key="confirmPassword"
                                        isPassword
                                        value={props.loginStore.confirmPassword}
                                        onChange={handleInputField}
                                    />
                                </div>
                            </div>
                            <div class="self-stretch inline-flex justify-start items-center gap-3">
                                <CheckboxIcon
                                    checked={props.loginStore.acceptedTerms}
                                    onChange={handleCheckboxChange}
                                    storeKey="acceptedTerms"
                                />
                                <div class="flex-1 text-gray-600 text-sm font-normal leading-snug">
                                    By signing up to create an account, I accept
                                    Company's
                                    <span class="text-sky-800 text-sm font-semibold cursor-pointer">
                                        {' '}
                                        Terms of Use and Privacy Policy.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="self-stretch flex flex-col justify-start items-center gap-3">
                            <button
                                disabled={!isFormValid()}
                                type="submit"
                                class={`
                                    self-stretch h-12 px-4 py-3 bg-cyan-700 rounded-lg inline-flex justify-center items-center gap-2.5 text-white text-base font-semibold leading-relaxed
                                    transition duration-150
                                    ${
                                        !isFormValid()
                                            ? 'opacity-50 cursor-not-allowed pointer-events-none'
                                            : 'hover:bg-[#1376A1] focus:outline-none focus:ring-4 focus:ring-cyan-700/50 cursor-pointer'
                                    }
                                `}
                            >
                                Sign Up
                            </button>
                            <div class="self-stretch text-center text-sm leading-snug">
                                <span class="text-slate-800 font-normal">
                                    Already have an account?{' '}
                                </span>
                                <span
                                    class="text-sky-800 font-semibold cursor-pointer"
                                    onClick={() =>
                                        props.loginStore.updateStore(
                                            'currentStep',
                                            StepTransitions.ClientWelcomeBack
                                        )
                                    }
                                >
                                    Sign In here
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="self-stretch flex flex-col justify-start items-center gap-3 pb-6">
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
                                    Sign up with Google
                                </span>
                            </button>
                            <button
                                type="button"
                                class="w-full px-6 py-3 bg-slate-50 rounded-full border border-slate-300 inline-flex justify-center items-center gap-2.5 
                                       transition duration-150 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            >
                                <Linkedin />
                                <span class="text-stone-900 text-sm font-semibold leading-snug">
                                    Sign up with LinkedIn
                                </span>
                            </button>
                            <button
                                type="button"
                                class="w-full px-6 py-3 bg-slate-50 rounded-full border border-slate-300 inline-flex justify-center items-center gap-2.5 
                                       transition duration-150 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            >
                                <Facebook />
                                <span class="text-stone-900 text-sm font-semibold leading-snug">
                                    Sign up with Facebook
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};
