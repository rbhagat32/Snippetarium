import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function TagsSelection() {
  return (
    <div className="bg-white p-3 text-sm flex justify-between items-center rounded-lg">
      <div className="flex gap-2">
        <div className="bg-purple-500 text-white p-1 px-4 rounded-md cursor-pointer select-none ">
          All
        </div>
        <div className=" text-slate-400 p-1 px-4 rounded-md cursor-pointer select-none">
          functions
        </div>
        <div className=" text-slate-400 p-1 px-4 rounded-md cursor-pointer select-none">
          exercises
        </div>
      </div>
      <div className="bg-purple-600 p-1 rounded-md px-3 flex gap-1 items-center text-white">
        <AddOutlinedIcon sx={{ fontSize: 18 }} />
        <span>Tag</span>
      </div>
    </div>
  );
}

export default TagsSelection;
