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
                const char = e.currentTarget.value;
                if (char.length > 0 && !/^\d$/.test(char)) {
                    e.currentTarget.value = props.value;
                    return;
                }
                props.onChange(char, props.index);
            }}
            onKeyDown={(e) => {
                if (
                    e.key === 'Backspace' &&
                    props.value === '' &&
                    props.index > 0
                ) {
                    props.onMoveFocus(props.index - 1);
                    e.preventDefault();
                }
            }}
            // 💡 DARK MODE FIX: Update input box colors for dark mode
            class="code-input w-12 h-16 text-3xl text-center border border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary-blue
                focus:ring-2 focus:ring-blue-200 outline-none transition duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
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
        <div class="bg-light-bg flex justify-center items-center min-h-screen m-0 font-sans bg-[#FCFCFD] dark:bg-gray-900">
            {/* 2. Card Background Fix */}
            <div class="bg-white **dark:bg-gray-800** rounded-xl shadow-lg shadow-card-shadow p-10 w-full max-w-md text-center">
                {/* 3. Heading Text Fix */}
                <h1 class="text-2xl font-semibold text-gray-800 **dark:text-white** mb-2">
                    Verify your account
                </h1>

                {/* 4. Sub-text Fix */}
                <p class="text-sm text-gray-500 **dark:text-gray-400** mb-8">
                    We just sent an email to your registered email account
                </p>

                {/* 5. Main Instruction Text Fix */}
                <p class="text-sm text-gray-600 **dark:text-gray-300** leading-relaxed mb-6">
                    Enter the security code we just sent to <br />
                    <span class="font-semibold text-gray-800 **dark:text-white**">
                        {props.loginStore.email}
                    </span>
                </p>

                {/* Code Input Container (CodeInput component handles its own colors) */}
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

                {/* 6. Resend Link/Countdown Text Fix */}
                <p class="text-sm text-gray-500 **dark:text-gray-400** mb-8">
                    Didn't receive code?
                    <span
                        onClick={handleResend}
                        class={[
                            'font-medium transition duration-200',
                            isResendActive()
                                ? 'text-primary-blue cursor-pointer hover:text-blue-600'
                                : // 7. Inactive Countdown Text Fix
                                  'text-gray-400 **dark:text-gray-600** cursor-default pointer-events-none',
                        ].join(' ')}
                    >
                        {isResendActive()
                            ? formattedTime()
                            : ` Resend - ${formattedTime()}`}
                    </span>
                </p>

                {/* 8. Verify Button Fix */}
                <button
                    onClick={handleVerify}
                    disabled={!isCodeComplete()}
                    class={[
                        'w-full py-3 rounded-lg font-semibold transition duration-200',
                        isCodeComplete()
                            ? 'bg-[#1376A1] text-white hover:bg-blue-600 cursor-pointer'
                            : // 9. Disabled Button Fix
                              'bg-gray-200 **dark:bg-gray-700** text-gray-500 **dark:text-gray-400** cursor-not-allowed',
                    ].join(' ')}
                >
                    Verify
                </button>
            </div>
        </div>
    );
};
