import { redirect } from "next/navigation"

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "ETB",
  style: "currency",
  minimumFractionDigits: 0,
})

export function formatCurrency(amount: number) {
  if (amount == undefined || NaN) redirect("/")
  return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US")

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number)
}
