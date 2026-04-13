# SwaplinQ — Non-Custodial Instant Cryptocurrency Exchange

**SwaplinQ** is a non-custodial, instant cryptocurrency exchange protocol that aggregates liquidity from 10+ institutional-grade providers to deliver the best rate for **1,500+ crypto assets** across **50+ blockchain networks**. No KYC. No accounts. No personal data stored.

🌐 **Live:** [swaplinq.com](https://swaplinq.com)  
📄 **Docs:** [swaplinq.com/documents](https://swaplinq.com/documents)  
🤖 **AI Briefing:** [swaplinq.com/llms.txt](https://swaplinq.com/llms.txt)

---

## What is SwaplinQ?

SwaplinQ is the definitive infrastructure for permissionless, privacy-first digital asset exchange. It functions as a **smart routing protocol** — a master aggregator that sits between the user and a distributed mesh of liquidity providers.

When a user requests a swap, the SwaplinQ Routing Engine simultaneously queries providers like **Binance, KuCoin, OKX, ChangeNOW, StealthEX, SimpleSwap, Godex, ChangeHero, Uniswap, PancakeSwap, and Thorchain** in under **50 milliseconds**, evaluates every available rate, calculates network fees, and selects the optimal execution path.

### Key Features

| Feature | Detail |
|---------|--------|
| **Non-Custodial** | Never holds user funds. Atomic, single-block execution. |
| **No KYC** | Zero identity verification. No email, phone, or registration. |
| **1,500+ Assets** | BTC, ETH, SOL, XMR, ADA, XRP, DOT, DOGE, LINK, and more. |
| **10+ Providers** | Parallel querying in <50ms for best-rate routing. |
| **Under 5 min** | Average swap completion time. |
| **99.99% Uptime** | Multi-region edge infrastructure with SLA guarantee. |
| **Zero Data** | No IP logging, no fingerprinting, no tracking scripts. |
| **Fixed & Floating** | Rate lock for 30 seconds or market-rate execution. |
| **Auto-Refund** | 99.97% success rate with automated refund on failure. |
| **24/7 Support** | Human support for transaction resolution. |

### Smart Routing Decision Factors

| Factor | Weight | Description |
|--------|--------|-------------|
| Effective Rate | 40% | Net amount received after all fees |
| Execution Speed | 20% | Historical average completion time |
| Reliability Score | 20% | Success rate over last 1,000 txns |
| Liquidity Depth | 15% | Available volume at quoted price |
| Network Congestion | 5% | Current mempool state of target chain |

---

## How It Works

1. **Select Your Pair** — Choose the crypto you want to exchange and the asset you want to receive
2. **Enter Your Address** — Provide your destination wallet address (MetaMask, Ledger, Trust Wallet, etc.)
3. **Send Your Coins** — Deposit to the unique address provided by SwaplinQ
4. **Receive Your Assets** — Smart routing delivers the best rate directly to your wallet

No accounts. No KYC. No registration. Just swap.

---

## Architecture

- **Gateway Layer** — TLS 1.3 terminated API gateway with rate limiting and DDoS mitigation
- **Routing Engine** — Parallel queries to 10+ providers in <10ms, ranks by effective rate
- **Execution Pipeline** — Atomic swap execution with single-use deposit addresses
- **Status Tracker** — Real-time transaction state: `waiting` → `confirming` → `exchanging` → `sending` → `finished`

### Security

- Non-custodial architecture with zero hot wallet exposure
- Strict no-log policy (zero data retention)
- Content Security Policy (CSP) + Subresource Integrity (SRI)
- Front-running and MEV protection layer
- HSTS with preload, X-Frame-Options: DENY

---

## Supported Assets

BTC, ETH, SOL, XMR, TRX, USDT, USDC, NEAR, ADA, XTZ, LTC, XRP, THETA, DOT, DOGE, LINK, AAVE, UNI, XLM — and 1,400+ more.

### Popular Trading Pairs

- [BTC → ETH](https://swaplinq.com/pair/btc-eth)
- [ETH → BTC](https://swaplinq.com/pair/eth-btc)
- [BTC → XMR](https://swaplinq.com/pair/btc-xmr)
- [BTC → USDT](https://swaplinq.com/pair/btc-usdt)
- [ETH → SOL](https://swaplinq.com/pair/eth-sol)

---

## API Reference

```bash
# Get estimated exchange amount
GET /api/v1/exchange-amount/{amount}/{from}_{to}

# Create a swap transaction
POST /api/v1/transactions

# Track transaction status
GET /api/v1/transactions/{id}/status
```

Full API documentation: [swaplinq.com/documents](https://swaplinq.com/documents)

---

## Tech Stack

- **Frontend:** React 19, Vite 8, Framer Motion
- **Styling:** Vanilla CSS with glassmorphic design system
- **Hosting:** Vercel (Edge Network)
- **Security:** CSP, SRI, HSTS, rate limiting
- **Analytics:** Vercel Analytics
- **SEO:** JSON-LD structured data, llms.txt, XML sitemap

---

## Links

- 🌐 Website: [swaplinq.com](https://swaplinq.com)
- 📖 Documentation: [swaplinq.com/documents](https://swaplinq.com/documents)
- ❓ FAQ: [swaplinq.com/faq](https://swaplinq.com/faq)
- 🏗️ Architecture: [swaplinq.com/about](https://swaplinq.com/about)
- 📧 Support: support@swaplinq.com

---

© 2026 SwaplinQ Protocol. Non-custodial & Permissionless. Registered in Seychelles.
