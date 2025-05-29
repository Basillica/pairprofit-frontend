import { environment as dev_env } from "./environment.dev";
import { environment as test_env } from "./environment.qa";
import { environment as prod_env } from "./environment.prod";
import { environment as local_env } from "./environment";
import { CONSTANTS, RoleKeys } from "./constants";

export const GetEnvConfig = () => {
    let env = import.meta.env.VITE_APP_ENVIRONMENT || "";
    switch (env) {
        case "PROD": {
            return prod_env;
        }
        case "DEV": {
            return dev_env;
        }
        case "TEST": {
            return test_env;
        }
        default: {
            return local_env;
        }
    }
};

export type ConstantsType = {
    ROLES: string[];
};

export const JOAdminRoles = (): string[] => {
    return ["SUPER ADMIN", "JO ADMIN", "JO SERVICE"];
};

export const AllAdminRoles = (): string[] => {
    return ["SUPER ADMIN", "JO ADMIN", "JO SERVICE", "CUSTOMER ADMIN"];
};

export const GetConstants = (role: RoleKeys): ConstantsType => {
    return CONSTANTS[role];
};
