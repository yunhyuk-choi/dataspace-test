import axios from "axios";

export async function setLocale(locale: string) {
  const res = await axios.post("/api/set-locale", { locale });

  return res.data;
}
