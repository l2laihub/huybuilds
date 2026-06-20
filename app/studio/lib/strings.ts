import strings from "../strings.json";

export type StudioLang = "en" | "vi";

export type StringKey = keyof (typeof strings)["en"];

export const STRINGS: Record<StudioLang, Record<StringKey, string>> = {
  en: (strings as Record<StudioLang, Record<StringKey, string>>).en,
  vi: (strings as Record<StudioLang, Record<StringKey, string>>).vi,
};

export function getString(lang: StudioLang, key: StringKey): string {
  return STRINGS[lang][key] ?? STRINGS.en[key] ?? String(key);
}
