import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useGlobalContext } from "@/ContextApi";
import { FreeMode } from "swiper/modules";

export default function SwiperSelection() {
  const {
    darkModeObject: { darkMode },
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    allTagsObject: { allTags },
    tagsClickedObject: { setTagsClicked },
    sideBarMenuObject: { sideBarMenu },
    searchQueryObject: { searchQuery },
    isLoadingObject: { isLoading },
  } = useGlobalContext();

  const [tagsSelected, setTagsSelected] = useState<boolean[]>([]);

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      const newTagsSelected = Array(allTags.length).fill(false);
      newTagsSelected[0] = true;
      setTagsSelected(newTagsSelected);
    }
  }, [searchQuery]);

  useEffect(() => {
    setTagsClicked((prevTagsClicked) => {
      const newTagsClicked = allTags.reduce(
        (acc, tag, index) => {
          if (tagsSelected[index]) {
            if (!prevTagsClicked.includes(tag.name)) {
              acc.push(tag.name);
            }
          } else {
            if (prevTagsClicked.includes(tag.name)) {
              const tagIndex = acc.indexOf(tag.name);
              if (tagIndex !== -1) {
                acc.splice(tagIndex, 1);
              }
            }
          }
          return acc;
        },
        [...prevTagsClicked]
      );

      return newTagsClicked;
    });
  }, [tagsSelected]);

  useEffect(() => {
    if (allTags) {
      const newTagsSelected = Array(allTags.length).fill(false);
      newTagsSelected[0] = true;
      setTagsSelected(newTagsSelected);
    }
  }, [allTags]);

  useEffect(() => {
    if (sideBarMenu) {
      const newTagsSelected = Array(allTags.length).fill(false);
      const newTagsClicked = ["All"];
      newTagsSelected[0] = true;
      setTagsClicked(newTagsClicked);
      setTagsSelected(newTagsSelected);
    }
  }, [sideBarMenu]);

  const handleTagClick = (index: number) => {
    const newTagsSelected = [...tagsSelected];

    if (index === 0) {
      newTagsSelected[0] = true;

      for (let index = 1; index < newTagsSelected.length; index++) {
        newTagsSelected[index] = false;
      }

      setTagsSelected(newTagsSelected);
      return;
    } else {
      newTagsSelected[0] = false;
      newTagsSelected[index] = !newTagsSelected[index];
      setTagsSelected(newTagsSelected);
    }

    if (newTagsSelected.every((tag) => !tag)) {
      newTagsSelected[0] = true;
      setTagsSelected(newTagsSelected);
    }
  };

  return (
    <div
      className={`${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"}  p-3 rounded-lg flex gap-5 `}
    >
      <div className="overflow-x-auto w-[100%]    ">
        {isLoading ? (
          <div className="flex  gap-3 items-center mt-[2px]   ">
            <div className="w-[80px] h-[30px] bg-slate-100 rounded-md"></div>
            <div className="w-[80px] h-[30px] bg-slate-100 rounded-md"></div>
            <div className="w-[80px] h-[30px] bg-slate-100 rounded-md"></div>
          </div>
        ) : (
          <Swiper
            slidesPerView="auto"
            spaceBetween={10}
            freeMode={true}
            className="mySwiper"
            modules={[FreeMode]}
          >
            {allTags.map((tag, index) => (
              <SwiperSlide
                key={index}
                className={`${tagsSelected[index] ? "bg-purple-600 text-white" : `${darkMode[1].isSelected ? "bg-slate-800" : "bg-white"} hover:text-purple-600   text-gray-400`}   p-1 rounded-md  `}
                onClick={() => handleTagClick(index)}
              >
                {tag.name}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <button
        onClick={() => setOpenNewTagsWindow(true)}
        className="bg-purple-600 p-1 rounded-md px-3 flex gap-1 items-center text-white text-sm"
      >
        <AddOutlinedIcon sx={{ fontSize: 18 }} />
        <span>Tag</span>
      </button>
    </div>
  );
}
