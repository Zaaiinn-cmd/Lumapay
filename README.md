
# LumaPay

> Stablecoin-powered payments for the global internet.

LumaPay is a web application that allows users to fund a virtual USD card using stablecoins and pay for global subscriptions such as ChatGPT, Claude, Netflix, GitHub, and more.

Our goal is to make international subscriptions accessible to users who face payment restrictions, card declines, or limited access to global payment infrastructure.

---

## Problem

Millions of users struggle to pay for global products and services due to:

- Card declines
- Geographic restrictions
- Limited access to international payment methods
- Difficulty accessing USD-denominated payment instruments

As a result, users are unable to consistently pay for tools they rely on daily.

Examples include:

- ChatGPT
- Claude
- Netflix
- GitHub
- Spotify
- Vercel

---

## Solution

LumaPay provides:

- Stablecoin funding (USDT / USDC)
- Virtual USD card issuance
- Subscription-friendly payment infrastructure
- Transparent transaction fees
- Clean and simple user experience

Users fund their account with stablecoins and spend through a virtual card anywhere standard card payments are accepted.

---

## MVP Scope

### Stage 1
- Landing page
- Waitlist signup
- Dashboard UI
- Virtual card UI
- Transaction history UI
- Subscription management UI

### Stage 2
- Solana deposits
- USDT support
- USDC support
- Internal USD ledger

### Stage 3
- Card issuance integration
- Payment authorization
- Balance tracking

### Stage 4
- Subscription detection
- Payment notifications
- Spending analytics

---

## Revenue Model

LumaPay charges:

- $0.50 per successful transaction

No fees are charged for:

- Deposits
- Failed transactions
- Declined payments

---

## User Flow

```text
Deposit USDT/USDC
        ↓
Receive USD Balance
        ↓
Generate Virtual Card
        ↓
Pay For Global Subscriptions
        ↓
Successful Payment
        ↓
LumaPay earns $0.50 fee
```

---

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

### Backend

- Node.js
- TypeScript

### Blockchain

- Solana
- USDT
- USDC

### Infrastructure

- GitHub
- Vercel

---

## Project Structure

```text
lumapay/
│
├── app/
├── components/
├── lib/
├── services/
│   ├── solana/
│   ├── ledger/
│   └── payments/
│
├── public/
├── styles/
├── docs/
└── README.md
```

---

## Roadmap

### Current Status


🟢 Planning & Design

🟢 Stage 1 UI Development

🟢 Landing Page

🟢 Dashboard

🟢 Deposit Flow

🟢 Solana Integration


### Upcoming

- [ ] Card Issuance Integration
- [ ] Private Beta

---

## Vision

We believe stablecoins should be useful beyond trading.

LumaPay aims to become the easiest way for anyone to pay for global digital services using stablecoins.

---

## Disclaimer

LumaPay is currently under development and not available for production use.
>>>>>>> 1c4d577465866ee2988ca0a261265256695efbfe
