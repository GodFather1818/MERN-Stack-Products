
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-2 mt-1">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={theme === "dark"}
          onChange={handleThemeSwitch}
        />
        <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700">
          <div className="absolute inset-0 flex items-center justify-between px-1">
            <Sun
              className={`w-5 h-5 text-yellow-500 ${
                theme === "light" ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            />
            <Moon
              className={`w-5 h-5 text-yellow-200 ${
                theme === "dark" ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            />
          </div>
          <span className="sr-only">Toggle theme</span>
        </div>
      </label>
    </div>
  );
}

