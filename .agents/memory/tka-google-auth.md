---
name: TKA Google authentication
description: Operational constraints for Google Identity Services on TKA tryout pages and the server-side token verifier.
---

Google Identity Services requires every browser origin used by the TKA pages to be registered in the OAuth client, including the current Replit preview origin. The server-side OAuth secret must exist in the shared Replit Secrets environment so the API workflow can read it.

**Why:** A missing shared secret or unregistered preview origin prevents real sign-in even when the frontend and token-verification code build successfully.

**How to apply:** Before testing or publishing TKA Google login, check secret existence without exposing its value and register the active preview/production origins in Google Cloud Console.

At submit time, the TKA pages request a fresh credential through `google.accounts.id.prompt()` rather than retaining the login token from the biodata step. If silent renewal is unavailable, the credential returned by the visible re-login button is passed directly to the existing submit request.

**Why:** The 75-minute exam can outlast a Google ID token, while preserving the existing backend verifier and duplicate-submission checks.

**How to apply:** Keep token refresh client-side; do not add OAuth scopes or change the server-side `verifyIdToken` flow for this requirement.