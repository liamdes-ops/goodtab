# AI team first working test
1. Check out a non-main branch.
2. Run `node --test tests/goodtab-smoke.test.mjs`.
3. Open Codex in repo root and say:

Lead agent: Spawn design_auditor to review existing homepage usability and qa_tester to independently run the Node smoke test. Give each agent nonoverlapping read-only tasks, wait for their actual results, and report commands/output. Then ask security_reviewer for an independent review of the proposed changes. Do not touch the live site, deploy, merge, or edit any production application source. If agent spawning is unavailable, state this instead of simulating results.

A successful test has two distinct genuine agent reports and observed test output. Smoke tests validate document structure and asset references only, not browser visuals or deployed function.

## Observed run — 2026-10-19 (America/Los_Angeles)

The lead used the live multi-agent runtime with three non-overlapping read-only assignments:

- `design_auditor` reviewed `GoodTab/index.html`, `styles.css`, `home-motion.css`, and `script.js`. It reported six source-linked usability/accessibility findings and explicitly noted that no browser or screen-reader run occurred.
- `qa_tester` ran `node tests/goodtab-smoke.test.mjs`: 2 passed, 0 failed. It also ran `git diff --check`: exit 0, no output. An initial guessed path, `tests/smoke.test.js`, failed with `MODULE_NOT_FOUND`; that was an operator path error, not a product failure.
- `security_reviewer` reviewed the setup diff against `main` without editing application files.

The lead independently ran the documented command `node --test tests/goodtab-smoke.test.mjs`: 2 passed, 0 failed, and `git diff --check`: exit 0.

An additional installed-CLI test was attempted with Codex CLI `0.163.0-alpha.10.2`, `--strict-config`, and a read-only sandbox. Configuration loading and session creation succeeded, but the child shell failed with `CreateDesktopW failed for shared private desktop: 5`; no specialists or tests ran inside that CLI session. This failed attempt is retained as environment evidence and must not be described as a passing CLI orchestration test.
