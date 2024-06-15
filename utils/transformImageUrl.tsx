export const transformImageUrl = (url: string | null) => {
  if (!url) return;
  if (!url.includes("cloudinary")) return url;

  const uploadIndex = url.indexOf("/upload/") + 8;
  const transformation = "c_fill,w_300,h_300,g_faces/";
  return `${url.slice(0, uploadIndex)}${transformation}${url.slice(uploadIndex)}`;
};
