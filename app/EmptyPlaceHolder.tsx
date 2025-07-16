import { useGlobalContext } from "@/Context";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import React from "react";
import { v4 as uuidv4 } from "uuid";

function EmptyPlaceHolder({
  muiIcon,
  text,
  isNew,
}: {
  muiIcon: React.ReactNode;
  text: React.ReactNode;
  isNew?: boolean;
}) {
  const {
    isNewNoteObject: { setIsNewNote },
    selectedNoteObject: { setSelectedNote },
    openContentNoteObject: { setOpenContentNote },
    sharedUserIdObject: { sharedUserId },
  } = useGlobalContext();
  return (
    <div className="  w-full h-[510px] pt-20 flex gap-3 flex-col items-center  ">
      {muiIcon}
      {text}
      {isNew && (
        <button
          onClick={() =>
            OpenTheContentNote(
              setIsNewNote,
              setSelectedNote,
              setOpenContentNote,
              sharedUserId
            )
          }
          className="bg-rose-600 p-[8px] pr-2  text-sm text-white rounded-md mt-2 justify-center items-center"
        >
          <AddOutlinedIcon sx={{ fontSize: 17, color: "white" }} />
          <span className="ml-1 mr-2">Add a new snippet</span>
        </button>
      )}
    </div>
  );
}

export default EmptyPlaceHolder;

export function OpenTheContentNote(
  setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>,
  setOpenContentNote: React.Dispatch<React.SetStateAction<boolean>>,
  sharedUserId: string
) {
  function formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const newSingleNote: SingleNoteType = {
    _id: uuidv4(),
    clerkUserId: sharedUserId || "",
    title: "",
    creationDate: formatDate(new Date()),
    tags: [],
    description: "",
    code: "",
    isFavorite: false,
    language: "Javascript",
    isTrash: false,
  };
  setIsNewNote(true);
  setSelectedNote(newSingleNote);
  setOpenContentNote(true);
}
