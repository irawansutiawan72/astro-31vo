---
name: TKA Google authentication
description: Operational constraints for Google Identity Services on TKA tryout pages and the server-side token verifier.
---

Google Identity Services requires every browser origin used by the TKA pages to be registered in the OAuth client, including the current Replit preview origin. The server-side OAuth secret must exist in the shared Replit Secrets environment so the API workflow can read it.

**Why:** A missing shared secret or unregistered preview origin prevents real sign-in even when the frontend and token-verification code build successfully.

**How to apply:** Before testing or publishing TKA Google login, check secret existence without exposing its value and register the active preview/production origins in Google Cloud Console.