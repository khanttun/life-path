# LifeSoft AI Platform Features

This document outlines all major features and capabilities of the LifeSoft AI decision intelligence platform for at‑risk youth in Thailand.

---

## 🚀 Overview

LifeSoft AI is a web-based simulation and analytics system designed to help young people visualize career and life decisions before they commit.  It integrates AI, legal protection checks, Royal Initiative pathways, scholarship matching, and stress‑testing into a cohesive youth‑protection ecosystem.

The platform consists of the following high‑level modules:

1. **Landing / Marketing site** – front‑end hero, feature summary, impact statistics.
2. **Simulator** – three‑step wizard (profile → scenario tree → results).
3. **Dashboard** – personal hub with saved simulations and quick actions.
4. **Scenario comparison** – side‑by-side analysis of two life paths.
5. **Results page** – in‑depth projections, charts, risk breakdown and insights.
6. **Opportunities hub** – resume gap analysis, province opportunity map, smart path matcher (premium locked sections).
7. **Premium tools** – CV roast, internship matcher, mock interviews and shadow application generator behind a paywall.
8. **Royal Path engine** – AI‑curated safe career alternatives based on royal projects.
9. **Scholarship matcher** – filtered list of grants, vouchers and emergency funds.
10. **Utility components** – reusable UI elements, charts and badges shared across the app.

---

## 🧩 Core Simulator Features

### 1. Profile & Risk Assessment
- Data entry form (age, education, income, location, contract type etc.)
- **Opportunity Score** & **Stability Index** computed client‑side
- **Legal Guardian** contract safety checker with warnings/advice
- Real‑time risk gauge and prompt to continue to scenario construction

### 2. Interactive Decision Tree
- Drag‑and‑drop life events categorized as *education*, *career*, *location*, *risk* or *agriculture*
- Pre‑defined events include degrees, jobs, relocation, informal work, starting a business or farm
- Stress‑test toggle (job loss, medical emergency, recession) that modifies income/debt/risk
- Each node affects income, debt and risk scores, updating Opportunity/Stability dynamically

### 3. Intelligence Dashboard (within simulation flow)
- Animated risk gauges for legal protection, mobility and resilience
- Regional heatmap showing demand and safety per occupation
- AI‑powered recommendations and **Royal Path** alternatives
- Micro‑scholarship matching when high‑risk scenarios detected

---

## 📊 Dashboard & Navigation

- **Decision Intelligence Hub** landing for signed‑in users
- Quick overview cards for best opportunity/stability, simulation count, legal status
- Quick‑action links to start a new simulation or jump to Royal Path, Scholarships, Compare
- List of recent simulations with summary data and risk badges

---

## 🔍 Compare Paths

- Side‑by‑side metric panels for two saved scenarios
- Versus metrics (income, savings, debt, opportunity, stability, mobility, legal protection, stress resilience)
- 10‑year projection chart combining both scenarios
- AI recommendation badges identify the safer / higher‑opportunity option
- Save and share comparisons

---

## 📈 Results & Insights

- **10‑Year Financial Projection** chart (income, debt, savings) with stress‑test toggle
- **Heatmap** of Thailand demand by region for selected career
- **Risk score breakdown** (financial, legal, mobility, stability)
- **Life Stability Pulse** animated gauge showing volatility over time
- **AI Recommendation Badge** offering tailored advice
- **Premium Insights** section for subscribed users

---

## 🌱 Royal Path Engine

- Curated list of low‑risk careers inspired by Her Majesty’s Royal Projects
- Examples: sustainable organic farming, traditional crafts, community health worker, food enterprise, sustainable fashion
- Each pathway includes:
  - startup cost, monthly income, growth timeline
  - regional availability, required skills
  - opportunity & stability scores, income projection, success rate
  - tags for mentorship/government backing
- Users can favourite or explore details and jump back to simulator

---

## 🎓 Scholarship Matching

- Extensive catalogue of scholarships, grants and emergency funds
- Filterable by category (royal, government, vocational, digital, emergency, etc.)
- Match score computed against user profile
- Urgency badge for closing deadlines
- Detailed descriptions, eligibility, amount and provider info

---

## 🧱 UI & Utility Components

Reusable building blocks used throughout the app include:

| Component | Purpose |
|-----------|---------|
| `OpportunityScore` | Displays composite score with trend indicators |
| `RiskGauge` / `RiskBadge` | Circular gauges & badges for risk metrics |
| `AIRecommendationBadge` | Highlights AI‑generated advice |
| `ThailandHeatmap` | Interactive regional demand map |
| `LifeStabilityPulse` | Animated stability chart |
| `PremiumInsights` | Paywalled analytics section |
| `Navbar`, `Footer` | Global navigation elements |
| Extensive set of UI primitives under `components/ui/*` (button, card, form controls, dialog, tabs, etc.) |

Utility hooks: `use-mobile`, `use-toast` and helper functions in `lib/utils.ts`.

---

## 📁 App Structure & Routes

```
/             Landing page
/profile     Profile & risk assessment wizard
/scenario    Decision tree simulator
/results     Outcome analysis & charts
/dashboard   User hub for simulations
/compare     Compare two paths
/royal-path  Royal Path engine
/scholarships Scholarship matcher
```

---

## 🎯 Social Impact & Metrics

- Protects **80,000+ youth** from informal labor exploitation
- Supports **12+ career paths** aligned with Royal Initiatives
- **95% prediction accuracy** in risk modeling
- Full client‑side processing ensures data privacy

LifeSoft AI integrates educational technology and legal assistance under a compact, accessible UI to empower vulnerable young people with actionable decision intelligence.

---

*Document auto‑generated from source code (February 27 2026).*