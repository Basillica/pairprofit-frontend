import { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { LoginStore, StepTransitions } from './types';

const VisibilityIcon = (props: any) => (
    <div class="w-5 h-5 text-gray-500 cursor-pointer" onClick={props.onClick}>
        <i class="fas fa-eye text-sm"></i>
    </div>
);

export const ResetPasswordCard: Component<{
    loginStore: LoginStore;
}> = (props) => {
    const [password, setPassword] = createSignal('');
    const [confirmPassword, setConfirmPassword] = createSignal('');

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

    const handleResetPassword = () => {
        props.loginStore.updateStore('updatingPassword', false);
        props.loginStore.updateStore(
            'currentStep',
            StepTransitions.SetupComplete
        );
    };

    return (
        <div class="bg-light-bg flex justify-center items-center min-h-screen m-0 font-sans bg-[#FCFCFD] dark:bg-gray-900">
            <div class="bg-white rounded-xl shadow-lg shadow-card-shadow p-10 w-full max-w-md text-center">
                <h1 class="text-2xl font-semibold text-gray-800 mb-2">
                    Create new password
                </h1>
                <p class="text-sm text-gray-500 mb-8">
                    Let's reset your password to something stronger
                </p>

                <div class="self-stretch flex flex-col justify-start items-start gap-8">
                    <div class="self-stretch flex flex-col justify-start items-start gap-4">
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
                    </div>
                </div>
                <span class="text-xs text-gray-500">
                    Min 8 characters, 1special character, 1 upper case and 1
                    number
                </span>
                <button
                    onClick={handleResetPassword}
                    class="w-full py-3 rounded-lg font-semibold transition duration-200 bg-[#1376A1] text-white cursor-pointer mt-6"
                >
                    Reset password
                </button>
            </div>
        </div>
    );
};
