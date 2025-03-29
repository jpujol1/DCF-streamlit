import streamlit as st

def run_dcf(
    year1_revenue,
    growth_rates,                
    base_margin,                
    margin_improvement,         
    tax_rate,                   
    wacc,                       
    terminal_growth,           
    net_debt=0
):
    years = len(growth_rates) + 1
    revenues = [year1_revenue]
    margins = [base_margin]
    ebitdas, taxes, fcfs, discount_factors, pv_fcfs = [], [], [], [], []

    for i in range(1, years):
        revenues.append(revenues[-1] * (1 + growth_rates[i - 1]))
        margins.append(margins[-1] + margin_improvement)

    for i in range(years):
        ebitda = revenues[i] * margins[i]
        tax = ebitda * tax_rate
        fcf = ebitda - tax
        discount = 1 / ((1 + wacc) ** (i + 1))
        pv = fcf * discount

        ebitdas.append(ebitda)
        taxes.append(tax)
        fcfs.append(fcf)
        discount_factors.append(discount)
        pv_fcfs.append(pv)

    final_fcf = fcfs[-1] * (1 + terminal_growth)
    terminal_value = final_fcf / (wacc - terminal_growth)
    pv_terminal_value = terminal_value * discount_factors[-1]

    enterprise_value = sum(pv_fcfs) + pv_terminal_value
    equity_value = enterprise_value - net_debt

    return {
        "revenues": revenues,
        "margins": margins,
        "fcfs": fcfs,
        "pv_fcfs": pv_fcfs,
        "terminal_value": terminal_value,
        "pv_terminal_value": pv_terminal_value,
        "enterprise_value": enterprise_value,
        "equity_value": equity_value
    }

# --- Streamlit UI ---
st.title("Simple 5-Year DCF Calculator")

st.markdown("Enter your assumptions below:")

year1_revenue = st.number_input("Current Revenue ($)", value=1_000_000, step=100_000)
growth_rates = [
    st.number_input(f"Growth Rate Year {i+2} (%)", value=10.0 - i, step=0.5) / 100 for i in range(4)
]
base_margin = st.number_input("Starting EBITDA Margin (%)", value=25.0, step=0.5) / 100
margin_improvement = st.number_input("Margin Improvement per Year (p.p.)", value=1.0, step=0.25) / 100

# Optional Advanced Inputs
with st.expander("Advanced Inputs"):
    tax_rate = st.slider("Tax Rate", 0.0, 0.5, 0.25)
    wacc = st.slider("Discount Rate (WACC)", 0.01, 0.20, 0.10)
    terminal_growth = st.slider("Terminal Growth Rate", 0.0, 0.06, 0.03)
    net_debt = st.number_input("Net Debt ($)", value=0, step=10000)

if st.button("Run DCF"):
    result = run_dcf(
        year1_revenue=year1_revenue,
        growth_rates=growth_rates,
        base_margin=base_margin,
        margin_improvement=margin_improvement,
        tax_rate=tax_rate,
        wacc=wacc,
        terminal_growth=terminal_growth,
        net_debt=net_debt
    )

    st.subheader("Forecast & Discounted Cash Flow:")
    for i in range(5):
        st.write(f"Year {i+1}: Revenue = ${result['revenues'][i]:,.0f}, "
                 f"Margin = {result['margins'][i]*100:.1f}%, "
                 f"FCF = ${result['fcfs'][i]:,.0f}, "
                 f"PV FCF = ${result['pv_fcfs'][i]:,.0f}")

    st.markdown("---")
    st.write(f"**Terminal Value (undiscounted):** ${result['terminal_value']:,.0f}")
    st.write(f"**PV of Terminal Value:** ${result['pv_terminal_value']:,.0f}")
    st.markdown("---")
    st.write(f"**Enterprise Value:** ${result['enterprise_value']:,.0f}")
    st.write(f"**Equity Value (after Net Debt):** ${result['equity_value']:,.0f}")
