import { formatInTimeZone } from "date-fns-tz";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";


export function matchesRoute({routeName, fuzzy = true} : {routeName: string, fuzzy?: boolean}){
    const route = useRoute();
    
    if(fuzzy){
        return route.path.includes(routeName)
    }

    return route.path === routeName;
}

export function formatDateStringToDateObj(dateString: string) {
  dayjs.extend(customParseFormat);
  // Append "Z" so the string is parsed as UTC, not local time
  const dateObj = dayjs(dateString + "Z", "YYYY-MM-DD HH:mm:ssZ").toDate();
  return dateObj;
}

export function getDateTimeFormat() {
  return "yyyy-MM-dd HH:mm";
}

export function formatToUTC(date: Date | string) {
  if (typeof date === "string") {
    return formatInTimeZone(
      formatDateStringToDateObj(date),
      "UTC",
      getDateTimeFormat(),
    );
  }
  return formatInTimeZone(date, "UTC", getDateTimeFormat());
}

export function formatToLocal(date: Date | string) {
  if (typeof date === "string") {
    return formatInTimeZone(
      formatDateStringToDateObj(date),
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      getDateTimeFormat(),
    );
  }
  return formatInTimeZone(
    date,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    getDateTimeFormat(),
  );
}