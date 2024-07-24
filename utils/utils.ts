import { ulid } from "ulid";

export const generateULID = (prefix = "") =>
  `${prefix ? prefix + "_" : ""}${ulid()}`;

export const formatAmount = (amount: number, currency = "INR", float = 2) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: float,
    minimumFractionDigits: float,
  }).format(amount);
