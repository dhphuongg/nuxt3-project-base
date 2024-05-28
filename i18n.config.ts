import Languages from "~/languages";

export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    vi: Languages.vi,
    en: Languages.en
  }
}));
