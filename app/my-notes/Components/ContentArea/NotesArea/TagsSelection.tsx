import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function TagsSelection() {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-3 text-sm">
      <div className="flex gap-2">
        <div className="cursor-pointer select-none rounded-md bg-rose-500 p-1 px-4 text-white">
          All
        </div>
        <div className="cursor-pointer select-none rounded-md p-1 px-4 text-slate-400">
          functions
        </div>
        <div className="cursor-pointer select-none rounded-md p-1 px-4 text-slate-400">
          exercises
        </div>
      </div>
      <div className="flex items-center gap-1 rounded-md bg-rose-600 p-1 px-3 text-white">
        <AddOutlinedIcon sx={{ fontSize: 18 }} />
        <span>Tag</span>
      </div>
    </div>
  );
}

export default TagsSelection;
