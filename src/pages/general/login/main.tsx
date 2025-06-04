import { createSignal, JSX, onMount, Switch, Match } from "solid-js";
import logo from "./../../../assets/A.png";
import "./login.css";
import { useOAuth } from "../../../oauth";
import { PublicHandler } from "../../../api/public";
import { UserModel } from "../../../models/auth";
import { NotificationBar } from "../../../components/utils/Notification";
import { PrimaryButton } from "../../../components/utils/button";
import { LoadingOverlay } from "../../../components/utils";

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
  const [loginPassword, setLoginPassword] = createSignal("");
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
  const [forgotEmail, setForgotEmail] = createSignal("");
  const [resetPassword, setResetPassword] = createSignal("");
  const [resetConfirmPassword, setResetConfirmPassword] = createSignal("");
  const { getAuthorizationUrl } = useOAuth();
  const [notificationType, setNotificationType] = createSignal<
    "success" | "warning" | "error" | null
  >(null);
  const publiApiHandler = new PublicHandler();
  const [notificationMessage, setNotificationMessage] = createSignal<
    string | null
  >(null);
  const [currentProcess, setCurrentProcess] =
    createSignal<ProcessType>("LoginCard");
  const [isLoading, setIsLoading] = createSignal(false);
  const [otpValue, setOtpValue] = createSignal(0);
  const [userEmail, setUserEmail] = createSignal("");

  const showAppNotification = (
    type: "success" | "warning" | "error",
    message: string
  ) => {
    setNotificationType(type);
    setNotificationMessage(message);
  };

  const handleLoginSubmit = (e: Event) => {
    e.preventDefault();
  };

  const handleRegisterSubmit = async (e: Event) => {
    e.preventDefault();
    if (!isValidEmail(newUser().email)) {
      showAppNotification("error", `the provided email is not valid`);
      return;
    }

    if (newUser().password !== newUser().passwordRepeat) {
      showAppNotification("error", "the provided passwords do not match");
      return;
    }

    setIsLoading(true);
    let result = await publiApiHandler.signUp(newUser());
    if (!result.success) {
      console.log(result, "the frigging result");
      setIsLoading(false);
      showAppNotification("error", "the user accout could not be created");
      return;
    }

    console.log(result, "the frigging result");
    showAppNotification("success", "Your data has been saved successfully!");
    localStorage.setItem("currentProcess", "OTPCard");
    setCurrentProcess("OTPCard");
    setIsLoading(false);
  };

  const handleForgotPasswordSubmit = (e: Event) => {
    e.preventDefault();
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

  const handleResetPasswordSubmit = (e: Event) => {
    e.preventDefault();
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return emailRegex.test(email);
  };

  onMount(async () => {
    const process = localStorage.getItem("currentProcess")!;
    if (process && process !== "") {
      setCurrentProcess(process as ProcessType);
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
      const provider = sessionStorage.getItem("oauth_provider");
      if (!provider) {
        console.log("no set provides fount");
        return;
      }

      let api = new PublicHandler();
      const params = new URLSearchParams({
        code: code,
        state: state,
      });

      let res = await api.loginByProvider(provider, params.toString());
      if (!res.success) {
        console.log("unable to login in user");
        return;
      }

      console.log("logged in user. user: ", res.data);
      console.log("OAuth callback received: code=", code, "state=", state);
      const actualProviderId = provider || "UNKNOWN_PROVIDER";
      console.log(actualProviderId, ">>>>>>>>>>>>>>>>>>>>");
    }
  });

  const handleProviderLogin = async (provider: string) => {
    console.log(getAuthorizationUrl(provider));
    const authUrl = getAuthorizationUrl(provider);
    sessionStorage.setItem("oauth_provider", provider);
    window.location.href = authUrl.toString();
  };

  const handleSubmitOTP = (
    e: MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: Element;
    }
  ) => {
    e.preventDefault();
    if (otpValue() === 0 || otpValue() < 99999) {
      showAppNotification("error", "the provided OTP is wrong");
      return;
    }

    console.log(otpValue());
  };

  return (
    <div class="container-auth">
      <NotificationBar
        type={notificationType}
        message={notificationMessage}
        duration={5000} // Optional: Pass duration in milliseconds
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
                    required
                    value={loginPassword()}
                    onInput={(e) =>
                      setLoginPassword(
                        (e.currentTarget as HTMLInputElement).value
                      )
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
                    required
                    value={loginPassword()}
                    onInput={(e) =>
                      setLoginPassword(
                        (e.currentTarget as HTMLInputElement).value
                      )
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
                <SocialButton
                  iconClass="fab fa-facebook"
                  onClick={() => handleProviderLogin("facebook")}
                >
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
                <SocialButton iconClass="fab fa-google">Google</SocialButton>
                <SocialButton iconClass="fab fa-linkedin">
                  LinkedIn
                </SocialButton>
                <SocialButton iconClass="fab fa-github">Github</SocialButton>
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
                    value={forgotEmail()}
                    onInput={(e) =>
                      setForgotEmail(
                        (e.currentTarget as HTMLInputElement).value
                      )
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
                    required
                    value={resetPassword()}
                    onInput={(e) =>
                      setResetPassword(
                        (e.currentTarget as HTMLInputElement).value
                      )
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
                    required
                    value={resetConfirmPassword()}
                    onInput={(e) =>
                      setResetConfirmPassword(
                        (e.currentTarget as HTMLInputElement).value
                      )
                    }
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
                  value={otpValue()}
                  onInput={(e) =>
                    setOtpValue(e.currentTarget.value as unknown as number)
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
                  value={userEmail()}
                  onInput={(e) => setUserEmail(e.currentTarget.value)}
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
