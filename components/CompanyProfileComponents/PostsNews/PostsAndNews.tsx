import Link from "next/link";
import Image from "next/image";

import BlockTitle from "../BlockTitle";
import ViewMore from "../ViewMore";
import PostCompanyTitle from "./PostCompanyTitle";
import ChatIcon from "./ChatIcon";
import ArrowrightIcon from "../../Icons/ArrowRightIcon";
import { useTranslation } from "next-i18next";
import { useRecoilState } from "recoil";
import { modalState } from "../../../store/states";

export default function PostsAndNews() {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const { t } = useTranslation();
  const onClick = (e: any) => {
    e.stopPropagation();
    setModalState(true);
  };
  return (
    <div className="col-span-7 bg-white border border-gray-2 rounded-[12px] shadow-search w-full text-sm">
      <BlockTitle text={"posts_news"} />
      <div className="p-5 text-blue-black text-sm capitalize">
        <button
          onClick={onClick}
          className="border border-gray-2 rounded-lg shadow-search"
        >
          <PostCompanyTitle />
          <p className="text-lg font-medium text-black-carbon border-b border-gray-2 p-5">
            The recording starts with the patter of a summer squall.{" "}
          </p>
          <div className="grid-cols-12 grid m-5 pb-5 gap-x-[30px] border-b border-gray-2">
            <div className="col-span-6 flex gap-2.5">
              <Image
                className="rounded-full w-[30px] h-[30px]"
                src={"/assets/images/main.png"}
                width="0"
                height="0"
                sizes="100vw"
                alt={"any"}
              />
              <div className="border border-gray-2 w-full flex justify-between px-2.5 py-1.5 rounded-md">
                <p className="text-xxs text-black-carbon">
                  {t("write_comment")}
                </p>
                <div>
                  <ChatIcon icon="fly" />
                </div>
              </div>
            </div>
            <div className="col-span-6 flex gap-x-4 items-center">
              <div className="bg-gray-f2 h-5 px-[14px] flex justify-center items-center gap-x-1.5 rounded-md">
                <div>
                  <ChatIcon icon="filledHearth" />
                </div>
                <p className="text-[10px]">1</p>
              </div>
              <div className="bg-gray-f2 px-[14px] flex justify-center items-center gap-x-1.5 rounded-md">
                <div className="w-3">
                  <ChatIcon icon="comments" />
                </div>
                <p className="text-[10px]">3</p>
              </div>
              <div className="bg-gray-f2 px-[14px] flex justify-center items-center gap-x-1.5 rounded-md">
                <div className="w-[13px]">
                  <ChatIcon icon="repost" />
                </div>
                <p className="text-[10px]">0</p>
              </div>
              <div className="ml-auto h-[14px] my-auto">
                <ChatIcon icon="shield" />
              </div>
            </div>
          </div>
          <div className="grid-cols-12 grid m-5 pb-5 gap-x-2.5 gap-y-[14px] border-b border-gray-2">
            <div className="col-span-12 flex justify-between">
              <div className="flex gap-2.5">
                <div>
                  <Image
                    className="rounded-full"
                    src={"/assets/images/gabe.png"}
                    width={25}
                    height={25}
                    alt={"any"}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex items-center text-xs2 text-black-carbon font-bold h-[25px]">
                    <p>Jayme Wang</p>
                  </div>
                  <p className="text-xxs font-medium text-pewter-gray">
                    23 minutes ago
                  </p>
                </div>
              </div>
              <div className="h-[11px]">
                <ChatIcon icon="kebabMenu" />
              </div>
            </div>
            <div className="col-span-11 col-start-2 flex flex-wrap">
              <p className="text-xs2 leading-5 mb-[13px] bg-gray-f2 rounded-md py-2.5 px-5 w-full">
                Aaron Judge, a 25-year-old Yankees rookie, finally offered some
                evidence that he is, in fact, fallible. In the first inning of
                Wednesday night’s game against the Toronto Blue Jays.
              </p>
              <div className="bg-gray-f2 mr-5 h-5 px-[14px] flex justify-center items-center gap-x-1.5 rounded-md">
                <div>
                  <ChatIcon icon="filledHearth" />
                </div>
                <p className="text-[10px]">1</p>
              </div>
              <p className="flex items-center text-xs font-semibold gap-x-2.5">
                Reply to comment <ArrowrightIcon color={"#37383A"} />
              </p>
            </div>
            <div className="col-span-11 col-start-2 flex justify-between">
              <div className="flex gap-2.5">
                <div>
                  <Image
                    className="rounded-full"
                    src={"/assets/images/jayne.png"}
                    width={25}
                    height={25}
                    alt={"any"}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex items-center text-xs2 text-black-carbon font-bold h-[25px]">
                    <p>Delmer Hawker</p>
                  </div>
                  <p className="text-xxs font-medium text-pewter-gray">
                    43 minutes ago
                  </p>
                </div>
              </div>
              <div className="h-[11px]">
                <ChatIcon icon="kebabMenu" />
              </div>
            </div>
            <div className="col-span-10 col-start-3 flex flex-wrap">
              <p className="text-xs2 leading-5 mb-[13px] bg-gray-f2 rounded-md py-2.5 px-5 w-full">
                Rising Knife Violence Alarms Britain as Youths Take Up Blades
              </p>
              <div className="bg-gray-f2 mr-5 h-5 px-[14px] flex justify-center items-center gap-x-1.5 rounded-md">
                <div className="h-[13px]">
                  <ChatIcon />
                </div>
                <p className="text-[10px]">0</p>
              </div>
              <p className="flex items-center text-xs font-semibold gap-x-2.5">
                Reply to comment <ArrowrightIcon color={"#37383A"} />
              </p>
            </div>
          </div>
          <div className="grid-cols-12 grid mx-5 pb-5 gap-x-2.5 gap-y-[14px]">
            <div className="col-span-12 flex justify-between">
              <div className="flex gap-2.5">
                <div>
                  <Image
                    className="rounded-full"
                    src={"/assets/images/gabe.png"}
                    width={25}
                    height={25}
                    alt={"any"}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex items-center text-xs2 text-black-carbon font-bold h-[25px]">
                    <p>Jayme Wang</p>
                  </div>
                  <p className="text-xxs font-medium text-pewter-gray">
                    23 minutes ago
                  </p>
                </div>
              </div>
              <div className="h-[11px]">
                <ChatIcon icon="kebabMenu" />
              </div>
            </div>
            <div className="col-span-11 col-start-2 flex flex-wrap">
              <p className="text-xs2 leading-5 mb-[13px] bg-gray-f2 rounded-md py-2.5 px-5 w-full">
                Aaron Judge, a 25-year-old Yankees rookie, finally offered some
                evidence that he is, in fact, fallible. In the first inning of
                Wednesday night’s game against the Toronto Blue Jays.
              </p>
              <div className="bg-gray-f2 mr-5 h-5 px-[14px] flex justify-center items-center gap-x-1.5 rounded-md">
                <div className="h-[13px]">
                  <ChatIcon icon="hearth" />
                </div>
                <p className="text-[10px]">0</p>
              </div>
              <p className="flex items-center text-xs font-semibold gap-x-2.5">
                Reply to comment <ArrowrightIcon color={"#37383A"} />
              </p>
            </div>
          </div>
        </button>
        <div className="border mt-[15px] border-gray-2 rounded-lg shadow-search">
          <PostCompanyTitle />
          <p className="text-xs2 leading-[22px] font-medium text-black-carbon border-b border-gray-2 p-5">
            The recording starts with the patter of a summer squall. A drifting
            tone like that of a not-quite-tuned-in radio station rises and for a
            while drowns out the patter. These are the sounds encountered by
            NASA’s Cassini spacecraft as it dove through the gap between Saturn
            and its innermost ring.{" "}
          </p>
          <div className="w-full flex gap-2.5 p-5">
            <Image
              className="rounded-full w-[25px] h-[25px]"
              src={"/assets/images/main.png"}
              width="0"
              height="0"
              sizes="100vw"
              alt={"any"}
            />
            <div className="border border-gray-2 w-full flex justify-between px-2.5 py-1.5 rounded-md">
              <p className="text-xxs text-black-carbon">{t("write_comment")}</p>
              <div>
                <ChatIcon icon="fly" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ViewMore cb={onClick} />
    </div>
  );
}
