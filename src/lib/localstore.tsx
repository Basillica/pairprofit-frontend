import { GetEnvConfig } from '../environments';

interface SecureStorageItem<T> {
    value: T;
    expiresAt: number | null;
}

/**
 * A utility class for securely storing and retrieving objects in localStorage
 * using JSON stringification and a simple key-based encoding.
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
        let result = '';
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
            console.error(
                'An encoding key is required to store data securely.'
            );
            return '';
        }
        return key;
    }

    /**
     * Converts an object to a JSON string, encodes it with a key,
     * then encodes it in Base64 and stores it in localStorage.
     *
     * @param keyName The key under which to store the data in localStorage.
     * @param dataObject The object to be stored.
     * @param expiresIn Optional time in milliseconds until the item expires. Defaults to 1 day.
     */
    static storeItem(
        keyName: LocalStorageKey,
        dataObject: any,
        expiresIn: number = 86400000
    ): void {
        if (typeof localStorage === 'undefined') {
            console.error('localStorage is not available in this environment.');
            return;
        }

        if ((keyName as string) === 'lang') {
            localStorage.setItem(keyName, dataObject);
            return;
        }

        const encodingKey = SecureLocalStorage.getEncryptionKey();
        if (!encodingKey) return;

        try {
            // 1. Stringify the data and create a metadata object with an expiration timestamp
            const now = Date.now();
            const storageItem: SecureStorageItem<any> = {
                value: dataObject,
                expiresAt: now + expiresIn,
            };
            const jsonString = JSON.stringify(storageItem);

            // 2. Obfuscate and encode the entire metadata object
            const encodedString = SecureLocalStorage.xorEncodeDecode(
                jsonString,
                encodingKey
            );
            const base64Encoded = btoa(encodedString);

            // 3. Store the Base64 encoded string in localStorage
            localStorage.setItem(keyName, base64Encoded);
        } catch (error) {
            console.error(
                `Error storing object under key "${keyName}":`,
                error
            );
        }
    }

    /**
     * Retrieves an encoded, expired-checked JSON string from localStorage,
     * decodes it, and parses it back into an object.
     *
     * @param keyName The key under which the data is stored in localStorage.
     * @returns The retrieved object, or null if not found, expired, or decoding fails.
     */
    static getItem<T = any>(keyName: LocalStorageKey): T | null {
        if (typeof localStorage === 'undefined') {
            console.error('localStorage is not available in this environment.');
            return null;
        }

        if ((keyName as string) === 'lang') {
            let result = localStorage.getItem(keyName);
            return result as T;
        }

        const encodingKey = SecureLocalStorage.getEncryptionKey();
        if (!encodingKey) return null;

        try {
            const base64Encoded = localStorage.getItem(keyName);

            if (base64Encoded === null) {
                return null;
            }

            // 1. Decode the Base64 string
            const encodedString = atob(base64Encoded);

            // 2. Decode the string with the provided key (XOR)
            const jsonString = SecureLocalStorage.xorEncodeDecode(
                encodedString,
                encodingKey
            );

            // 3. Parse the JSON string to get the stored metadata object
            const storageItem: SecureStorageItem<T> = JSON.parse(jsonString);

            // 4. Check for expiration
            if (storageItem.expiresAt && Date.now() > storageItem.expiresAt) {
                console.log(`Item "${keyName}" has expired. Removing it.`);
                SecureLocalStorage.removeItem(keyName);
                return null;
            }

            // 5. Return the value from the metadata object
            return storageItem.value;
        } catch (error) {
            console.error(
                `Error retrieving object from key "${keyName}":`,
                error
            );
            // On any error, remove the item to prevent future issues
            SecureLocalStorage.removeItem(keyName);
            return null;
        }
    }

    /**
     * Removes an item from localStorage.
     * @param keyName The key of the item to remove.
     */
    static removeItem(keyName: LocalStorageKey): void {
        if (typeof localStorage === 'undefined') {
            console.error('localStorage is not available in this environment.');
            return;
        }
        try {
            localStorage.removeItem(keyName);
        } catch (error) {
            console.error(`Error removing item "${keyName}":`, error);
        }
    }
}

export enum LocalStorageKey {
    PairProfitCategories = 'x.pairprofit.categories',
    AppAuthToken = 'x.auth.token',
    AppAuthExp = 'x.auth.exp',
    AppAuthUserModel = 'x.auth.user',
    AuthUserActiveProfile = 'x.pairprofit.active.profile',
    AppAuthDeviceVerified = 'x.auth.device.verified',
    AppAuthProcess = 'x.auth.process',
    AppAuthProcessToken = 'x.auth.process.token',
    AppAuthProvider = 'x.auth.provider',
}

export const createDynamicKey = (
    keyPrefix: LocalStorageKey,
    id: string | number
): string => {
    return `${keyPrefix}.${id}`;
};
