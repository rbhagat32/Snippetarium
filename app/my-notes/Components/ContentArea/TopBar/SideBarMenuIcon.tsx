"use client";

import { useGlobalContext } from "@/Context";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

function SideBarMenuIcon() {
  const {
    openSideBarObject: { openSideBar, setOpenSideBar },
  } = useGlobalContext();
  return (
    <>
      {!openSideBar ? (
        <MenuOutlinedIcon
          onClick={() => setOpenSideBar(!openSideBar)}
          className="hidden cursor-pointer text-slate-500 max-md:block"
        />
      ) : (
        <CloseOutlinedIcon
          onClick={() => setOpenSideBar(!openSideBar)}
          className="hidden cursor-pointer text-slate-500 max-md:block"
        />
      )}
    </>
  );
}

export default SideBarMenuIcon;
