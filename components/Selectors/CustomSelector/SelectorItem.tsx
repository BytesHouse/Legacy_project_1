import ItemsArr from "./interfaces/ItemsArr.interface";
import { useTranslation } from 'next-i18next';

interface SelectorItemProps {
  arrItems: ItemsArr[];
  current: string;
  onClick?: (f: string, id: number) => void;
  field: string;
}

export default function SelectorItem({ arrItems, onClick = () => { },current, field }: SelectorItemProps) {
  const { t } = useTranslation()

  return (
    <div
      className={`absolute z-20 left-0 top-[15px] pt-[15px]`}
    >
      <div className={`bg-white rounded-[10px] shadow-menu p-[10px] `}>
        <ul>
          {arrItems.map(({ text }, i) => {
            if (text === current) {
              return null;
            }
            return (
              <li
                key={text}
                onClick={() => onClick(field, i)}
                className="text-xs hover:bg-light-gray py-[10px] px-[20px] rounded-md transition-all"
              >
                <p className="min-w-max">{t(text)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
