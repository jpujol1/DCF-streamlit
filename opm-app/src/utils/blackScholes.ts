/**
 * Standard normal cumulative distribution function
 */
function normCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - prob : prob;
}

/**
 * Black-Scholes call option pricing formula
 * @param S - Current stock price (equity value)
 * @param K - Strike price (breakpoint)
 * @param T - Time to expiration in years
 * @param r - Risk-free rate
 * @param sigma - Volatility
 */
export function blackScholesCall(
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number
): number {
  if (T <= 0 || S <= 0 || K <= 0) return Math.max(S - K, 0);

  const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);

  const callPrice = S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2);

  return Math.max(callPrice, 0);
}

/**
 * Calculate the value of a call spread (long call at K1, short call at K2)
 * This represents the value of a security class between two breakpoints
 */
export function callSpread(
  S: number,
  K1: number,
  K2: number,
  T: number,
  r: number,
  sigma: number
): number {
  const longCall = blackScholesCall(S, K1, T, r, sigma);
  const shortCall = K2 === Infinity ? 0 : blackScholesCall(S, K2, T, r, sigma);

  return longCall - shortCall;
}
