# Day 01: Setup & Baseline (Diagnostic)

## 1. Warm-up Quiz Results
- **Score:** 20/20 (Detailed explanations reviewed)
- **Key Insight:** Розуміння V8 та Event Loop на базовому рівні зафіксовано.

## 2. Environment & Tooling
- **Node.js:** v23.9.0
- **npm:** 11.7.0

## 3. Coding: Minimal HTTP Server
### Evidence (CURL Logs)
```bash
# GET /health -> 200 OK
HTTP/1.1 200 OK
{"status":"ok"}

# POST /echo (Valid JSON) -> 200 OK
HTTP/1.1 200 OK
{"message":"hello"}

# POST /echo (Invalid JSON) -> 400 Bad Request
HTTP/1.1 400 Bad Request
{"error":"Invalid JSON"}