"use client";

import { useUser } from "@clerk/nextjs";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface GlobalContextType {
  sharedUserIdObject: {
    sharedUserId: string;
    setSharedUserId: React.Dispatch<React.SetStateAction<string>>;
  };
  sideBarMenuObject: {
    sideBarMenu: SideBarMenu[];
    setSideBarMenu: React.Dispatch<React.SetStateAction<SideBarMenu[]>>;
  };
  darkModeObject: {
    darkMode: DarkModeType[];
    setDarkMode: React.Dispatch<React.SetStateAction<DarkModeType[]>>;
  };

  openSideBarObject: {
    openSideBar: boolean;
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  };

  openContentNoteObject: {
    openContentNote: boolean;
    setOpenContentNote: React.Dispatch<React.SetStateAction<boolean>>;
  };
  isMobileObject: {
    isMobile: boolean;
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allNotesObject: {
    allNotes: SingleNoteType[];
    setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>;
  };

  selectedNoteObject: {
    selectedNote: SingleNoteType | null;
    setSelectedNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>;
  };

  isNewNoteObject: {
    isNewNote: boolean;
    setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allTagsObject: {
    allTags: SingleTagType[];
    setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>;
  };

  selectedTagsObject: {
    selectedTags: SingleTagType[];
    setSelectedTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>;
  };
  selectedLanguageObject: {
    selectedLanguage: SingleCodeLanguageType | null;
    setSelectedLanguage: React.Dispatch<React.SetStateAction<SingleCodeLanguageType | null>>;
  };

  openConfirmationWindowObject: {
    openConfirmationWindow: boolean;
    setOpenConfirmationWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };

  codeLanguageCounterObject: {
    codeLanguagesCounter: CodeLanguageCounterType[];
    setCodeLanguagesCounter: React.Dispatch<React.SetStateAction<CodeLanguageCounterType[]>>;
  };

  openTagsWindowObject: {
    openTagsWindow: boolean;
    setOpenTagsWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };

  tagsAndLogoutMenuObject: {
    tagsAndLogoutMenu: SideBarMenu[];
    setTagsAndLogoutMenu: React.Dispatch<React.SetStateAction<SideBarMenu[]>>;
  };
  openNewTagsWindowObject: {
    openNewTagsWindow: boolean;
    setOpenNewTagsWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };

  selectedTagToEditObject: {
    selectedTagToEdit: SingleTagType | null;
    setSelectedTagToEdit: React.Dispatch<React.SetStateAction<SingleTagType | null>>;
  };

  tagsClickedObject: {
    tagsClicked: string[];
    setTagsClicked: React.Dispatch<React.SetStateAction<string[]>>;
  };
  searchQueryObject: {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  };

  isLoadingObject: {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
  showPlaceHolderObject: {
    showPlaceHolder: boolean;
    setShowPlaceHolder: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const ContextProvider = createContext<GlobalContextType>({
  sharedUserIdObject: {
    sharedUserId: "",
    setSharedUserId: () => {},
  },

  sideBarMenuObject: {
    sideBarMenu: [],
    setSideBarMenu: () => {},
  },
  darkModeObject: {
    darkMode: [],
    setDarkMode: () => {},
  },

  openSideBarObject: {
    openSideBar: false,
    setOpenSideBar: () => {},
  },

  openContentNoteObject: {
    openContentNote: false,
    setOpenContentNote: () => {},
  },

  isMobileObject: {
    isMobile: false,
    setIsMobile: () => {},
  },
  allNotesObject: {
    allNotes: [],
    setAllNotes: () => {},
  },

  selectedNoteObject: {
    selectedNote: null,
    setSelectedNote: () => {},
  },

  isNewNoteObject: {
    isNewNote: false,
    setIsNewNote: () => {},
  },
  allTagsObject: {
    allTags: [],
    setAllTags: () => {},
  },
  selectedTagsObject: {
    selectedTags: [],
    setSelectedTags: () => {},
  },
  selectedLanguageObject: {
    selectedLanguage: null,
    setSelectedLanguage: () => {},
  },

  openConfirmationWindowObject: {
    openConfirmationWindow: false,
    setOpenConfirmationWindow: () => {},
  },

  codeLanguageCounterObject: {
    codeLanguagesCounter: [],
    setCodeLanguagesCounter: () => {},
  },

  openTagsWindowObject: {
    openTagsWindow: false,
    setOpenTagsWindow: () => {},
  },

  tagsAndLogoutMenuObject: {
    tagsAndLogoutMenu: [],
    setTagsAndLogoutMenu: () => {},
  },
  openNewTagsWindowObject: {
    openNewTagsWindow: false,
    setOpenNewTagsWindow: () => {},
  },
  selectedTagToEditObject: {
    selectedTagToEdit: null,
    setSelectedTagToEdit: () => {},
  },
  tagsClickedObject: {
    tagsClicked: [],
    setTagsClicked: () => {},
  },
  searchQueryObject: {
    searchQuery: "",
    setSearchQuery: () => {},
  },
  isLoadingObject: {
    isLoading: true,
    setIsLoading: () => {},
  },
  showPlaceHolderObject: {
    showPlaceHolder: false,
    setShowPlaceHolder: () => {},
  },
});

export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [sideBarMenu, setSideBarMenu] = useState<SideBarMenu[]>([
    {
      id: 1,
      name: "All Snippets",
      isSelected: true,
      icons: <BorderAllIcon sx={{ fontSize: 18 }} />,
    },
    {
      id: 2,
      name: "Favorites",
      isSelected: false,
      icons: <FavoriteBorderIcon sx={{ fontSize: 18 }} />,
    },

    {
      id: 3,
      name: "Trash",
      isSelected: false,
      icons: <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />,
    },
  ]);

  const [darkMode, setDarkMode] = useState<DarkModeType[]>([
    {
      id: 1,
      icon: <LightModeIcon sx={{ fontSize: 18 }} />,
      isSelected: true,
    },
    {
      id: 2,
      icon: <DarkModeIcon sx={{ fontSize: 18 }} />,
      isSelected: false,
    },
  ]);

  const [openSideBar, setOpenSideBar] = useState(false);
  const [openContentNote, setOpenContentNote] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [allNotes, setAllNotes] = useState<SingleNoteType[]>([]);
  const [allTags, setAllTags] = useState<SingleTagType[]>([]);
  const [selectedNote, setSelectedNote] = useState<SingleNoteType | null>(null);
  const [isNewNote, setIsNewNote] = useState(false);
  const [selectedTags, setSelectedTags] = useState<SingleTagType[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<SingleCodeLanguageType | null>(null);
  const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
  const [codeLanguagesCounter, setCodeLanguagesCounter] = useState<CodeLanguageCounterType[]>([]);
  const [openTagsWindow, setOpenTagsWindow] = useState(false);
  const [openNewTagsWindow, setOpenNewTagsWindow] = useState(false);
  const [tagsAndLogoutMenu, setTagsAndLogoutMenu] = useState<SideBarMenu[]>([
    {
      id: 1,
      name: "Tags",
      isSelected: false,
      icons: <StyleOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
      id: 2,
      name: "Log Out",
      isSelected: false,
      icons: <LogoutIcon sx={{ fontSize: 18 }} />,
    },
  ]);
  const [selectedTagToEdit, setSelectedTagToEdit] = useState<SingleTagType | null>(null);
  const [tagsClicked, setTagsClicked] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded, isSignedIn, user } = useUser();
  const [sharedUserId, setSharedUserId] = useState<string>("");
  const [showPlaceHolder, setShowPlaceHolder] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 640);
  };

  useEffect(() => {
    if (user) {
      setSharedUserId(user?.id);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    async function fetchAllNotes() {
      try {
        const response = await fetch(`/api/snippets?clerkId=${user?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch snippets");
        }
        const data: { notes: SingleNoteType[] } = await response.json();
        if (data.notes) {
          const sortedAllNotes: SingleNoteType[] = data.notes.sort((a, b) => {
            return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
          });

          setAllNotes(sortedAllNotes);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchAllTags() {
      try {
        const response = await fetch(`/api/tags?clerkId=${user?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }
        const data: { tags: SingleTagType[] } = await response.json();
        if (data.tags) {
          const allTag: SingleTagType = {
            _id: uuidv4(),
            name: "All",
            clerkUserId: user?.id || "",
          };

          const tempAllTags = [allTag, ...data.tags];

          setAllTags(tempAllTags);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoaded && isSignedIn) {
      fetchAllTags();
      fetchAllNotes();
    }
  }, [user, isLoaded, isSignedIn]);

  useEffect(() => {
    setSelectedTags(selectedNote?.tags || []);
  }, [selectedNote]);

  useEffect(() => {
    if (openContentNote === false) {
    }
    const filteredNotes = allNotes.filter((note) => {
      return note.title.trim() !== "" || note.description.trim() !== "" || note.code.trim() !== "";
    });
    setAllNotes(filteredNotes);
  }, [openContentNote]);

  const [swappedIndex, setSwappedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openContentNote && selectedNote) {
      const selectedIndex = allNotes.findIndex((note) => note._id === selectedNote._id);

      if (selectedIndex > 0) {
        const updatedNotes = [...allNotes];
        [updatedNotes[0], updatedNotes[selectedIndex]] = [
          updatedNotes[selectedIndex],
          updatedNotes[0],
        ];
        setAllNotes(updatedNotes);

        setSwappedIndex(selectedIndex);
      }
    } else if (!openContentNote && swappedIndex !== null) {
      const updatedNotes = [...allNotes];
      [updatedNotes[0], updatedNotes[swappedIndex]] = [updatedNotes[swappedIndex], updatedNotes[0]];
      setAllNotes(updatedNotes);

      setSwappedIndex(null);
    }
  }, [openContentNote, selectedNote, allNotes, swappedIndex]);

  useEffect(() => {
    const languageCounts: Record<string, number> = {};

    allNotes.forEach((note) => {
      const language = note.language.toLowerCase();
      if (languageCounts[language]) {
        languageCounts[language]++;
      } else {
        languageCounts[language] = 1;
      }
    });

    const convertedLanguageCounts: CodeLanguageCounterType[] = Object.entries(languageCounts)
      .map(([language, count]) => ({
        language,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    setCodeLanguagesCounter(convertedLanguageCounts);
  }, [allNotes]);

  useEffect(() => {
    if (openTagsWindow) {
      setOpenTagsWindow(false);
    }
    setSelectedNote(null);
  }, [sideBarMenu]);

  return (
    <ContextProvider.Provider
      value={{
        sideBarMenuObject: { sideBarMenu, setSideBarMenu },
        darkModeObject: { darkMode, setDarkMode },
        openSideBarObject: { openSideBar, setOpenSideBar },
        openContentNoteObject: { openContentNote, setOpenContentNote },
        isMobileObject: { isMobile, setIsMobile },
        allNotesObject: { allNotes, setAllNotes },
        selectedNoteObject: { selectedNote, setSelectedNote },
        isNewNoteObject: { isNewNote, setIsNewNote },
        allTagsObject: { allTags, setAllTags },
        selectedTagsObject: { selectedTags, setSelectedTags },
        selectedLanguageObject: { selectedLanguage, setSelectedLanguage },
        openConfirmationWindowObject: {
          openConfirmationWindow,
          setOpenConfirmationWindow,
        },
        codeLanguageCounterObject: {
          codeLanguagesCounter,
          setCodeLanguagesCounter,
        },

        openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
        tagsAndLogoutMenuObject: { tagsAndLogoutMenu, setTagsAndLogoutMenu },
        openNewTagsWindowObject: { openNewTagsWindow, setOpenNewTagsWindow },
        selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit },
        tagsClickedObject: { tagsClicked, setTagsClicked },
        searchQueryObject: { searchQuery, setSearchQuery },
        isLoadingObject: { isLoading, setIsLoading },
        sharedUserIdObject: { sharedUserId, setSharedUserId },
        showPlaceHolderObject: { showPlaceHolder, setShowPlaceHolder },
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}
export const useGlobalContext = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
};

export async function updateNoteInDb(note: SingleNoteType) {
  try {
    const response = await fetch(`/api/snippets?snippetId=${note._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: note.title,
        isFavorite: note.isFavorite,
        clerkUserId: note.clerkUserId,
        tags: note.tags,
        description: note.description,
        code: note.code,
        language: note.language,
        creationDate: note.creationDate,
        isTrash: note.isTrash,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error updating note:", error);
  }
}
