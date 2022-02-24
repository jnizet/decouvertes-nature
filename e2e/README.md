# E2E tests using playwright.

For the CI config, see the e2e:ci script in package.json.

To run tests locally, with more flexibility (from the root directory):

- run `./start-emulators.sh` to compile the functions and start the firebase emulators
- run `yarn serve:e2e` to run the app with the e2e config (which is similar to the production config, but with the emulators, and listening on port 4201)
- run `yarn e2e` to run the tests

Arguments can be passed to the last command. See details at https://playwright.dev/docs/test-cli.

In particular: 

- to run a single test file: `yarn e2e e2e/the-test-file.spec.ts`
- to run with just chromium: `yarn e2e --project=chromium`
- to run with headed browsers (i.e. visible windows): `yarn e2e --headed`
- to run just one test, in chromium only, in headed mode: `yarn e2e e2e/the-test-file.spec.ts --project=chromium --headed`
- to run step by step: `yarn e2e e2e/the-test-file.spec.ts --project=chromium --debug`

To be able to skip some parts in debug mode, add `await page.pause();` to the test, where you want to pause.

