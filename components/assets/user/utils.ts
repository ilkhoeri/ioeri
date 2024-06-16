export function getAge(date: string) {
  const birthDate = new Date(date);
  const currentDate = new Date();
  const yearDiff = currentDate.getFullYear() - birthDate.getFullYear();
  let monthDiff = currentDate.getMonth() - birthDate.getMonth();
  if (monthDiff < 0) {
    // Kurangi satu tahun jika bulan saat ini kurang dari bulan lahir
    monthDiff += 12;
  }

  let dayDiff = currentDate.getDate() - birthDate.getDate();
  if (dayDiff < 0) {
    // Kurangi satu bulan jika hari saat ini kurang dari hari lahir
    const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    dayDiff += lastMonthDate.getDate();
    monthDiff -= 1;
  }

  return { yearDiff, monthDiff, dayDiff };
}

export function getFullAge(date: string) {
  const birthDate = new Date(date);
  const currentDate = new Date();

  let yearDiff = currentDate.getFullYear() - birthDate.getFullYear();
  let monthDiff = currentDate.getMonth() - birthDate.getMonth();
  let dayDiff = currentDate.getDate() - birthDate.getDate();

  // Jika hari lahir > hari ini, kurangi satu bulan
  if (dayDiff < 0) {
    monthDiff--;

    // Ambil hari dari bulan sebelumnya
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
    dayDiff = lastMonth.getDate() + dayDiff;
  }

  // Jika bulan lahir > bulan ini, kurangi satu tahun
  if (monthDiff < 0) {
    yearDiff--;
    monthDiff = 12 + monthDiff; // Tambah 12 bulan
  }

  const birthday = currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() === birthDate.getDate();

  let ageString = "";
  if (birthday) {
    ageString = `${yearDiff} Years Old - Happy Birthday`;
  } else {
    ageString = `${yearDiff} Tahun, ${monthDiff} Bulan, ${dayDiff} Hari`;
  }

  return { yearDiff, monthDiff, dayDiff, ageString, birthday };
}

export function getSocMedImages(data: { siteUrl: string; imageUrl?: string | undefined }): string {
  if (data.imageUrl && data.imageUrl.trim() !== "") {
    return data.imageUrl;
  }

  const domains = [
    "blogspot",
    "berdikarier",
    "x",
    "threads",
    "instagram",
    "facebook",
    "github",
    "tiktok",
    "linktr",
    "linkedin",
    "twitter",
    "discord",
    "myspace",
    "pinterest",
    "skype",
    "tumblr",
  ];
  const urlImage = (name: string): string =>
    `https://raw.githubusercontent.com/ioeridev/assets/public/avatar/socmeds/image-socmed-${name}.png`;
  const domain = data.siteUrl.split("/")[2];
  const domainExtension = domain.split(".").pop(); // akhiran domain
  const PLACEHOLDER_SRC = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";

  if (domains.includes(domainExtension || "") || !domain.includes(".")) {
    return urlImage("ban");
  } else if (domainExtension && !domains.some((domain) => data.siteUrl.includes(domain))) {
    return urlImage("chain");
  } else if (domainExtension) {
    return urlImage(domain);
  }

  return PLACEHOLDER_SRC;
}
