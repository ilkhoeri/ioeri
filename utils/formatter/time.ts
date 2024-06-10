export const getTimeAgo = (createdAt: Date): string => {
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return "Just now";
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
      month = "long",
      hour = "numeric",
      minute = "numeric",
      second = "numeric",
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
    second,
    timeZoneName,
    ...restOptions,
  };

  return date.toLocaleString(locales, updatedOptions);
};
