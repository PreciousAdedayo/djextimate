export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDay(date: Date) {
  return {
    month: date.toLocaleString("en", { month: "short" }).toUpperCase(),
    day: date.getDate(),
    weekday: date.toLocaleString("en", { weekday: "long" }),
    time: date.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" }),
    full: date.toLocaleDateString("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}
