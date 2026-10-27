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
          <svg className="w-6 h-6 text-[#DE4377]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
        );
      case "cutlery":
        return (
          <svg className="w-6 h-6 text-[#DE4377]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2v20M18 2a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3M6 2v20M3 2v6a3 3 0 0 0 6 0V2" />
          </svg>
        );
      case "film":
        return (
          <svg className="w-6 h-6 text-[#DE4377]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" />
            <line x1="17" y1="17" x2="22" y2="17" />
            <line x1="17" y1="7" x2="22" y2="7" />
          </svg>
        );
      case "bag":
        return (
          <svg className="w-6 h-6 text-[#DE4377]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        );
      case "camera":
        return (
          <svg className="w-6 h-6 text-[#DE4377]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        );
      default:
        return <span>♥</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-6xl lg:max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-12 flex-1 flex flex-col justify-between select-none"
    >
      {/* 2-Column Desktop Grid / 1-Column Mobile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start my-auto w-full py-4 md:py-8">
        
        {/* Left Column: Confirmation, Calendar Card & Action Buttons */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Three top hearts */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#F2A7BC] text-lg">♥</span>
            <span className="text-[#DE4377] text-2xl">♥</span>
            <span className="text-[#F2A7BC] text-lg">♥</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#3C2E35] tracking-tight mb-2">
            {yesScreen.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-bold text-[#7A6470] mb-6">
            {yesScreen.subtitle}
          </p>

          {/* Date Highlight Card */}
          <div className="bg-[#FDECEF] rounded-3xl p-5 md:p-6 flex items-center gap-4 w-full text-left mb-6 shadow-sm border border-pink-200/60">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#DE4377] shadow-2xs shrink-0">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M12 14c-.6-.7-1.6-.7-2.2 0s-.6 1.6 0 2.2l2.2 2.2 2.2-2.2c.6-.6.6-1.6 0-2.2s-1.6-.7-2.2 0z" fill="#DE4377" stroke="none" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-black tracking-[0.2em] text-[#7A6470] uppercase block mb-1">
                {yesScreen.badge}
              </span>
              <span className="text-xl md:text-2xl font-black text-[#3C2E35]">
                {yesScreen.dateText}
              </span>
              <span className="text-xs text-[#8D7B85] font-semibold block mt-0.5">
                All Day • A whole day to ourselves! 💕
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadIcs}
              className="w-full py-4.5 px-8 bg-[#DE4377] hover:bg-[#C93667] text-white text-lg font-black rounded-2xl shadow-md hover:shadow-lg transition-all focus:outline-none flex items-center justify-center gap-2"
            >
              <span>{downloaded ? "Saved to Calendar! 💕" : yesScreen.buttonText}</span>
              <svg className="w-5 h-5 text-white stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </motion.button>

            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 bg-white hover:bg-pink-50/50 border border-pink-200 text-[#DE4377] text-sm md:text-base font-bold rounded-2xl shadow-2xs transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Add to Google Calendar</span>
              <span>↗</span>
            </a>
          </div>

          <p className="text-xs md:text-sm text-[#8D7B85] font-medium text-center lg:text-left">
            {yesScreen.subtext}
          </p>
        </div>

        {/* Right Column: "Our plans" Detailed Itinerary Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm w-full text-left">
          <div className="flex items-center justify-between border-b border-pink-100/60 pb-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#3C2E35]">
                {itinerary.title} 🌸
              </h2>
              <p className="text-xs md:text-sm text-[#8D7B85] mt-1 font-medium">
                {itinerary.subtitle}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FDECEF] flex items-center justify-center text-[#DE4377] text-xl">
              ♥
            </div>
          </div>

          {/* List items with elegant spacing */}
          <div className="flex flex-col gap-4">
            {itinerary.items.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-pink-50/40 border border-transparent hover:border-pink-100 transition-all group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#FDECEF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  {renderIcon(item.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-black text-[#3C2E35] leading-tight">
                      {item.title}
                    </h3>
                    <span className="text-[11px] font-bold text-[#DE4377] bg-[#FDECEF] px-2.5 py-0.5 rounded-full">
                      Stop 0{index + 1}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-[#8D7B85] mt-1 font-medium">
                    {item.timeVenue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center py-4 border-t border-pink-100/50 mt-4">
        <p className="text-xs text-[#A69AA1]">
          {dateConfig.footerText}
        </p>
      </div>
    </motion.div>
  );
}
