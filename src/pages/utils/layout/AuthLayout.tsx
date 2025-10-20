import { Component } from 'solid-js';
import { LoadingOverlay, LogoutModal } from '../../../components';
import { useNavigate } from '@solidjs/router';
import { authService } from '../../../oauth/manager';
import { SecureLocalStorage, LocalStorageKey } from '../../../lib/localstore';
import { useAppContext } from '../../../state';

export const AuthLayout: Component = (props: any) => {
    const navigate = useNavigate();
    const {
        inAppConnection: { isAppLoading, openLogout, setOpenLogout },
    } = useAppContext();

    console.log('AuthLayout rendered', openLogout());
    const handleLogout = () => {
        authService.clearAuthToken();
        SecureLocalStorage.removeItem(LocalStorageKey.AppAuthDeviceVerified);
        setOpenLogout(false);
        navigate('/login');
    };

    return (
        <div>
            <LoadingOverlay isLoading={isAppLoading()} />
            {/* <NavBar setOpenLogout={setOpenLogout} openLogout={openLogout} /> */}
            <LogoutModal
                isOpen={openLogout}
                onCancel={() => setOpenLogout(false)}
                onConfirm={handleLogout}
            />

            <div class="flex-1 flex flex-col overflow-hidden">
                <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 pt-2">
                    {props.children}
                </main>
            </div>
        </div>
    );
};
