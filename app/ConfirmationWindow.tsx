import { useGlobalContext } from "@/Context";
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
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const copyAllNotes = [...allNotes];
        const updateAllNotes = copyAllNotes.filter(
          (note) => note._id !== selectedNote._id,
        );
        setAllNotes(updateAllNotes);
        setOpenConfirmationWindow(false);
        setSelectedNote(null);

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
      className={`w-[310px] rounded-md shadow-md md:w-[450px] ${openConfirmationWindow ? "fixed" : "hidden"} ${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"} z-50 flex flex-col items-center gap-2 p-3 py-8 pt-10`}
    >
      <span className="text-xl font-bold"> {`Are you sure?`}</span>
      <span className="px-8 text-center text-[13px] opacity-75">
        Are you sure you want to delete this snippet? This action cannot be
        undone.
      </span>
      <div className="mt-5 flex gap-2">
        <button
          onClick={() => {
            setOpenConfirmationWindow(false);
            setSelectedNote(null);
          }}
          className="w-full rounded-md border p-3 px-10 text-[12px]"
        >
          Cancel
        </button>
        <button
          onClick={deleteTheSnippet}
          disabled={isDeleting}
          className={`w-full rounded-md bg-rose-600 p-3 px-10 text-[12px] text-white`}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default ConfirmationWindow;
