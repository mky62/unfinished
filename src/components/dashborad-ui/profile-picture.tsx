"use client";

import React from "react";

type ProfilePictureProps = {
  connected?: boolean;
  className?: string;
};

export function ProfilePicture({
  connected,
  className = "",
}: ProfilePictureProps) {
  return (
    <div className={`relative ${className}`}>
      
      {/* Gradient ring */}
      <div
        className="
          w-[88px] h-[88px]
          rounded-[24px]
          p-[2.5px]
          bg-[linear-gradient(135deg,#00c8b4_0%,#0090ff_50%,#ff8c28_100%)]
          shadow-[0_8px_32px_rgba(0,0,0,0.1)]
        "
      >
        {/* Inner container */}
        <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#e8e5df]">
          <img
            src="https://api.dicebear.com/7.x/notionists-neutral/svg?seed=dev99&backgroundColor=e8e5df"
            alt="Avatar"
            className="w-full h-full object-cover"
            onError={(e: any) => (e.currentTarget.style.display = "none")}
          />
        </div>
      </div>

      {/* Connected indicator */}
      {connected && (
        <div
          className="
            absolute bottom-[2px] right-[2px]
            w-[13px] h-[13px]
            rounded-full
            border-[2.5px] border-[#f2f0ec]
            bg-[linear-gradient(135deg,#00c8b4,#00e8a0)]
            animate-pulse
          "
        />
      )}
    </div>
  );
}