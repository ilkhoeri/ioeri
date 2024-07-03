type TimeAgoFormats = { perYears?: boolean };

export const getTimeAgo = (createdAt: Date, { perYears = false }: TimeAgoFormats = {}): string => {
  const now = new Date();
  let diff = now.getTime() - createdAt.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (perYears) {
    if (years > 0) {
      const remainingMonths = Math.floor((days % 365) / 30);
      const remainingDays = (days % 365) % 30;
      return `${years} years${remainingMonths ? `, ${remainingMonths} months` : ""}${remainingDays ? `, ${remainingDays} days` : ""} ago`;
    } else if (months > 0) {
      const remainingDays = days % 30;
      return `${months} months${remainingDays ? `, ${remainingDays} days` : ""} ago`;
    } else if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return "Just now";
    }
  } else {
    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return "Just now";
    }
  }
};

export const getTimeInterval = (date1: Date, date2: Date): string => {
  const diff = Math.abs(date1.getTime() - date2.getTime());
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days`;
  } else if (hours > 0) {
    return `${hours} hours`;
  } else if (minutes > 0) {
    return `${minutes} minutes`;
  } else {
    return `${seconds} seconds`;
  }
};

type TimedType = {
  locales?: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions;
};

export const sortStringDate = (
  date: Date,
  {
    locales = "id-ID",
    options: { day = "2-digit", year = "numeric", month = "short", ...restOptions } = {},
  }: TimedType = {},
): string => {
  const updatedOptions: Intl.DateTimeFormatOptions = {
    day,
    year,
    month,
    ...restOptions,
  };

  return date.toLocaleString(locales, updatedOptions);
};

export const longStringDate = (
  date: Date,
  {
    locales = "id-ID",
    options: {
      day = "2-digit",
      year = "numeric",
      month = "short",
      hour = "2-digit",
      minute = "2-digit",
      //second = "numeric",
      timeZoneName = "short",
      ...restOptions
    } = {},
  }: TimedType = {},
): string => {
  const updatedOptions: Intl.DateTimeFormatOptions = {
    day,
    year,
    month,
    hour,
    minute,
    //second,
    timeZoneName,
    ...restOptions,
  };

  return date.toLocaleString(locales, updatedOptions).replace(".", ":");
};

type PostDate = "long" | "short";
export function getPostDate(d: string, type: PostDate): string {
  const date = new Date(d); // Konversi ke objek Date
  date.setHours(date.getHours());

  const formattedLong = date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const day = date.getDate().toString().padStart(2, "0"); // Menambahkan 0 di depan jika hanya satu digit
  const month = date.toLocaleString("id-ID", { month: "short" });
  const year = date.getFullYear().toString().slice(-2); // Mengambil dua digit terakhir dari tahun
  const formattedShort = `${day} ${month} ${year}`;

  let formatted = "";

  if (type === "long") {
    formatted = formattedLong;
  }
  if (type === "short") {
    formatted = formattedShort;
  }

  return formatted;
}
