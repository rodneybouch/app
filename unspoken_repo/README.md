# Unspoken (Android 13) — Expo + EAS + Secure Coach Proxy

Local‑first tracker for actions & rituals with a ChatGPT “Coach”. Built with Expo (React Native), SQLite, and EAS Build.

## Quickstart
```bash
# create an Expo app and paste these files in
npm install
npx expo start
```

Open **Expo Go** on Android 13 and scan the QR.

## Secure Proxy (required for Coach)
### Express (server/)
```bash
cd server
cp .env.example .env   # set OPENAI_API_KEY and PROXY_TOKEN
npm i
node index.js
```
Set the URL & token in `src/services/openai.ts`.

### Cloudflare Worker (worker/)
- Put `OPENAI_API_KEY` + `PROXY_TOKEN` in dashboard vars.
- `wrangler deploy` and set the Worker URL in `src/services/openai.ts`.

## EAS Build (APK/AAB)
```bash
npm i -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview     # APK
eas build -p android --profile production  # AAB
```

## CI (GitHub Actions)
This repo includes `.github/workflows/eas-build.yml` to trigger an APK build and upload the APK as an artifact. Add a repo secret `EAS_TOKEN`:
```bash
eas token:create
gh secret set EAS_TOKEN -b"PASTE_TOKEN_HERE"
```
Then run the workflow from the Actions tab.
