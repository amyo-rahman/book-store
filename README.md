# Book Store

Full-stack book store: .NET 10 API + Angular 22 web app.

## PrimeNG license

PrimeNG 22 requires a PrimeUI license key. Without one the app works normally but shows a license notice in the corner.

To use your own key (a free Community license is available at https://primeui.dev/pricing):

1. Create `web/src/app/primeui-license.local.ts` (git-ignored) containing `export const PRIMEUI_LICENSE = '<your key>';`
2. Run `npm run start:local` from `web/` instead of `npm start`.
