## Phase 7 — Finalisation et Qualité

### Commit 108 — Chore: a11y error mode + dark mode decorator + autodocs

```bash
git add .storybook/preview.ts;git commit -S -m "chore(storybook): set a11y to error mode (WCAG 2.1 AA CI gate); add withTheme decorator for data-theme dark mode switching; add global autodocs tag"
```

### Commit 109 — Chore: autodocs defaultName in main.ts

```bash
git add .storybook/main.ts;git commit -S -m "chore(storybook): configure docs.defaultName='Documentation' in main.ts (Storybook v10 compatible)"
```

### Commit 110 — Feat: Chromatic config for visual regression testing

```bash
git add chromatic.config.ts;git commit -S -m "feat(ci): add chromatic.config.ts with TurboSnap (onlyChanged), 3 viewports (375/768/1440) and 0.2% diffThreshold"
```

### Commit 111 — Feat: Vitest addon setup (browser mode Playwright)

```bash
git add vite.config.ts .storybook/vitest.setup.ts;git commit -S -m "feat(test): configure @storybook/addon-vitest with setupFiles, Chromium headless provider and v8 coverage reporter (replaces deprecated storybook-test-runner)"
```

### Commit 112 — Feat: test scripts in package.json

```bash
git add package.json;git commit -S -m "feat(scripts): add pnpm test, test:ui and test:coverage commands targeting vitest --project=storybook"
```

### Commit 113 — Test: play() functions on Button stories

```bash
git add src/components/atoms/Button/Button.stories.tsx;git commit -S -m "test(atoms): add KeyboardClick, DisabledNotClickable and LoadingA11y play() functions to Button stories using userEvent + expect from storybook/test"
```

### Commit 114 — Test: play() functions on Input stories

```bash
git add src/components/atoms/Input/Input.stories.tsx;git commit -S -m "test(atoms): add TypeText, ErrorState and DisabledState play() functions to Input stories; verify aria-invalid, aria-disabled and value binding"
```

### Commit 115 — Test: play() functions on Modal stories

```bash
git add src/components/organisms/Modal/Modal.stories.tsx;git commit -S -m "test(organisms): add AccessibleDialog and CloseOnEscape play() functions to Modal stories; verify role=dialog, aria-modal and heading visibility"
```

### Commit 116 — Docs: CONTRIBUTING.md guide de contribution

```bash
git add CONTRIBUTING.md;git commit -S -m "docs: add CONTRIBUTING.md with full contribution guide (architecture, tokens, conventions, IconSize, a11y, dark mode, play functions, PR process, scripts table)"
```

### Commit 117 — Chore: Phase 7 complète — all tasks [x]

```bash
git add 01_CONTEXT_PLAN.md;git commit -S -m "chore: mark all Phase 7 tasks as completed [x] in 01_CONTEXT_PLAN.md — project plan 100% done (phases 0→7)"
```