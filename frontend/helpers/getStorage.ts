export default function getStorage() {
    function isServer() {
        return typeof window === "undefined";
    }

    return {
        get: <T>(key: string) => {
            if (isServer()) { return null; }
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) as T : null;
        },
        set: (key: string, value: unknown) => {
            if (isServer()) { return; }
            localStorage.setItem(key, JSON.stringify(value));
        },
        remove: (key: string) => {
            if (isServer()) { return; }
            localStorage.removeItem(key);
        },
        clear: () => {
            if (isServer()) { return; }
            localStorage.clear();
        }
    };
}