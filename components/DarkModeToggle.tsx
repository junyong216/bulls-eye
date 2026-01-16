"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 처음에 저장된 테마가 있는지 확인
    const currentTheme = document.documentElement.classList.contains("dark");
    setIsDark(currentTheme);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 shadow-sm border"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
        cursor: "pointer"
      }}
    >
      <span style={{ fontSize: "1.2rem" }}>
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}