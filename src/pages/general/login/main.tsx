import { createSignal, JSX, onMount, Switch, Match } from "solid-js";
import logo from "./../../../assets/A.png";
import "./login.css";
import { useOAuth } from "../../../oauth";
import { PublicHandler } from "../../../api";
import { UserModel } from "../../../models/auth";
import { PrimaryButton } from "../../../components/utils/button";
import { LoadingOverlay, NotificationBar } from "../../../components/utils";
import { useNavigate } from "@solidjs/router";
import { authService } from "../../../oauth/manager";
import { useAppContext } from "../../../state";

interface AuthCardProps {
  id: string;
  title: string;
  subtitle: string;
  children: JSX.Element;
  show: () => boolean;
}

type ProcessType =
  | "LoginCard"
  | "CreateCard"
  | "ForgotPassword"
  | "ResetPassword"
  | "OTPCard";

const AuthCard = (props: AuthCardProps) => {
  return (
    <div
      id={props.id}
      class="auth-card"
      //   style={{ display: props.show() ? "block" : "none" }}
    >
      <div class="auth-header">
        <h2 class="auth-title">{props.title}</h2>
        <p class="auth-subtitle">{props.subtitle}</p>
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
    <a class="auth-link" onClick={props.onClick}>
      {props.children}
    </a>
  );
};

interface SocialButtonProps {
  iconClass: string;
  children: JSX.Element;
  onClick?: (e: Event) => void;
}

const SocialButton = (props: SocialButtonProps) => {
  return (
    <button
      class={`social-btn ${props.children!.toString().toLowerCase()}-btn`}
      onClick={props.onClick}
    >
      <i class={props.iconClass}></i> {props.children}
    </button>
  );
};

export const LoginPage = () => {
  const [newUser, setNewUser] = createSignal<UserModel>({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    passwordRepeat: "",
    profile_uri: "",
    status: "",
    platform: "",
    scope: "",
    role: "",
    permissions: [],
    created_at: "",
    updated_at: "",
    id: "",
  });
  const navigate = useNavigate();
  const { getAuthorizationUrl } = useOAuth();
  const { notification } = useAppContext();
  const publicApiHandler = new PublicHandler();

  const [currentProcess, setCurrentProcess] =
    createSignal<ProcessType>("LoginCard");
  const [isLoading, setIsLoading] = createSignal(false);
  const [confirmPasswordReset, setConfirmPasswordReset] = createSignal<{
    otp: number;
    password: string;
    confirm_password: string;
    token: string;
  }>({ otp: 0, password: "", confirm_password: "", token: "" });
  const [confirmSignUp, setConfirmSignUp] = createSignal<{
    otp: number;
    email: string;
    token: string;
  }>({ otp: 0, email: "", token: "" });
  const [loginCredentials, setLoginCredentials] = createSignal<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const handleLoginSubmit = async (e: Event) => {
    e.preventDefault();
    if (!isValidEmail(loginCredentials().username)) {
      notification.showAppNotification(
        "error",
        `the provided email is not valid`
      );
      return;
    }

    setIsLoading(true);
    const result = await publicApiHandler.login({ ...loginCredentials() });
    if (!result.success) {
      notification.showAppNotification("error", "wrong user credentials");
      setIsLoading(false);
      return;
    }

    notification.showAppNotification("success", "successfully logged in");
    authService.setAuthToken(result.data.token, result.data.tokenAge);
    authService.setAuthUser(result.data.user);
    setIsLoading(false);
    navigate("/listings");
  };

  const handleRegisterSubmit = async (e: Event) => {
    e.preventDefault();
    if (!isValidEmail(newUser().email)) {
      notification.showAppNotification(
        "error",
        `the provided email is not valid`
      );
      return;
    }

    if (newUser().password !== newUser().passwordRepeat) {
      notification.showAppNotification(
        "error",
        "the provided passwords do not match"
      );
      return;
    }

    setIsLoading(true);
    let result = await publicApiHandler.signUp(newUser());
    if (!result.success) {
      console.log(result, "the frigging result");
      setIsLoading(false);
      notification.showAppNotification(
        "error",
        "the user accout could not be created"
      );
      return;
    }

    notification.showAppNotification(
      "success",
      "Your data has been saved successfully!"
    );
    setConfirmSignUp({ ...confirmSignUp(), token: result.data.token });
    setCurrentProcess("OTPCard");
    authService.confirmLogin("OTPCard", result.data.token);
    setIsLoading(false);
  };

  const handleForgotPasswordSubmit = async (e: Event) => {
    e.preventDefault();
    if (!isValidEmail(loginCredentials().username)) {
      notification.showAppNotification(
        "error",
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
        "error",
        "the provided user does not exist"
      );
      return;
    }

    notification.showAppNotification(
      "success",
      "email sent with further instructions"
    );
    setCurrentProcess("ResetPassword");
    authService.setAuthProcessToken(result.data.token);
    setConfirmPasswordReset({
      ...confirmPasswordReset(),
      token: result.data.token,
    });
    authService.setAuthProcess("ResetPassword");
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
        "error",
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
      notification.showAppNotification("error", "unable to login user");
      setIsLoading(false);
      return;
    }

    notification.showAppNotification("success", "successfully logged in");
    authService.setAuthToken(result.data.token, result.data.tokenAge);
    authService.setAuthUser(result.data.user);
    setIsLoading(false);
    navigate("/listings");
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return emailRegex.test(email);
  };

  onMount(async () => {
    if (authService.checkAuthOnLogin()) {
      navigate("/listings");
      return;
    }

    const process = authService.getCurrentProcess()!;
    setConfirmSignUp({
      ...confirmSignUp(),
      token: authService.getUserAuthToken()!,
    });

    if (process && process !== "") {
      setCurrentProcess(process as ProcessType);
      if (process === "ResetPassword") {
        let token = authService.getAuthProcessToken();
        if (token) {
          setConfirmPasswordReset({
            ...confirmPasswordReset(),
            token: token,
          });
        }
      }
      if (process !== "LoginCard") return;
    }

    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const error = urlParams.get("error"); // Check for OAuth errors from provider

    if (error) {
      console.error("OAuth Provider Error:", error);
      return;
    }

    if (code && state) {
      // This means the OAuth provider has redirected back to our frontend
      const provider = authService.getAuthProvider();
      if (!provider) {
        console.log("no set provides fount");
        return;
      }

      let api = new PublicHandler();
      const params = new URLSearchParams({
        code: code,
        state: state,
      });

      let result = await api.loginByProvider(provider, params.toString());
      if (!result.success) {
        notification.showAppNotification("error", "unable to log in user");
        return;
      }

      notification.showAppNotification("success", "successfully logged in");
      authService.setAuthToken(result.data.token, result.data.tokenAge);
      authService.setAuthUser(result.data.user);
      setIsLoading(false);
      navigate("/listings");
    }
  });

  const handleProviderLogin = async (provider: string) => {
    const authUrl = getAuthorizationUrl(provider);
    authService.setAuthProvider(provider);
    window.location.href = authUrl.toString();
  };

  const handleSubmitOTP = async (
    e: MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: Element;
    }
  ) => {
    e.preventDefault();
    if (!isValidEmail(confirmSignUp().email)) {
      notification.showAppNotification(
        "error",
        `the provided email is not valid`
      );
      return;
    }

    if (confirmSignUp().otp === 0 || confirmSignUp().otp < 99999) {
      notification.showAppNotification("error", "the provided OTP is wrong");
      return;
    }

    setIsLoading(true);
    let result = await publicApiHandler.confirmSignup({ ...confirmSignUp() });
    if (!result.success) {
      notification.showAppNotification(
        "error",
        "unable to confirm user signup"
      );
      setIsLoading(false);
      return;
    }

    authService.setAuthToken(result.data.token, result.data.tokenAge);
    setIsLoading(false);
    notification.showAppNotification("success", "successfully logged in");
    navigate("/listings");
  };

  return (
    <div class="container-auth">
      <NotificationBar
        type={notification.notificationType}
        message={notification.notificationMessage}
        duration={4000}
      />
      <LoadingOverlay isLoading={isLoading()} />
      <div class="left-panel">
        <img src={logo} alt="Company Logo" class="logo" />
      </div>
      <div class="right-panel">
        <Switch>
          <Match when={currentProcess() === "LoginCard"}>
            <AuthCard
              id="login-page"
              title="Login"
              subtitle="Welcome back! Please sign in to continue."
              show={() => true}
            >
              <form id="login-form" onSubmit={handleLoginSubmit}>
                <div class="form-group">
                  <label
                    for="username"
                    class="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    class="form-control"
                    placeholder="Enter your username"
                    autocomplete="username"
                    required
                    value={loginCredentials().username}
                    onInput={(e) =>
                      setLoginCredentials({
                        ...loginCredentials(),
                        username: e.target.value,
                      })
                    }
                  />
                </div>

                <div class="form-group">
                  <label
                    for="password"
                    class="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    class="form-control"
                    placeholder="Enter your password"
                    autocomplete="current-password"
                    required
                    value={loginCredentials().password}
                    onInput={(e) =>
                      setLoginCredentials({
                        ...loginCredentials(),
                        password: e.currentTarget.value,
                      })
                    }
                  />
                </div>

                <button type="submit" class="btn-primary">
                  Login
                </button>
                <AuthLink onClick={() => setCurrentProcess("ForgotPassword")}>
                  Forgot Password?
                </AuthLink>
              </form>
              <div class="divider">
                <div class="divider-line"></div>
                <span class="divider-text">Or login with</span>
                <div class="divider-line"></div>
              </div>
              <div class="social-login">
                <SocialButton
                  iconClass="fab fa-google"
                  onClick={() => handleProviderLogin("google")}
                >
                  Google
                </SocialButton>
                <SocialButton
                  iconClass="fab fa-linkedin"
                  onClick={() => handleProviderLogin("linkedin")}
                >
                  LinkedIn
                </SocialButton>
                <SocialButton
                  iconClass="fab fa-github"
                  onClick={() => handleProviderLogin("github")}
                >
                  Github
                </SocialButton>
                <SocialButton iconClass="fab fa-facebook">
                  Facebook
                </SocialButton>
              </div>
              <AuthLink onClick={() => setCurrentProcess("CreateCard")}>
                Don't have an account? Register
              </AuthLink>
            </AuthCard>
          </Match>
          <Match when={currentProcess() === "CreateCard"}>
            <AuthCard
              id="register-page"
              title="Register"
              subtitle="Create an account to get started."
              show={() => true}
            >
              <form id="register-form" onSubmit={handleRegisterSubmit}>
                <div
                  id="nameInputsContainer"
                  class="flex flex-col md:flex-row gap-4"
                >
                  <div class="flex flex-col flex-1">
                    <label
                      for="firstname"
                      class="block text-gray-700 text-sm font-bold mb-2"
                    >
                      First Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={newUser()?.firstname}
                      onInput={(e) => onInputChange(e)}
                      placeholder="Enter first name"
                      id="firstname"
                      name="firstname"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div class="flex flex-col flex-1">
                    <label
                      for="lastname"
                      class="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Last Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={newUser()?.lastname}
                      onInput={(e) => onInputChange(e)}
                      placeholder="Enter last name"
                      id="lastname"
                      name="lastname"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>

                <div
                  id="nameInputsContainer"
                  class="flex flex-col md:flex-row gap-4 mt-4 mb-4"
                >
                  <div class="flex flex-col flex-1">
                    <label
                      for="password"
                      class="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      value={newUser()?.password}
                      onInput={(e) => onInputChange(e)}
                      autocomplete="current-password"
                      required
                      placeholder="Enter password"
                      id="password"
                      name="password"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div class="flex flex-col flex-1">
                    <label
                      for="passwordRepeat"
                      class="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Repeat password:
                    </label>
                    <input
                      type="password"
                      value={newUser()?.passwordRepeat}
                      onInput={(e) => onInputChange(e)}
                      required
                      placeholder="Repeat password"
                      autocomplete="current-password"
                      id="passwordRepeat"
                      name="passwordRepeat"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label
                    for="username"
                    class="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    class="form-control"
                    placeholder="Enter your username"
                    autocomplete="username"
                    required
                    value={newUser()?.username}
                    onInput={(e) => onInputChange(e)}
                  />
                </div>

                <div class="form-group">
                  <label
                    for="email"
                    class="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="form-control"
                    placeholder="Enter your email"
                    required
                    value={newUser()?.email}
                    onInput={(e) => onInputChange(e)}
                  />
                </div>

                <button type="submit" class="btn-primary">
                  Register
                </button>
                <AuthLink onClick={() => setCurrentProcess("LoginCard")}>
                  Already have an account? Login
                </AuthLink>
              </form>
              <div class="divider">
                <div class="divider-line"></div>
                <span class="divider-text">Or register with</span>
                <div class="divider-line"></div>
              </div>
              <div class="social-login">
                <SocialButton
                  iconClass="fab fa-google"
                  onClick={() => handleProviderLogin("google")}
                >
                  Google
                </SocialButton>
                <SocialButton
                  iconClass="fab fa-linkedin"
                  onClick={() => handleProviderLogin("linkedin")}
                >
                  LinkedIn
                </SocialButton>
                <SocialButton
                  iconClass="fab fa-github"
                  onClick={() => handleProviderLogin("github")}
                >
                  Github
                </SocialButton>
                <SocialButton iconClass="fab fa-facebook">
                  Facebook
                </SocialButton>
              </div>
            </AuthCard>
          </Match>
          <Match when={currentProcess() === "ForgotPassword"}>
            <AuthCard
              id="forgot-password-page"
              title="Forgot Password"
              subtitle="Enter your email to receive a password reset link."
              show={() => true}
            >
              <form
                id="forgot-password-form"
                onSubmit={handleForgotPasswordSubmit}
              >
                <div class="form-group">
                  <label for="forgot-email" class="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="forgot-email"
                    name="email"
                    class="form-control"
                    placeholder="Enter your email"
                    required
                    value={loginCredentials().username}
                    onInput={(e) =>
                      setLoginCredentials({
                        ...loginCredentials(),
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <button type="submit" class="btn-primary">
                  Reset Password
                </button>
                <AuthLink onClick={() => setCurrentProcess("LoginCard")}>
                  Back to Login
                </AuthLink>
              </form>
            </AuthCard>
          </Match>
          <Match when={currentProcess() === "ResetPassword"}>
            <AuthCard
              id="reset-password-page"
              title="Reset Password"
              subtitle="Enter your new password."
              show={() => true}
            >
              <form
                id="reset-password-form"
                onSubmit={handleResetPasswordSubmit}
              >
                <div class="form-group">
                  <label for="reset-password" class="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="reset-password"
                    name="password"
                    class="form-control"
                    placeholder="Enter your new password"
                    autocomplete="current-password"
                    hidden={false}
                    required
                    value={confirmPasswordReset().password}
                    onInput={(e) =>
                      setConfirmPasswordReset({
                        ...confirmPasswordReset(),
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label for="reset-confirm-password" class="form-label">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="reset-confirm-password"
                    name="confirm-password"
                    class="form-control"
                    placeholder="Confirm your new password"
                    autocomplete="current-password"
                    hidden={false}
                    required
                    value={confirmPasswordReset().confirm_password}
                    onInput={(e) =>
                      setConfirmPasswordReset({
                        ...confirmPasswordReset(),
                        confirm_password: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label
                    for="otp"
                    class="block text-gray-700 text-sm font-bold mb-2"
                  >
                    OTP
                  </label>
                  <input
                    type="number"
                    id="otp"
                    name="otp"
                    class="form-control"
                    placeholder="Please enter the OTP in your email"
                    required
                    value={confirmPasswordReset().otp}
                    onInput={(e) =>
                      setConfirmPasswordReset({
                        ...confirmPasswordReset(),
                        otp: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label
                    for="otp"
                    class="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Token
                  </label>
                  <input
                    type="text"
                    id="token"
                    name="token"
                    class="form-control"
                    placeholder="Please enter the OTP in your email"
                    disabled
                    value={confirmPasswordReset().token}
                  />
                </div>
                <button type="submit" class="btn-primary">
                  Reset Password
                </button>
              </form>
            </AuthCard>
          </Match>
          <Match when={currentProcess() === "OTPCard"}>
            <AuthCard
              id="logout-page"
              title="Complete Signup"
              subtitle="We have sent you an OTP code. Please check your email."
              show={() => true}
            >
              <div class="form-group">
                <label
                  for="token"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Validation Token
                </label>
                <input
                  type="text"
                  id="token"
                  name="token"
                  class="form-control"
                  placeholder="Please enter your email"
                  required
                  value={confirmSignUp().token}
                  onInput={(e) =>
                    setConfirmSignUp({
                      ...confirmSignUp(),
                      token: e.currentTarget.value,
                    })
                  }
                  disabled
                />
              </div>
              <div class="form-group">
                <label
                  for="otp"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  OTP
                </label>
                <input
                  type="number"
                  id="otp"
                  name="otp"
                  class="form-control"
                  placeholder="Please enter the OTP in your email"
                  required
                  value={confirmSignUp().otp}
                  onInput={(e) =>
                    setConfirmSignUp({
                      ...confirmSignUp(),
                      otp: Number(e.currentTarget.value),
                    })
                  }
                />
              </div>
              <div class="form-group">
                <label
                  for="otp"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="form-control"
                  placeholder="Please enter your email"
                  required
                  value={confirmSignUp().email}
                  onInput={(e) =>
                    setConfirmSignUp({
                      ...confirmSignUp(),
                      email: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <AuthLink onClick={() => setCurrentProcess("OTPCard")}>
                <PrimaryButton
                  text="Complete Sigunup"
                  handleClick={(e) => handleSubmitOTP(e)}
                />
              </AuthLink>
            </AuthCard>
          </Match>
        </Switch>
      </div>
    </div>
  );
};
