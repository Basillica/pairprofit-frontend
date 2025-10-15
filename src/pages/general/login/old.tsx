import { createSignal, JSX, onMount, Switch, Match } from 'solid-js';
import logo from './../../../assets/login_png.png';
import login_css from './style.module.css';
import { useOAuth } from '../../../oauth';
import { PublicHandler } from '../../../api';
import { UserModel } from '../../../models/auth';
import { ClientSVG, ProviderSVG, InfoSVG } from './svg';
import { PrimaryButton } from '../../../components/utils/button';
import {
    LoadingOverlay,
    NotificationBar,
    PublicNavBar,
} from '../../../components/utils';
import { useNavigate } from '@solidjs/router';
import { authService } from '../../../oauth/manager';
import { useAppContext } from '../../../state';

interface AuthCardProps {
    id: string;
    title: string;
    subtitle: string;
    children: JSX.Element;
    show: () => boolean;
}

type ProcessType =
    | 'LoginCard'
    | 'SignUpCard'
    | 'ForgotPassword'
    | 'ResetPassword'
    | 'OTPCard'
    | 'ConfirmSignup';

const AuthCard = (props: AuthCardProps) => {
    return (
        <div
            id={props.id}
            class={login_css.auth_card}
            //   style={{ display: props.show() ? "block" : "none" }}
        >
            <div class={login_css.auth_header}>
                <h2 class={login_css.auth_title}>{props.title}</h2>
                <p class={login_css.auth_subtitle}>{props.subtitle}</p>
            </div>
            {props.children}
        </div>
    );
};

interface AuthLinkProps {
    children: JSX.Element;
    onClick: () => void;
}

const AuthLink = (props: AuthLinkProps) => {
    return (
        <button class={login_css.auth_link} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

interface SocialButtonProps {
    iconClass: string;
    children: JSX.Element;
    onClick?: (e: Event) => void;
}

const SocialButton = (props: SocialButtonProps) => {
    const dynamicClassName = `${props.children!.toString().toLowerCase()}_btn`;

    return (
        <button
            class={`${login_css.social_btn} ${login_css[dynamicClassName]}`}
            onClick={props.onClick}
        >
            <i class={props.iconClass}></i> {props.children}
        </button>
    );
};

export const LoginPage = () => {
    const [newUser, setNewUser] = createSignal<UserModel>({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        passwordRepeat: '',
        profile_uri: '',
        status: '',
        platform: '',
        scope: '',
        role: '',
        permissions: [],
        created_at: '',
        updated_at: '',
        id: '',
    });
    const navigate = useNavigate();
    const { getAuthorizationUrl } = useOAuth();
    const { notification } = useAppContext();
    const publicApiHandler = new PublicHandler();
    const [activeProfile, setActiveProfile] = createSignal('Client');
    const [currentProcess, setCurrentProcess] =
        createSignal<ProcessType>('LoginCard');
    const {
        userType: { setAuthUser, setUserID },
    } = useAppContext();
    const [isLoading, setIsLoading] = createSignal(false);
    const [confirmPasswordReset, setConfirmPasswordReset] = createSignal<{
        otp: number;
        password: string;
        confirm_password: string;
        token: string;
    }>({ otp: 0, password: '', confirm_password: '', token: '' });
    const [confirmSignUp, setConfirmSignUp] = createSignal<{
        otp: number;
        email: string;
        token: string;
    }>({ otp: 0, email: '', token: '' });
    const [confirmOTP, setConfirmOTP] = createSignal<{
        otp: number;
        email: string;
        token: string;
    }>({ otp: 0, email: '', token: '' });

    const [loginCredentials, setLoginCredentials] = createSignal<{
        username: string;
        password: string;
        familiar_device: boolean;
    }>({ username: '', password: '', familiar_device: false });

    const handleLoginSubmit = async (e: Event) => {
        e.preventDefault();
        if (!isValidEmail(loginCredentials().username)) {
            notification.showAppNotification(
                'error',
                `the provided email is not valid`
            );
            return;
        }

        setIsLoading(true);
        if (authService.getDeviceVerified() !== null) {
            setLoginCredentials({
                ...loginCredentials(),
                familiar_device: true,
            });
        }
        const result = await publicApiHandler.login({ ...loginCredentials() });
        if (!result.success) {
            notification.showAppNotification('error', 'wrong user credentials');
            setIsLoading(false);
            return;
        }

        notification.showAppNotification(
            'success',
            'we have sent you an OTP to confirm your device'
        );

        if (!result.data.OTP_STEP) {
            authService.setAuthToken(result.data.token, result.data.tokenAge);
            authService.setAuthUser(result.data.user);
            setIsLoading(false);
            navigate('/listings');
            return;
        }

        setCurrentProcess('OTPCard');
        // authService.confirmLogin('OTPCard', result.data.token);
        setIsLoading(false);
        setConfirmOTP({
            ...confirmOTP(),
            email: result.data.email,
            token: result.data.token,
        });
    };

    const handleRegisterSubmit = async (e: Event) => {
        e.preventDefault();
        if (!isValidEmail(newUser().email)) {
            notification.showAppNotification(
                'error',
                `the provided email is not valid`
            );
            return;
        }

        if (newUser().password !== newUser().passwordRepeat) {
            notification.showAppNotification(
                'error',
                'the provided passwords do not match'
            );
            return;
        }

        setIsLoading(true);
        let result = await publicApiHandler.signUp(newUser());
        if (!result.success) {
            setIsLoading(false);
            notification.showAppNotification(
                'error',
                'the user accout could not be created'
            );
            return;
        }

        notification.showAppNotification(
            'success',
            'Your data has been saved successfully!'
        );
        setConfirmSignUp({
            ...confirmSignUp(),
            email: newUser().email,
            token: result.data.token,
        });
        setCurrentProcess('ConfirmSignup');
        // authService.confirmLogin('ConfirmSignup', result.data.token);
        setIsLoading(false);
    };

    const handleForgotPasswordSubmit = async (e: Event) => {
        e.preventDefault();
        if (!isValidEmail(loginCredentials().username)) {
            notification.showAppNotification(
                'error',
                `the provided email is not valid`
            );
            return;
        }

        setIsLoading(true);
        let result = await publicApiHandler.forgotPassword({
            email: loginCredentials().username,
        });
        setIsLoading(false);

        if (!result.success) {
            notification.showAppNotification(
                'error',
                'the provided user does not exist'
            );
            return;
        }

        notification.showAppNotification(
            'success',
            'email sent with further instructions'
        );
        setCurrentProcess('ResetPassword');
        authService.setAuthProcessToken(result.data.token);
        setConfirmPasswordReset({
            ...confirmPasswordReset(),
            token: result.data.token,
        });
        // authService.setAuthProcess('ResetPassword');
    };

    const onInputChange = (
        e: InputEvent & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
        }
    ) => {
        e.preventDefault();
        setNewUser({
            ...newUser(),
            [e.target.name]: e.target.value,
        });
    };

    const handleResetPasswordSubmit = async (e: Event) => {
        e.preventDefault();
        if (!isValidEmail(loginCredentials().username)) {
            notification.showAppNotification(
                'error',
                `the provided email is not valid`
            );
            return;
        }

        setIsLoading(true);
        let result = await publicApiHandler.confirmForgotPassword({
            token: confirmPasswordReset().token,
            otp: confirmPasswordReset().otp,
            password: confirmPasswordReset().password,
        });

        if (!result.success) {
            notification.showAppNotification('error', 'unable to login user');
            setIsLoading(false);
            return;
        }

        notification.showAppNotification('success', 'successfully logged in');
        authService.setAuthToken(result.data.token, result.data.tokenAge);
        authService.setAuthUser(result.data.user);
        setAuthUser(result.data.user);
        setUserID(result.data.user.id);
        setIsLoading(false);
        navigate('/listings');
    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return emailRegex.test(email);
    };

    onMount(async () => {
        if (authService.checkAuthOnLogin()) {
            navigate('/listings');
            return;
        }

        const process = authService.getCurrentProcess()!;
        setConfirmSignUp({
            ...confirmSignUp(),
            token: authService.getUserAuthToken()!,
        });

        if (process && process !== '') {
            setCurrentProcess(process as ProcessType);
            if (process === 'ResetPassword') {
                let token = authService.getAuthProcessToken();
                if (token) {
                    setConfirmPasswordReset({
                        ...confirmPasswordReset(),
                        token: token,
                    });
                }
            }
            if (process !== 'LoginCard') return;
        }

        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error'); // Check for OAuth errors from provider

        if (error) {
            console.error('OAuth Provider Error:', error);
            return;
        }

        if (code && state) {
            // This means the OAuth provider has redirected back to our frontend
            const provider = authService.getAuthProvider();
            if (!provider) {
                console.log('no set provides fount');
                return;
            }

            let api = new PublicHandler();
            const params = new URLSearchParams({
                code: code,
                state: state,
            });

            let result = await api.loginByProvider(provider, params.toString());
            if (!result.success) {
                notification.showAppNotification(
                    'error',
                    'unable to log in user'
                );
                return;
            }

            notification.showAppNotification(
                'success',
                'successfully logged in'
            );
            authService.setAuthToken(result.data.token, result.data.tokenAge);
            authService.setAuthUser(result.data.user);
            setAuthUser(result.data.user);
            setUserID(result.data.user.id);
            setIsLoading(false);
            navigate('/listings');
        }
    });

    const handleProviderLogin = async (provider: string) => {
        const authUrl = getAuthorizationUrl(provider);
        authService.setAuthProvider(provider);
        window.location.href = authUrl.toString();
    };

    const handleConfirmSignup = async (
        e: MouseEvent & {
            currentTarget: HTMLButtonElement;
            target: Element;
        }
    ) => {
        e.preventDefault();
        if (!isValidEmail(confirmSignUp().email)) {
            notification.showAppNotification(
                'error',
                `the provided email is not valid`
            );
            return;
        }

        if (confirmSignUp().otp === 0 || confirmSignUp().otp < 9999) {
            notification.showAppNotification(
                'error',
                'the provided OTP is wrong'
            );
            return;
        }

        setIsLoading(true);
        let result = await publicApiHandler.confirmSignup({
            ...confirmSignUp(),
        });
        if (!result.success) {
            notification.showAppNotification(
                'error',
                'unable to confirm user signup'
            );
            setIsLoading(false);
            return;
        }

        authService.setAuthToken(result.data.token, result.data.tokenAge);
        authService.setAuthUser(result.data.user);
        setAuthUser(result.data.user);
        setUserID(result.data.user.id);
        authService.setDeviceVerified('True');
        setIsLoading(false);
        notification.showAppNotification('success', 'successfully logged in');
        navigate('/listings');
    };

    const handleConfirmOTP = async (
        e: MouseEvent & {
            currentTarget: HTMLButtonElement;
            target: Element;
        }
    ) => {
        e.preventDefault();
        if (!isValidEmail(confirmOTP().email)) {
            notification.showAppNotification(
                'error',
                `the provided email is not valid`
            );
            return;
        }

        if (confirmOTP().otp === 0 || confirmOTP().otp < 9999) {
            notification.showAppNotification(
                'error',
                'the provided OTP is wrong'
            );
            return;
        }

        setIsLoading(true);
        let result = await publicApiHandler.confirmOTP({
            ...confirmOTP(),
        });
        if (!result.success) {
            notification.showAppNotification(
                'error',
                'unable to confirm user signup'
            );
            setIsLoading(false);
            return;
        }

        authService.setAuthToken(result.data.token, result.data.tokenAge);
        authService.setAuthUser(result.data.user);
        setAuthUser(result.data.user);
        setUserID(result.data.user.id);
        authService.setDeviceVerified('True');
        setIsLoading(false);
        notification.showAppNotification('success', 'successfully logged in');
        navigate('/listings');
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Form submitted. Selected Profile:', activeProfile());
        // Add your navigation or data submission logic here
    };
    return (
        // <>
        //     <PublicNavBar companyName={'PairProfit'} />
        //     <div class={login_css.container_auth}>
        //         <NotificationBar
        //             type={notification.notificationType}
        //             message={notification.notificationMessage}
        //             duration={4000}
        //         />
        //         <LoadingOverlay isLoading={isLoading()} />
        //         <div class={login_css.left_panel}>
        //             <img src={logo} alt="Company Logo" class={login_css.logo} />
        //         </div>
        //         <div class={login_css.right_panel}>
        //             <Switch>
        //                 <Match when={currentProcess() === 'LoginCard'}>
        //                     <AuthCard
        //                         id="login-page"
        //                         title="Login"
        //                         subtitle="Welcome back! Please sign in to continue."
        //                         show={() => true}
        //                     >
        //                         <form
        //                             id="login-form"
        //                             onSubmit={handleLoginSubmit}
        //                         >
        //                             <div class={login_css.form_group}>
        //                                 <label
        //                                     for="username"
        //                                     class="block text-gray-700 text-sm font-bold mb-2"
        //                                 >
        //                                     Username
        //                                 </label>
        //                                 <input
        //                                     type="text"
        //                                     id="username"
        //                                     name="username"
        //                                     class={login_css.form_control}
        //                                     placeholder="Enter your emaiil"
        //                                     autocomplete="username"
        //                                     required
        //                                     value={loginCredentials().username}
        //                                     onInput={(e) =>
        //                                         setLoginCredentials({
        //                                             ...loginCredentials(),
        //                                             username: e.target.value,
        //                                         })
        //                                     }
        //                                 />
        //                             </div>

        //                             <div class={login_css.form_group}>
        //                                 <label
        //                                     for="password"
        //                                     class="block text-gray-700 text-sm font-bold mb-2"
        //                                 >
        //                                     Password
        //                                 </label>
        //                                 <input
        //                                     type="password"
        //                                     id="password"
        //                                     name="password"
        //                                     class={login_css.form_control}
        //                                     placeholder="Enter your password"
        //                                     autocomplete="current-password"
        //                                     required
        //                                     value={loginCredentials().password}
        //                                     onInput={(e) =>
        //                                         setLoginCredentials({
        //                                             ...loginCredentials(),
        //                                             password:
        //                                                 e.currentTarget.value,
        //                                         })
        //                                     }
        //                                 />
        //                             </div>

        //                             <button
        //                                 type="submit"
        //                                 class={login_css.btn_primary}
        //                             >
        //                                 Login
        //                             </button>
        //                             <AuthLink
        //                                 onClick={() =>
        //                                     setCurrentProcess('ForgotPassword')
        //                                 }
        //                             >
        //                                 Forgot Password?
        //                             </AuthLink>
        //                         </form>
        //                         <div class={login_css.divider}>
        //                             <div class={login_css.divider_line}></div>
        //                             <span class={login_css.divider_text}>
        //                                 Or login with
        //                             </span>
        //                             <div class={login_css.divider_line}></div>
        //                         </div>
        //                         <div class={login_css.social_login}>
        //                             <SocialButton
        //                                 iconClass="fab fa-google"
        //                                 onClick={() =>
        //                                     handleProviderLogin('google')
        //                                 }
        //                             >
        //                                 Google
        //                             </SocialButton>
        //                             <SocialButton
        //                                 iconClass="fab fa-linkedin"
        //                                 onClick={() =>
        //                                     handleProviderLogin('linkedin')
        //                                 }
        //                             >
        //                                 LinkedIn
        //                             </SocialButton>
        //                             <SocialButton
        //                                 iconClass="fab fa-github"
        //                                 onClick={() =>
        //                                     handleProviderLogin('github')
        //                                 }
        //                             >
        //                                 Github
        //                             </SocialButton>
        //                             <SocialButton iconClass="fab fa-facebook">
        //                                 Facebook
        //                             </SocialButton>
        //                         </div>
        //                         <AuthLink
        //                             onClick={() =>
        //                                 setCurrentProcess('SignUpCard')
        //                             }
        //                         >
        //                             Don't have an account? Register
        //                         </AuthLink>
        //                     </AuthCard>
        //                 </Match>
        //                 <Match when={currentProcess() === 'SignUpCard'}>
        //                     <AuthCard
        //                         id="register-page"
        //                         title="Register"
        //                         subtitle="Create account."
        //                         show={() => true}
        //                     >
        //                         <form
        //                             id="register-form"
        //                             onSubmit={handleRegisterSubmit}
        //                         >
        //                             <div
        //                                 id="nameInputsContainer"
        //                                 class="flex flex-col md:flex-row gap-4"
        //                             >
        //                                 <div class="flex flex-col flex-1">
        //                                     <label
        //                                         for="firstname"
        //                                         class="block text-gray-700 text-sm font-bold mb-2"
        //                                     >
        //                                         First Name:
        //                                     </label>
        //                                     <input
        //                                         type="text"
        //                                         required
        //                                         value={newUser()?.firstname}
        //                                         onInput={(e) =>
        //                                             onInputChange(e)
        //                                         }
        //                                         placeholder="Enter first name"
        //                                         id="firstname"
        //                                         name="firstname"
        //                                         class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //                                     />
        //                                 </div>
        //                                 <div class="flex flex-col flex-1">
        //                                     <label
        //                                         for="lastname"
        //                                         class="block text-gray-700 text-sm font-bold mb-2"
        //                                     >
        //                                         Last Name:
        //                                     </label>
        //                                     <input
        //                                         type="text"
        //                                         required
        //                                         value={newUser()?.lastname}
        //                                         onInput={(e) =>
        //                                             onInputChange(e)
        //                                         }
        //                                         placeholder="Enter last name"
        //                                         id="lastname"
        //                                         name="lastname"
        //                                         class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //                                     />
        //                                 </div>
        //                             </div>

        //                             <div
        //                                 id="nameInputsContainer"
        //                                 class="flex flex-col md:flex-row gap-4 mt-4 mb-4"
        //                             >
        //                                 <div class="flex flex-col flex-1">
        //                                     <label
        //                                         for="password"
        //                                         class="block text-gray-700 text-sm font-bold mb-2"
        //                                     >
        //                                         Password:
        //                                     </label>
        //                                     <input
        //                                         type="password"
        //                                         value={newUser()?.password}
        //                                         onInput={(e) =>
        //                                             onInputChange(e)
        //                                         }
        //                                         autocomplete="current-password"
        //                                         required
        //                                         placeholder="Enter password"
        //                                         id="password"
        //                                         name="password"
        //                                         class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //                                     />
        //                                 </div>
        //                                 <div class="flex flex-col flex-1">
        //                                     <label
        //                                         for="passwordRepeat"
        //                                         class="block text-gray-700 text-sm font-bold mb-2"
        //                                     >
        //                                         Repeat password:
        //                                     </label>
        //                                     <input
        //                                         type="password"
        //                                         value={
        //                                             newUser()?.passwordRepeat
        //                                         }
        //                                         onInput={(e) =>
        //                                             onInputChange(e)
        //                                         }
        //                                         required
        //                                         placeholder="Repeat password"
        //                                         autocomplete="current-password"
        //                                         id="passwordRepeat"
        //                                         name="passwordRepeat"
        //                                         class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //                                     />
        //                                 </div>
        //                             </div>

        //                             <div class={login_css.form_group}>
        //                                 <label
        //                                     for="username"
        //                                     class="block text-gray-700 text-sm font-bold mb-2"
        //                                 >
        //                                     Username
        //                                 </label>
        //                                 <input
        //                                     type="text"
        //                                     id="username"
        //                                     name="username"
        //                                     class={login_css.form_control}
        //                                     placeholder="Enter your username"
        //                                     autocomplete="username"
        //                                     required
        //                                     value={newUser()?.username}
        //                                     onInput={(e) => onInputChange(e)}
        //                                 />
        //                             </div>

        //                             <div class={login_css.form_group}>
        //                                 <label
        //                                     for="email"
        //                                     class="block text-gray-700 text-sm font-bold mb-2"
        //                                 >
        //                                     Email Address
        //                                 </label>
        //                                 <input
        //                                     type="email"
        //                                     id="email"
        //                                     name="email"
        //                                     class={login_css.form_control}
        //                                     placeholder="Enter your email"
        //                                     required
        //                                     value={newUser()?.email}
        //                                     onInput={(e) => onInputChange(e)}
        //                                 />
        //                             </div>

        //                             <button
        //                                 type="submit"
        //                                 class={login_css.btn_primary}
        //                             >
        //                                 Register
        //                             </button>
        //                             <AuthLink
        //                                 onClick={() =>
        //                                     setCurrentProcess('LoginCard')
        //                                 }
        //                             >
        //                                 Already have an account? Login
        //                             </AuthLink>
        //                         </form>
        //                         <div class={login_css.divider}>
        //                             <div class={login_css.divider_line}></div>
        //                             <span class={login_css.divider_text}>
        //                                 Or register with
        //                             </span>
        //                             <div class={login_css.divider_line}></div>
        //                         </div>
        //                         <div class={login_css.social_login}>
        //                             <SocialButton
        //                                 iconClass="fab fa-google"
        //                                 onClick={() =>
        //                                     handleProviderLogin('google')
        //                                 }
        //                             >
        //                                 Google
        //                             </SocialButton>
        //                             <SocialButton
        //                                 iconClass="fab fa-linkedin"
        //                                 onClick={() =>
        //                                     handleProviderLogin('linkedin')
        //                                 }
        //                             >
        //                                 LinkedIn
        //                             </SocialButton>
        //                             <SocialButton
        //                                 iconClass="fab fa-github"
        //                                 onClick={() =>
        //                                     handleProviderLogin('github')
        //                                 }
        //                             >
        //                                 Github
        //                             </SocialButton>
        //                             <SocialButton iconClass="fab fa-facebook">
        //                                 Facebook
        //                             </SocialButton>
        //                         </div>
        //                     </AuthCard>
        //                 </Match>
        //                 <Match when={currentProcess() === 'ForgotPassword'}>
        //                     <AuthCard
        //                         id="forgot-password-page"
        //                         title="Forgot Password"
        //                         subtitle="Enter your email to receive a password reset link."
        //                         show={() => true}
        //                     >
        //                         <form
        //                             id="forgot-password-form"
        //                             onSubmit={handleForgotPasswordSubmit}
        //                         >
        //                             <div class={login_css.form_group}>
        //                                 <label
        //                                     for="forgot-email"
        //                                     class={login_css.form_label}
        //                                 >
        //                                     Email Address
        //                                 </label>
        //                                 <input
        //                                     type="email"
        //                                     id="forgot-email"
        //                                     name="email"
        //                                     class={login_css.form_control}
        //                                     placeholder="Enter your email"
        //                                     required
        //                                     value={loginCredentials().username}
        //                                     onInput={(e) =>
        //                                         setLoginCredentials({
        //                                             ...loginCredentials(),
        //                                             username: e.target.value,
        //                                         })
        //                                     }
        //                                 />
        //                             </div>
        //                             <button
        //                                 type="submit"
        //                                 class={login_css.btn_primary}
        //                             >
        //                                 Reset Password
        //                             </button>
        //                             <AuthLink
        //                                 onClick={() =>
        //                                     setCurrentProcess('LoginCard')
        //                                 }
        //                             >
        //                                 Back to Login
        //                             </AuthLink>
        //                         </form>
        //                     </AuthCard>
        //                 </Match>
        //                 <Match when={currentProcess() === 'ResetPassword'}>
        //                     <AuthCard
        //                         id="reset-password-page"
        //                         title="Reset Password"
        //                         subtitle="Enter your new password."
        //                         show={() => true}
        //                     >
        //                         <form
        //                             id="reset-password-form"
        //                             onSubmit={handleResetPasswordSubmit}
        //                         >
        //                             <div class={login_css.form_group}>
        //                                 <label
        //                                     for="reset-password"
        //                                     class={login_css.form_label}
        //                                 >
        //                                     New Password
        //                                 </label>
        //                                 <input
        //                                     type="password"
        //                                     id="reset-password"
        //                                     name="password"
        //                                     class={login_css.form_control}
        //                                     placeholder="Enter your new password"
        //                                     autocomplete="current-password"
        //                                     hidden={false}
        //                                     required
        //                                     value={
        //                                         confirmPasswordReset().password
        //                                     }
        //                                     onInput={(e) =>
        //                                         setConfirmPasswordReset({
        //                                             ...confirmPasswordReset(),
        //                                             password: e.target.value,
        //                                         })
        //                                     }
        //                                 />
        //                             </div>
        //                             <div class={login_css.form_group}>
        //                                 <label
        //                                     for="reset-confirm-password"
        //                                     class={login_css.form_label}
        //                                 >
        //                                     Confirm New Password
        //                                 </label>
        //                                 <input
        //                                     type="password"
        //                                     id="reset-confirm-password"
        //                                     name="confirm-password"
        //                                     class={login_css.form_control}
        //                                     placeholder="Confirm your new password"
        //                                     autocomplete="current-password"
        //                                     hidden={false}
        //                                     required
        //                                     value={
        //                                         confirmPasswordReset()
        //                                             .confirm_password
        //                                     }
        //                                     onInput={(e) =>
        //                                         setConfirmPasswordReset({
        //                                             ...confirmPasswordReset(),
        //                                             confirm_password:
        //                                                 e.target.value,
        //                                         })
        //                                     }
        //                                 />
        //                             </div>
        //                             <div class={login_css.form_group}>
        //                                 <label
        //                                     for="otp"
        //                                     class="block text-gray-700 text-sm font-bold mb-2"
        //                                 >
        //                                     OTP
        //                                 </label>
        //                                 <input
        //                                     type="number"
        //                                     id="otp"
        //                                     name="otp"
        //                                     class={login_css.form_control}
        //                                     placeholder="Please enter the OTP in your email"
        //                                     required
        //                                     value={confirmPasswordReset().otp}
        //                                     onInput={(e) =>
        //                                         setConfirmPasswordReset({
        //                                             ...confirmPasswordReset(),
        //                                             otp: Number(e.target.value),
        //                                         })
        //                                     }
        //                                 />
        //                             </div>
        //                             <div class={login_css.form_group}>
        //                                 <label
        //                                     for="otp"
        //                                     class="block text-gray-700 text-sm font-bold mb-2"
        //                                 >
        //                                     Token
        //                                 </label>
        //                                 <input
        //                                     type="text"
        //                                     id="token"
        //                                     name="token"
        //                                     class={login_css.form_control}
        //                                     placeholder="Please enter the OTP in your email"
        //                                     disabled
        //                                     value={confirmPasswordReset().token}
        //                                 />
        //                             </div>
        //                             <button
        //                                 type="submit"
        //                                 class={login_css.btn_primary}
        //                             >
        //                                 Reset Password
        //                             </button>
        //                         </form>
        //                     </AuthCard>
        //                 </Match>
        //                 <Match when={currentProcess() === 'ConfirmSignup'}>
        //                     <AuthCard
        //                         id="logout-page"
        //                         title="Complete Signup"
        //                         subtitle="We have sent you an OTP code. Please check your email."
        //                         show={() => true}
        //                     >
        //                         <div class={login_css.form_group}>
        //                             <label
        //                                 for="token"
        //                                 class="block text-gray-700 text-sm font-bold mb-2"
        //                             >
        //                                 Validation Token
        //                             </label>
        //                             <input
        //                                 type="text"
        //                                 id="token"
        //                                 name="token"
        //                                 class={login_css.form_control}
        //                                 placeholder="Please enter your email"
        //                                 required
        //                                 value={confirmSignUp().token}
        //                                 onInput={(e) =>
        //                                     setConfirmSignUp({
        //                                         ...confirmSignUp(),
        //                                         token: e.currentTarget.value,
        //                                     })
        //                                 }
        //                                 disabled
        //                             />
        //                         </div>
        //                         <div class={login_css.form_group}>
        //                             <label
        //                                 for="otp"
        //                                 class="block text-gray-700 text-sm font-bold mb-2"
        //                             >
        //                                 OTP
        //                             </label>
        //                             <input
        //                                 type="number"
        //                                 id="otp"
        //                                 name="otp"
        //                                 class={login_css.form_control}
        //                                 placeholder="Please enter the OTP in your email"
        //                                 required
        //                                 value={confirmSignUp().otp}
        //                                 onInput={(e) =>
        //                                     setConfirmSignUp({
        //                                         ...confirmSignUp(),
        //                                         otp: Number(
        //                                             e.currentTarget.value
        //                                         ),
        //                                     })
        //                                 }
        //                             />
        //                         </div>
        //                         <div class={login_css.form_group}>
        //                             <label
        //                                 for="otp"
        //                                 class="block text-gray-700 text-sm font-bold mb-2"
        //                             >
        //                                 Email
        //                             </label>
        //                             <input
        //                                 type="email"
        //                                 id="email"
        //                                 name="email"
        //                                 class={login_css.form_control}
        //                                 placeholder="Please enter your email"
        //                                 required
        //                                 value={confirmSignUp().email}
        //                                 onInput={(e) =>
        //                                     setConfirmSignUp({
        //                                         ...confirmSignUp(),
        //                                         email: e.currentTarget.value,
        //                                     })
        //                                 }
        //                             />
        //                         </div>
        //                         <AuthLink
        //                             onClick={() =>
        //                                 setCurrentProcess('ConfirmSignup')
        //                             }
        //                         >
        //                             <PrimaryButton
        //                                 text="Complete Sigunup"
        //                                 handleClick={(e) =>
        //                                     handleConfirmSignup(e)
        //                                 }
        //                             />
        //                         </AuthLink>
        //                     </AuthCard>
        //                 </Match>
        //                 <Match when={currentProcess() === 'OTPCard'}>
        //                     <AuthCard
        //                         id="logout-page"
        //                         title="Complete Login"
        //                         subtitle="We have sent you an OTP code. Please check your email."
        //                         show={() => true}
        //                     >
        //                         <div class={login_css.form_group}>
        //                             <label
        //                                 for="token"
        //                                 class="block text-gray-700 text-sm font-bold mb-2"
        //                             >
        //                                 Validation Token
        //                             </label>
        //                             <input
        //                                 type="text"
        //                                 id="token"
        //                                 name="token"
        //                                 class={login_css.form_control}
        //                                 placeholder="Please enter your email"
        //                                 required
        //                                 value={confirmOTP().token}
        //                                 onInput={(e) =>
        //                                     setConfirmOTP({
        //                                         ...confirmOTP(),
        //                                         token: e.currentTarget.value,
        //                                     })
        //                                 }
        //                                 disabled
        //                             />
        //                         </div>
        //                         <div class={login_css.form_group}>
        //                             <label
        //                                 for="otp"
        //                                 class="block text-gray-700 text-sm font-bold mb-2"
        //                             >
        //                                 OTP
        //                             </label>
        //                             <input
        //                                 type="number"
        //                                 id="otp"
        //                                 name="otp"
        //                                 class={login_css.form_control}
        //                                 placeholder="Please enter the OTP in your email"
        //                                 required
        //                                 value={confirmOTP().otp}
        //                                 onInput={(e) =>
        //                                     setConfirmOTP({
        //                                         ...confirmOTP(),
        //                                         otp: Number(
        //                                             e.currentTarget.value
        //                                         ),
        //                                     })
        //                                 }
        //                             />
        //                         </div>
        //                         <div class={login_css.form_group}>
        //                             <label
        //                                 for="otp"
        //                                 class="block text-gray-700 text-sm font-bold mb-2"
        //                             >
        //                                 Email
        //                             </label>
        //                             <input
        //                                 type="email"
        //                                 id="email"
        //                                 name="email"
        //                                 class={login_css.form_control}
        //                                 placeholder="Please enter your email"
        //                                 required
        //                                 value={confirmOTP().email}
        //                                 onInput={(e) =>
        //                                     setConfirmOTP({
        //                                         ...confirmOTP(),
        //                                         email: e.currentTarget.value,
        //                                     })
        //                                 }
        //                             />
        //                         </div>
        //                         <AuthLink
        //                             onClick={() => setCurrentProcess('OTPCard')}
        //                         >
        //                             <PrimaryButton
        //                                 text="Complete Login"
        //                                 handleClick={(e) => handleConfirmOTP(e)}
        //                             />
        //                         </AuthLink>
        //                     </AuthCard>
        //                 </Match>
        //             </Switch>
        //         </div>
        //     </div>
        // </>
        // <div style="justify-content: space-between; align-items: flex-start; display: inline-flex">
        <>
            <PublicNavBar companyName={'PairProfit'} />
            <div class={login_css.container_auth}>
                <div style="width: 100%; height: 1024px; position: relative; background: #062736; overflow: hidden">
                    <img src={logo} alt="Company Logo" class={login_css.logo} />
                </div>
                <div style="width: 100%; padding-top: 70px; padding-bottom: 70px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 79px; display: inline-flex">
                    <form
                        onSubmit={handleSubmit}
                        class="w-full py-16 px-4 flex flex-col items-center justify-start min-h-screen"
                    >
                        <div class="w-full max-w-md mx-auto flex flex-col items-center gap-12 sm:gap-16">
                            <div
                                class="flex items-center text-white text-2xl font-bold tracking-wide"
                                style={'height: 20px'}
                            >
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.21909e-05 0V17.8373C-0.0040347 18.8703 0.194322 19.894 0.58375 20.8495C0.973179 21.8051 1.54601 22.6737 2.26938 23.4057C2.99275 24.1376 3.85241 24.7183 4.79904 25.1146C5.74566 25.5108 6.76062 25.7148 7.78566 25.7148H19.6103V17.0972H10.3311C9.81552 17.0972 9.32099 16.8913 8.95585 16.5245C8.59072 16.1577 8.38476 15.6599 8.38311 15.1404V8.24128H19.5854V0H6.21909e-05Z"
                                        fill="#12CFAE"
                                    />
                                    <path
                                        d="M19.6102 34H38.7537V16.0937C38.7537 14.0139 37.9343 12.0191 36.4756 10.5479C35.0168 9.0766 33.0381 8.24922 30.9743 8.24756H19.6102V17.0972H28.6281C29.1447 17.0972 29.6402 17.304 30.0055 17.6722C30.3708 18.0404 30.576 18.5397 30.576 19.0603V25.7148H19.6102V34Z"
                                        fill="#373F63"
                                    />
                                </svg>
                                <span class="text-base font-bold text-gray-900 text-center leading-snug ml-2">
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
                                            setActiveProfile('Client')
                                        }
                                        class={`
                                w-full p-8 rounded-xl flex flex-col items-center gap-5 cursor-pointer border-2
                                transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-[#1376A1]/50 
                                ${
                                    activeProfile() === 'Client'
                                        ? 'border-[#1376A1] bg-[#D0E4EC] shadow-md'
                                        : 'border-gray-300 bg-white hover:border-[#1376A1]/50 hover:shadow-sm'
                                }
                            `}
                                    >
                                        <div
                                            class={`w-8 h-8 flex items-center justify-center 
                                    ${
                                        activeProfile() === 'Client'
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
                                                Find skilled workers anytime,
                                                any day including weekends
                                            </div>
                                        </div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveProfile('Provider')
                                        }
                                        class={`
                                w-full p-8 rounded-xl flex flex-col items-center gap-5 cursor-pointer border-2
                                transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-[#1376A1]/50
                                ${
                                    activeProfile() === 'Provider'
                                        ? 'border-[#1376A1] bg-[#D0E4EC] shadow-md'
                                        : 'border-gray-300 bg-white hover:border-[#1376A1]/50 hover:shadow-sm'
                                }
                            `}
                                    >
                                        <div
                                            class={`w-8 h-8 flex items-center justify-center 
                                    ${
                                        activeProfile() === 'Provider'
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
                                                Discover clients for your craft,
                                                from the comfort of your home
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
                                        Don't worry, you can switch anytime in
                                        the app
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input
                            type="hidden"
                            name="selectedRole"
                            value={activeProfile()}
                        />
                    </form>
                </div>
            </div>
        </>
    );
};
