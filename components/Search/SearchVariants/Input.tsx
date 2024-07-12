import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import ZalupaNakloneonaiavLevo from "../../Icons/ZalupaNakloneonaniavLevo";

interface InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setFocus: any;
  handleClick: () => void;
  placeholder: string;
  isProfile: boolean;
}

export const Input = ({
  onChange,
  setFocus,
  handleClick,
  placeholder,
  isProfile,
}: InputProps) => {
  const { t } = useTranslation();
  if (isProfile) {
    return (
      <>
        <button
          type="button"
          onClick={handleClick}
          className="p-[15px] text-bold text-xs h-full rounded-md hover:bg-opacity-80"
        >
          <ZalupaNakloneonaiavLevo w={15} h={15} />
        </button>
        <input
          onFocus={() => {
            setFocus(true);
          }}
          onChange={onChange}
          type="text"
          placeholder={t(placeholder)}
          className="w-full p-2 mt-0.5 bg-transparent outline-none text-sm text-black"
        />
      </>
    );
  }
  return (
    <>
      <input
        onFocus={() => {
          setFocus(true);
        }}
        onChange={onChange}
        type="text"
        placeholder={t(placeholder)}
        className="w-full p-2 my-auto outline-none text-sm"
      />
      <button
        type="button"
        onClick={handleClick}
        className="flex py-[11px] px-7 text-white text-bold text-xs bg-purple h-full rounded-md hover:bg-opacity-80"
      >
        {t("search")}
      </button>
    </>
  );
};
