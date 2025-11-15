# OPM Equity Valuation Web App

A single-page React web application for calculating common and preferred stock prices using the Option Pricing Model (OPM) methodology.

## Overview

The OPM Equity Valuation app provides a user-friendly interface for equity valuation using the Option Pricing Model with Black-Scholes calculations. Users can input their cap table and assumptions, then calculate valuations with full transparency.

## Features

- **Interactive Cap Table Input**: Add and manage multiple securities (common and preferred stock)
- **Flexible Assumptions**: Configure equity value, volatility, risk-free rate, and time to exit
- **Real-time Calculations**: Instant OPM valuations using Black-Scholes formula
- **Detailed Results**: View per-share values, total values, and ownership percentages
- **Persistent Storage**: Scenarios saved automatically in localStorage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **100% Client-Side**: All calculations run in the browser, no backend required

## Tech Stack

- **React 18** with **TypeScript** for type-safe component development
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for modern, responsive styling
- **Lucide React** for beautiful icons
- **Recharts** (available for future charting features)

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Add Securities**: Click "Add Security" to add entries to your cap table
   - Specify name, type (Common/Preferred), and number of shares
   - For preferred stock, set the liquidation preference

2. **Configure Assumptions**:
   - **Total Equity Value**: The estimated total value of the company's equity
   - **Volatility**: Expected volatility (typically 30-70%)
   - **Risk-Free Rate**: Current risk-free interest rate (e.g., 10-year Treasury)
   - **Time to Exit**: Expected years until liquidity event

3. **Calculate**: Click "Calculate Valuation" to run the OPM calculations

4. **Review Results**: View detailed breakdowns including:
   - Total equity value allocation
   - Common vs preferred stock values
   - Per-share and total valuations for each security
   - Percentage ownership

## How OPM Works

The Option Pricing Model treats each class of stock as a call option on the company's equity value:

1. **Breakpoints** are calculated based on liquidation preferences
2. **Black-Scholes** formula values each security class as a call spread
3. **Value allocation** distributes equity value to each security based on their option values

This provides a market-based approach to equity allocation that accounts for:
- Liquidation preferences
- Capital structure
- Time value of money
- Volatility of equity value

## Project Structure

```
opm-app/
├── src/
│   ├── components/          # React components
│   │   ├── CapTableInput.tsx
│   │   ├── AssumptionsInput.tsx
│   │   └── ResultsDisplay.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useLocalStorage.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Calculation utilities
│   │   ├── blackScholes.ts
│   │   └── opmCalculator.ts
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html             # HTML template
└── package.json           # Project dependencies
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Type Checking

The project uses TypeScript for type safety. Run type checking with:

```bash
npm run build
```

## License

MIT

## Support

For issues or questions, please open an issue on the GitHub repository.
