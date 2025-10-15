import { Component } from 'solid-js';
import { ClientSVG, ProviderSVG, InfoSVG, Logo } from './svg';
import { LoginStore, StepTransitions, AccountEnum } from './types';

export const LandingLogin: Component<{
    loginStore: LoginStore;
}> = (props) => {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (props.loginStore.activeProfile === AccountEnum.Client) {
            props.loginStore.updateStore(
                'currentStep',
                StepTransitions.ClientCreateAccount
            );
        } else {
            props.loginStore.updateStore(
                'currentStep',
                StepTransitions.ArtisanCreateAccount
            );
        }

        console.log(
            'Form submitted. Selected Profile:',
            props.loginStore.activeProfile
        );
    };

    return (
        <form
            onSubmit={handleSubmit}
            class="w-full px-4 pt-12 flex flex-col items-center justify-start min-h-screen md:px-12 bg-[#FCFCFD]"
        >
            <div class="w-full flex flex-col justify-start items-right gap-10">
                <div class="flex items-center text-white text-2xl font-bold tracking-wide mb-10">
                    <Logo />
                    <span class="text-2xl font-bold text-gray-900 text-center leading-snug ml-2">
                        Pairprofit
                    </span>
                </div>
                <div class="w-full flex flex-col justify-start items-center gap-10">
                    <div class="w-full flex flex-col justify-start items-center gap-1">
                        <h1 class="text-3xl font-bold text-gray-900 text-center leading-snug">
                            What Would You Like to Do?
                        </h1>
                        <p class="text-base text-gray-600 text-center leading-relaxed">
                            Choose how you want to use this platform
                        </p>
                    </div>
                    <div class="w-full flex flex-col justify-center items-start gap-5">
                        <button
                            type="button"
                            onClick={() =>
                                props.loginStore.updateStore(
                                    'activeProfile',
                                    AccountEnum.Client
                                )
                            }
                            class={`
                                w-full p-8 rounded-xl flex flex-col items-center gap-5 cursor-pointer border-2
                                transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-[#1376A1]/50 
                                ${
                                    props.loginStore.activeProfile === 'Client'
                                        ? 'border-[#1376A1] bg-[#D0E4EC] shadow-md'
                                        : 'border-gray-300 bg-white hover:border-[#1376A1]/50 hover:shadow-sm'
                                }
                            `}
                        >
                            <div
                                class={`w-8 h-8 flex items-center justify-center 
                                    ${
                                        props.loginStore.activeProfile ===
                                        AccountEnum.Client
                                            ? 'text-[#1376A1]'
                                            : 'text-gray-500'
                                    }
                                `}
                            >
                                <ClientSVG />
                            </div>
                            <div class="flex flex-col justify-start items-center gap-2">
                                <div class="text-xl font-semibold text-gray-900 text-center leading-snug">
                                    As a client
                                </div>
                                <div class="text-sm text-gray-600 text-center leading-relaxed max-w-xs">
                                    Find skilled workers anytime, any day
                                    including weekends
                                </div>
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                props.loginStore.updateStore(
                                    'activeProfile',
                                    AccountEnum.Provider
                                )
                            }
                            class={`
                                w-full p-8 rounded-xl flex flex-col items-center gap-5 cursor-pointer border-2
                                transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-[#1376A1]/50
                                ${
                                    props.loginStore.activeProfile ===
                                    AccountEnum.Provider
                                        ? 'border-[#1376A1] bg-[#D0E4EC] shadow-md'
                                        : 'border-gray-300 bg-white hover:border-[#1376A1]/50 hover:shadow-sm'
                                }
                            `}
                        >
                            <div
                                class={`w-8 h-8 flex items-center justify-center 
                                    ${
                                        props.loginStore.activeProfile ===
                                        AccountEnum.Provider
                                            ? 'text-[#1376A1]'
                                            : 'text-gray-500'
                                    }
                                `}
                            >
                                <ProviderSVG />
                            </div>

                            <div class="flex flex-col justify-start items-center gap-2">
                                <div class="text-xl font-semibold text-gray-900 text-center leading-snug">
                                    As a service provider
                                </div>
                                <div class="text-sm text-gray-600 text-center leading-relaxed max-w-xs">
                                    Discover clients for your craft, from the
                                    comfort of your home
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                <div class="w-full flex flex-col justify-start items-center gap-3 pt-6">
                    <button
                        type="submit"
                        class="w-full py-3 px-4 bg-[#1376A1] text-white font-semibold rounded-lg shadow-md
                                transition duration-150 ease-in-out cursor-pointer
                                hover:bg-[#1376A1]/90 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#1376A1]/50"
                    >
                        Continue
                    </button>

                    <div class="w-full flex justify-center items-center gap-1">
                        <div class="text-[#1376A1] w-4 h-4">
                            <InfoSVG />
                        </div>
                        <div class="text-center text-gray-600 text-xs leading-tight">
                            Don't worry, you can switch anytime in the app
                        </div>
                    </div>
                </div>
            </div>
            <input
                type="hidden"
                name="selectedRole"
                value={props.loginStore.activeProfile}
            />
        </form>
    );
};
