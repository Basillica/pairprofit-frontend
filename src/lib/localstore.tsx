import { GetEnvConfig } from "../environments";

/**
 * A utility class for securely storing and retrieving objects in localStorage
 * using JSON stringification and a simple key-based encoding.
 *
 * WARNING: localStorage is not secure storage. This encoding method is
 * for obfuscation, not strong encryption. Do NOT store sensitive data here.
 * For truly sensitive data, consider server-side storage or more robust
 * client-side encryption libraries with proper key management.
 */
export class SecureLocalStorage {
  /**
   * Applies a simple XOR cipher for encoding/decoding a string with a key.
   * This is for obfuscation only and is NOT cryptographically secure.
   *
   * @param data The string to encode or decode.
   * @param key The string key to use for encoding/decoding.
   * @returns The encoded or decoded string.
   */
  private static xorEncodeDecode(data: string, key: string): string {
    let result = "";
    for (let i = 0; i < data.length; i++) {
      result += String.fromCharCode(
        data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return result;
  }

  private static getEncryptionKey(): string {
    const key: string = GetEnvConfig().EncryptionKey;
    if (!key || key.length === 0) {
      console.error("An encoding key is required to store data securely.");
      return "";
    }
    return key;
  }

  /**
   * Converts an object to a JSON string, encodes it with a key,
   * then encodes it in Base64 and stores it in localStorage.
   *
   * @param keyName The key under which to store the data in localStorage.
   * @param dataObject The object to be stored.
   * @param encodingKey The string key used for the encoding process.
   */
  static storeItem(keyName: string, dataObject: any): void {
    if (typeof localStorage === "undefined") {
      console.error("localStorage is not available in this environment.");
      return;
    }

    if (keyName === "lang") {
      localStorage.setItem(keyName, dataObject);
      return;
    }

    const encodingKey = SecureLocalStorage.getEncryptionKey();
    try {
      // 1. Stringify the object to JSON
      const jsonString = JSON.stringify(dataObject);

      // 2. Encode the JSON string with the provided key (XOR for basic obfuscation)
      const encodedString = SecureLocalStorage.xorEncodeDecode(
        jsonString,
        encodingKey
      );

      // 3. Encode the result in Base64 to handle potential non-printable characters
      //    and make it safe for localStorage storage.
      const base64Encoded = btoa(encodedString); // btoa encodes a string to Base64

      // 4. Store the Base64 encoded string in localStorage
      localStorage.setItem(keyName, base64Encoded);
      // console.log(`Object successfully stored under key: ${keyName}`);
    } catch (error) {
      console.error(`Error storing object under key "${keyName}":`, error);
    }
  }

  /**
   * Retrieves a Base64 encoded, key-encoded JSON string from localStorage,
   * decodes it, and parses it back into an object.
   *
   * @param keyName The key under which the data is stored in localStorage.
   * @param encodingKey The string key used for the decoding process (must match the storing key).
   * @returns The retrieved object, or null if not found, invalid, or decoding fails.
   */
  static getItem<T = any>(keyName: string): T | null {
    if (typeof localStorage === "undefined") {
      console.error("localStorage is not available in this environment.");
      return null;
    }

    if (keyName === "lang") {
      let result = localStorage.getItem(keyName);
      return result as T;
    }

    const encodingKey = SecureLocalStorage.getEncryptionKey();

    try {
      // 1. Retrieve the Base64 encoded string from localStorage
      const base64Encoded = localStorage.getItem(keyName);

      if (base64Encoded === null) {
        console.log(`No data found for key: ${keyName}`);
        return null;
      }

      // 2. Decode the Base64 string
      const encodedString = atob(base64Encoded); // atob decodes a Base64 string

      // 3. Decode the string with the provided key (XOR for basic obfuscation)
      const jsonString = SecureLocalStorage.xorEncodeDecode(
        encodedString,
        encodingKey
      );

      // 4. Parse the JSON string back into an object
      const dataObject = JSON.parse(jsonString) as T;
      // console.log(`Object successfully retrieved from key: ${keyName}`);
      return dataObject;
    } catch (error) {
      console.error(`Error retrieving object from key "${keyName}":`, error);
      return null;
    }
  }

  /**
   * Removes an item from localStorage.
   * @param keyName The key of the item to remove.
   */
  static removeItem(keyName: string): void {
    if (typeof localStorage === "undefined") {
      console.error("localStorage is not available in this environment.");
      return;
    }
    try {
      localStorage.removeItem(keyName);
      console.log(`Item "${keyName}" removed from localStorage.`);
    } catch (error) {
      console.error(`Error removing item "${keyName}":`, error);
    }
  }
}

export class SecureLocalStorageCrypto {
  // Algorithm configuration for AES-GCM encryption
  private static readonly ALGO_PARAMS = {
    name: "AES-GCM",
    ivLength: 12, // Standard IV length for AES-GCM in bytes
    tagLength: 128, // Standard authentication tag length in bits
  };

  /**
   * Derives a cryptographic key from a passphrase.
   * In a real application, this passphrase would ideally be provided by the user
   * and not hardcoded. PBKDF2 is a standard for securely deriving keys from passphrases.
   *
   * @param passphrase The string passphrase to derive the key from.
   * @param salt A unique salt for key derivation. Should be stored alongside the encrypted data or generated randomly per user.
   * @returns A Promise that resolves with a CryptoKey.
   */
  private static async deriveKeyFromPassphrase(
    passphrase: string,
    salt: Uint8Array
  ): Promise<CryptoKey> {
    const enc = new TextEncoder();
    const passwordBuffer = enc.encode(passphrase);

    // Import the passphrase as a raw key
    const baseKey = await crypto.subtle.importKey(
      "raw",
      passwordBuffer,
      { name: "PBKDF2" },
      false, // not extractable
      ["deriveBits", "deriveKey"]
    );

    // Derive the actual encryption key using PBKDF2
    const derivedKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000, // Number of iterations, higher is more secure but slower
        hash: "SHA-256", // Hashing algorithm
      },
      baseKey,
      { name: SecureLocalStorageCrypto.ALGO_PARAMS.name, length: 256 }, // AES-256 key
      false, // not extractable
      ["encrypt", "decrypt"]
    );

    return derivedKey;
  }

  /**
   * Encrypts data using AES-GCM with a derived key.
   * The data is first stringified to JSON.
   * The Initialization Vector (IV) is randomly generated and prepended to the ciphertext.
   *
   * @param keyName The key under which to store the data in localStorage.
   * @param data The data (object, string, number, boolean, array) to be stored.
   * @param passphrase The user's passphrase used to derive the encryption key.
   */
  static async storeObject(
    keyName: string,
    data: any,
    passphrase: string
  ): Promise<void> {
    if (
      typeof localStorage === "undefined" ||
      typeof crypto === "undefined" ||
      typeof crypto.subtle === "undefined"
    ) {
      console.error(
        "Web Cryptography API or localStorage is not available in this environment."
      );
      return;
    }
    if (!passphrase || passphrase.length === 0) {
      console.error("A passphrase is required for encryption.");
      return;
    }

    try {
      // Generate a unique salt for PBKDF2 key derivation.
      // In a real application, if the same passphrase is used for multiple items,
      // it's common to use a single salt per user, stored alongside user data.
      // For this example, we'll generate a salt per item for simplicity,
      // and it will be stored with the IV.
      const salt = crypto.getRandomValues(new Uint8Array(16)); // 16 bytes for a good salt
      console.log(salt, "the rigging salt");

      // Derive the encryption key from the passphrase and salt
      const encryptionKey =
        await SecureLocalStorageCrypto.deriveKeyFromPassphrase(
          passphrase,
          salt
        );

      // Convert data to JSON string then to Uint8Array (required by Web Crypto API)
      const jsonString = JSON.stringify(data);
      const textEncoder = new TextEncoder();
      const encodedData = textEncoder.encode(jsonString);

      // Generate a random Initialization Vector (IV) for AES-GCM
      const iv = crypto.getRandomValues(
        new Uint8Array(SecureLocalStorageCrypto.ALGO_PARAMS.ivLength)
      );

      // Encrypt the data
      const ciphertextBuffer = await crypto.subtle.encrypt(
        {
          name: SecureLocalStorageCrypto.ALGO_PARAMS.name,
          iv: iv,
        },
        encryptionKey,
        encodedData
      );

      // Combine salt, IV and ciphertext into a single ArrayBuffer for storage
      const combined = new Uint8Array(
        salt.byteLength + iv.byteLength + ciphertextBuffer.byteLength
      );
      combined.set(salt, 0);
      combined.set(iv, salt.byteLength);
      combined.set(
        new Uint8Array(ciphertextBuffer),
        salt.byteLength + iv.byteLength
      );

      // Convert the combined ArrayBuffer to a Base64 string for localStorage
      const base64Encoded = btoa(String.fromCharCode(...combined));

      localStorage.setItem(keyName, base64Encoded);
      console.log(
        `Data successfully encrypted and stored under key: "${keyName}"`
      );
    } catch (error) {
      console.error(
        `Error storing encrypted data under key "${keyName}":`,
        error
      );
    }
  }

  /**
   * Retrieves encrypted data from localStorage, decrypts it using AES-GCM
   * with a derived key, and parses it back into its original data type.
   *
   * @param keyName The key under which the data is stored in localStorage.
   * @param passphrase The user's passphrase (must match the one used for encryption).
   * @returns A Promise that resolves with the retrieved data, or null if not found, invalid, or decryption fails.
   */
  static async getObject<T = any>(
    keyName: string,
    passphrase: string
  ): Promise<T | null> {
    if (
      typeof localStorage === "undefined" ||
      typeof crypto === "undefined" ||
      typeof crypto.subtle === "undefined"
    ) {
      console.error(
        "Web Cryptography API or localStorage is not available in this environment."
      );
      return null;
    }
    if (!passphrase || passphrase.length === 0) {
      console.error("A passphrase is required for decryption.");
      return null;
    }

    try {
      const base64Encoded = localStorage.getItem(keyName);
      if (base64Encoded === null) {
        console.log(`No encrypted data found for key: "${keyName}"`);
        return null;
      }

      // Convert Base64 string back to Uint8Array
      const combined = Uint8Array.from(atob(base64Encoded), (c) =>
        c.charCodeAt(0)
      );

      // Extract salt, IV, and ciphertext
      const salt = combined.slice(0, 16); // Assuming 16-byte salt
      const iv = combined.slice(
        16,
        16 + SecureLocalStorageCrypto.ALGO_PARAMS.ivLength
      );
      const ciphertext = combined.slice(
        16 + SecureLocalStorageCrypto.ALGO_PARAMS.ivLength
      );

      if (
        iv.length !== SecureLocalStorageCrypto.ALGO_PARAMS.ivLength ||
        salt.length !== 16
      ) {
        console.error(
          "Stored data is corrupted or malformed (IV/Salt length mismatch)."
        );
        return null;
      }

      // Derive the decryption key from the passphrase and salt (must be the same as encryption)
      const decryptionKey =
        await SecureLocalStorageCrypto.deriveKeyFromPassphrase(
          passphrase,
          salt
        );

      // Decrypt the data
      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: SecureLocalStorageCrypto.ALGO_PARAMS.name,
          iv: iv,
        },
        decryptionKey,
        ciphertext
      );

      // Convert decrypted Uint8Array back to string then parse JSON
      const textDecoder = new TextDecoder();
      const jsonString = textDecoder.decode(decryptedBuffer);
      const data = JSON.parse(jsonString) as T;

      console.log(
        `Data successfully decrypted and retrieved from key: "${keyName}"`
      );
      return data;
    } catch (error) {
      console.error(
        `Error retrieving or decrypting data from key "${keyName}":`,
        error
      );
      // This error can occur if:
      // 1. The passphrase is incorrect.
      // 2. The data in localStorage is corrupted.
      // 3. The JSON parsing fails.
      return null;
    }
  }

  /**
   * Removes an item from localStorage.
   * @param keyName The key of the item to remove.
   */
  static removeItem(keyName: string): void {
    if (typeof localStorage === "undefined") {
      console.error("localStorage is not available in this environment.");
      return;
    }
    try {
      localStorage.removeItem(keyName);
      console.log(`Item "${keyName}" removed from localStorage.`);
    } catch (error) {
      console.error(`Error removing item "${keyName}":`, error);
    }
  }
}

export const tester = () => {
  const USER_PASSPHRASE = "MySecureUserPassphrase123!";

  // --- Storing and Retrieving an Object ---
  interface UserProfile {
    username: string;
    email: string;
    settings: {
      theme: string;
      notifications: boolean;
    };
    lastActivity: number;
  }

  const userProfileToStore: UserProfile = {
    username: "johndoe",
    email: "john.doe@example.com",
    settings: {
      theme: "system",
      notifications: true,
    },
    lastActivity: Date.now(),
  };

  const profileStorageKey = "userProfileEncrypted";

  console.log("\n--- Storing and Retrieving an ENCRYPTED OBJECT ---");
  SecureLocalStorageCrypto.storeObject(
    profileStorageKey,
    userProfileToStore,
    USER_PASSPHRASE
  )
    .then(async () => {
      const retrievedProfile =
        await SecureLocalStorageCrypto.getObject<UserProfile>(
          profileStorageKey,
          USER_PASSPHRASE
        );

      if (retrievedProfile) {
        console.log("Retrieved Encrypted Profile (Object):", retrievedProfile);
        console.log("Username:", retrievedProfile.username);
      } else {
        console.log("Failed to retrieve encrypted profile (Object).");
      }

      // --- Storing and Retrieving an ENCRYPTED String ---
      const secretMessage = "This is a highly confidential secret message!";
      const messageStorageKey = "secretMsgEncrypted";

      console.log("\n--- Storing and Retrieving an ENCRYPTED STRING ---");
      await SecureLocalStorageCrypto.storeObject(
        messageStorageKey,
        secretMessage,
        USER_PASSPHRASE
      );
      const retrievedSecretMessage =
        await SecureLocalStorageCrypto.getObject<string>(
          messageStorageKey,
          USER_PASSPHRASE
        );

      if (retrievedSecretMessage !== null) {
        console.log(
          "Retrieved Encrypted Message (String):",
          retrievedSecretMessage
        );
      } else {
        console.log("Failed to retrieve encrypted message (String).");
      }

      // --- Attempting to retrieve with wrong passphrase (should fail) ---
      console.log("\n--- Attempting to retrieve with WRONG PASSPHRASE ---");
      const wrongPassphraseAttempt =
        await SecureLocalStorageCrypto.getObject<UserProfile>(
          profileStorageKey,
          "wrong_passphrase"
        );
      console.log(
        "Retrieved with wrong passphrase (should be null):",
        wrongPassphraseAttempt
      );

      // --- Removing encrypted item ---
      console.log("\n--- Removing Encrypted Item ---");
      SecureLocalStorageCrypto.removeItem(profileStorageKey);
      SecureLocalStorageCrypto.removeItem(messageStorageKey);

      console.log("\n--- Attempting to retrieve after removal ---");
      const afterRemoval =
        await SecureLocalStorageCrypto.getObject<UserProfile>(
          profileStorageKey,
          USER_PASSPHRASE
        );
      console.log("Retrieved after removal (should be null):", afterRemoval);
    })
    .catch((error) => {
      console.error("An error occurred during the demonstration:", error);
    });
};
