import client_onboarding from './../../../assets/client_welcome_back.svg';
import client_create_account from './../../../assets/client_create_account.svg';
import artisan_onboarding from './../../../assets/artisan_welcome_back.svg';
import artisan_create_account from './../../../assets/artisan_create_account.svg';
import login_css from './style.module.css';
import { Switch, Match, createMemo, Component, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { LoginStore, StepTransitions, AccountEnum } from './types';
import { SignUpForm } from './client_create_account';
import { LandingLogin } from './login_landing';
import { OTPCard } from './otp_card';
import { SuccessPage } from './success_page';
import { WelcomeBackPage } from './client_welcome_back';
import { ForgotPasswordCard } from './forgot_password';
import { ResetPasswordCard } from './reset_password';
import { ArtisanSignUpForm } from './artisan_create_account';
import { ArtisansLocationNAvialability } from './artisan_locationNavail';
import { ArtisansSkillNTitle } from './artisan_skillNtitle';
import { ArtisansSelfDescription } from './artisan_selfDescription';
import { ArtisansVerificationNTrust } from './artisan_verificationNtrust';
import { useSearchParams } from '@solidjs/router';

interface ImageStepDetails {
    clientImage: string;
    artisanImage: string;
}

type ImageConfigMap = Partial<Record<StepTransitions, ImageStepDetails>>;

const imageConfig: ImageConfigMap = {
    [StepTransitions.ClientLanding]: {
        clientImage: client_onboarding,
        artisanImage: artisan_onboarding,
    },
    [StepTransitions.ClientCreateAccount]: {
        clientImage: client_create_account,
        artisanImage: artisan_create_account,
    },
    [StepTransitions.ClientWelcomeBack]: {
        clientImage: client_onboarding,
        artisanImage: artisan_onboarding,
    },
    [StepTransitions.ArtisanCreateAccount]: {
        clientImage: client_create_account,
        artisanImage: artisan_create_account,
    },
    [StepTransitions.ArtisanSkillsNTitle]: {
        clientImage: client_create_account,
        artisanImage: artisan_create_account,
    },
    [StepTransitions.ArtisanLocationNAvailability]: {
        clientImage: client_create_account,
        artisanImage: artisan_create_account,
    },
    [StepTransitions.ArtisanSelfDescription]: {
        clientImage: client_create_account,
        artisanImage: artisan_create_account,
    },
    [StepTransitions.ArtisanVerificationNTrust]: {
        clientImage: client_create_account,
        artisanImage: artisan_create_account,
    },
};

export const LoginPage: Component = () => {
    const [searchParams] = useSearchParams();
    const [loginStore, setLoginStore] = createStore<LoginStore>({
        activeProfile: AccountEnum.Client,
        users: [],
        currentStep: StepTransitions.ClientLanding,
        updateStore: (key: string, value: string) => {
            setLoginStore((state) => ({ ...state, [key]: value }));
        },
        updatingPassword: false,
    });

    // 1. Memoized calculation of the current step's image config
    const currentImageConfig = createMemo(
        () => imageConfig[loginStore.currentStep]
    );

    // 2. Memoized calculation of the image source
    const currentImageSource = createMemo(() => {
        const config = currentImageConfig();
        if (!config) return null;

        return loginStore.activeProfile === AccountEnum.Client
            ? config.clientImage
            : config.artisanImage;
    });

    // 3. Memoized grid layout class
    const gridLayoutClass = createMemo(() => {
        const hasImage = !!currentImageConfig();
        return hasImage ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1';
    });

    onMount(() => {
        const accountType = () => searchParams.type;
        if (accountType() === 'artisan') {
            setLoginStore('activeProfile', AccountEnum.Provider);
        } else {
            setLoginStore('activeProfile', AccountEnum.Client);
        }
    });

    return (
        <div class={`grid ${gridLayoutClass()} m-0 p-0 w-full min-h-screen`}>
            {currentImageSource() && (
                <div
                    class="hidden md:block"
                    style="position: relative; background: #062736; overflow: hidden;"
                >
                    <img
                        src={currentImageSource()!}
                        alt="Onboarding Visual"
                        class={login_css.logo}
                    />
                </div>
            )}

            {/* 2. RIGHT COLUMN: FORM CONTENT */}
            <div class="bg-[#FCFCFD] flex justify-center p-4 font-sans w-full md:items-start md:pt-20">
                <div class="w-full md:max-w-[720px]">
                    <Switch>
                        {/* Client Transitions */}
                        <Match
                            when={
                                loginStore.currentStep ===
                                StepTransitions.ClientLanding
                            }
                        >
                            <LandingLogin loginStore={loginStore} />
                        </Match>
                        <Match
                            when={
                                loginStore.currentStep ===
                                StepTransitions.ClientCreateAccount
                            }
                        >
                            <SignUpForm loginStore={loginStore} />
                        </Match>
                        <Match
                            when={
                                loginStore.currentStep ===
                                StepTransitions.ClientWelcomeBack
                            }
                        >
                            <WelcomeBackPage loginStore={loginStore} />
                        </Match>
                        {/* General transitions */}
                        <Match
                            when={
                                loginStore.currentStep ===
                                StepTransitions.VerifyAccount
                            }
                        >
                            <OTPCard loginStore={loginStore} />
                        </Match>
                        <Match
                            when={
                                loginStore.currentStep ===
                                StepTransitions.SetupComplete
                            }
                        >
                            <SuccessPage loginStore={loginStore} />
                        </Match>
                        <Match
                            when={
                                loginStore.currentStep ===
                                StepTransitions.ResetPassword
                            }
                        >
                            <ResetPasswordCard loginStore={loginStore} />
                        </Match>
                        <Match
                            when={
                                loginStore.currentStep ===
                                StepTransitions.ForgotPassword
                            }
                        >
                            <ForgotPasswordCard loginStore={loginStore} />
                        </Match>
                        {/* Artisan Transitions */}
                        <Match
                            when={
                                loginStore.currentStep ===
                                StepTransitions.ArtisanCreateAccount
                            }
                        >
                            <ArtisanSignUpForm loginStore={loginStore} />
                        </Match>
                        <Match
                            when={
                                loginStore.currentStep ===
                                StepTransitions.ArtisanSkillsNTitle
                            }
                        >
                            <ArtisansSkillNTitle loginStore={loginStore} />
                        </Match>
                        <Match
                            when={
                                loginStore.currentStep ===
                                StepTransitions.ArtisanLocationNAvailability
                            }
                        >
                            <ArtisansLocationNAvialability
                                loginStore={loginStore}
                            />
                        </Match>
                        <Match
                            when={
                                loginStore.currentStep ===
                                StepTransitions.ArtisanSelfDescription
                            }
                        >
                            <ArtisansSelfDescription loginStore={loginStore} />
                        </Match>
                        <Match
                            when={
                                loginStore.currentStep ===
                                StepTransitions.ArtisanVerificationNTrust
                            }
                        >
                            <ArtisansVerificationNTrust
                                loginStore={loginStore}
                            />
                        </Match>

                        {/* Fallback */}
                        <Match when={true}>
                            <div>
                                Error: Unhandled Step ({loginStore.currentStep})
                            </div>
                        </Match>
                    </Switch>
                </div>
            </div>
        </div>
    );
};
