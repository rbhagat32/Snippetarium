import { useGlobalContext } from "@/ContextApi";
import React from "react";
import toast from "react-hot-toast";

function ConfirmationWindow() {
  const {
    openConfirmationWindowObject: {
      openConfirmationWindow,
      setOpenConfirmationWindow,
    },

    allNotesObject: { allNotes, setAllNotes },
    selectedNoteObject: { selectedNote, setSelectedNote },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const [isDeleting, setIsDeleting] = React.useState(false);

  async function deleteTheSnippet() {
    if (selectedNote) {
      setIsDeleting(true);
      try {
        const response = await fetch(
          `/api/snippets?snippetId=${selectedNote._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // If the delete request was successful, update the local state
        const copyAllNotes = [...allNotes];
        const updateAllNotes = copyAllNotes.filter(
          (note) => note._id !== selectedNote._id
        );
        setAllNotes(updateAllNotes);
        setOpenConfirmationWindow(false);
        setSelectedNote(null); // Use undefined for consistency

        toast.success("Snippet has been deleted");
      } catch (error) {
        console.error("Error deleting snippet:", error);
        toast.error("Failed to delete snippet. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  }

  return (
    <div
      style={{
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        top: "30%",
        transform: "translateY(-50%)",
      }}
      className={`shadow-md rounded-md md:w-[450px] w-[310px] ${openConfirmationWindow ? "fixed" : "hidden"} ${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"}   py-8 pt-10  p-3  z-50  flex flex-col gap-2 items-center   `}
    >
      <span className="font-bold text-xl"> {`Are you sure?`}</span>
      <span className="text-center text-[13px] opacity-75 px-8">
        Are you sure you want to delete this snippet? This action cannot be
        undone.
      </span>
      <div className="flex gap-2 mt-5">
        <button
          onClick={() => {
            setOpenConfirmationWindow(false);
            setSelectedNote(null);
          }}
          className=" border text-[12px]   w-full px-10  p-3   rounded-md   "
        >
          Cancel
        </button>
        <button
          onClick={deleteTheSnippet}
          disabled={isDeleting}
          className={`  w-full px-10 text-[12px]    p-3 text-white rounded-md bg-purple-600`}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default ConfirmationWindow;
