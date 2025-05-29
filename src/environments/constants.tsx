export const CONSTANTS = {
  "SUPER ADMIN": {
    ROLES: [
      "SUPER ADMIN",
      "JO ADMIN",
      "JO SERVICE",
      "CUSTOMER ADMIN",
      "CUSTOMER USER",
      "CUSTOMER OPERATOR",
    ],
  },
  "JO ADMIN": {
    ROLES: [
      "JO ADMIN",
      "JO SERVICE",
      "CUSTOMER ADMIN",
      "CUSTOMER USER",
      "CUSTOMER OPERATOR",
    ],
  },
  "JO SERVICE": {
    ROLES: [
      "JO SERVICE",
      "CUSTOMER ADMIN",
      "CUSTOMER USER",
      "CUSTOMER OPERATOR",
    ],
  },
  "CUSTOMER ADMIN": {
    ROLES: ["CUSTOMER ADMIN", "CUSTOMER USER", "CUSTOMER OPERATOR"],
  },
  "CUSTOMER USER": {
    ROLES: ["CUSTOMER USER", "CUSTOMER OPERATOR"],
  },
  "CUSTOMER OPERATOR": {
    ROLES: ["CUSTOMER USER", "CUSTOMER OPERATOR"],
  },
};

export type RoleKeys =
  | "SUPER ADMIN"
  | "JO ADMIN"
  | "JO SERVICE"
  | "CUSTOMER ADMIN"
  | "CUSTOMER OPERATOR";
