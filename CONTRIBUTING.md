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

---

## Setting up the environment

Clone the repository and install dependencies:

```sh
git clone https://www.github.com/EM-SubhamDas/Autofillr-Backend-SDK
cd Autofillr-Backend-SDK
yarn
yarn build
```

This installs all required dependencies and builds output files to `dist/`.

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

// your example code here
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

1. Fork the repository and create a new branch from `main`:
   ```sh
   git checkout -b feat/your-feature-name
   ```
2. Make your changes in `src/lib/` or `examples/` (safest areas for manual edits).
3. Run `yarn fix` to format your code.
4. Run `yarn run test` to make sure all tests pass.
5. Push your branch and open a pull request against `main`.
6. Fill in the PR description explaining what you changed and why.

---

## Publishing and releases

Changes merged via the automated release PR pipeline publish to npm automatically.

### Publish via GitHub Actions

Use the [Publish NPM workflow](https://www.github.com/EM-SubhamDas/Autofillr-Backend-SDK/actions/workflows/publish-npm.yml). This requires an `NPM_TOKEN` configured as a repository or organization secret.

### Publish manually

```sh
NPM_TOKEN=your_token bin/publish-npm
```
