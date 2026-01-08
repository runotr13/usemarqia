function isHttpUrl(v: string) {
  return /^https?:\/\//i.test(v.trim());
}
function isDataUrl(v: string) {
  return /^data:/i.test(v.trim());
}

export { isHttpUrl, isDataUrl };
