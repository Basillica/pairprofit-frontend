import { createSignal } from 'solid-js';
import { AppContextProvider } from '../../../state';
import { OAuthContextProvider } from '../../../oauth';
import { GetEnvConfig } from '../../../environments';

export const RootLayout = (props: any) => {
    const [query] = createSignal('');
    const config = GetEnvConfig();

    return (
        <>
            <div
                class="bg-gray-100 font-inter"
                style={{
                    'overflow-x': 'hidden',
                    'flex-grow': 1,
                    width: '100vw',
                    'min-height': '100vh',
                }}
            >
                <AppContextProvider url={config.WEBSOCKET_URL} query={query}>
                    <OAuthContextProvider>
                        <div
                            id="content"
                            style={{
                                overflow: 'scroll',
                                'overflow-x': 'hidden',
                                'scrollbar-width': 'none',
                                'flex-grow': 1,
                                'min-height': '100vh',
                                width: '100vw',
                            }}
                        >
                            {props.children}
                        </div>
                    </OAuthContextProvider>
                </AppContextProvider>
            </div>
        </>
    );
};
