import { ulid } from "ulid";

export const generateULID = (prefix = "") =>
  `${prefix ? prefix + "_" : ""}${ulid().slice(0, 20)}`;
