const DEVICE_ID_STORAGE_KEY = "numatik:tka:device-id";

const getDeviceFingerprint = () =>
  [
    navigator.userAgent,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset(),
  ].join("|");

export const getTkaDeviceId = async () => {
  try {
    const storedDeviceId = localStorage.getItem(DEVICE_ID_STORAGE_KEY);
    if (storedDeviceId) return storedDeviceId;
  } catch {
    // Continue with a newly generated ID when storage is unavailable.
  }

  if (!globalThis.crypto?.subtle) {
    throw new Error("Perangkat tidak mendukung verifikasi device ID.");
  }

  const fingerprint = getDeviceFingerprint();
  const digest = await globalThis.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(fingerprint),
  );
  const deviceId = `tka-${Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("")}`;

  try {
    localStorage.setItem(DEVICE_ID_STORAGE_KEY, deviceId);
  } catch {
    // The current session can still use the generated ID.
  }

  return deviceId;
};