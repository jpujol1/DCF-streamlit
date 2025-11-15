import type { Security, OPMAssumptions, OPMResults, SecurityResult } from '../types';
import { callSpread } from './blackScholes';

interface Breakpoint {
  value: number;
  securityId: string;
  securityName: string;
}

/**
 * Calculate breakpoints based on liquidation preferences
 */
function calculateBreakpoints(securities: Security[]): Breakpoint[] {
  const breakpoints: Breakpoint[] = [];

  // Sort preferred stock by liquidation preference
  const preferredSecurities = securities
    .filter(s => s.type === 'preferred' && s.liquidationPreference)
    .sort((a, b) => (a.liquidationPreference || 0) - (b.liquidationPreference || 0));

  let cumulativePreference = 0;

  preferredSecurities.forEach(security => {
    const liquidationPref = security.liquidationPreference || 0;
    const totalPreference = liquidationPref * security.shares;
    cumulativePreference += totalPreference;

    breakpoints.push({
      value: cumulativePreference,
      securityId: security.id,
      securityName: security.name,
    });
  });

  return breakpoints;
}

/**
 * Calculate OPM values for all securities
 */
export function calculateOPM(
  securities: Security[],
  assumptions: OPMAssumptions
): OPMResults {
  const { equityValue, volatility, riskFreeRate, timeToExit } = assumptions;

  // Separate common and preferred securities
  const commonSecurities = securities.filter(s => s.type === 'common');
  const preferredSecurities = securities.filter(s => s.type === 'preferred');

  // Calculate breakpoints
  const breakpoints = calculateBreakpoints(securities);

  // Calculate total shares for each type
  const totalCommonShares = commonSecurities.reduce((sum, s) => sum + s.shares, 0);

  const results: SecurityResult[] = [];
  let totalCommonValue = 0;
  let totalPreferredValue = 0;

  // Value preferred securities
  preferredSecurities.forEach((security, index) => {
    const K1 = index === 0 ? 0 : breakpoints[index - 1].value;
    const K2 = breakpoints[index]?.value || Infinity;

    const securityValue = callSpread(
      equityValue,
      K1,
      K2,
      timeToExit,
      riskFreeRate,
      volatility
    );

    const valuePerShare = security.shares > 0 ? securityValue / security.shares : 0;

    results.push({
      id: security.id,
      name: security.name,
      type: security.type,
      shares: security.shares,
      valuePerShare,
      totalValue: securityValue,
      percentageOfTotal: equityValue > 0 ? (securityValue / equityValue) * 100 : 0,
    });

    totalPreferredValue += securityValue;
  });

  // Value common stock (everything above the highest breakpoint)
  const highestBreakpoint = breakpoints.length > 0
    ? breakpoints[breakpoints.length - 1].value
    : 0;

  const totalCommonValueCalc = callSpread(
    equityValue,
    highestBreakpoint,
    Infinity,
    timeToExit,
    riskFreeRate,
    volatility
  );

  totalCommonValue = totalCommonValueCalc;

  // Allocate common stock value proportionally
  commonSecurities.forEach(security => {
    const proportion = totalCommonShares > 0 ? security.shares / totalCommonShares : 0;
    const securityValue = totalCommonValueCalc * proportion;
    const valuePerShare = security.shares > 0 ? securityValue / security.shares : 0;

    results.push({
      id: security.id,
      name: security.name,
      type: security.type,
      shares: security.shares,
      valuePerShare,
      totalValue: securityValue,
      percentageOfTotal: equityValue > 0 ? (securityValue / equityValue) * 100 : 0,
    });
  });

  return {
    securities: results,
    totalEquityValue: equityValue,
    commonStockValue: totalCommonValue,
    preferredStockValue: totalPreferredValue,
  };
}
