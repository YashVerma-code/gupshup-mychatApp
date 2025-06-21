import React, { useState, useEffect } from "react";
import { Palette, Check, Sun, Moon, Sparkles, Settings } from "lucide-react";
import { THEMES,THEME_INFO } from "../constants/theme";
import { useThemeStore } from "../store/useThemeStrore";

export default function Setting() {
  const {theme,setTheme} =useThemeStore();;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleThemeChange = (theme) => {
    setTheme(theme);
  };

  const categories = [
    "All",
    ...new Set(Object.values(THEME_INFO).map((info) => info.category)),
  ];

  const filteredThemes =
    selectedCategory === "All"
      ? THEMES
      : THEMES.filter(
          (theme) => THEME_INFO[theme]?.category === selectedCategory
        );

  const ThemeButton = ({ data }) => (
    <button
      onClick={() => handleThemeChange(data)}
      className={`
      group relative w-18 h-18 rounded-2xl border-2 transition-all duration-300 
      hover:scale-105 hover:shadow-xl active:scale-95 
      backdrop-blur-sm overflow-hidden
      ${
        theme === data
          ? "border-primary ring-3 ring-primary ring-offset-2 ring-offset-base-100 shadow-lg"
          : "border-base-300/60 hover:border-primary/60"
      }
    `}
      data-theme={data}
      style={{
        background: `linear-gradient(135deg, 
        hsl(var(--p) / 0.9) 0%, 
        hsl(var(--s) / 0.8) 30%,
        hsl(var(--a) / 0.7) 70%,
        hsl(var(--n) / 0.6) 100%)`,
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 ">
        <div className="absolute top-1 right-1 w-3 h-3 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 bg-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/40 rounded-full"></div>
      </div>

      {/* Selected State Indicator */}
      {theme === data && (
        <div className="absolute top-1 right-1 z-10 rounded-2xl ">
          <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center shadow-2xl">
            <svg
              className="w-2.5 h-2.5 text-primary-content"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-2 ">
        {/* Icon */}
        <div className="text-xl mb-1 drop-shadow-md group-hover:scale-110 transition-transform duration-200">
          {THEME_INFO[data]?.icon}
        </div>

        {/* Theme Name */}
        <span className="text-xs font-medium capitalize leading-tight drop-shadow-sm">
          {data}
        </span>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

      {/* Focus Ring */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-focus-visible:opacity-100 ring-2 ring-primary ring-offset-2 ring-offset-base-100 transition-opacity duration-200"></div>
    </button>
  );

  return (
    <div className="min-h-screen h-screen to-base-300 p-4">
      <div className="w-2/3 mx-auto h-full min-h-full mt-20 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Palette className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Theme Gallery
            </h1>
          </div>
          <p className="text-base-content/70 text-lg">
            Customize your perfect visual experience
          </p>
        </div>

        {/* Current Theme Card */}
        <div className="card bg-base-100 shadow-2xl mb-8 overflow-hidden rounded-2xl border">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap flex-col sm:flex-row items-center gap-4">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-16 h-16">
                    <div className="w-1/2 h-1/2 text-3xl mx-auto" >{THEME_INFO[theme]?.icon}</div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold capitalize">
                    {theme}
                  </h2>
                  <div className="flex items-center gap-2 text-base-content/70">
                    <span className="badge badge-outline">
                      {THEME_INFO[theme]?.category}
                    </span>
                    <span>Currently Active</span>
                  </div>
                </div>
              </div>

              {/* Color Preview */}
              <div className="hidden md:flex items-center gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <div className="w-4 h-4 bg-secondary rounded"></div>
                    <div className="w-4 h-4 bg-accent rounded"></div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 bg-neutral rounded"></div>
                    <div className="w-4 h-4 bg-base-content rounded"></div>
                    <div className="w-4 h-4 bg-info rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`btn btn-sm transition-all duration-200 ${
                selectedCategory === category
                  ? "btn-primary"
                  : "btn-outline btn-primary hover:btn-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Theme Grid */}
        <div className="card bg-base-100 shadow-xl p-6 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-10 xl:grid-cols-12 gap-6 justify-items-center">
            {filteredThemes.map((theme) => (
              <ThemeButton key={theme} data={theme} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
