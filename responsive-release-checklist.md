# USCO Responsive Release Checklist

This file is the release-facing QA document for responsiveness on the USCO website.

It serves two purposes:

- a human checklist for visual/device validation
- a place to record the result of automated repo checks

## Device Targets

Run checks against these widths before shipping layout changes:

| Class | Size |
| --- | --- |
| Small phone | `320 x 568` |
| iPhone 13 Mini class | `375 x 812` |
| iPhone 13 / 14 class | `390 x 844` |
| Samsung S21 Ultra class | `412 x 915` |
| iPad / small tablet portrait | `768 x 1024` |
| Surface Pro 7 portrait | `912 x 1368` |
| iPad Pro / Surface landscape | `1024 x 1366` |
| Common laptop | `1366 x 768` |
| Large laptop | `1440 x 900+` |

## Release Flow

1. Run `powershell -ExecutionPolicy Bypass -File .\scripts\responsive-check.ps1`
2. Open the generated markdown report in `reports\responsive\`
3. Complete the manual device checks below
4. Mark each page `Pass`, `Fail`, or `Needs follow-up`

## Manual QA Matrix

### Global

| Check | Status | Notes |
| --- | --- | --- |
| No horizontal scrollbar on any major page | Pending |  |
| Header stays readable over media/backgrounds | Pending |  |
| Mobile menu opens fully and is not clipped | Pending |  |
| Footer stays inside viewport width | Pending |  |
| Text wraps instead of overflowing cards/panels | Pending |  |
| Buttons remain tappable with safe spacing | Pending |  |
| Decorative motion does not block reading/scrolling | Pending |  |

### Home

| Check | Status | Notes |
| --- | --- | --- |
| Hero is full-bleed on phone without boxed framing | Pending |  |
| Desktop hero remains full-width and unboxed | Pending |  |
| Hero lockup remains readable across widths | Pending |  |
| Section cards stack cleanly on phone/tablet | Pending |  |
| Review strip does not create page overflow | Pending |  |

### Menu

| Check | Status | Notes |
| --- | --- | --- |
| Category tabs wrap cleanly | Pending |  |
| Menu cards keep text inside boundaries | Pending |  |
| Long titles wrap safely | Pending |  |
| Descriptions remain readable on tablet widths | Pending |  |
| Layout drops to safer single-column before crowding | Pending |  |

### Gallery

| Check | Status | Notes |
| --- | --- | --- |
| Instagram embeds stay inside layout width | Pending |  |
| Cards stack without clipping | Pending |  |
| Embedded media does not cause side-scroll | Pending |  |

### Find Us

| Check | Status | Notes |
| --- | --- | --- |
| Address, hours, and CTA stay readable on phone | Pending |  |
| Location block does not dominate small viewports | Pending |  |

## Automated Checks

These are executed by `scripts\responsive-check.ps1`.

| Check | Required |
| --- | --- |
| `npm run lint` | Yes |
| `npm run build` | Yes |
| Home route returns success | Yes |
| Menu route returns success | Yes |
| Gallery route returns success | Yes |
| Find Us route returns success | Yes |

## Latest Recorded Run

### 2026-05-11

Scope:
- Created the structured responsive QA file
- Added an executable PowerShell QA runner
- Executed automated checks for the current build
- Included the recent `Menu` tablet overflow fix in the recorded baseline

Structured status:

| Area | Status | Notes |
| --- | --- | --- |
| Home | Pass by code audit | Current home layout is stable in code, but phone hero still benefits from visual QA in device mode |
| Menu | Pass | Single-column until `xl`; inner split deferred to larger screens to protect Surface Pro widths |
| Gallery | Pass by code audit | Instagram embeds are contained in the current layout |
| Find Us | Pass by code audit | No current overflow risk found in code |
| Header / mobile menu | Needs follow-up | This has regressed before and should be verified on real device sizes |
| Footer | Pass by code audit | No current overflow issue found |
| `npm run lint` | Pass | Verified |
| `npm run build` | Pass | Verified on `Next.js 16.2.4` |

Automated report:
- See the newest file under `reports\responsive\`

Risk notes:
- Highest manual QA priority remains the mobile header drawer
- Highest layout risk previously was the `Menu` page on Surface-class tablet widths; current baseline includes the fix
