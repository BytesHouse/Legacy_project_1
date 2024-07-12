import { useRecoilState } from "recoil";
import { modalState } from "../../store/states";
import PeoplePost from "./PeoplePost";
import TrendsPost from "./TrendsPost";

const arrMock = [
  {
    text: "Above The Fold: Supply Chain Logistics News",
    date: "Jan 1, 2023",
    isPeople: false,
  },
  {
    text: "Some another text",
    date: "Jan 1, 2023",
    isPeople: true,
    img: "/assets/images/defaultAvatar.png",
    alt: "text",
  },
];

export default function Trends() {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  return (
    <div className="bg-white w-full border border-gray-2 rounded-2xl h-full p-[25px] col-span-9 mt-[25px]">
      <p className="font-[700] text-[24px] mb-[15px]">Trends on Qoobus</p>
      <p className="font-[600] text-[12px] mb-[25px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit!
      </p>
      <ul className="flex flex-col gap-[25px]">
        {arrMock.map(({ text, date, isPeople, img, alt }) => (
          <div
            onClick={(e: any) => {
              e.stopPropagation();
              setModalState(true);
            }}
            key={text}
            className="cursor-pointer"
          >
            {isPeople ? (
              <PeoplePost text={text} date={date} img={img} alt={alt} />
            ) : (
              <TrendsPost text={text} date={date} />
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}
