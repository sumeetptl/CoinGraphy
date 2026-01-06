## Product Description

**CoinGraphy** is a non‑custodial crypto companion for learners and active traders. It combines a portfolio tracker, futures trading journal, live market analytics, derivatives data, sentiment, and a coaching‑style copilot into one web app, with an India‑first but global‑ready experience.

Unlike an exchange, CoinGraphy does not hold funds or execute orders. Instead, it helps users **understand** their trading and risk:

- Track spot and futures positions in INR or USD via a global currency switch.
- Analyse performance with advanced metrics like win rate, expectancy, R:R, max drawdown, and execution discipline.
- Study markets with top‑coin data, derivatives (funding, open interest, liquidations), on‑chain style signals, and a Fear & Greed index.
- Learn core concepts (risk, journaling, tax basics, futures) and complete weekly reviews to build better trading habits over time.
- Chat with a floating **Markets Copilot** that explains metrics, reviews trades, and links directly to relevant views and learn modules.

CoinGraphy is built as a SaaS‑style frontend in React talking to a Django REST API, with third‑party data feeds such as CoinGecko (prices & fundamentals), CoinGlass (derivatives), a Fear & Greed provider (sentiment), and TradingView‑style charts.

---

### Dashboard

Main dashboard with global currency switch, portfolio summary, spot holdings, and futures stats.

![Dashboard](./screens/dashboard.png)

### Markets – Overview

Markets page showing the global market bar, Fear & Greed index card, and top coins list.

![Markets Overview](./screens/markets.png)

### Markets – Derivatives & On‑Chain

Derivatives tab with funding and open interest tables, plus the BTC/ETH on‑chain health panel and Today’s Insight card.

![Markets Derivatives](./screens/derivatives.png)

### Coin Detail

Coin detail page with TradingView‑style chart, fundamentals card, and rich info about the asset.

![Coin Detail](./screens/coindetail.png)

### Futures Journal & Performance

Futures journal view with open/closed trades, advanced performance metrics, and execution discipline insights.

![Futures Journal](./screens/futures.png)

### Stats Section

Comprehensive statistics dashboard displaying trading performance metrics, portfolio analytics, win rates, profit/loss charts, and risk management indicators with detailed breakdowns.

![Stats Section](./screens/stats.jpeg)

### Floating Markets Copilot

Floating copilot assistant open on top of a page, answering questions about markets, metrics, and the user’s own trades.

![Markets Copilot](./screens/copilot.png)

### Learn with CoinGraphy

Interactive learning modules covering risk management, journaling, tax basics, and futures trading concepts.

Each module includes quizzes, real-world examples, and progress tracking to help users build practical trading skills.

![Learn Modules](./screens/learn.jpeg)