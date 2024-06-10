/**
 *
 * @param data string, string
 * @returns string
 */
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
