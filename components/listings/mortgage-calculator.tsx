"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/lib/language-context";

const copy = {
  title: { en: "Mortgage calculator", es: "Calculadora de hipoteca" },
  downPayment: { en: "Down payment (%)", es: "Enganche (%)" },
  rate: { en: "Interest rate (%)", es: "Tasa de interés (%)" },
  term: { en: "Loan term (years)", es: "Plazo del préstamo (años)" },
  monthly: { en: "Estimated monthly payment", es: "Pago mensual estimado" },
  disclaimer: {
    en: "Estimate only — excludes taxes, insurance, and HOA. Talk to a lender for exact numbers.",
    es: "Solo una estimación — no incluye impuestos, seguro ni HOA. Consulta a un prestamista para cifras exactas.",
  },
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function MortgageCalculator({ price }: { price: number }) {
  const { lang } = useLanguage();
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const monthly = useMemo(() => {
    const principal = price * (1 - downPct / 100);
    const monthlyRate = rate / 100 / 12;
    const n = years * 12;
    if (monthlyRate === 0) return principal / n;
    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
  }, [price, downPct, rate, years]);

  return (
    <div className="rounded-xl border border-black/10 bg-sand p-6">
      <h3 className="font-display text-lg">{copy.title[lang]}</h3>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs">{copy.downPayment[lang]}</Label>
          <Input
            type="number"
            className="bg-white"
            value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value))}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">{copy.rate[lang]}</Label>
          <Input
            type="number"
            step="0.1"
            className="bg-white"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">{copy.term[lang]}</Label>
          <Input
            type="number"
            className="bg-white"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate">{copy.monthly[lang]}</p>
      <p className="text-2xl font-semibold tabular-nums">{currency.format(monthly || 0)}/mo</p>
      <p className="mt-2 text-xs text-slate">{copy.disclaimer[lang]}</p>
    </div>
  );
}
