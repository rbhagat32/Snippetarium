"use client";

import { useGlobalContext } from "@/Context";
import getLanguageIcon from "@/app/utils/languageToIcon";
import { useClerk } from "@clerk/nextjs";
import CodeIcon from "@mui/icons-material/Code";

export default function Sidebar() {
  const {
    darkModeObject: { darkMode },
    openSideBarObject: { openSideBar },
    tagsAndLogoutMenuObject: { tagsAndLogoutMenu },
  } = useGlobalContext();

  const { signOut } = useClerk();

  return (
    <div
      className={`${openSideBar ? "fixed z-50 shadow-lg" : "max-md:hidden "} pr-10    p-6  flex-col gap-2  min-h-screen      pt-9 ${darkMode[1].isSelected ? "bg-slate-800" : "bg-white"} `}
    >
      <Logo />
      <QuickLinks />
      <Languages />
    </div>
  );

  function Logo() {
    return (
      <div className="flex gap-2 items-center">
        <div className={`bg-rose-600 p-[6px] rounded-md`}>
          <CodeIcon sx={{ fontSize: 27, color: "white" }} />
        </div>
        <div className="flex gap-0 text-[19px] ">
          <span className={`font-bold text-rose-600`}>Snippet</span>
          <span className="text-slate-400">arium</span>
        </div>
      </div>
    );
  }

  function QuickLinks() {
    const {
      sideBarMenuObject: { sideBarMenu, setSideBarMenu },
      openTagsWindowObject: { setOpenTagsWindow },
    } = useGlobalContext();

    function clickedMenu(index: number) {
      const updatedSideBarMenu = sideBarMenu.map((menu, i) => {
        if (i === index) {
          return { ...menu, isSelected: true };
        } else {
          return { ...menu, isSelected: false };
        }
      });

      setSideBarMenu(updatedSideBarMenu);
    }

    async function clickedTagsAndLogOutMenu(index: number) {
      if (index === 0) {
        setOpenTagsWindow(true);
      }

      if (index === 1) {
        await signOut();
      }
    }

    return (
      <div className="mt-20 text-sm">
        <div className="font-bold text-slate-400">Quick Links</div>
        <ul className="text-slate-400 mt-4 flex flex-col gap-2">
          {sideBarMenu.map((menu, index) => (
            <li
              key={index}
              onClick={() => clickedMenu(index)}
              className={`flex  cursor-pointer select-none gap-2 items-center ${menu.isSelected ? "bg-rose-600 text-white" : "text-slate-400 hover:text-rose-600"}  p-[7px] px-2 rounded-md w-[80%]`}
            >
              {menu.icons}
              <span>{menu.name}</span>
            </li>
          ))}
        </ul>

        <hr className="mt-4" />

        <ul className="text-slate-400 mt-6 flex flex-col gap-2">
          {tagsAndLogoutMenu.map((menu, index) => (
            <li
              key={index}
              onClick={() => clickedTagsAndLogOutMenu(index)}
              className={`flex cursor-pointer select-none gap-2 items-center ${menu.isSelected ? "bg-rose-600 text-white " : "text-slate-400"}  p-[7px] px-2 rounded-md w-[80%] hover:text-rose-600`}
            >
              {menu.icons}
              <span>{menu.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function Languages() {
  const {
    codeLanguageCounterObject: { codeLanguagesCounter },
  } = useGlobalContext();

  return (
    <div className="mt-12 text-sm">
      {codeLanguagesCounter.length > 0 && (
        <>
          <div className="font-bold text-slate-400">Languages</div>
          <div className="mt-5 ml-2 text-slate-400 flex flex-col gap-4">
            {codeLanguagesCounter.map((language, index) => (
              <div key={index} className="flex justify-between">
                <div className="flex gap-2 items-center">
                  {getLanguageIcon(
                    capitalizeFirstOccurrence(language.language)
                  )}
                  <span> {capitalizeFirstOccurrence(language.language)}</span>
                </div>
                <span className="font-bold">{language.count}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function capitalizeFirstOccurrence(str: string) {
  if (!str) return str;

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      return str.slice(0, i) + str[i].toUpperCase() + str.slice(i + 1);
    }
  }

  return str;
}
