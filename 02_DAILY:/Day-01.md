# Day-01 — Baseline + Setup + Diagnostics

## Meta
- Date: 2026-04-14
- Planned time: 2–3h
- Actual time spent: __h __m
- Energy (1–5): _
- Repo/branch: (link)

## Warm-up quiz (yesterday review)
1) Node.js runtime: Чим Node.js відрізняється від браузерного JavaScript?
Answer: 
2) Event Loop: Що таке "фази" івент-лупу (дуже коротко)?
Answer: 
3) Concurrency: Node.js однопотокова чи багатопотокова?
Answer: 
4) Promises: Чим Promise.all відрізняється від Promise.allSettled?
Answer: 
5) HTTP: Що таке Headers в HTTP запиті і навіщо вони?
Answer: 
6) Status Codes: Що означає серія кодів 4xx та 5xx?
Answer: 
7) REST: Що робить метод PATCH і чим він відрізняється від PUT?
Answer: 
8) NPM: Різниця між dependencies та devDependencies?
Answer: 
9) Git: Що робить команда git commit --amend?
Answer: 
10) TypeScript: Що таке interface і чим він відрізняється від type?
Answer: 

## Focused theory notes
- Key terms (EN): event loop, microtask, macrotask, HTTP semantics, REST
- My 5-sentence summary:

## Coding task
### Goal
Create a repo + minimal Node HTTP server (no frameworks).

### Requirements
- `GET /health` → 200 + JSON `{ "ok": true }`
- `POST /echo` → 200 + echoes JSON body (validate JSON parse error → 400)
- Use `node:http` module.

## Validation evidence
### Outputs
(paste curl results here)

## Reflection
- Wins:
- Blockers:
- Confidence (0/1/2):