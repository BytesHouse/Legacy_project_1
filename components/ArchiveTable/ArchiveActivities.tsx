import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { scrollTo } from "../../utils/scrollTo";

import { useCallback } from "react";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
import ProgressBar from "../ui-kit/ProgressBar";

export interface ArchiveActivityInterface {
  name: string;
  id: string;
  count: number;
}

interface ActivitiesProps {
  activities: ArchiveActivityInterface[];
  activitiesMenu: {
    letter: string;
    firstId: string;
    count: number;
    firstIndex: number;
  }[];
  country: string;
  totalCount: number;
}
interface ActivitiesInterface {
  name: string;
  id: string;
}

export default function ArchiveActivities({
  activities,
  activitiesMenu,
  country,
  totalCount,
}: ActivitiesProps) {
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [showCount, setShowCount] = useState(100);
  const [indexState, setIndexState] = useState(-1);
  const arrPath = country.split("/");
  const countryCode = arrPath[arrPath.length - 1];
  const display = useRef(null);

  const { getState: getActivitiesStorage, saveState: setActivitiesStorage } =
    useLocalStorage<ActivitiesInterface[]>("activities", []);

  useEffect(() => {
    const onScroll: EventListener = () => {
      const documentHeight = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;
      const modifier = 1300;

      if (currentScroll + modifier > documentHeight) {
        setShowCount((c) => c + 100);
      }
    };

    const win: Window = window;
    win.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHover = (activityIndex: number) => {
    const activityItem = activitiesMenu.find(
      ({ firstIndex, count }) => activityIndex < firstIndex + count
    );

    setSelectedLetter(activityItem?.letter || "A");
    setIndexState(activityIndex);
  };

  const handleLetterClick = (
    letter: string,
    firstId: string,
    firstIndex: number
  ) => {
    const indexCount = firstIndex + 100;
    const newCount = showCount > indexCount ? showCount : indexCount;
    setSelectedLetter(letter);
    setShowCount(newCount);
    setTimeout(() => {
      scrollTo(firstId);
    }, 50);
  };

  const saveInLocalStorage = (name: string, id: string) => {
    setActivitiesStorage([
      {
        name,
        id,
      },
      ...getActivitiesStorage()
        .slice(0, 19)
        .filter((el) => el.id !== id),
    ]);
  };

  const firstUppercase = (str: string) => {
    return str[0].toLocaleUpperCase() + str.slice(1).toLowerCase();
  };
  return (
    <div className="grid grid-cols-12 gap-5 h-full">
      <div className="col-span-1">
        <div className=" border-r border-gray-2 sticky top-0">
          {activitiesMenu.map(({ letter, firstId, firstIndex }) => (
            <div
              key={letter}
              className={`
                  hover:text-[#166AFF] py-2.5 text-10-12 lg:text-12-16 text-gray-50 cursor-pointer text-center
                  ${
                    selectedLetter === letter
                      ? "text-16-22 lg:text-20-26 text-[#166AFF]"
                      : ""
                  }
                `}
              onClick={() => handleLetterClick(letter, firstId, firstIndex)}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>

      <div ref={display} className="col-span-11">
        <div>
          <div className="text-gray-80  sticky top-5">
            {activities.slice(0, showCount).map((activity, index) => (
              <div
                key={`${activity.id}${activity.count}`}
                id={activity.id}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => setIndexState(-1)}
              >
                <Link
                  prefetch={false}
                  href={`/activity?activity=${activity.id}&page=1&countryCode=${countryCode}`}
                >
                  <div
                    className="grid grid-cols-10 gap-[25px] py-1.5 cursor-pointer mr-5 group"
                    onClick={() =>
                      saveInLocalStorage(activity.name, activity.id)
                    }
                    onContextMenu={() =>
                      saveInLocalStorage(activity.name, activity.id)
                    }
                  >
                    <p
                      className={`col-span-1 w-[65px] text-left text-[13px] font-[400] group-hover:text-[#166AFF]`}
                    >
                      ({activity.id})
                    </p>
                    <p className="text-[13px] font-[400] col-span-8 truncate group-hover:text-[#166AFF]">
                      {firstUppercase(activity.name)}
                    </p>
                    <p
                      className={`text-right text-[13px] font-[400] group-hover:text-[#166AFF]`}
                    >
                      {activity.count}
                    </p>

                    {/* <div className="self-center col-span-2">
                      <ProgressBar
                        size={Number(
                          ((activity.count * 100) / totalCount).toFixed(2)
                        )}
                        percent={Number(
                          ((activity.count * 100) / totalCount).toFixed(2)
                        )}
                      />
                    </div> */}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
