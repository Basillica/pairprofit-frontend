import { createSignal, JSX } from "solid-js";
import "./styles.css";

interface AuthCardProps {
  id: string;
  title: string;
  subtitle: string;
  children: JSX.Element;
  show: () => boolean;
}

const AuthCard = (props: AuthCardProps) => {
  return (
    <div
      id={props.id}
      class="auth-card"
      style={{ display: props.show() ? "block" : "none" }}
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
  href: string;
  children: JSX.Element;
  onClick: (e: Event) => void;
}

const AuthLink = (props: AuthLinkProps) => {
  return (
    <a href={props.href} class="auth-link" onClick={props.onClick}>
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
  console.log(props, "the social button props");
  return (
    <button
      class={`social-btn ${props.children!.toString().toLowerCase()}-btn`}
      onClick={props.onClick}
    >
      <i class={props.iconClass}></i> {props.children}
    </button>
  );
};

export const Home = () => {
  const [currentPage, setCurrentPage] = createSignal("login-page");
  const [loginEmail, setLoginEmail] = createSignal("");
  const [loginPassword, setLoginPassword] = createSignal("");
  const [registerEmail, setRegisterEmail] = createSignal("");
  const [registerPassword, setRegisterPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [forgotEmail, setForgotEmail] = createSignal("");
  const [resetPassword, setResetPassword] = createSignal("");
  const [resetConfirmPassword, setResetConfirmPassword] = createSignal("");

  const showPage = (pageId: string) => {
    setCurrentPage(pageId);
  };

  const handleNavigation = (e: Event) => {
    e.preventDefault();
    const targetId = (e.currentTarget as HTMLAnchorElement)
      .getAttribute("href")
      ?.substring(1);
    if (targetId) {
      showPage(targetId);
    }
  };

  const handleLoginSubmit = (e: Event) => {
    e.preventDefault();
    console.log("Login Form Submitted", {
      email: loginEmail(),
      password: loginPassword(),
    });
    showPage("logout-page");
  };

  const handleRegisterSubmit = (e: Event) => {
    e.preventDefault();
    console.log("Register Form Submitted", {
      email: registerEmail(),
      password: registerPassword(),
      confirmPassword: confirmPassword(),
    });
    showPage("login-page");
  };

  const handleForgotPasswordSubmit = (e: Event) => {
    e.preventDefault();
    showPage("reset-password-page");
  };

  const handleResetPasswordSubmit = (e: Event) => {
    e.preventDefault();
    console.log("Reset Password Form Submitted", {
      password: resetPassword(),
      confirmPassword: resetConfirmPassword(),
    });
    showPage("login-page");
  };

  return (
    <div class="container-auth" style={"height: 90vh"}>
      <div class="flex flex-wrap" style={"min-height: 90vh"}>
        <div class="col-md-6 left-panel">
          <img
            src="https://picsum.photos/400"
            alt="Company Logo"
            class="logo"
            style={"border-radius: 50%"}
          />
        </div>
        <div class="col-md-2 right-panel">
          <AuthCard
            id="login-page"
            title="Login"
            subtitle="Welcome back! Please sign in to continue."
            show={() => currentPage() === "login-page"}
          >
            <form id="login-form" onSubmit={handleLoginSubmit}>
              <div class="form-group">
                <label for="email" class="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="form-control"
                  placeholder="Enter your email"
                  required
                  value={loginEmail()}
                  onInput={(e) =>
                    setLoginEmail((e.currentTarget as HTMLInputElement).value)
                  }
                />
              </div>
              <div class="form-group">
                <label for="password" class="form-label">
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
              <AuthLink href="#forgot-password-page" onClick={handleNavigation}>
                Forgot Password?
              </AuthLink>
            </form>
            <div class="divider">
              <div class="divider-line"></div>
              <span class="divider-text">Or login with</span>
              <div class="divider-line"></div>
            </div>
            <div class="social-login">
              <SocialButton iconClass="fab fa-google">Google</SocialButton>
              <SocialButton iconClass="fab fa-linkedin">LinkedIn</SocialButton>
              <SocialButton iconClass="fab fa-github">Github</SocialButton>
              <SocialButton iconClass="fab fa-facebook">Facebook</SocialButton>
            </div>
            <AuthLink href="#register-page" onClick={handleNavigation}>
              Don't have an account? Register
            </AuthLink>
          </AuthCard>

          <AuthCard
            id="register-page"
            title="Register"
            subtitle="Create an account to get started."
            show={() => currentPage() === "register-page"}
          >
            <form id="register-form" onSubmit={handleRegisterSubmit}>
              <div class="form-group">
                <label for="register-email" class="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="register-email"
                  name="email"
                  class="form-control"
                  placeholder="Enter your email"
                  required
                  value={registerEmail()}
                  onInput={(e) =>
                    setRegisterEmail(
                      (e.currentTarget as HTMLInputElement).value
                    )
                  }
                />
              </div>
              <div class="form-group">
                <label for="register-password" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="register-password"
                  name="password"
                  class="form-control"
                  placeholder="Enter your password"
                  required
                  value={registerPassword()}
                  onInput={(e) =>
                    setRegisterPassword(
                      (e.currentTarget as HTMLInputElement).value
                    )
                  }
                />
              </div>
              <div class="form-group">
                <label for="confirm-password" class="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  class="form-control"
                  placeholder="Confirm your password"
                  required
                  value={confirmPassword()}
                  onInput={(e) =>
                    setConfirmPassword(
                      (e.currentTarget as HTMLInputElement).value
                    )
                  }
                />
              </div>
              <button type="submit" class="btn-primary">
                Register
              </button>
              <AuthLink href="#login-page" onClick={handleNavigation}>
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
              <SocialButton iconClass="fab fa-linkedin">LinkedIn</SocialButton>
              <SocialButton iconClass="fab fa-github">Github</SocialButton>
              <SocialButton iconClass="fab fa-facebook">Facebook</SocialButton>
            </div>
          </AuthCard>

          <AuthCard
            id="forgot-password-page"
            title="Forgot Password"
            subtitle="Enter your email to receive a password reset link."
            show={() => currentPage() === "forgot-password-page"}
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
                    setForgotEmail((e.currentTarget as HTMLInputElement).value)
                  }
                />
              </div>
              <button type="submit" class="btn-primary">
                Reset Password
              </button>
              <AuthLink href="#login-page" onClick={handleNavigation}>
                Back to Login
              </AuthLink>
            </form>
          </AuthCard>

          <AuthCard
            id="reset-password-page"
            title="Reset Password"
            subtitle="Enter your new password."
            show={() => currentPage() === "reset-password-page"}
          >
            <form id="reset-password-form" onSubmit={handleResetPasswordSubmit}>
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

          <AuthCard
            id="logout-page"
            title="Logout"
            subtitle="You have been logged out."
            show={() => currentPage() === "logout-page"}
          >
            <AuthLink href="#login-page" onClick={handleNavigation}>
              Back to Login
            </AuthLink>
          </AuthCard>
        </div>
      </div>
    </div>
  );
};
