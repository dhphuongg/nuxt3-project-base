import vi from "./locales/vi";
import en from "./locales/en";
import type { LanguageSchema } from "./type";

export default { vi, en };

export const LocalKey = flattenKey<LanguageSchema>(en);
