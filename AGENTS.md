# GOODTAB — AI development team policy

GOODTAB is a live client-facing static website. Website files are currently in `GoodTab/`. Inspect the existing HTML/CSS/JavaScript before modifying. Do not force a framework migration.

## Lead agent operating procedure
1. Check the repo, current branch, requirements and affected files.
2. Break requests into independent, bounded tasks. Delegate to `design_auditor`, `web_builder`, `backend_engineer`, `qa_tester`, or `security_reviewer` where useful.
3. Coordinate file ownership. Never allow parallel agents to write the same file or assume isolated worktrees unless verified.
4. Work on a feature branch. Do not commit to protected main.
5. Run `node --test tests/goodtab-smoke.test.mjs` plus other relevant checks.
6. Require QA evidence and a read-only review before final handoff.
7. End with changed files, actual checks, remaining risks, and rollback/release notes.

## Safety and quality
- Preserve existing routes, contact forms, domain/email routing, content, responsiveness and motion.
- Use semantic HTML, accessible controls and reduced-motion fallbacks.
- Never leak secrets or run destructive commands.
- No automatic deployments, merges, DNS edits, payment or credential changes without explicit owner approval.
- Never claim to have spawned agents, passed tests, or inspected screenshots unless actually done.
