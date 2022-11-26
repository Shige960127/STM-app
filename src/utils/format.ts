import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

export function dateFormat(
  date: string | number | Date,
  s = "MM月dd日 HH時mm分"
) {
  if (!date) return "";
  return format(zonedTimeToUtc(date, "JST"), s);
}
