import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useGlobalContext } from "@/Context";
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
      className={`${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"} flex gap-5 rounded-lg p-3`}
    >
      <div className="w-[100%] overflow-x-auto">
        {isLoading ? (
          <div className="mt-[2px] flex items-center gap-3">
            <div className="h-[30px] w-[80px] rounded-md bg-slate-100"></div>
            <div className="h-[30px] w-[80px] rounded-md bg-slate-100"></div>
            <div className="h-[30px] w-[80px] rounded-md bg-slate-100"></div>
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
                className={`${tagsSelected[index] ? "bg-rose-600 text-white" : `${darkMode[1].isSelected ? "bg-slate-800" : "bg-white"} text-gray-400 hover:text-rose-600`} rounded-md p-1`}
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
        className="flex items-center gap-1 rounded-md bg-rose-600 p-1 px-3 text-sm text-white"
      >
        <AddOutlinedIcon sx={{ fontSize: 18 }} />
        <span>Tag</span>
      </button>
    </div>
  );
}
