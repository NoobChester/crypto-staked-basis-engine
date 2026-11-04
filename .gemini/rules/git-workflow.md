# Autonomous Git Management Workflow

You have full authority and responsibility to autonomously manage Git operations in this repository. Follow this standardized lifecycle on every task:

---

## 1. Pre-Task Inspection & Branching
- **Check Status**: Always run `git status` before touching files to ensure a clean working tree.
- **Identity Check**: Ensure `user.name` and `user.email` are configured locally (`git config user.name`, `git config user.email`) so commits execute cleanly.
- **Branch Strategy**:
  - For non-trivial modifications, bug fixes, or feature additions, create and switch to a descriptive branch:
    ```bash
    git checkout -b feat/<short-topic>
    # or
    git checkout -b fix/<short-topic>
    ```
  - For tiny documentation tweaks or minor typo fixes, committing directly to `main` is permitted.

---

## 2. Iteration & Self-Review
- Make modular, focused changes.
- **Review Diff**: Before staging, run `git diff` to review all modified lines.
- **Verify Cleanliness**: Ensure no extraneous debug logs, temporary scratch files, or unwanted formatting changes are included.

---

## 3. Verification Gate (Test Before Commit)
- **Run Verification**: Execute the project's test suite or validation checks (e.g., `npm test`, linter, or manual verification script) before staging changes.
- **Strict Invariant**: Never commit code that breaks existing tests or calculations.
- **Rollback on Failure**: If an experimental approach fails and cannot be cleanly remedied, roll back modifications rather than leaving the repository in a corrupted state:
  ```bash
  git restore .
  # or to discard untracked scratch files:
  git clean -fd
  ```

---

## 4. Atomic Staging & Conventional Commits
- **Targeted Staging**: Stage only modified files that pertain directly to the task. Avoid blind `git add .` when unrelated untracked files are present.
  ```bash
  git add <path/to/file1> <path/to/file2>
  ```
- **Commit Messages**: Follow the Conventional Commits specification:
  - `feat: <description>` — New feature, preset, or capability
  - `fix: <description>` — Bug fix, formula correction, or edge-case handling
  - `refactor: <description>` — Code restructuring without logic changes
  - `test: <description>` — Adding or updating test cases
  - `perf: <description>` — Performance or rendering optimization
  - `chore: <description>` — Tooling, config, dependencies, or `.gitignore`
  - `docs: <description>` — Documentation or markdown updates
- Write imperative, concise commit subjects (e.g., `feat: add Babylon LBTC collateral preset`).

---

## 5. Merging & Cleanup
- Once verification is complete and the commit is created on the feature branch:
  ```bash
  git checkout main
  git merge --ff-only feat/<short-topic>
  git branch -d feat/<short-topic>
  ```
- Report the commit hash and a brief summary of committed changes in your response.

---

## 6. Safety Guardrails
- **Never bypass hooks**: Do not use `--no-verify`.
- **Never force-push**: Never use `git push --force`.
- **Never commit secrets**: Verify that `.env`, private keys, API tokens, and credentials are never staged or committed. Ensure `.gitignore` is maintained.
- **Preserve User Work**: Never run destructive commands (`git reset --hard`, `git clean -f`) on uncommitted files created by the user without explicit confirmation.

