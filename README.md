# Chittivalasa Rakesh — Portfolio Website

A personal portfolio website for **Chittivalasa Rakesh** (Associate Software Engineer / Angular Developer at Accenture, working on the AT&T client engagement).

Built according to strict Awwwards-style, quiet monochrome aesthetics (white, black, and gray only), lightweight performance (~65 kB gzipped transfer), and accessible Angular architecture.

---

## 1. Quick Start

### Prerequisites
- **Node.js**: v20+ (tested on Node.js v24.16.0)
- **npm**: v10+ (tested on npm 11.13.0)

### Run locally
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm start
# or
npx ng serve
```

Visit `http://localhost:4200` in your browser.

### Production Build
```bash
npm run build
```
The output will be generated under `dist/portfolio-app/`.

---

## 2. Sections Architecture

| Section | Component | Description & Interaction |
| :--- | :--- | :--- |
| **Navigation** | `NavigationComponent` | Initials mark (360° spin on hover), smooth Lenis scroll, active section indicator pill, scroll-progress bar, fullscreen mobile menu. |
| **01. Hero** | `HeroComponent` | Centred looping video with multiply blend mode, ghost typography, role kicker, sound controls (▶/❚❚) with autoplay unlock and intersection pause. |
| **02. About** | `AboutComponent` | Three-column layout featuring an interactive hanging lanyard ID card (3D flip front/back, barcode, hologram, and bio details). |
| **03. Skills** | `SkillsComponent` | "Periodic Table of My Stack" with atomic numbering, family filter chips, diagonal entrance, and sticky element inspector panel. |
| **04. Selected Work** | `WorkComponent` | Expanding accordion gallery with folded spines, technical highlights, tech badges, and illustrative grayscale mini-UIs. |
| **05. Certifications** | `CertificationsComponent` | Sticky count heading with ink-flood hover rows and direct credential links. |
| **06. Experience** | `ExperienceComponent` | Combined timeline path uniting education (MCA & B.Sc CS) and industry experience (Accenture AT&T + 3 internships). |
| **07. Achievements** | `AchievementsComponent` | Horizontal metric gallery highlighting verified numbers (-25% load time, +50% user satisfaction, CGPAs, and counts). |
| **08. Contact** | `ContactComponent` | One-click copy email button, direct mobile link, social links, rotating circular badge, and clean footer. |

---

## 3. Data Source of Truth

All data is strictly typed and centralized in [`src/app/core/data.ts`](src/app/core/data.ts):
- `PROFILE`: Personal contact info, links, summaries, and ID metadata.
- `SKILLS`: Periodic table elements, families, and project tags.
- `PROJECTS`: Verified project work and technical architecture.
- `EXPERIENCE_TIMELINE`: Education and employment history.
- `CERTIFICATIONS`: Verified certifications with LinkedIn/credential links.
- `ACHIEVEMENTS`: Quantifiable performance metrics.

---

## 4. Hero Video Pipeline Script

The repository includes [`scripts/build-hero-assets.py`](scripts/build-hero-assets.py) which can process new raw intro video recordings into:
- Seamless cross-faded loop
- Pure white background levelling (`colorlevels=rimax=0.98:gimax=0.98:bimax=0.98`)
- High-efficiency `hero.mp4` (H.264 / AAC) and `hero.webm` (VP9 / Opus)

Run:
```bash
python scripts/build-hero-assets.py <path_to_raw_video>
```

---

## 5. Technology Stack & Dependencies

- **Framework**: Angular 22 (Standalone components, Signals, OnPush change detection)
- **Styling**: Tailwind CSS v4 + Custom Design System CSS
- **Smooth Scroll**: Lenis (outside Angular zone via `ScrollService`)
- **No external CDN scripts or runtime tracking**: Self-contained assets in `public/`
