import { useGlobalContext } from "@/Context";
import EmptyPlaceHolder from "@/app/EmptyPlaceHolder";
import getLanguageIcon from "@/app/utils/languageToIcon";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ReplayIcon from "@mui/icons-material/Replay";
import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import { Checkbox } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight, oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

function AllNotesSection() {
  const {
    allNotesObject: { allNotes },
    isMobileObject: { isMobile },
    openContentNoteObject: { openContentNote, setOpenContentNote },
    sideBarMenuObject: { sideBarMenu },
    tagsClickedObject: { tagsClicked, setTagsClicked },
    searchQueryObject: { searchQuery },
    isLoadingObject: { isLoading },
    showPlaceHolderObject: {},
    selectedNoteObject: {},
  } = useGlobalContext();

  const filterIsTrashedNotes = allNotes.filter((note) => note.isTrash === false);

  const [filteredNotes, setFilteredNotes] = useState(
    allNotes.filter((note) => note.isTrash === false)
  );

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(searchQuery !== "");

    if (sideBarMenu[0].isSelected) {
      const updateFilteredNotes = allNotes
        .filter((note) => !note.isTrash)
        .filter((note) => {
          return note.title.toLowerCase().includes(searchQuery.toLowerCase());
        });

      setFilteredNotes(updateFilteredNotes);
    }

    if (sideBarMenu[1].isSelected) {
      const updateFilteredNotes = allNotes
        .filter((note) => !note.isTrash && note.isFavorite)
        .filter((note) => {
          return note.title.toLowerCase().includes(searchQuery.toLowerCase());
        });

      setFilteredNotes(updateFilteredNotes);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isSearching === false) {
      if (sideBarMenu[0].isSelected) {
        setFilteredNotes(filterIsTrashedNotes);

        setTagsClicked(["All"]);
      }

      if (sideBarMenu[1].isSelected) {
        setFilteredNotes(allNotes.filter((note) => !note.isTrash && note.isFavorite));
      }
    }
  }, [isSearching]);

  useEffect(() => {
    if (sideBarMenu[0].isSelected) {
      if (tagsClicked.length === 1 && tagsClicked[0] === "All") {
        setFilteredNotes(allNotes.filter((note) => !note.isTrash));
        return;
      }

      if (tagsClicked.length > 0) {
        const updateNotes = allNotes
          .filter((note) => {
            return tagsClicked.every((selectedTag) =>
              note.tags.some((noteTag) => noteTag.name === selectedTag)
            );
          })
          .filter((note) => !note.isTrash);

        setFilteredNotes(updateNotes);
      }
    }

    if (sideBarMenu[1].isSelected) {
      if (tagsClicked.length === 1 && tagsClicked[0] === "All") {
        const updatesNotes = allNotes.filter((note) => !note.isTrash && note.isFavorite);
        setFilteredNotes(updatesNotes);
        return;
      }

      const updateNotes = allNotes
        .filter((note) => {
          return tagsClicked.every((selectedTag) =>
            note.tags.some((noteTag) => noteTag.name === selectedTag)
          );
        })
        .filter((note) => !note.isTrash && note.isFavorite);

      setFilteredNotes(updateNotes);
    }

    if (sideBarMenu[2].isSelected) {
      if (tagsClicked.length === 1 && tagsClicked[0] === "All") {
        const updatesNotes = allNotes.filter((note) => note.isTrash);
        setFilteredNotes(updatesNotes);
        return;
      }

      const updateNotes = allNotes
        .filter((note) => {
          return tagsClicked.every((selectedTag) =>
            note.tags.some((noteTag) => noteTag.name === selectedTag)
          );
        })
        .filter((note) => note.isTrash);

      setFilteredNotes(updateNotes);
    }
  }, [allNotes, tagsClicked]);

  useLayoutEffect(() => {
    if (openContentNote) {
      setOpenContentNote(false);
    }

    if (sideBarMenu[0].isSelected) {
      setFilteredNotes(filterIsTrashedNotes);
    }

    if (sideBarMenu[1].isSelected) {
      const filteredFavoriteNotes = allNotes.filter((note) => !note.isTrash && note.isFavorite);
      setFilteredNotes(filteredFavoriteNotes);
    }

    if (sideBarMenu[2].isSelected) {
      const filteredTrashedNotes = allNotes.filter((note) => note.isTrash);
      setFilteredNotes(filteredTrashedNotes);
    }
  }, [sideBarMenu]);

  function SnippetSkeleton() {
    return (
      <div className="flex h-[380px] w-full flex-col rounded-md bg-white">
        <div className="flex justify-between px-5 pt-5">
          <div className="h-7 w-1/2 rounded-sm bg-slate-100"></div>
          <div className="h-7 w-7 rounded-sm bg-slate-100"></div>
        </div>
        <div className="mt-12 h-[230px] w-full bg-slate-200"></div>
      </div>
    );
  }

  const [displayNotes, setDisplayNotes] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setDisplayNotes(true);
    } else {
      setDisplayNotes(false);
    }
  }, [isLoading]);

  return (
    <div
      className={`mt-5 ${isMobile || openContentNote ? "grid grid-cols-1" : "grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"} gap-6`}
    >
      {sideBarMenu[0].isSelected && (
        <>
          {isLoading ? (
            <div className="grid w-[80vw] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SnippetSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {filteredNotes.filter((note) => !note.isTrash).length === 0 && !isLoading ? (
                isSearching ? (
                  <EmptyPlaceHolder
                    muiIcon={
                      <SearchOutlinedIcon className="text-slate-400" sx={{ fontSize: 110 }} />
                    }
                    text={
                      <span className="text-md text-center text-slate-400">No snippets found.</span>
                    }
                  />
                ) : tagsClicked.filter((tag) => tag !== "All").length > 0 ? (
                  <EmptyPlaceHolder
                    muiIcon={
                      <StyleOutlinedIcon className="text-slate-400" sx={{ fontSize: 110 }} />
                    }
                    text={
                      <span className="text-md text-center text-slate-400">
                        It looks like there are no <br /> snippets with this tag.
                      </span>
                    }
                  />
                ) : (
                  <>
                    <EmptyPlaceHolder
                      muiIcon={
                        <TextSnippetOutlinedIcon
                          className="text-slate-400"
                          sx={{ fontSize: 110 }}
                        />
                      }
                      text={
                        <span className="text-md text-center text-slate-400">
                          It looks like there are no <br /> snippets right now.
                        </span>
                      }
                      isNew={true}
                    />
                  </>
                )
              ) : (
                displayNotes &&
                filteredNotes.map((note, noteIndex) => (
                  <div key={noteIndex}>
                    <SingleNote note={note} />
                  </div>
                ))
              )}
            </>
          )}
        </>
      )}

      {sideBarMenu[1].isSelected && (
        <>
          {filteredNotes.length !== 0 ? (
            <>
              {filteredNotes.map((note, noteIndex) => (
                <div key={noteIndex}>
                  <SingleNote note={note} />
                </div>
              ))}
            </>
          ) : isSearching ? (
            <EmptyPlaceHolder
              muiIcon={<SearchOutlinedIcon className="text-slate-400" sx={{ fontSize: 110 }} />}
              text={<span className="text-md text-center text-slate-400">No snippets found.</span>}
            />
          ) : (
            <EmptyPlaceHolder
              muiIcon={
                <FavoriteBorderOutlinedIcon
                  className="text-md text-slate-400"
                  sx={{ fontSize: 110 }}
                />
              }
              text={
                <span className="text-md text-md text-center text-slate-400">
                  Currently, there are no snippets <br /> marked as favorites.
                </span>
              }
            />
          )}
        </>
      )}

      {sideBarMenu[2].isSelected && (
        <>
          {filteredNotes.length !== 0 ? (
            <>
              {filteredNotes.map((note, noteIndex) => (
                <div key={noteIndex}>
                  <SingleNote note={note} />
                </div>
              ))}
            </>
          ) : (
            <>
              <EmptyPlaceHolder
                muiIcon={
                  <DeleteOutlineOutlined className="text-slate-400" sx={{ fontSize: 110 }} />
                }
                text={
                  <span className="text-md text-center text-slate-400">
                    No snippets have been trashed.
                  </span>
                }
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default AllNotesSection;

function SingleNote({ note }: { note: SingleNoteType }) {
  const {
    darkModeObject: { darkMode },
    openContentNoteObject: {},
    selectedNoteObject: { selectedNote },
    allNotesObject: {},
  } = useGlobalContext();

  const { _id, title, creationDate, tags, description, code, isFavorite, isTrash, language } = note;

  return (
    <div
      className={`${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"} rounded-md py-4 hover:translate-y-[-1px] ${selectedNote?._id === _id && !selectedNote.isTrash ? "border border-rose-600" : ""} `}
    >
      <NoteHeader id={_id} title={title} isFavorite={isFavorite} isTrashed={isTrash} />
      <NoteDate creationDate={creationDate} />
      <NoteTags tags={tags} />
      <NoteDescription description={description} />
      <CodeBlock language={language} code={code} />
      <NoteFooter language={language} note={note} />
    </div>
  );
}

function NoteHeader({
  id,
  title,
  isFavorite,
  isTrashed,
}: {
  id: string;
  title: string;
  isFavorite: boolean;
  isTrashed: boolean;
}) {
  const {
    openContentNoteObject: { setOpenContentNote },
    allNotesObject: { allNotes, setAllNotes },
    selectedNoteObject: { setSelectedNote },
    isNewNoteObject: { setIsNewNote },
    searchQueryObject: { setSearchQuery },
  } = useGlobalContext();

  function clickedNoteTitle() {
    const findTheNote = allNotes.find((note) => note._id === id);

    if (findTheNote) {
      setSelectedNote(findTheNote);
    }

    if (!isTrashed) {
      setOpenContentNote(true);
    }

    setIsNewNote(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchQuery("");
  }

  async function handleClickedCheckbox() {
    const currentFavorite = isFavorite;
    const newFavorite = !currentFavorite;

    try {
      const response = await fetch(`/api/snippets?snippetId=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFavorite: newFavorite }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();

      setAllNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? { ...note, isFavorite: newFavorite } : note))
      );

      setSearchQuery("");
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  }

  return (
    <div className="mx-4 flex items-center justify-between">
      <span
        onClick={() => clickedNoteTitle()}
        className={`w-[90%] cursor-pointer overflow-hidden text-lg font-bold hover:text-rose-600`}
      >
        {truncateString(title, 40)}
      </span>

      {!isTrashed && (
        <Checkbox
          icon={<FavoriteBorderOutlinedIcon className="cursor-pointer text-slate-400" />}
          checkedIcon={<FavoriteIcon className="cursor-pointer text-rose-600" />}
          checked={isFavorite}
          onClick={handleClickedCheckbox}
        />
      )}
    </div>
  );
}

function NoteTags({ tags }: { tags: SingleTagType[] }) {
  return (
    <div className="mx-4 mt-4 flex flex-wrap gap-1 text-[11px] text-slate-500">
      {tags.length > 0 ? (
        <>
          {tags.map((tag, index) => (
            <span key={index} className="rounded-md bg-rose-100 p-1 px-2 text-rose-600">
              {tag.name}
            </span>
          ))}
        </>
      ) : (
        <span className="rounded-md bg-transparent p-1 px-2 text-transparent">.</span>
      )}
    </div>
  );
}

function NoteDate({ creationDate }: { creationDate: string }) {
  return (
    <div className="mx-4 mt-1 flex gap-1 text-[11px] font-light text-slate-500">
      <span className="">{getDateOnly(creationDate)}</span>
    </div>
  );

  function getDateOnly(dateTimeString: string) {
    const [date] = dateTimeString.split(", ");
    return date;
  }
}

function NoteDescription({ description }: { description: string }) {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <div
      className={`${darkMode[1].isSelected ? "text-white" : ""} mx-4 mt-4 text-[13px] text-slate-600`}
    >
      <span className="pre-wrap">{truncateString(description, 200)}</span>
    </div>
  );
}

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <div className="overflow-hidden rounded-md text-sm">
      <SyntaxHighlighter
        language={"javascript"}
        style={darkMode[1].isSelected ? oneDark : materialLight}
      >
        {truncateString(code, 300)}
      </SyntaxHighlighter>
    </div>
  );
};

function NoteFooter({ language, note }: { language: string; note: SingleNoteType }) {
  const {
    allNotesObject: { setAllNotes },
    darkModeObject: {},
    openConfirmationWindowObject: { setOpenConfirmationWindow },
    selectedNoteObject: { setSelectedNote },
    showPlaceHolderObject: { setShowPlaceHolder },
    openContentNoteObject: { openContentNote },
  } = useGlobalContext();

  async function trashNoteFunction() {
    if (note.isTrash) {
      setOpenConfirmationWindow(true);
      setSelectedNote(note);

      return;
    }

    try {
      const response = await fetch(`/api/snippets?snippetId=${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isTrash: true }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();

      setAllNotes((prevNotes) =>
        prevNotes.map((n) => (n._id === note._id ? { ...n, isTrash: true } : n))
      );

      setShowPlaceHolder(true);

      toast((t) => (
        <div className={`flex items-center gap-2`}>
          <span className="text-sm">Note has been moved to trash</span>
          <button
            className="flex items-center gap-1 rounded-md bg-rose-600 p-[4px] px-3 text-sm text-white"
            onClick={() => {
              toast.dismiss(t.id);
              resetNoteFunction(note._id);
            }}
          >
            <ReplayIcon sx={{ fontSize: 17 }} />
            <span>Undo</span>
          </button>
        </div>
      ));
    } catch (error) {
      console.error("Error moving note to trash:", error);
    }
  }

  async function resetNoteFunction(noteId: string) {
    try {
      const response = await fetch(`/api/snippets?snippetId=${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isTrash: false }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();

      setAllNotes((prevNotes) =>
        prevNotes.map((n) => (n._id === noteId ? { ...n, isTrash: false } : n))
      );

      setShowPlaceHolder(false);

      toast.success("Note restored from trash");
    } catch (error) {
      console.error("Error restoring note from trash:", error);
    }
  }

  return (
    <div className="mx-4 mt-3 flex justify-between text-[13px] text-slate-400">
      <div className="flex items-center gap-1">
        {getLanguageIcon(language)}
        <span>{language}</span>
      </div>
      <div className="flex items-center gap-2">
        {note.isTrash && (
          <RestoreFromTrashOutlinedIcon
            onClick={() => resetNoteFunction(note._id)}
            sx={{ fontSize: 17 }}
            className="cursor-pointer"
          />
        )}

        <DeleteRoundedIcon
          onClick={trashNoteFunction}
          sx={{ fontSize: 17 }}
          className={`cursor-pointer ${note.isTrash && "text-rose-600"} ${openContentNote ? "hidden" : ""}`}
        />
      </div>
    </div>
  );
}

function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}
