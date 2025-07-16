import { OpenTheContentNote } from "@/app/EmptyPlaceHolder";
import { useGlobalContext } from "@/Context";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  const {
    darkModeObject: { darkMode },
    sideBarMenuObject: {},
    searchQueryObject: { searchQuery, setSearchQuery },
  } = useGlobalContext();

  return (
    <div
      className={`${darkMode[1].isSelected ? "bg-slate-700" : "bg-slate-100"} relative flex h-[38px] w-[60%] items-center gap-2 rounded-3xl pl-3`}
    >
      <SearchIcon className="text-rose-500" sx={{ fontsize: 13 }} />
      <input
        placeholder="Search a snippet..."
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className={` ${darkMode[1].isSelected ? "bg-slate-700" : "bg-slate-100"} w-[70%] text-[12px] text-sm text-slate-500 outline-none`}
      />
      <AddSnippetButton />
    </div>
  );

  function AddSnippetButton() {
    const {
      openContentNoteObject: { setOpenContentNote, openContentNote },
      selectedNoteObject: { setSelectedNote },
      allNotesObject: {},
      isNewNoteObject: { setIsNewNote },
      sideBarMenuObject: {},
      sharedUserIdObject: { sharedUserId },
    } = useGlobalContext();

    return (
      <button
        disabled={openContentNote}
        onClick={() =>
          OpenTheContentNote(
            setIsNewNote,
            setSelectedNote,
            setOpenContentNote,
            sharedUserId,
          )
        }
        className={`absolute right-[6px] top-[6px] flex cursor-pointer select-none items-center gap-1 rounded-3xl p-1 px-2 text-[13px] text-white max-md:px-1 ${openContentNote ? "bg-rose-300" : "bg-rose-600"}`}
      >
        <AddOutlinedIcon sx={{ fontSize: 18 }} />
        <div className="max-md:hidden">Snippet</div>
      </button>
    );
  }
}

export default SearchBar;
