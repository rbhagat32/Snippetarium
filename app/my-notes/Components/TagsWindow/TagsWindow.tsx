"use client";

import CloseIcon from "@mui/icons-material/Close";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import React, { useEffect, useRef, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EmptyPlaceHolder from "@/app/EmptyPlaceHolder";
import { useGlobalContext } from "@/Context";
import toast from "react-hot-toast";

function TagsWindow() {
  const {
    openTagsWindowObject: { openTagsWindow },
    darkModeObject: { darkMode },
    allTagsObject: { allTags, setAllTags },
    allNotesObject: { allNotes },
  } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState("");

  interface Tag {
    name: string;
  }

  interface TagCount {
    [key: string]: number;
  }

  const countTags = (notes: any[], allTags: Tag[]): { name: string; count: number }[] => {
    const tagCount: TagCount = allTags.reduce((acc: TagCount, tag) => {
      acc[tag.name] = 0;
      return acc;
    }, {});

    notes.forEach((note) => {
      note.tags.forEach((tag: Tag) => {
        tagCount[tag.name]++;
      });
    });

    return allTags
      .map((tag) => {
        if (tag.name === "All") {
          return { name: "All", count: allNotes.length };
        }
        return { name: tag.name, count: tagCount[tag.name] };
      })
      .sort((a, b) => b.count - a.count);
  };

  const sortAllTags = (notes: SingleNoteType[], allTags: SingleTagType[]): SingleTagType[] => {
    const tagCounts = countTags(notes, allTags);

    const countMap = new Map(tagCounts.map((item) => [item.name, item.count]));

    return [...allTags].sort((a, b) => {
      if (a.name === "All") return -1;
      if (b.name === "All") return 1;

      const countDiff = (countMap.get(b.name) || 0) - (countMap.get(a.name) || 0);
      return countDiff !== 0 ? countDiff : a.name.localeCompare(b.name);
    });
  };

  const sortedTags: SingleTagType[] = sortAllTags(allNotes, allTags);

  useEffect(() => {
    setSearchQuery("");
  }, [allTags]);

  useEffect(() => {
    setAllTags(sortedTags);
  }, [allNotes]);

  return (
    <div
      style={{
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        top: "45px",
      }}
      className={`${openTagsWindow ? "fixed" : "hidden"} ${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"} z-40 h-[600px] w-[60%] rounded-md p-9 shadow-md max-sm:w-[430px]`}
    >
      <Header />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TagsList searchQuery={searchQuery} />
    </div>
  );
}

export default TagsWindow;

function Header() {
  const {
    openTagsWindowObject: { setOpenTagsWindow },
  } = useGlobalContext();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <StyleOutlinedIcon />
        <span className="text-lg font-bold">Tags</span>
      </div>
      <div onClick={() => setOpenTagsWindow(false)}>
        <CloseIcon sx={{ fontSize: 16 }} className="cursor-pointer text-slate-400" />
      </div>
    </div>
  );
}

function SearchBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    darkModeObject: { darkMode },
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    openTagsWindowObject: { openTagsWindow },
  } = useGlobalContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [openTagsWindow]);

  return (
    <div className="relative mt-11 flex items-center justify-between gap-5">
      <div
        className={`flex h-[42px] w-[85%] items-center gap-1 rounded-md pl-3 text-sm ${darkMode[1].isSelected ? "bg-slate-600" : "bg-slate-50"} `}
      >
        <SearchRoundedIcon className="text-slate-400" />
        <input
          ref={inputRef}
          value={searchQuery}
          placeholder="Search a tag..."
          className="w-full bg-transparent font-light outline-none"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <button
        onClick={() => setOpenNewTagsWindow(true)}
        className="ml-2 flex w-[15%] items-center justify-center rounded-md bg-rose-600 p-[10px] text-sm text-white max-lg:w-[25%]"
      >
        <AddOutlinedIcon sx={{ fontSize: 17 }} />
        <span className="max-md:hidden">Add Tag</span>
      </button>
    </div>
  );
}

function TagsList({ searchQuery }: { searchQuery: string }) {
  const {
    darkModeObject: { darkMode },
    allTagsObject: { allTags },
  } = useGlobalContext();

  const filterAllItemFromAllTags = allTags.filter((tag) => tag.name !== "All");
  const filterAllTagsBasedOnSearchQuery = filterAllItemFromAllTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`select-none rounded-md p-3 ${darkMode[1].isSelected ? "bg-slate-600" : "bg-slate-50"} mt-9 flex h-[380px] flex-col gap-4 overflow-auto`}
    >
      {filterAllItemFromAllTags.length === 0 && (
        <EmptyPlaceHolder
          muiIcon={<StyleOutlinedIcon sx={{ fontSize: 66 }} className="text-slate-400" />}
          text={<span className="font-light text-slate-400">No tags has been created yet...</span>}
        />
      )}

      {filterAllTagsBasedOnSearchQuery.length === 0 && filterAllItemFromAllTags.length !== 0 && (
        <EmptyPlaceHolder
          muiIcon={<SearchRoundedIcon sx={{ fontSize: 66 }} className="text-slate-400" />}
          text={<span className="text-slate-400">No Tags Found</span>}
        />
      )}

      {filterAllTagsBasedOnSearchQuery.map((tag, index) => (
        <div key={index}>
          <SingleTag tag={tag} />
        </div>
      ))}
    </div>
  );
}

function SingleTag({ tag }: { tag: SingleTagType }) {
  const {
    darkModeObject: { darkMode },
    selectedTagToEditObject: { setSelectedTagToEdit },
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    allTagsObject: { allTags, setAllTags },
    allNotesObject: { allNotes, setAllNotes },
    tagsClickedObject: { tagsClicked, setTagsClicked },
  } = useGlobalContext();

  function openTagWindow(tag: SingleTagType) {
    setOpenNewTagsWindow(true);
    setSelectedTagToEdit(tag);
  }

  function countTagInAllNotes(tag: SingleTagType) {
    let count = 0;
    allNotes.forEach((note) => {
      if (note.tags.some((t) => t.name === tag.name)) {
        count++;
      }
    });
    return count;
  }

  return (
    <div
      className={` ${darkMode[1].isSelected ? "bg-slate-800" : "bg-white"} flex items-center justify-between gap-3 rounded-lg p-2 px-4`}
    >
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-rose-600"></div>
        <div className="flex flex-col">
          <span className="font-bold">{tag.name}</span>
          <span className="text-[12px] text-slate-400">{countTagInAllNotes(tag)} Snippets</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300">
          <EditRoundedIcon
            onClick={() => openTagWindow(tag)}
            className="text-slate-400"
            sx={{ fontSize: 15 }}
          />
        </div>

        <div
          onClick={() =>
            deleteTag(tag, allTags, setAllTags, allNotes, setAllNotes, tagsClicked, setTagsClicked)
          }
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300"
        >
          <DeleteRoundedIcon className="text-slate-400" sx={{ fontSize: 15 }} />
        </div>
      </div>
    </div>
  );
}

async function updateNote(note: SingleNoteType, tagToRemove: string) {
  const updatedTags = note.tags.filter((t) => t.name.toLowerCase() !== tagToRemove.toLowerCase());
  const updateNoteResponse = await fetch(`/api/snippets?snippetId=${note._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...note,
      tags: updatedTags,
    }),
  });

  if (!updateNoteResponse.ok) {
    throw new Error(`Failed to update note ${note._id}`);
  }

  const updatedNote = await updateNoteResponse.json();
  return updatedNote.note;
}

async function deleteTag(
  tag: SingleTagType,
  allTags: SingleTagType[],
  setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>,
  allNotes: SingleNoteType[],
  setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>,
  tagsClicked: string[],
  setTagsClicked: React.Dispatch<React.SetStateAction<string[]>>
) {
  try {
    const deleteTagResponse = await fetch(`/api/tags?tagId=${tag._id}`, {
      method: "DELETE",
    });

    if (!deleteTagResponse.ok) {
      const errorData = await deleteTagResponse.json();
      throw new Error(errorData.message || "Failed to delete tag");
    }

    const notesToUpdate = allNotes.filter((note) =>
      note.tags.some((t) => t.name.toLowerCase() === tag.name.toLowerCase())
    );

    const updatePromises = notesToUpdate.map((note) => updateNote(note, tag.name));

    const updatedNotes = await Promise.all(updatePromises);

    const updatedAllTags = allTags.filter((t) => t.name.toLowerCase() !== tag.name.toLowerCase());
    const updatedAllNotes = allNotes.map((note) => {
      const updatedNote = updatedNotes.find((un) => un._id === note._id);
      if (updatedNote) {
        return updatedNote;
      }
      return {
        ...note,
        tags: note.tags.filter((t) => t.name.toLowerCase() !== tag.name.toLowerCase()),
      };
    });

    setAllTags(updatedAllTags);
    setAllNotes(updatedAllNotes);
    setTagsClicked(tagsClicked.filter((t) => t.toLowerCase() !== tag.name.toLowerCase()));

    toast.success("Tag has been deleted successfully");
  } catch (error) {
    console.error("Error deleting tag:", error);
    toast.error(error instanceof Error ? error.message : "Failed to delete tag or update notes");
  }
}
