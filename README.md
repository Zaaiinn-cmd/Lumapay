# LumaPay

**Stablecoin-powered payments for the global internet.**

LumaPay is a web application that allows users to fund a virtual USD card using stablecoins and pay for global subscriptions such as ChatGPT, Claude, Netflix, GitHub, Spotify, and more.

Our goal is to make international subscriptions accessible to users who face payment restrictions, card declines, or limited access to global payment infrastructure.

---

## Problem

Millions of users struggle to pay for global products and services due to:

- Card declines
- Geographic restrictions
- Limited access to international payment methods
- Difficulty accessing USD-denominated payment instruments

As a result, users are unable to consistently pay for tools they rely on every day.

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

- Stablecoin funding (USDC / USDT)
- Virtual USD card issuance
- Subscription-friendly payment infrastructure
- Transparent transaction fees
- Clean and simple user experience

Users fund their account with stablecoins and spend through a virtual card anywhere standard card payments are accepted.

---

## MVP Scope

### Stage 1

- ✅ Landing page
- ✅ Authentication
- ✅ Dashboard
- ✅ Virtual card UI
- ✅ Transaction history
- ✅ Subscription management

### Stage 2

- ✅ Solana deposit addresses
- ✅ USDC support (foundation)
- ✅ USDT support (foundation)
- ✅ Internal USD wallet
- 🚧 Blockchain deposit processor

### Stage 3

- ⏳ Card issuance integration
- ⏳ Payment authorization
- ⏳ Balance synchronization

### Stage 4

- ⏳ Subscription detection
- ⏳ Payment notifications
- ⏳ Spending analytics

---

## Revenue Model

LumaPay charges:

- **$0.50** per successful transaction

No fees are charged for:

- Deposits
- Failed transactions
- Declined payments

---

## User Flow

```text
Deposit USDC / USDT
        ↓
Receive USD Balance
        ↓
Generate Virtual Card
        ↓
Pay for Global Subscriptions
        ↓
Successful Payment
        ↓
LumaPay earns $0.50
```

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

### Backend

- Node.js
- Next.js API Routes
- Prisma ORM
- PostgreSQL (Neon)
- Clerk Authentication

### Blockchain

- Solana
- Solana Web3.js
- QuickNode RPC
- USDC
- USDT

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
│   ├── blockchain/
│   ├── prisma/
│   └── ...
├── prisma/
├── public/
├── screenshots/
└── README.md
```

---

## Roadmap

### Completed ✅

- Authentication
- Multi-user wallet system
- Dashboard
- Virtual cards
- Subscription management
- Spending analytics
- Deposit page
- Unique Solana deposit addresses
- QuickNode integration
- Blockchain listener architecture

### In Progress 🚧

- Automatic blockchain deposit processing
- SPL token verification
- Idempotent deposit crediting

### Upcoming

- Virtual card issuance
- Mainnet support
- Private beta

---

## Vision

We believe stablecoins should be useful beyond trading.

LumaPay aims to become the easiest way for anyone to pay for global digital services using stablecoins.

---

## Disclaimer

LumaPay is currently under development and is **not** available for production use.
