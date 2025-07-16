import { OpenTheContentNote } from "@/app/EmptyPlaceHolder";
import { useGlobalContext } from "@/ContextApi";
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
      className={`${darkMode[1].isSelected ? "bg-slate-700" : "bg-slate-100"} relative pl-3 w-[60%] h-[38px] rounded-3xl flex items-center gap-2`}
    >
      <SearchIcon className="text-purple-500" sx={{ fontsize: 13 }} />
      <input
        placeholder="Search a snippet..."
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className={` ${darkMode[1].isSelected ? "bg-slate-700" : "bg-slate-100"} w-[70%] outline-none text-sm  text-slate-500 text-[12px]`}
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
            sharedUserId
          )
        }
        className={`absolute flex gap-1 px-2 rounded-3xl max-md:px-1    p-1 
      text-[13px] text-white top-[6px] right-[6px] items-center cursor-pointer select-none ${openContentNote ? "bg-purple-300" : "bg-purple-600"}`}
      >
        <AddOutlinedIcon sx={{ fontSize: 18 }} />
        <div className="max-md:hidden ">Snippet</div>
      </button>
    );
  }
}

export default SearchBar;
