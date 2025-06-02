import { createContext, useContext, JSX } from "solid-js";
import {
  getProviderConfig,
  OAUTH_STATE_STORAGE_PREFIX,
  generateRandomState,
} from "./oauth/providers";

interface OAuthContextType {
  getAuthorizationUrl: (providerId: string) => URL;
  verifyState: (providerId: string, receivedState: string) => boolean;
  clearState: (providerId: string) => void;
  // If you need to access config details publicly, you can expose them:
  // getProviderConfig: (providerId: string) => ProviderConfig;
}

const OAuthContext = createContext<OAuthContextType | null>(null);

export const OAuthContextProvider = (props: { children: JSX.Element }) => {
  /**
   * Stores the generated state in sessionStorage, prefixed by provider ID.
   * @param {string} providerId - The ID of the OAuth provider.
   * @param {string} state - The state string to store.
   */
  const storeState = (providerId: string, state: string): void => {
    try {
      sessionStorage.setItem(
        `${OAUTH_STATE_STORAGE_PREFIX}${providerId}`,
        state
      );
      console.log(`OAuth state for ${providerId} stored in sessionStorage.`);
    } catch (error) {
      console.error(`Error storing OAuth state for ${providerId}:`, error);
    }
  };

  /**
   * Retrieves the stored state from sessionStorage, prefixed by provider ID.
   * @param {string} providerId - The ID of the OAuth provider.
   * @returns {string | null} The stored state or null if not found.
   */
  const retrieveState = (providerId: string): string | null => {
    try {
      return sessionStorage.getItem(
        `${OAUTH_STATE_STORAGE_PREFIX}${providerId}`
      );
    } catch (error) {
      console.error(`Error retrieving OAuth state for ${providerId}:`, error);
      return null;
    }
  };

  /**
   * Clears the stored state from sessionStorage for a specific provider.
   * Crucial after verification to prevent replay attacks.
   * @param {string} providerId - The ID of the OAuth provider.
   */
  const clearState = (providerId: string): void => {
    try {
      sessionStorage.removeItem(`${OAUTH_STATE_STORAGE_PREFIX}${providerId}`);
      console.log(`OAuth state for ${providerId} cleared from sessionStorage.`);
    } catch (error) {
      console.error(`Error clearing OAuth state for ${providerId}:`, error);
    }
  };

  /**
   * Generates the authorization URL for a given OAuth provider with a secure state.
   * The state is stored in sessionStorage before returning the URL.
   * @param {string} providerId - The ID of the OAuth provider (e.g., 'linkedin', 'google').
   * @returns {URL} The complete authorization URL.
   * @throws {Error} If the provider is not configured.
   */
  const getAuthorizationUrl = (providerId: string): URL => {
    const config = getProviderConfig(providerId); // Get config for the specific provider
    const state = generateRandomState();
    storeState(providerId, state); // Store the generated state with provider ID

    const params = new URLSearchParams({
      response_type: "code",
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope,
      state: state,
    });

    // Handle provider-specific parameters
    if (config.id === "google") {
      if (config.accessType) params.append("access_type", config.accessType);
      if (config.prompt) params.append("prompt", config.prompt);
    }
    // Add more provider-specific parameters here as needed
    // Example for GitHub if it had specific params:
    // if (config.id === "github") {
    //   // params.append("allow_signup", "true");
    // }

    return new URL(`${config.authorizationUrl}?${params.toString()}`);
  };

  /**
   * Verifies the 'state' parameter received from an OAuth provider's callback.
   * @param {string} providerId - The ID of the OAuth provider.
   * @param {string} receivedState - The 'state' parameter from the callback URL.
   * @returns {boolean} True if the state is valid and matches, false otherwise.
   */
  const verifyState = (providerId: string, receivedState: string): boolean => {
    const storedState = retrieveState(providerId);
    clearState(providerId); // Always clear the state immediately after retrieval for single-use

    if (!storedState) {
      console.error(
        `OAuth state verification failed for ${providerId}: No state found in storage.`
      );
      return false;
    }

    if (receivedState !== storedState) {
      console.error(
        `OAuth state verification failed for ${providerId}: Mismatch between received and stored state.`
      );
      return false;
    }

    console.log(`OAuth state for ${providerId} successfully verified!`);
    return true;
  };

  return (
    <OAuthContext.Provider
      value={{
        getAuthorizationUrl,
        verifyState,
        clearState,
      }}
    >
      {props.children}
    </OAuthContext.Provider>
  );
};

export const useOAuth = () => {
  const context = useContext(OAuthContext);
  if (!context) {
    throw new Error("useOAuth must be used within an OAuthContextProvider");
  }
  return context;
};
