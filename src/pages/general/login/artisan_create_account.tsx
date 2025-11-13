import { Component, createSignal } from 'solid-js';
import { Logo } from './svg';
import { LoginStore, StepTransitions } from './types';

const VisibilityIcon = (props: any) => (
    <div class="w-5 h-5 text-gray-500 cursor-pointer" onClick={props.onClick}>
        <i class="fas fa-eye text-sm"></i>
    </div>
);

const CheckboxIcon = (props: any) => (
    <div
        class="w-6 h-6 rounded border border-gray-300 flex items-center justify-center cursor-pointer"
        onClick={props.onClick}
        classList={{ 'bg-sky-800 border-sky-800': props.checked }}
    >
        <i
            class="fas fa-check text-white text-xs"
            style={{ display: props.checked() ? 'block' : 'none' }}
        ></i>
    </div>
);

export const ArtisanSignUpForm: Component<{
    loginStore: LoginStore;
}> = (props) => {
    // 1. State Management
    const [firstName, setFirstName] = createSignal('');
    const [lastName, setLastName] = createSignal('');
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [confirmPassword, setConfirmPassword] = createSignal('');
    const [acceptedTerms, setAcceptedTerms] = createSignal(false);

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
            StepTransitions.ArtisanSkillsNTitle
        );
    };

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

    const totalSteps = 5;
    const currentStep = 1;
    const progressWidth = `${(currentStep / totalSteps) * 100}%`;

    return (
        <form
            onSubmit={handleSubmit}
            class="w-full px-4 flex flex-col items-center justify-start min-h-screen md:px-12 bg-[#FCFCFD]"
        >
            <div class="w-full flex flex-col justify-start items-right gap-10">
                <div class="w-full flex flex-col justify-start items-right gap-10">
                    <div class="flex items-center text-white text-2xl font-bold tracking-wide">
                        <Logo />
                        <span class="text-2xl font-bold text-gray-900 text-center leading-snug ml-2">
                            Pairprofit
                        </span>
                    </div>
                    <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: inline-flex">
                        <div
                            class="h-2 left-0 top-0 bg-[#1376A1] rounded-full"
                            style={{ width: progressWidth }}
                        ></div>
                        <div style="align-self: stretch; color: #697586; font-size: 14px; font-weight: 400; line-height: 22.40px; word-wrap: break-word">
                            {currentStep}/5
                        </div>
                    </div>
                    <div class="flex flex-col justify-start items-center gap-1">
                        <h1 class="text-3xl font-bold text-gray-900 text-center leading-snug">
                            Create an Account
                        </h1>
                        <p class="text-base text-gray-600 text-center leading-relaxed">
                            Let's help clients find you
                        </p>
                    </div>
                    <div class="w-full flex flex-col items-center justify-center gap-10 md:gap-10 p-4">
                        <div class="self-stretch flex flex-col justify-start items-start gap-4">
                            <InputField
                                label="First Name"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={setFirstName}
                            />
                            <InputField
                                label="Last Name"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={setLastName}
                            />
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
                            <InputField
                                label="Confirm Password"
                                placeholder="Confirm password"
                                isPassword
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                            />
                            <div class="self-stretch inline-flex justify-start items-center gap-3">
                                <CheckboxIcon
                                    checked={acceptedTerms}
                                    onClick={() =>
                                        setAcceptedTerms(!acceptedTerms())
                                    }
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
                                type="submit"
                                class="self-stretch h-12 px-4 py-3 bg-cyan-700 rounded-lg inline-flex justify-center items-center gap-2.5 text-white text-base font-semibold leading-relaxed
                                       transition duration-150 hover:bg-[#1376A1] focus:outline-none focus:ring-4 focus:ring-cyan-700/50 cursor-pointer"
                            >
                                Next
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
                </div>
            </div>
        </form>
    );
};
