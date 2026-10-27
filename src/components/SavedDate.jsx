import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dateConfig } from "../config/dateConfig";
import { fireFullCelebration } from "../utils/confetti";
import { downloadIcsFile, getGoogleCalendarUrl } from "../utils/calendar";

export default function SavedDate() {
  const { yesScreen, itinerary } = dateConfig;
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    fireFullCelebration();
  }, []);

  const handleDownloadIcs = () => {
    downloadIcsFile({
      title: yesScreen.eventTitle,
      description: yesScreen.eventDescription,
      location: yesScreen.eventLocation,
      date: yesScreen.eventDate,
    });
    setDownloaded(true);
  };

  const googleCalendarUrl = getGoogleCalendarUrl({
    title: yesScreen.eventTitle,
    description: yesScreen.eventDescription,
    location: yesScreen.eventLocation,
    date: yesScreen.eventDate,
  });

  const renderIcon = (iconType) => {
    switch (iconType) {
      case "coffee":
        return (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#DE4377]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
        );
      case "cutlery":
        return (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#DE4377]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2v20M18 2a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3M6 2v20M3 2v6a3 3 0 0 0 6 0V2" />
          </svg>
        );
      case "basket":
        return (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#DE4377]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10h16l-2 10H6L4 10z" />
            <path d="M8 10V6a4 4 0 0 1 8 0v4" />
          </svg>
        );
      case "bag":
        return (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#DE4377]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        );
      case "camera":
        return (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#DE4377]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        );
      default:
        return <span className="text-[#DE4377]">♥</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full flex-1 flex flex-col justify-between md:justify-center items-center select-none overflow-hidden my-auto py-1 sm:py-2"
    >
      {/* ============================================================== */}
      {/* MOBILE LAYOUT (< 768px): Single Column, Zero Scroll            */}
      {/* ============================================================== */}
      <div className="flex md:hidden flex-col justify-between items-center text-center w-full max-w-[390px] h-full px-4 py-1">
        <div className="flex flex-col items-center my-auto w-full">
          {/* Top hearts */}
          <div className="flex items-center gap-1 mb-1">
            <span className="text-[#F2A7BC] text-xs">♥</span>
            <span className="text-[#DE4377] text-sm">♥</span>
            <span className="text-[#F2A7BC] text-xs">♥</span>
          </div>

          <span className="text-[9px] font-black tracking-widest text-[#8D7B85] uppercase mb-0.5">
            {yesScreen.kicker}
          </span>

          <h1 className="text-2xl font-black text-[#3C2E35] tracking-tight mb-0.5">
            {yesScreen.title}
          </h1>

          <p className="text-[11px] font-bold text-[#7A6470] mb-2 max-w-[280px]">
            {yesScreen.subtitle}
          </p>

          {/* Date Highlight Card */}
          <div className="bg-[#FDECEF] rounded-2xl p-2.5 flex items-center gap-2.5 w-full text-left mb-2 border border-pink-200/60 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#DE4377] shrink-0 shadow-2xs">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M12 14c-.6-.7-1.6-.7-2.2 0s-.6 1.6 0 2.2l2.2 2.2 2.2-2.2c.6-.6.6-1.6 0-2.2s-1.6-.7-2.2 0z" fill="#DE4377" stroke="none" />
              </svg>
            </div>
            <div>
              <span className="text-[8px] font-black tracking-widest text-[#7A6470] uppercase block">
                {yesScreen.badge}
              </span>
              <span className="text-sm font-black text-[#3C2E35] block leading-tight">
                {yesScreen.dateText}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="w-full flex flex-col gap-1.5 mb-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadIcs}
              className="w-full h-[38px] bg-[#DE4377] hover:bg-[#C93667] text-white text-xs font-black rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{downloaded ? "Saved to Calendar! 💕" : yesScreen.buttonText}</span>
              <svg className="w-3.5 h-3.5 text-white stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </motion.button>

            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-[32px] bg-white border border-pink-200 text-[#DE4377] text-[10px] font-bold rounded-xl shadow-2xs flex items-center justify-center gap-1.5"
            >
              <span>Add to Google Calendar</span>
              <span>↗</span>
            </a>
          </div>

          {/* 5 Stops Card with Details (matching desktop with title & timeVenue) */}
          <div className="w-full bg-white rounded-2xl p-2.5 border border-pink-100 flex flex-col gap-1.5 text-left shadow-2xs">
            <div className="flex items-center justify-between px-1 pb-1 border-b border-pink-50">
              <span className="text-xs font-black text-[#3C2E35]">Our plans</span>
              <span className="text-[#DE4377] text-xs">♥</span>
            </div>
            {itinerary.items.map((item) => (
              <div key={item.id} className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-pink-50/40">
                <div className="w-8 h-8 rounded-xl bg-[#FDECEF] flex items-center justify-center shrink-0 shadow-2xs">
                  {renderIcon(item.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-black text-[#3C2E35] block truncate leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-[#8D7B85] font-medium block truncate leading-tight mt-0.5">
                    {item.timeVenue}
                  </span>
                </div>
                <span className="text-[#F2A7BC] text-xs shrink-0 pr-1">
                  ✧
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP / TABLET LAYOUT (>= 768px): Exact Figma 2-Column Design*/}
      {/* ============================================================== */}
      <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-14 items-center w-full max-w-5xl mx-auto px-4">
        
        {/* Left Column: Copy, Date Highlight Card, and Action Button */}
        <div className="md:col-span-5 flex flex-col items-start text-left">
          {/* Three top hearts matching Figma */}
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[#F2A7BC] text-sm">♥</span>
            <span className="text-[#DE4377] text-lg">♥</span>
            <span className="text-[#F2A7BC] text-sm">♥</span>
          </div>

          {/* Kicker */}
          <span className="text-[11px] font-black tracking-[0.2em] text-[#8D7B85] uppercase mb-2 block">
            {yesScreen.kicker}
          </span>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-black text-[#3C2E35] tracking-tight leading-tight mb-2">
            {yesScreen.title}
          </h1>

          <p className="text-sm lg:text-base font-bold text-[#7A6470] mb-5 max-w-sm">
            {yesScreen.subtitle}
          </p>

          {/* Date Highlight Card matching Figma */}
          <div className="bg-[#FDECEF] rounded-3xl p-5 flex items-center gap-4 w-full text-left mb-6 shadow-sm border border-pink-200/60">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#DE4377] shadow-2xs shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M12 14c-.6-.7-1.6-.7-2.2 0s-.6 1.6 0 2.2l2.2 2.2 2.2-2.2c.6-.6.6-1.6 0-2.2s-1.6-.7-2.2 0z" fill="#DE4377" stroke="none" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-black tracking-[0.2em] text-[#7A6470] uppercase block mb-0.5">
                {yesScreen.badge}
              </span>
              <span className="text-xl lg:text-2xl font-black text-[#3C2E35] block leading-tight">
                {yesScreen.dateText}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="w-full flex flex-col gap-2.5 mb-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadIcs}
              className="w-full py-3.5 px-6 bg-[#DE4377] hover:bg-[#C93667] text-white text-base font-black rounded-2xl shadow-md hover:shadow-lg transition-all focus:outline-none flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{downloaded ? "Saved to Calendar! 💕" : yesScreen.buttonText}</span>
              <svg className="w-4 h-4 text-white stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </motion.button>

            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-5 bg-white hover:bg-pink-50/50 border border-pink-200 text-[#DE4377] text-xs font-bold rounded-2xl shadow-2xs transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Add to Google Calendar</span>
              <span>↗</span>
            </a>
          </div>

          <p className="text-xs text-[#8D7B85] font-medium">
            {yesScreen.subtext}
          </p>
        </div>

        {/* Right Column: "Our plans" Detailed Itinerary Card matching Figma */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 lg:p-7 border border-pink-100/80 shadow-sm w-full text-left">
          <div className="flex items-center justify-between border-b border-pink-100/60 pb-3 mb-4">
            <div>
              <h2 className="text-2xl font-black text-[#3C2E35]">
                {itinerary.title}
              </h2>
              <p className="text-xs text-[#8D7B85] font-medium mt-0.5">
                {itinerary.subtitle}
              </p>
            </div>
            <div className="text-[#DE4377] text-lg">
              ♥
            </div>
          </div>

          {/* 5 Itinerary Items with Sparkle on right */}
          <div className="flex flex-col gap-2.5">
            {itinerary.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-pink-50/40 border border-transparent hover:border-pink-100 transition-all group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#FDECEF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  {renderIcon(item.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm lg:text-base font-black text-[#3C2E35] leading-tight truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#8D7B85] font-medium mt-0.5 truncate">
                    {item.timeVenue}
                  </p>
                </div>
                <div className="text-[#F2A7BC] text-sm shrink-0 pr-1">
                  ✧
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
