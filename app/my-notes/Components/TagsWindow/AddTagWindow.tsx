"use client";

import { useGlobalContext } from "@/Context";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const tagSuggestions = [
  "TimeTravelAlgorithm",
  "QuantumComputing",
  "AIEthics",
  "BugSquasher",
  "CodePoetry",
  "DataWizardry",
  "RoboticsDreams",
  "CyberSecurity",
  "CloudNinja",
  "BlockchainMagic",
  "IoTInnovation",
  "NeuroInterface",
  "GreenCode",
  "SpaceExplorationAI",
  "VRWorldBuilder",
  "MachineLearningArt",
  "CryptoAlchemy",
  "BioInformatics",
  "AugmentedReality",
  "EthicalHacking",
];
function AddTagWindow() {
  const {
    openNewTagsWindowObject: { openNewTagsWindow },
    darkModeObject: { darkMode },
    selectedTagToEditObject: { selectedTagToEdit },
  } = useGlobalContext();

  const [tagName, setTagName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setErrorMessage("");
    setTagName(newValue);
  }

  useEffect(() => {
    if (openNewTagsWindow) {
      setTagName("");
      setErrorMessage("");
      return;
    }
  }, [openNewTagsWindow]);

  useEffect(() => {
    if (selectedTagToEdit) {
      setTagName(selectedTagToEdit.name);
    }
  }, [selectedTagToEdit]);

  return (
    <div
      style={{
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        top: "100px",
      }}
      className={`${openNewTagsWindow ? "fixed" : "hidden"} max-sm:w-[350px] w-[500px] shadow-md ${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white border"}     z-50 p-6 rounded-lg`}
    >
      <Header />
      <AddTagInput
        tagName={tagName}
        onInputChange={onInputChange}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <ButtonGroup tagName={tagName} setErrorMessage={setErrorMessage} />
    </div>
  );
}

export default AddTagWindow;

function Header() {
  const {
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit },
  } = useGlobalContext();

  return (
    <div className="flex justify-between items-center rounded-lg ">
      <div className="flex items-center gap-2">
        <span className="text-[18px] text-slate-600 font-bold">
          {selectedTagToEdit ? "Edit Tag" : "Add New Tag"}
        </span>
      </div>
      <div>
        <CloseIcon
          sx={{ fontSize: 15 }}
          className="text-slate-400 cursor-pointer"
          onClick={() => {
            setOpenNewTagsWindow(false), setSelectedTagToEdit(null);
          }}
        />
      </div>
    </div>
  );
}

function AddTagInput({
  tagName,
  onInputChange,
  errorMessage,
  setErrorMessage,
}: {
  tagName: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}) {
  const {
    openNewTagsWindowObject: { openNewTagsWindow },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const [placeholder, setPlaceholder] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const randomIndex = Math.floor(Math.random() * tagSuggestions.length);
    setPlaceholder(`e.g., ${tagSuggestions[randomIndex]}`);
  }, [openNewTagsWindow]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [errorMessage, setErrorMessage]);

  return (
    <div className="mt-6">
      <span className="text-slate-400 text-sm font-semibold">Tag Name</span>
      <input
        ref={inputRef}
        value={tagName}
        onChange={(e) => onInputChange(e)}
        placeholder={placeholder}
        className={`${darkMode[1].isSelected ? "bg-slate-700" : "bg-white border"} w-full  rounded-md p-2 mt-1 text-[12px] outline-none text-slate-600`}
      />
      {errorMessage.length > 0 && (
        <div className="text-red-500 flex mt-2 gap-1 items-center ">
          <ErrorOutlineOutlinedIcon fontSize="small" className=" " />
          <span className="text-red-500 text-[11px]">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

function ButtonGroup({
  tagName,
  setErrorMessage,
}: {
  tagName: string;
  setErrorMessage: (e: string) => void;
}) {
  const {
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    allTagsObject: { allTags, setAllTags },
    selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit },
    allNotesObject: { allNotes, setAllNotes },
    tagsClickedObject: { setTagsClicked },
    sharedUserIdObject: { sharedUserId },
  } = useGlobalContext();

  function handleClickedTag() {
    if (tagName.trim().length === 0) {
      setErrorMessage("Tag name is still empty!");
      return;
    }

    if (!allTags.some((tag) => tag.name === tagName)) {
      if (!selectedTagToEdit) {
        addNewTagFunction(
          allTags,
          setAllTags,
          setOpenNewTagsWindow,
          tagName,
          sharedUserId
        );
      } else {
        handleEditTag(
          allTags,
          setAllTags,
          setOpenNewTagsWindow,
          selectedTagToEdit,
          setSelectedTagToEdit,
          tagName,
          allNotes,
          setAllNotes
        );
      }

      let newTagClicked = [];
      newTagClicked.push("All");
      setTagsClicked(newTagClicked);
    } else {
      setErrorMessage("Tag already exists");
    }
  }

  return (
    <div className="flex justify-end mt-6 gap-2 text-[12px]">
      <button
        onClick={() => {
          setOpenNewTagsWindow(false);
          setSelectedTagToEdit(null);
        }}
        className="px-4 py-2  text-slate-600 border rounded-md hover:bg-slate-100"
      >
        Cancel
      </button>
      <button
        onClick={handleClickedTag}
        className="px-4 py-2   text-white bg-purple-600 rounded-md hover:bg-purple-700"
      >
        {selectedTagToEdit ? "Edit Tag" : "Add Tag"}
      </button>
    </div>
  );
}
async function addNewTagFunction(
  _allTags: SingleTagType[],
  setAllTags: (value: React.SetStateAction<SingleTagType[]>) => void,
  setOpenNewTagsWindow: (value: React.SetStateAction<boolean>) => void,
  tagName: string,
  sharedUserId: string
) {
  const newTag = {
    name: tagName,
    clerkUserId: sharedUserId || "",
  };

  try {
    const response = await fetch("/api/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTag),
    });

    if (!response.ok) {
      throw new Error("Failed to add tag");
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const addedTag: SingleTagType = {
      _id: data.tags._id,
      name: data.tags.name,
      clerkUserId: data.tags.clerkUserId,
    };

    setAllTags((prevTags) => [...prevTags, addedTag]);
    setOpenNewTagsWindow(false);
    toast.success("Tag has been added successfully");
  } catch (error) {
    console.error("Error adding new tag:", error);
    toast.error(error instanceof Error ? error.message : "Failed to add tag");
  }
}

async function updateNote(
  note: SingleNoteType,
  oldTagName: string,
  newTagName: string
) {
  const updatedTags = note.tags.map((tag) =>
    tag.name.toLowerCase() === oldTagName.toLowerCase()
      ? { ...tag, name: newTagName }
      : tag
  );
  const updateNoteResponse = await fetch(
    `/api/snippets?snippetId=${note._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...note,
        tags: updatedTags,
      }),
    }
  );

  if (!updateNoteResponse.ok) {
    throw new Error(`Failed to update note ${note._id}`);
  }

  const updatedNote = await updateNoteResponse.json();
  return updatedNote.note;
}

async function handleEditTag(
  allTags: SingleTagType[],
  setAllTags: (value: React.SetStateAction<SingleTagType[]>) => void,
  setOpenNewTagsWindow: (value: React.SetStateAction<boolean>) => void,
  selectedTagToEdit: SingleTagType,
  setSelectedTagToEdit: (
    value: React.SetStateAction<SingleTagType | null>
  ) => void,
  newTagName: string,
  allNotes: SingleNoteType[],
  setAllNotes: (value: React.SetStateAction<SingleNoteType[]>) => void
) {
  try {
    const updateTagResponse = await fetch(
      `/api/tags?tagId=${selectedTagToEdit._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newTagName }),
      }
    );

    if (!updateTagResponse.ok) {
      const errorData = await updateTagResponse.json();
      throw new Error(errorData.message || "Failed to update tag");
    }

    const notesToUpdate = allNotes.filter((note) =>
      note.tags.some(
        (t) => t.name.toLowerCase() === selectedTagToEdit.name.toLowerCase()
      )
    );

    const updatePromises = notesToUpdate.map((note) =>
      updateNote(note, selectedTagToEdit.name, newTagName)
    );

    const updatedNotes = await Promise.all(updatePromises);

    const updatedAllTags = allTags.map((tag) =>
      tag._id === selectedTagToEdit._id ? { ...tag, name: newTagName } : tag
    );

    const updatedAllNotes = allNotes.map((note) => {
      const updatedNote = updatedNotes.find((un) => un._id === note._id);
      if (updatedNote) {
        return updatedNote;
      }
      return {
        ...note,
        tags: note.tags.map((tag) =>
          tag.name.toLowerCase() === selectedTagToEdit.name.toLowerCase()
            ? { ...tag, name: newTagName }
            : tag
        ),
      };
    });

    setAllTags(updatedAllTags);
    setAllNotes(updatedAllNotes);
    setOpenNewTagsWindow(false);
    setSelectedTagToEdit(null);

    toast.success("Tag has been updated successfully");
  } catch (error) {
    console.error("Error updating tag:", error);
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to update tag or related notes"
    );
  }
}
