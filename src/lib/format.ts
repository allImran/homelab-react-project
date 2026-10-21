const dateFormatter = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export const formatDate = (iso: string) => dateFormatter.format(new Date(iso));

export const pluralize = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;
