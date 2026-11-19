"use client";

import { ArrowRight, Menu } from "lucide-react";
import { StudioBrandMark } from "./brand";

export function HeroDevicesMockup() {
  return (
    <div className="relative w-full max-w-2xl mx-auto py-8 [perspective:1200px] select-none">
      
      {/* Ambient Lighting & Granite Slate Base Shadow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent blur-2xl pointer-events-none rounded-3xl" />
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-black/80 blur-xl rounded-full" />

      {/* 1. Angled 3D Laptop Container */}
      <div 
        className="relative z-10 transition-transform duration-500 ease-out"
        style={{
          transform: "rotateY(-12deg) rotateX(6deg) translateZ(0)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Laptop Screen Lid */}
        <div className="relative rounded-2xl p-2.5 bg-zinc-900 border border-zinc-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* Glass Glare Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-20" />
          
          {/* Display Bezel with Centered Camera Dot */}
          <div className="relative rounded-xl overflow-hidden bg-[#09090c] aspect-[16/10] border border-black flex flex-col">
            
            {/* Top Webcam Notch */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2.5 h-1.5 bg-black rounded-full z-30 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
            </div>

            {/* In-Screen Navigation Bar */}
            <div className="w-full px-5 py-3 border-b border-white/5 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <StudioBrandMark className="w-3.5 h-3.5 text-white" />
                <span className="text-[10px] font-bold text-white tracking-wider">KITTY CORP</span>
              </div>
              <div className="flex items-center gap-3 text-[9px] text-zinc-400">
                <span>Home</span>
                <span>About</span>
                <span>Services</span>
                <span>Contact</span>
              </div>
            </div>

            {/* In-Screen Hero Body with Architectural Dusk Backdrop */}
            <div className="relative flex-1 p-6 md:p-8 flex flex-col justify-center overflow-hidden">
              {/* Background Architectural Glow Visual */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen scale-105"
                style={{ backgroundImage: "url('/images/office.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#09090c] via-[#09090c]/80 to-transparent" />

              {/* In-Screen Content */}
              <div className="relative z-10 max-w-[65%] space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif text-white tracking-tight leading-tight">
                  Your Vision.<br />
                  <span className="italic font-normal">Our Technology.</span>
                </h3>
                <p className="text-[10px] text-zinc-300 leading-relaxed font-light">
                  A smarter digital presence for a bigger tomorrow.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1 bg-white text-zinc-950 text-[9px] font-semibold px-3 py-1 rounded-full shadow-sm">
                    Get Started <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Laptop Keyboard Deck & Base Lip */}
        <div className="h-3 w-[102%] -ml-[1%] bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-b-xl border-t border-zinc-600/50 shadow-md relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-zinc-800 rounded-b" />
        </div>
      </div>

      {/* 2. Overlapping Modern Smartphone resting on the rock slab */}
      <div 
        className="absolute -right-2 sm:right-2 md:right-4 -bottom-4 md:-bottom-8 w-32 sm:w-40 md:w-48 z-30 transition-transform duration-500 ease-out"
        style={{
          transform: "translateZ(40px) rotate(-2deg)",
        }}
      >
        <div className="rounded-[2.2rem] p-2 bg-zinc-950 border-[3px] border-zinc-700 shadow-[0_25px_50px_rgba(0,0,0,0.95)] overflow-hidden">
          
          {/* Phone Screen Frame */}
          <div className="rounded-[1.8rem] overflow-hidden bg-[#09090c] aspect-[9/19] flex flex-col relative border border-black">
            
            {/* Dynamic Island / Speaker */}
            <div className="pt-2 flex justify-center z-20">
              <div className="w-12 h-2.5 bg-black rounded-full flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-zinc-800 ml-auto mr-1.5" />
              </div>
            </div>

            {/* Phone Top Header */}
            <div className="px-3.5 py-2 flex items-center justify-between z-10">
              <StudioBrandMark className="w-3 h-3 text-white" />
              <Menu className="w-3.5 h-3.5 text-zinc-400" />
            </div>

            {/* Phone Screen Hero */}
            <div className="px-3.5 pt-2 pb-3 space-y-1 z-10">
              <h4 className="text-xs sm:text-sm font-serif text-white leading-tight">
                Innovate<br />
                <span className="italic font-normal">Digitally</span>
              </h4>
              <p className="text-[8px] text-zinc-400 leading-tight">
                Modern solutions for modern business.
              </p>
              <div className="pt-1.5">
                <span className="inline-flex items-center gap-0.5 bg-white text-zinc-950 text-[7px] font-semibold px-2 py-0.5 rounded-full">
                  Get Started →
                </span>
              </div>
            </div>

            {/* Phone Bottom Architecture Graphic */}
            <div className="mt-auto relative h-28 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{ backgroundImage: "url('/images/property.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Screen Glass Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />

          </div>
        </div>
      </div>

    </div>
  );
}
