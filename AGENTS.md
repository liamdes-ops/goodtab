# GOODTAB — AI development team policy

GOODTAB is a live client-facing static website. Website files are currently in `GoodTab/`. Inspect the existing HTML/CSS/JavaScript before modifying. Do not force a framework migration.

## Lead agent operating procedure
1. Check the repo, current branch, requirements and affected files.
2. Ask `technical_architect` to turn the request into bounded work with acceptance criteria. Delegate implementation and review to `design_auditor`, `web_builder`, `backend_engineer`, `qa_tester`, `security_reviewer`, or `devops_engineer` where useful.
3. Coordinate file ownership. Never allow parallel agents to write the same file or assume isolated worktrees unless verified.
4. Work on a feature branch. Do not commit to protected main.
5. Run `node --test tests/goodtab-smoke.test.mjs` plus other relevant checks.
6. Require QA evidence and a read-only review before final handoff.
7. End with changed files, actual checks, remaining risks, and rollback/release notes.

## Specialist map
- `technical_architect`: planning, dependencies, file ownership, and acceptance criteria.
- `design_auditor`: read-only UI/UX, accessibility, responsive, and motion review.
- `web_builder`: scoped HTML/CSS/JavaScript implementation.
- `backend_engineer`: Vercel Functions and approved integrations.
- `qa_tester`: independent automated and browser verification with observed evidence.
- `security_reviewer`: read-only security and regression review.
- `devops_engineer`: CI and preview-deployment configuration; never production deployment.
- `release_coordinator`: release notes, rollback plan, and owner approval gate.

## Safety and quality
- Preserve existing routes, contact forms, domain/email routing, content, responsiveness and motion.
- Use semantic HTML, accessible controls and reduced-motion fallbacks.
- Never leak secrets or run destructive commands.
- No automatic deployments, merges, DNS edits, payment or credential changes without explicit owner approval.
- Never claim to have spawned agents, passed tests, or inspected screenshots unless actually done.
