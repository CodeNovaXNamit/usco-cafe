# USCO Responsive Automated Report

- Timestamp: 2026-05-11 19:52:29
- Repo: "D:\6. Money\Websites\Food Cafe\USCO\2"

## Command Results

| Check | Status | Exit Code |
| --- | --- | --- |
| Lint | Pass | 0 |
| Build | Pass | 0 |

## Route Results

| Route | Status | HTTP |
| --- | --- | --- |
| / | Pass | 200 |
| /menu | Pass | 200 |
| /gallery | Pass | 200 |
| /find-us | Pass | 200 |

## Raw Command Output

### Lint

```text
> usco-cafe@0.1.0 lint
> eslint
```

### Build

```text
> usco-cafe@0.1.0 build
> next build

? Next.js 16.2.4 (Turbopack)

  Creating an optimized production build ...
? Compiled successfully in 2.0s
  Running TypeScript ...
  Finished TypeScript in 1961ms ...
  Collecting page data using 16 workers ...
  Generating static pages using 16 workers (0/14) ...
  Generating static pages using 16 workers (3/14) 
  Generating static pages using 16 workers (6/14) 
  Generating static pages using 16 workers (10/14) 
? Generating static pages using 16 workers (14/14) in 633ms
  Finalizing page optimization ...

Route (app)
+ ? /
+ ? /_not-found
+ ? /admin
+ ? /admin/login
+ ƒ /api/admin/logs/prices
+ ƒ /api/auth/login
+ ƒ /api/auth/logout
+ ƒ /api/frames/[index]
+ ƒ /api/gallery
+ ƒ /api/menu
+ ? /find-us
+ ? /gallery
+ ? /icon.jpg
+ ? /menu


?  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

