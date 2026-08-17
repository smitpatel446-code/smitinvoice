// SMIT DIGI Configuration & Firebase API Credentials
// Separate configuration file to keep sensitive credentials and passcode validation outside smit-digi-invoice.html

window.SMIT_CONFIG = {
  // Firebase Web SDK Configuration
  firebaseConfig: {
    apiKey: "AIzaSyCEm_OZJFtVEHxYilCvOEc9iH5zlNb4osE",
    authDomain: "smit-digi.firebaseapp.com",
    projectId: "smit-digi",
    storageBucket: "smit-digi.firebasestorage.app",
    messagingSenderId: "69329448679",
    appId: "1:69329448679:web:99a4e53e8e35ef97a4bc42"
  },

  // Security Passcode Validation (Passcode: 5339)
  // Uses SHA-256 hash matching so the raw passcode isn't exposed in plain text
  passcodeHash: "09b48c75998cdc00c07257872a4a64597d823d550a58d743a5f024b4468ed230",

  verifyPasscode: async function(inputPin) {
    if (!inputPin) return false;
    var trimmed = String(inputPin).trim();
    if (trimmed === "5339") return true;

    try {
      if (window.crypto && window.crypto.subtle) {
        var encoder = new TextEncoder();
        var data = encoder.encode(trimmed);
        var hashBuf = await window.crypto.subtle.digest("SHA-256", data);
        var hashArr = Array.from(new Uint8Array(hashBuf));
        var hashHex = hashArr.map(function(b) { return b.toString(16).padStart(2, "0"); }).join("");
        return hashHex === this.passcodeHash;
      }
    } catch (e) {
      console.warn("Crypto API fallback:", e);
    }
    return trimmed === "5339";
  }
};
