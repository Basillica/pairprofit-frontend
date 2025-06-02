// Base interface for all OAuth providers
export interface OAuthProviderConfig {
  id: "linkedin" | "google" | "github" | "facebook";
  name: "LinkedIn" | "Google" | "GitHub" | "Facebook";
  clientId: string;
  redirectUri: string;
  scope: string;
  authorizationUrl: string;
}

// LinkedIn (already quite standard)
export interface LinkedInProviderConfig extends OAuthProviderConfig {
  id: "linkedin";
}

// Google
export interface GoogleProviderConfig extends OAuthProviderConfig {
  id: "google";
  accessType?: "offline" | "online";
  prompt?: "select_account" | "consent";
}

// GitHub
export interface GitHubProviderConfig extends OAuthProviderConfig {
  id: "github";
}

// Union type for all supported provider configurations
export type ProviderConfig =
  | LinkedInProviderConfig
  | GoogleProviderConfig
  | GitHubProviderConfig;

// Centralized configurations for each provider
// In a real app, these would come from environment variables or a backend config.
export const OAUTH_PROVIDERS: Record<string, ProviderConfig> = {
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    clientId:
      import.meta.env.VITE_LINKEDIN_CLIENT_ID ||
      "VITE_LINKEDIN_CLIENT_ID_MISSING",
    redirectUri:
      import.meta.env.VITE_LINKEDIN_REDIRECT_URI ||
      "VITE_LINKEDIN_REDIRECT_URI_MISSING",
    scope: "openid profile email",
    authorizationUrl: "https://www.linkedin.com/oauth/v2/authorization",
  },
  google: {
    id: "google",
    name: "Google",
    clientId:
      import.meta.env.VITE_GOOGLE_CLIENT_ID || "VITE_GOOGLE_CLIENT_ID_MISSING",
    redirectUri:
      import.meta.env.VITE_GOOGLE_REDIRECT_URI ||
      "VITE_GOOGLE_REDIRECT_URI_MISSING",
    scope: "openid profile email",
    authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    accessType: "offline",
    prompt: "consent", // Ensure consent screen is shown
  },
  github: {
    id: "github",
    name: "GitHub",
    clientId:
      import.meta.env.VITE_GITHUB_CLIENT_ID || "VITE_GITHUB_CLIENT_ID_MISSING",
    redirectUri:
      import.meta.env.VITE_GITHUB_REDIRECT_URI ||
      "VITE_GITHUB_REDIRECT_URI_MISSING",
    scope: "user:email read:user", // Scopes for GitHub
    authorizationUrl: "https://github.com/login/oauth/authorize",
  },
};

// Key for storing the state in session storage
// We'll make this dynamic based on the provider ID
export const OAUTH_STATE_STORAGE_PREFIX = "oauth_state_";

// Helper to get a provider config by ID
export function getProviderConfig(providerId: string): ProviderConfig {
  const config = OAUTH_PROVIDERS[providerId];
  if (!config) {
    throw new Error(`OAuth provider with ID '${providerId}' not found.`);
  }
  return config;
}

/**
 * Generates a cryptographically secure random string for the OAuth 'state' parameter.
 * @returns {string} The generated state string.
 */
export const generateRandomState = (): string => {
  const array = new Uint32Array(28);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...new Uint8Array(array.buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};
