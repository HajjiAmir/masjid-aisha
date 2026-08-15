"use client";

import { useState, useCallback } from "react";

/**
 * GivingPanel — Demo Mode (no real payment processing)
 *
 * This panel simulates a giving flow with amount selection, frequency toggle,
 * and fund selector. It does NOT collect any payment credentials (card, bank,
 * CVV, etc.) and NEVER displays a fake success/receipt.
 *
 * On "Donate" click, it shows an honest demo-mode notice directing users
 * to contact the masjid directly.
 *
 * TODO (post-approval): Replace the demo-mode notice with an integration to
 * a payment processor's hosted checkout (e.g., Stripe Checkout, PayPal),
 * using the masjid's own merchant accounts. The hosted checkout will handle
 * all payment-credential collection — this component should never contain
 * card/bank fields.
 */

const PRESET_AMOUNTS = [10, 25, 50, 100];
const FUNDS = ["General Sadaqah", "Zakat", "Masjid Operations"];

export default function GivingPanel() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">(
    "one-time"
  );
  const [fund, setFund] = useState(FUNDS[0]);
  const [showDemo, setShowDemo] = useState(false);
  const [amountError, setAmountError] = useState("");

  const getActiveAmount = useCallback(() => {
    if (isCustom) {
      const n = parseFloat(customAmount);
      return isNaN(n) || n <= 0 ? null : n;
    }
    return selectedAmount;
  }, [isCustom, customAmount, selectedAmount]);

  const handlePreset = (amount: number) => {
    setIsCustom(false);
    setSelectedAmount(amount);
    setCustomAmount("");
    setAmountError("");
    setShowDemo(false);
  };

  const handleCustomFocus = () => {
    setIsCustom(true);
    setSelectedAmount(null);
    setShowDemo(false);
  };

  const handleCustomChange = (val: string) => {
    // Allow only numbers and one decimal point
    if (/^\d*\.?\d{0,2}$/.test(val) || val === "") {
      setCustomAmount(val);
      setAmountError("");
    }
  };

  const handleDonate = () => {
    setShowDemo(false);
    const amount = getActiveAmount();
    if (!amount || amount <= 0) {
      setAmountError("Please enter a valid amount.");
      return;
    }
    // No payment processing — show demo-mode notice
    setShowDemo(true);
  };

  const activeAmount = getActiveAmount();

  return (
    <div className="space-y-6">
      {/* ─── Amount selection ─── */}
      <div>
        <label className="block text-sm font-medium text-emerald-deep mb-3">
          Select Amount
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
          {PRESET_AMOUNTS.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handlePreset(amount)}
              aria-pressed={!isCustom && selectedAmount === amount}
              className={`py-3 rounded-xl text-base font-bold transition-all duration-200 border-2 ${
                !isCustom && selectedAmount === amount
                  ? "bg-emerald-deep text-cream-light border-emerald-deep shadow-md"
                  : "bg-white text-emerald-deep border-emerald-deep/15 hover:border-gold/40"
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-deep font-bold text-lg">
            $
          </span>
          <input
            id="custom-amount"
            type="text"
            inputMode="decimal"
            aria-label="Custom donation amount"
            placeholder="Other amount"
            value={customAmount}
            onFocus={handleCustomFocus}
            onChange={(e) => handleCustomChange(e.target.value)}
            className={`w-full pl-9 pr-4 py-3 rounded-xl bg-white border-2 text-emerald-deep font-semibold text-base placeholder:text-charcoal-muted/30 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all duration-200 ${
              isCustom
                ? "border-emerald-deep shadow-sm"
                : "border-emerald-deep/15"
            } ${amountError ? "border-red-400" : ""}`}
          />
        </div>
        {amountError && (
          <p className="mt-1.5 text-xs text-red-500">{amountError}</p>
        )}
      </div>

      {/* ─── Frequency toggle ─── */}
      <div>
        <label className="block text-sm font-medium text-emerald-deep mb-3">
          Frequency
        </label>
        <div
          className="flex rounded-xl overflow-hidden border-2 border-emerald-deep/15"
          role="radiogroup"
          aria-label="Donation frequency"
        >
          {(["one-time", "monthly"] as const).map((f) => (
            <button
              key={f}
              type="button"
              role="radio"
              aria-checked={frequency === f}
              onClick={() => {
                setFrequency(f);
                setShowDemo(false);
              }}
              className={`flex-1 py-3 text-base font-semibold transition-all duration-200 ${
                frequency === f
                  ? "bg-emerald-deep text-cream-light"
                  : "bg-white text-emerald-deep hover:bg-emerald-deep/5"
              }`}
            >
              {f === "one-time" ? "One-Time" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Fund selector ─── */}
      <div>
        <label
          htmlFor="fund-select"
          className="block text-sm font-medium text-emerald-deep mb-3"
        >
          Designate Fund
        </label>
        <select
          id="fund-select"
          value={fund}
          onChange={(e) => {
            setFund(e.target.value);
            setShowDemo(false);
          }}
          className="w-full px-4 py-3 rounded-xl bg-white border-2 border-emerald-deep/15 text-emerald-deep font-medium text-base focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-emerald-deep transition-all duration-200 appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%231B3D2F' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: "right 0.75rem center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "1.25em 1.25em",
          }}
        >
          {FUNDS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* ─── Summary + Donate button ─── */}
      {activeAmount && activeAmount > 0 && (
        <div className="text-center text-sm text-charcoal-muted">
          <span className="font-bold text-emerald-deep text-2xl">
            ${activeAmount.toFixed(2)}
          </span>
          <span className="ml-2">
            {frequency === "monthly" ? "/ month" : "one-time"} · {fund}
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={handleDonate}
        className="w-full py-4 rounded-xl bg-gold text-emerald-deep font-bold text-base hover:bg-gold-light transition-colors duration-200 shadow-lg shadow-gold/20"
      >
        Donate{activeAmount && activeAmount > 0 ? ` $${activeAmount.toFixed(2)}` : ""}
      </button>

      {/* ─── Demo-mode notice — NEVER a fake success ─── */}
      {showDemo && (
        <div className="mt-2 p-5 rounded-xl bg-gold/10 border border-gold/25 text-center">
          <p className="text-emerald-deep text-sm font-semibold mb-1.5">
            Demo Mode
          </p>
          <p className="text-charcoal-muted text-sm leading-relaxed">
            Secure online giving will be activated when the site goes live. To
            give today, please contact the masjid at{" "}
            <a
              href="tel:3137698647"
              className="text-emerald-deep font-semibold hover:text-gold transition-colors duration-200"
            >
              313-769-8647
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
