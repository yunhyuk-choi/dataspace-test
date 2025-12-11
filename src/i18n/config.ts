const useSetting = () => {
  const locales = ["en", "ko", "system"];
  const darkMode = ["light", "dark", "system"];

  return { locales, darkMode };
};

export default useSetting;
