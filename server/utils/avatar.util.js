const generateAvatarUrl = (fullName) => {
  if (!fullName || typeof fullName !== "string") {
    return null;
  }

  const initials = fullName
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .slice(0, 2)
    .join("");

  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    initials
  )}&background=${randomColor}&color=ffffff&size=256`;
};

export default generateAvatarUrl;
