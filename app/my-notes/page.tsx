"use client";

import { useGlobalContext } from "@/Context";
import { Toaster } from "react-hot-toast";
import ConfirmationWindow from "../ConfirmationWindow";
import ContentArea from "./Components/ContentArea/ContentArea";
import Sidebar from "./Components/Sidebar/Sidebar";
import AddTagWindow from "./Components/TagsWindow/AddTagWindow";
import TagsWindow from "./Components/TagsWindow/TagsWindow";

export default function Page() {
  const {
    darkModeObject: { darkMode },
    openConfirmationWindowObject: { openConfirmationWindow },
    openNewTagsWindowObject: { openNewTagsWindow },
    openTagsWindowObject: { openTagsWindow },
  } = useGlobalContext();

  return (
    <div className="flex">
      {openConfirmationWindow && (
        <div className="fixed z-50 h-full w-full bg-black opacity-20"></div>
      )}

      {openNewTagsWindow && <div className="fixed z-50 h-full w-full bg-black opacity-20"></div>}

      {openTagsWindow && <div className="fixed z-20 h-full w-full bg-black opacity-20"></div>}

      <AddTagWindow />
      <TagsWindow />
      <ConfirmationWindow />
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: darkMode[1].isSelected ? "#1E293B" : "white",
            color: darkMode[1].isSelected ? "white" : "black",
          },
        }}
      />
      <Sidebar />
      <ContentArea />
    </div>
  );
}
