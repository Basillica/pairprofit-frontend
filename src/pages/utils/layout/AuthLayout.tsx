import { Component, createSignal } from 'solid-js';
import { LogoutModal, NavBar } from '../../../components';
import { useNavigate } from '@solidjs/router';
import { authService } from '../../../oauth/manager';
import { SecureLocalStorage } from '../../../lib/localstore';

export const AuthLayout: Component = (props: any) => {
    const [openLogout, setOpenLogout] = createSignal(false);
    const navigate = useNavigate();

    // createEffect(
    //     (prev) => {
    //         if (authUser()! !== prev && !authUser()!) {
    //             navigate('/login');
    //         }
    //     },
    //     [authUser()]
    // );

    const handleLogout = () => {
        authService.clearAuthToken();
        SecureLocalStorage.removeItem('x-auth-device-verified');
        setOpenLogout(false);
        navigate('/login');
    };

    return (
        <div>
            <NavBar setOpenLogout={setOpenLogout} openLogout={openLogout} />
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
