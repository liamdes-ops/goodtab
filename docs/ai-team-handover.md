# GOODTAB AI team handover

## Start the team

Open Codex at the repository root and describe the feature in plain language. Start with this sentence when you want explicit orchestration:

> Lead agent: read `AGENTS.md`, ask `technical_architect` for a bounded plan, delegate independent implementation and review tasks to the named specialists, require `qa_tester` and `security_reviewer` evidence, and stop before merge or production deployment for my approval.

The lead must use a feature branch or isolated worktree, coordinate file ownership, run the repository checks, and provide a reviewable diff or draft pull request.

## Current setup

| Area | Status |
| --- | --- |
| Repository guidance | `AGENTS.md` defines orchestration and safety gates. |
| Agent definitions | Eight specialists are defined under `.codex/agents/`. |
| Concurrency | `.codex/config.toml` enables agents with a four-thread session limit. |
| CI | `.github/workflows/goodtab-smoke.yml` runs the static smoke test on pull requests. |
| Required local check | `node --test tests/goodtab-smoke.test.mjs` |
| Production gate | Merge and production deployment always require owner approval. |

## Evidence rules

Every handoff must list the commands actually run, their outcomes, changed files, unresolved risks, and rollback notes. Browser, deployment, agent, or test results may be reported only when observed during that run.

## Roblox boundary

Roblox work does not belong in this web repository. Keep Roblox gameplay, UI, 3D/animation, and QA agent definitions in the future private Roblox source repository after its existing Studio project has been mapped and preserved. Use only the LolMyBrainrot test place for setup and verification; never modify or publish BrainrotBazaar during setup.
