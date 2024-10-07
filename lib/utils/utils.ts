import { ulid } from "ulid";
import dayjs from "dayjs";
import { USERS_ROLE } from "../enum";

export const generateULID = (prefix = "") =>
  `${prefix ? prefix + "_" : ""}${ulid()}`;

export const formatAmount = (
  amount: number | string | undefined,
  currency = "INR",
  float = 2
) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: float,
    minimumFractionDigits: float,
  }).format(amount ? parseFloat(amount.toString()) : 0);

export const formatNumber = (amount: number | string | undefined) =>
  new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
    amount ? parseFloat(amount.toString()) : 0
  );

export const isAdmin = (role: string) => {
  return [USERS_ROLE.ADMIN, USERS_ROLE.OWNER].includes(role as USERS_ROLE);
};

export const isMerchant = (role: string) => {
  return [USERS_ROLE.MERCHANT].includes(role as USERS_ROLE);
};

export const isOps = (role: string) => {
  return [USERS_ROLE.OPS].includes(role as USERS_ROLE);
};

export const getFormattedTime = (value?: Date | undefined) =>
  dayjs(value).format("DD MMM, YYYY hh:mm A");


export const formatStatus = (status: string) => {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};