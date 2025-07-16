import { useGlobalContext } from "@/Context";
import CloseIcon from "@mui/icons-material/Close";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import React, { useEffect, useRef, useState } from "react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { allLanguages } from "@/app/data/Languages";
import AceEditor from "react-ace";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-tomorrow";
import { debounce } from "lodash";
import { useMemo } from "react";

export async function saveNoteInDB(
  note: SingleNoteType,
  isNew: boolean,

  setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>,
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | undefined>>,
  setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>
) {
  const url = isNew ? "/api/snippets" : `/api/snippets?snippetId=${note._id}`;
  const method = isNew ? "POST" : "PUT";
  const { _id, ...noteData } = note;
  const body = isNew ? JSON.stringify(noteData) : JSON.stringify(note);

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const savedNote = isNew ? { ...note, _id: data.notes._id } : note;

    setAllNotes((prevNotes) => {
      const updatedNotes = isNew
        ? [...prevNotes, savedNote]
        : prevNotes.map((n) => (n._id === savedNote._id ? savedNote : n));

      return updatedNotes.sort(
        (a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
      );
    });

    if (isNew) {
      setSingleNote(savedNote);
      setIsNewNote(false);
    }
  } catch (error) {
    console.error("Error saving note:", error);
  }
}

function ContentNote() {
  const {
    openContentNoteObject: { openContentNote },
    isMobileObject: { isMobile },
    selectedNoteObject: { selectedNote },
    isNewNoteObject: { isNewNote, setIsNewNote },
    allNotesObject: { allNotes, setAllNotes },
    darkModeObject: { darkMode },
    selectedLanguageObject: { selectedLanguage },
  } = useGlobalContext();

  const [singleNote, setSingleNote] = useState<SingleNoteType | undefined>(undefined);
  useEffect(() => {
    if (openContentNote) {
      if (selectedNote) {
        setSingleNote(selectedNote);
      }
    }
  }, [openContentNote, selectedNote]);

  useEffect(() => {
    if (singleNote && singleNote.title !== "") {
      debouncedSaveNote(singleNote, isNewNote);
    }
  }, [singleNote, isNewNote]);

  const debouncedSaveNote = useMemo(
    () =>
      debounce((note: SingleNoteType, isNew: boolean) => {
        saveNoteInDB(note, isNew);
      }, 500),
    []
  );

  async function saveNoteInDB(note: SingleNoteType, isNew: boolean) {
    const url = isNew ? "/api/snippets" : `/api/snippets?snippetId=${note._id}`;
    const method = isNew ? "POST" : "PUT";
    const { _id, ...noteData } = note;
    const body = isNew ? JSON.stringify(noteData) : JSON.stringify(note);

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const savedNote = isNew ? { ...note, _id: data.notes._id } : note;

      setAllNotes((prevNotes) => {
        const updatedNotes = isNew
          ? [...prevNotes, savedNote]
          : prevNotes.map((n) => (n._id === savedNote._id ? savedNote : n));

        if (isNew) {
          return updatedNotes.sort(
            (a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
          );
        }
        return updatedNotes;
      });

      if (isNew) {
        setSingleNote(savedNote);
        setIsNewNote(false);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  }

  useEffect(() => {
    if (selectedLanguage && singleNote) {
      const newLanguage = selectedLanguage.name;
      const updateSingleNote: SingleNoteType = {
        ...singleNote,
        language: newLanguage,
      };

      const updateAllNotes = allNotes.map((note) => {
        if (note._id === singleNote._id) {
          return updateSingleNote;
        }
        return note;
      });
      setAllNotes(updateAllNotes);

      setSingleNote(updateSingleNote);
    }
  }, [selectedLanguage]);

  return (
    <div
      className={` ${isMobile ? "mt-[50%] h-[1040px] w-4/5 shadow-lg" : "w-1/2"} z-30 rounded-lg p-6 ${openContentNote ? "block" : "hidden"} h-[100%] pb-9 ${isMobile ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : ""} ${darkMode[1].isSelected ? "bg-slate-800" : "bg-white"} `}
    >
      {singleNote && (
        <div>
          <ContentNoteHeader singleNote={singleNote} setSingleNote={setSingleNote} />
          <NoteTags singleNote={singleNote} setSingleNote={setSingleNote} />
          <Description singleNote={singleNote} setSingleNote={setSingleNote} />
          <CodeBlock singleNote={singleNote} setSingleNote={setSingleNote} />
        </div>
      )}
    </div>
  );
}

export default ContentNote;

function ContentNoteHeader({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | undefined>>;
}) {
  const {
    allNotesObject: {},
    openContentNoteObject: { setOpenContentNote, openContentNote },
    isNewNoteObject: { setIsNewNote },
    darkModeObject: { darkMode },
    selectedNoteObject: { setSelectedNote },
  } = useGlobalContext();

  const [onFocus, setOnFocus] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  function onUpdateTitle(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newSingleNote = { ...singleNote, title: event.target.value };
    setSingleNote(newSingleNote);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  useEffect(() => {
    if (openContentNote) {
      textRef.current?.focus();

      setOnFocus(true);
    }
  }, [openContentNote]);

  useEffect(() => {
    if (singleNote.title !== "") {
      setOnFocus(true);
    }
  }, [singleNote.title]);

  return (
    <div className="mb-4 flex justify-between gap-8">
      <div className="flex w-full gap-2">
        <TitleOutlinedIcon
          sx={{ fontSize: 19 }}
          className={`${onFocus ? "text-rose-600" : "text-slate-400"} mt-[4px]`}
        />
        <textarea
          ref={textRef}
          placeholder="New Title..."
          value={singleNote.title}
          onChange={onUpdateTitle}
          onKeyDown={handleKeyDown}
          onBlur={() => setOnFocus(false)}
          onFocus={() => setOnFocus(true)}
          onMouseEnter={() => setOnFocus(true)}
          onMouseLeave={() => setOnFocus(false)}
          className={`h-auto w-full resize-none overflow-hidden text-xl font-bold outline-none ${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"} `}
        />
      </div>
      <CloseIcon
        onClick={() => {
          setIsNewNote(false);
          setOpenContentNote(false);
          setSingleNote(undefined);
          setSelectedNote(null);
        }}
        className="mt-[7px] cursor-pointer text-slate-400"
        sx={{ cursor: "pointer", fontSize: 18 }}
      />
    </div>
  );
}

function NoteTags({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | undefined>>;
}) {
  const [hovered, setHovered] = useState(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const {
    allNotesObject: { allNotes, setAllNotes },
    allTagsObject: { allTags },
    selectedTagsObject: { selectedTags, setSelectedTags },
  } = useGlobalContext();

  const filterAllFromAllTags = allTags.filter((tag) => tag.name !== "All");

  useEffect(() => {
    if (isOpened) {
      setHovered(true);
    }
  }, [isOpened]);

  function onClickedTag(tag: SingleTagType) {
    if (selectedTags.some((t) => t.name === tag.name)) {
      setSelectedTags(selectedTags.filter((t) => t.name !== tag.name));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  useEffect(() => {
    const newSingleNote = { ...singleNote, tags: selectedTags };
    const newAllNotes = allNotes.map((note) => {
      if (note._id === singleNote._id) {
        return newSingleNote;
      }

      return note;
    });

    setAllNotes(newAllNotes);
    setSingleNote(newSingleNote);
  }, [selectedTags]);

  return (
    <div className="flex items-center gap-2 text-[13px]">
      <StyleOutlinedIcon
        sx={{ fontSize: 19 }}
        className={`${hovered ? "text-rose-600" : "text-slate-400"}`}
      />
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          if (!isOpened) setHovered(false);
        }}
        className="relative flex w-full justify-between"
      >
        <div className="flex select-none flex-wrap items-center gap-2">
          {singleNote.tags.length === 0 && (
            <div className="">
              <span className="rounded-md bg-slate-100 p-1 px-2 text-slate-400">No Tags</span>
            </div>
          )}

          {singleNote.tags.map((tag, index) => (
            <div key={index} className="rounded-md bg-slate-100 p-1 px-2 text-slate-400">
              {tag.name}
            </div>
          ))}
          {hovered && (
            <EditOutlinedIcon
              onClick={() => {
                setIsOpened(!isOpened);
              }}
              sx={{ fontSize: 19 }}
              className="cursor-pointer text-slate-400"
            />
          )}
        </div>
        {isOpened && filterAllFromAllTags.length > 0 && (
          <TagsMenu onClickedTag={(tag) => onClickedTag(tag)} setIsOpened={setIsOpened} />
        )}
      </div>
    </div>
  );

  interface SingleTagType {
    _id: string;
    name: string;
    clerkUserId: string;
  }
  function TagsMenu({
    onClickedTag,
    setIsOpened,
  }: {
    setIsOpened: (value: boolean) => void;
    onClickedTag: (tag: SingleTagType) => void;
  }) {
    const {
      allTagsObject: { allTags },
      selectedTagsObject: { selectedTags },
    } = useGlobalContext();
    const tagsRef = useRef<HTMLDivElement>(null);

    const filterAllItemsFromAllTags = allTags.filter((tag) => tag.name !== "All");

    const handleClickOutside = (event: MouseEvent) => {
      if (tagsRef.current && !tagsRef.current.contains(event.target as Node)) {
        setIsOpened(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div
        ref={tagsRef}
        className="absolute top-10 z-50 flex w-[60%] flex-col gap-2 rounded-md bg-slate-100 p-3"
      >
        {filterAllItemsFromAllTags.map((tag) => (
          <span
            key={tag._id}
            onClick={() => onClickedTag(tag)}
            className={` ${
              selectedTags.some((t) => t.name.toLowerCase() === tag.name.toLocaleLowerCase())
                ? "bg-slate-300"
                : ""
            } cursor-pointer select-none rounded-md p-1 px-2 text-slate-500 transition-all hover:bg-slate-300`}
          >
            {tag.name}
          </span>
        ))}
      </div>
    );
  }
}

function Description({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: (value: SingleNoteType) => void;
}) {
  const {
    darkModeObject: { darkMode },
    allNotesObject: {},
  } = useGlobalContext();

  const [isHovered, setIsHovered] = useState(false);

  function onUpdateDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newSingleNote = { ...singleNote, description: event.target.value };
    setSingleNote(newSingleNote);
  }

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight + 20}px`;
    }
  }, [singleNote.description]);

  return (
    <div className="mt-8 flex gap-2 text-[12px]">
      <DescriptionOutlinedIcon
        sx={{ fontSize: 18 }}
        className={`mt-[9px] ${isHovered ? "text-rose-600" : "text-slate-400"}`}
      />

      <textarea
        ref={textAreaRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onBlur={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onChange={onUpdateDescription}
        value={singleNote.description}
        placeholder="New Description..."
        className={`border text-sm outline-none ${isHovered ? "border-rose-600" : ""} w-full rounded-lg p-2 ${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"}`}
      />
    </div>
  );
}

function CodeBlock({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: (value: SingleNoteType) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const {
    darkModeObject: { darkMode },
    selectedLanguageObject: { selectedLanguage, setSelectedLanguage },
    selectedNoteObject: { selectedNote },
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  useEffect(() => {
    if (selectedNote) {
      if (selectedNote.language === "") {
        setSelectedLanguage(allLanguages[0]);
        return;
      }
      const findLanguage = allLanguages.find(
        (language) =>
          language.name.toLocaleLowerCase() === selectedNote.language.toLocaleLowerCase()
      );

      if (findLanguage) {
        setSelectedLanguage(findLanguage);
      }
    }
  }, [selectedNote]);

  function handleChange(code: string) {
    const newSingleNote = { ...singleNote, code: code };
    const updateAllNotes = allNotes.map((note) => {
      if (note._id === singleNote._id) {
        return newSingleNote;
      }

      return note;
    });
    setAllNotes(updateAllNotes);
    setSingleNote(newSingleNote);
  }

  function clickedCopyBtn() {
    navigator.clipboard.writeText(singleNote.code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1200);
  }

  return (
    <div className="relative mt-8 flex gap-2 text-[12px] text-slate-400">
      <CodeOutlinedIcon
        sx={{ fontSize: 18 }}
        className={`mt-[9px] ${isHovered ? "text-rose-600" : "text-slate-400"}`}
      />

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${isHovered ? "border-rose-600" : ""} relative w-full rounded-lg border p-3 pt-16`}
      >
        <div className="absolute right-4 top-4 z-40">
          <IconButton disabled={isCopied}>
            {isCopied ? (
              <DoneAllOutlinedIcon
                sx={{ fontSize: 18 }}
                className={`${darkMode[1].isSelected ? "text-white" : "text-slate-400"}`}
              />
            ) : (
              <ContentCopyOutlinedIcon
                onClick={() => clickedCopyBtn()}
                sx={{ fontSize: 18 }}
                className={`${darkMode[1].isSelected ? "text-white" : "text-slate-400"}`}
              />
            )}
          </IconButton>
        </div>

        <div
          onClick={() => setIsOpened(!isOpened)}
          className={`absolute left-3 top-1 mt-3 flex items-center justify-between gap-2 rounded-md bg-slate-100 p-[6px] px-3 text-[12px] ${darkMode[1].isSelected ? "bg-slate-600 text-white" : "bg-slate-100 text-slate-400"} cursor-pointer`}
        >
          <div className="flex items-center gap-1">
            {selectedLanguage?.icon}
            <span className="mt-[1px]">{selectedLanguage?.name}</span>
          </div>
          {isOpened ? (
            <KeyboardArrowUpOutlinedIcon sx={{ fontSize: 18 }} />
          ) : (
            <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 18 }} />
          )}
        </div>
        {isOpened && <LanguageMenu />}

        <AceEditor
          placeholder="Your code..."
          mode="javascript"
          theme="tomorrow"
          name="code-editor"
          width="100%"
          height="500px"
          fontSize={14}
          lineHeight={19}
          showPrintMargin={false}
          showGutter={false}
          highlightActiveLine={false}
          style={{
            backgroundColor: "transparent",
            color: darkMode[1].isSelected ? "white" : "black",
          }}
          value={singleNote.code}
          onChange={handleChange}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: false,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );

  function LanguageMenu() {
    const textRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const {
      selectedLanguageObject: { selectedLanguage, setSelectedLanguage },
    } = useGlobalContext();

    useEffect(() => {
      textRef.current?.focus();
    }, [isOpened]);

    const [filteredLanguages, setFilteredLanguages] = useState(allLanguages);
    const menuRef = useRef<HTMLDivElement>(null);
    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value.toLowerCase());
    };

    useEffect(() => {
      const filtered = allLanguages.filter((language) =>
        language.name.toLowerCase().includes(searchQuery)
      );
      setFilteredLanguages(filtered);
    }, [searchQuery]);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpened(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    function clickedLanguage(language: SingleCodeLanguageType) {
      setSelectedLanguage(language);
      setIsOpened(false);
    }

    return (
      <div
        ref={menuRef}
        className={`${darkMode[1].isSelected ? "bg-slate-600" : " "} absolute left-3 z-50 flex h-[220px] w-[250px] flex-col gap-2 rounded-md bg-slate-100 p-3 text-slate-400`}
      >
        <div
          className={`i${darkMode[1].isSelected ? "bg-slate-800" : "bg-slate-200"} mb-1 flex gap-1 rounded-md p-1`}
        >
          <SearchIcon />
          <input
            ref={textRef}
            placeholder="Search..."
            className="bg-transparent outline-none"
            onChange={onChangeSearch}
            value={searchQuery}
          />
        </div>

        <div className="h-40 overflow-x-auto bg-slate-100">
          {filteredLanguages.map((language) => (
            <div
              onClick={() => clickedLanguage(language)}
              key={language.id}
              className={`mb-2 flex cursor-pointer items-center gap-2 rounded-md p-[6px] px-3 hover:bg-slate-200 ${selectedLanguage?.name.toLocaleLowerCase() === language.name.toLocaleLowerCase() ? "bg-slate-200" : ""}`}
            >
              {language.icon}
              <span className="mt-[1px]">{language.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
