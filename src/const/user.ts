export const userRole = {
  ADMIN: "ADMIN",
  VENDOR: "VENDOR",
  CUSTOMER: "CUSTOMER",
} as const;

export const userStatus = {
  none: "none",
  request: "request",
  suspend: "suspend",
  delete: "delete",
} as const;
