"use client";

import { useGlobalContext } from "@/Context";
import ContentNote from "../ContentNote/ContentNote";
import AllNotesSection from "./NotesArea/AllNotesSection";
import SwiperSelection from "./NotesArea/SwiperSelection";
import DarkMode from "./TopBar/DarkMode";
import ProfileUser from "./TopBar/ProfileUser";
import SearchBar from "./TopBar/SearchBar";
import SideBarMenuIcon from "./TopBar/SideBarMenuIcon";

function ContentArea() {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();
  return (
    <div
      className={`w-full ${darkMode[1].isSelected ? "bg-slate-700" : "bg-slate-100"} p-5`}
    >
      <TopBar />
      <NotesArea />
    </div>
  );
}

export default ContentArea;

function TopBar() {
  const {
    darkModeObject: { darkMode },
    isMobileObject: { isMobile },
  } = useGlobalContext();
  return (
    <div
      className={`${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"} flex items-center justify-between rounded-lg p-3`}
    >
      <ProfileUser />
      <SearchBar />
      <div className="flex items-center gap-4">
        <DarkMode />
        {isMobile && <SideBarMenuIcon />}
      </div>
    </div>
  );
}

function NotesArea() {
  const {
    openContentNoteObject: { openContentNote },
    isMobileObject: { isMobile },
  } = useGlobalContext();
  return (
    <div className="mt-5 flex gap-2">
      <div
        className={`${openContentNote ? `${isMobile ? "w-full" : "w-[50%]"}` : "w-full"}`}
      >
        <SwiperSelection />
        <AllNotesSection />
      </div>
      <ContentNote />
    </div>
  );
}
