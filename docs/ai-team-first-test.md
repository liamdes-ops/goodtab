# AI team first working test
1. Check out a non-main branch.
2. Run `node --test tests/goodtab-smoke.test.mjs`.
3. Open Codex in repo root and say:

Lead agent: Spawn design_auditor to review existing homepage usability and qa_tester to independently run the Node smoke test. Give each agent nonoverlapping read-only tasks, wait for their actual results, and report commands/output. Then ask security_reviewer for an independent review of the proposed changes. Do not touch the live site, deploy, merge, or edit any production application source. If agent spawning is unavailable, state this instead of simulating results.

A successful test has two distinct genuine agent reports and observed test output. Smoke tests validate document structure and asset references only, not browser visuals or deployed function.
