# Contributing to `@pdffillr/sdk`

Thank you for your interest in contributing! This guide will walk you through everything you need to get started.

---

## Table of Contents

- [Requirements](#requirements)
- [Setting up the environment](#setting-up-the-environment)
- [Project structure](#project-structure)
- [Modifying or adding code](#modifying-or-adding-code)
- [Adding and running examples](#adding-and-running-examples)
- [Using the repository from source](#using-the-repository-from-source)
- [Running tests](#running-tests)
- [Linting and formatting](#linting-and-formatting)
- [Submitting a pull request](#submitting-a-pull-request)
- [Publishing and releases](#publishing-and-releases)

---

## Requirements

- [Node.js](https://nodejs.org/) v20+
- [Yarn v1 (Classic)](https://classic.yarnpkg.com/lang/en/docs/install) — other package managers may work but are not officially supported for development.

> **Windows users:** Use [Git Bash](https://git-scm.com/downloads) to run all commands — the build scripts are bash-based and will not work in CMD or PowerShell.

---

## Setting up the environment

### Step 1 — Fork the repository

You **must fork** before cloning if you want to contribute. You cannot push directly to this repository without write access.

- Go to `https://github.com/EM-SubhamDas/Autofillr-Backend-SDK`
- Click **Fork** (top right)
- Select your GitHub account as the owner
- Click **Create fork**

> **If you already cloned without forking:** don't worry — your local changes are safe. Fork the repo on GitHub, then add your fork as a remote:
> ```sh
> git remote add myfork https://github.com/YOUR-USERNAME/Autofillr-Backend-SDK
> git push myfork feat/your-branch
> ```

### Step 2 — Clone your fork

```sh
git clone https://github.com/YOUR-USERNAME/Autofillr-Backend-SDK
cd Autofillr-Backend-SDK
```

### Step 3 — Install dependencies

```sh
yarn install --ignore-scripts
```

> **Windows (Git Bash):** If `yarn` is not found, use:
> ```sh
> ./node_modules/yarn/bin/yarn install --ignore-scripts
> ```

### Step 4 — Build

```sh
yarn build
```

> **Windows (Git Bash):**
> ```sh
> ./node_modules/yarn/bin/yarn build
> ```

Verify the build succeeded by checking the `dist/` folder was created:

```sh
ls dist/
```

You should see files like `index.js`, `index.mjs`, `index.d.ts`.

---

## Project structure

```
src/           # SDK source code (partially generated)
src/lib/       # Manual code — never modified by the generator
examples/      # Example scripts — never modified by the generator
dist/          # Build output
tests/         # Test suite
scripts/       # CI and development scripts
```

---

## Modifying or adding code

Most of the SDK is generated code. Manual modifications will be preserved between generations, but may result in merge conflicts between your patches and generator updates.

> **Safe to edit freely:** `src/lib/` and `examples/` — the generator will never touch these directories.

---

## Adding and running examples

All files in the `examples/` directory are free to edit or add to.

1. Create your example file:

```ts
// examples/my-example.ts
#!/usr/bin/env -S npm run tsn -T

import PdffillrSDK from '@pdffillr/sdk';

const client = new PdffillrSDK({ apiKey: process.env['PDFFILLR_API_KEY'] });

async function main() {
  const session = await client.sdk.chat.sessions.create({ title: 'Test session' });
  console.log(session);
}

main();
```

2. Make it executable and run it:

```sh
chmod +x examples/my-example.ts
yarn tsn -T examples/my-example.ts
```

---

## Using the repository from source

**Install directly from GitHub:**

```sh
npm install git+ssh://git@github.com:EM-SubhamDas/Autofillr-Backend-SDK.git
```

**Or link a local clone:**

```sh
# Clone and link with yarn
git clone https://www.github.com/EM-SubhamDas/Autofillr-Backend-SDK
cd Autofillr-Backend-SDK
yarn link
cd ../my-package
yarn link @pdffillr/sdk

# Or with pnpm
pnpm link --global
cd ../my-package
pnpm link --global @pdffillr/sdk
```

---

## Running tests

```sh
yarn run test
```

---

## Linting and formatting

This repository uses [Prettier](https://www.npmjs.com/package/prettier) and [ESLint](https://www.npmjs.com/package/eslint).

Check for issues:

```sh
yarn lint
```

Auto-fix all formatting and lint issues:

```sh
yarn fix
```

> Always run `yarn fix` before opening a pull request to avoid CI failures.

---

## Submitting a pull request

### First time contributing

1. Fork the repository (see [Setting up the environment](#setting-up-the-environment))
2. Clone your fork locally
3. Create a new branch — never work directly on `main`:
   ```sh
   git checkout -b feat/your-feature-name
   ```
4. Make your changes in `src/lib/` or `examples/`
5. Run `yarn fix` to auto-format your code
6. Run `yarn run test` to make sure all tests pass
7. Commit and push to **your fork**:
   ```sh
   git add .
   git commit -m "feat: describe your change"
   git push origin feat/your-feature-name
   ```
8. Go to `https://github.com/YOUR-USERNAME/Autofillr-Backend-SDK`
9. Click **Compare & pull request**
10. Make sure the base is `EM-SubhamDas/Autofillr-Backend-SDK` → `main`
11. Fill in what you changed and why, then click **Create pull request**

### Subsequent contributions (fork already exists)

Keep your fork up to date before starting new work:

```sh
git remote add upstream https://github.com/EM-SubhamDas/Autofillr-Backend-SDK
git fetch upstream
git merge upstream/main
```

Then create a new branch and follow steps 3–11 above.

### What happens after you open a PR

- CI runs automatically (lint → build → tests)
- A maintainer reviews your changes
- Once approved and all checks pass, the maintainer merges it
- **Nothing enters the main branch without maintainer approval** — your PR can never auto-merge

---

## Publishing and releases

Changes merged via the automated release PR pipeline publish to npm automatically.

### Publish via GitHub Actions

Use the [Publish NPM workflow](https://www.github.com/EM-SubhamDas/Autofillr-Backend-SDK/actions/workflows/publish-npm.yml). This requires an `NPM_TOKEN` configured as a repository or organization secret.

### Publish manually

```sh
NPM_TOKEN=your_token bin/publish-npm
```
