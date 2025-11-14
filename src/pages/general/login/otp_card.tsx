import { Component } from 'solid-js';
import {
    createSignal,
    createEffect,
    createMemo,
    For,
    onCleanup,
} from 'solid-js';
import { LoginStore, StepTransitions } from './types';

const useCountdown = (initialDuration = 59) => {
    const [timeLeft, setTimeLeft] = createSignal(initialDuration);
    const [isRunning, setIsRunning] = createSignal(true);
    const [isFinished, setIsFinished] = createSignal(false);

    // Formats seconds into MM:SS
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };

    createEffect(() => {
        if (!isRunning()) {
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((t) => {
                const newTime = t - 1;
                if (newTime <= 0) {
                    setIsRunning(false); // Stop the timer
                    setIsFinished(true); // Mark as finished
                    return 0; // Set final time to 0
                }
                return newTime;
            });
        }, 1000);

        // 💡 Cleanup runs when the component unmounts OR when isRunning() changes its value
        onCleanup(() => clearInterval(interval));
    });

    const resetCountdown = () => {
        setIsRunning(false); // Stop the existing timer
        setTimeLeft(initialDuration);
        setIsFinished(false);
        setIsRunning(true); // Start a new timer by toggling isRunning
        console.log('Resend code requested...');
    };

    return {
        // Accessors are fine and will update correctly
        formattedTime: () =>
            isFinished() ? ' Resend' : formatTime(timeLeft()),
        isResendActive: isFinished,
        resetCountdown,
    };
};

const CodeInput: Component<{
    index: number;
    value: string;
    onChange: (char: string, index: number) => void;
    onMoveFocus: (index: number) => void;
    focus: boolean;
}> = (props: any) => {
    let inputRef;
    createEffect(() => {
        if (props.focus) {
            inputRef!.focus();
        }
    });

    return (
        <input
            ref={inputRef}
            type="text"
            maxlength="1"
            value={props.value}
            onInput={(e) => {
                // Only accept digits (or empty string if backspacing/clearing)
                const char = e.currentTarget.value;
                if (char.length > 0 && !/^\d$/.test(char)) {
                    // Prevent non-digit input
                    e.currentTarget.value = props.value;
                    return;
                }
                props.onChange(char, props.index);
            }}
            onKeyDown={(e) => {
                // Custom backspace logic to move focus backward
                if (
                    e.key === 'Backspace' &&
                    props.value === '' &&
                    props.index > 0
                ) {
                    props.onMoveFocus(props.index - 1);
                    e.preventDefault(); // Prevent default browser behavior
                }
            }}
            // Tailwind Classes remain as they were
            class="code-input w-12 h-16 text-3xl text-center border border-gray-300 rounded-lg 
                   focus:border-primary-blue focus:ring-2 focus:ring-blue-200 outline-none transition duration-200"
        />
    );
};

export const OTPCard: Component<{
    loginStore: LoginStore;
}> = (props) => {
    const CODE_LENGTH = 4;
    const INITIAL_DURATION = 299; // seconds
    // State for the MFA code (an array of characters)
    const [code, setCode] = createSignal(Array(CODE_LENGTH).fill(''));

    // State to manage which input box should be focused
    const [focusedIndex, setFocusedIndex] = createSignal(0);

    // Countdown hook integration
    const { formattedTime, isResendActive, resetCountdown } =
        useCountdown(INITIAL_DURATION);

    // Derived state: check if all boxes are filled
    const isCodeComplete = createMemo(() =>
        code().every((char) => char !== '')
    );

    const handleCodeChange = (char: string, index: number) => {
        const newCode = [...code()];
        newCode[index] = char;
        setCode(newCode);

        // Auto-focus logic: Move to the next input if the current one was just filled
        if (char !== '' && index < CODE_LENGTH - 1) {
            setFocusedIndex(index + 1);
        }
    };

    const handleMoveFocus = (index: number) => {
        setFocusedIndex(index);
    };

    const handleVerify = () => {
        const fullCode = code().join('');
        console.log('Verifying code:', fullCode);
        if (props.loginStore.updatingPassword) {
            props.loginStore.updateStore(
                'currentStep',
                StepTransitions.ResetPassword
            );
        } else {
            props.loginStore.updateStore(
                'currentStep',
                StepTransitions.SetupComplete
            );
        }
    };

    const handleResend = () => {
        if (isResendActive()) {
            setCode(Array(CODE_LENGTH).fill(''));
            setFocusedIndex(0);
            resetCountdown();
        }
    };

    return (
        <div class="bg-light-bg flex justify-center items-center min-h-screen m-0 font-sans bg-[#FCFCFD]">
            <div class="bg-white rounded-xl shadow-lg shadow-card-shadow p-10 w-full max-w-md text-center">
                <h1 class="text-2xl font-semibold text-gray-800 mb-2">
                    Verify your account
                </h1>
                <p class="text-sm text-gray-500 mb-8">
                    We just sent an email to your registered email account
                </p>

                <p class="text-sm text-gray-600 leading-relaxed mb-6">
                    Enter the security code we just sent to <br />
                    <span class="font-semibold text-gray-800">
                        stanley.agu@pairprofit.com
                    </span>
                </p>

                {/* Code Input Container */}
                <div class="flex justify-between w-64 mx-auto mb-5">
                    <For each={code()}>
                        {(char, index) => (
                            <CodeInput
                                index={index()}
                                value={char}
                                onChange={handleCodeChange}
                                onMoveFocus={handleMoveFocus}
                                focus={focusedIndex() === index()}
                            />
                        )}
                    </For>
                </div>

                {/* Resend Link/Countdown */}
                <p class="text-sm text-gray-500 mb-8">
                    Didn't receive code?
                    <span
                        onClick={handleResend}
                        class={[
                            'font-medium transition duration-200',
                            isResendActive()
                                ? 'text-primary-blue cursor-pointer hover:text-blue-600'
                                : 'text-gray-400 cursor-default pointer-events-none',
                        ].join(' ')}
                    >
                        {isResendActive()
                            ? formattedTime()
                            : ` Resend - ${formattedTime()}`}
                    </span>
                </p>

                {/* Verify Button */}
                <button
                    onClick={handleVerify}
                    disabled={!isCodeComplete()}
                    class={[
                        'w-full py-3 rounded-lg font-semibold transition duration-200',
                        isCodeComplete()
                            ? 'bg-[#1376A1] text-white hover:bg-blue-600 cursor-pointer'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed',
                    ].join(' ')}
                >
                    Verify
                </button>
            </div>
        </div>
    );
};
