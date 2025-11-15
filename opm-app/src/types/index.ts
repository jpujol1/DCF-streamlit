export type SecurityType = 'common' | 'preferred';

export interface Security {
  id: string;
  name: string;
  type: SecurityType;
  shares: number;
  liquidationPreference?: number; // For preferred stock
  participationCap?: number; // For participating preferred
  isParticipating?: boolean;
}

export interface OPMAssumptions {
  equityValue: number; // Total equity value of the company
  volatility: number; // Expected volatility (e.g., 0.5 for 50%)
  riskFreeRate: number; // Risk-free interest rate (e.g., 0.03 for 3%)
  timeToExit: number; // Time to liquidity event in years (e.g., 3)
}

export interface SecurityResult {
  id: string;
  name: string;
  type: SecurityType;
  shares: number;
  valuePerShare: number;
  totalValue: number;
  percentageOfTotal: number;
}

export interface OPMResults {
  securities: SecurityResult[];
  totalEquityValue: number;
  commonStockValue: number;
  preferredStockValue: number;
}

export interface Scenario {
  id: string;
  name: string;
  securities: Security[];
  assumptions: OPMAssumptions;
  createdAt: Date;
  updatedAt: Date;
}
