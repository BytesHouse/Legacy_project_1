import { ChangeEvent, useEffect, useRef, useState } from "react";

import { useDebounceValue } from "../../../utils/hooks/useDebounceValue";
import { useOutsideClick } from "../../../utils/hooks/useOutsideClick";
import { useTranslation } from "next-i18next";
import CustomResultsBlock from "./components/CustomResultsBlock";
import { SearchService } from "../../../services/Search.service";

export default function CustomsInput() {
  const [animation, startAnimation] = useState(false);
  const [searchResultInput, setSearchResultInput] = useState("");
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const [focus, setFocus] = useState(false);
  const debounce = useDebounceValue(searchResultInput);
  const ref = useRef<HTMLFormElement>(null);
  useOutsideClick(ref, () => {
    setFocus(false);
  });

  const handleEmptySearchResult = () => {
    setData([]);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchResultInput(e.target.value);
  };
  const getData = async () => {
    if (searchResultInput) {
      setData(
        (await SearchService.searchCustomsFuzzy(searchResultInput)).data.content
      );
    }
  };

  useEffect(() => {
    if (!searchResultInput) {
      handleEmptySearchResult();
      return;
    }

    getData();
  }, [debounce]);

  useEffect(() => {
    startAnimation(true);
    if (!focus) {
      setTimeout(() => {
        startAnimation(false);
      }, 300);
    }
  }, [focus]);

  useEffect(() => {
    return () => {
      getData();
    };
  }, []);

  return (
    <form
      action="."
      ref={ref}
      className={`rounded-md relative border z-10 border-gray-2 bg-white flex w-full p-[5px] transition-all ${
        focus ? " border-black-focus" : " hover:border-hover-violet "
      }`}
    >
      <input
        onFocus={() => {
          setFocus(true);
        }}
        onChange={onChange}
        type="text"
        placeholder={t("search_custom_code")}
        className="w-full p-2 my-auto outline-none text-sm"
      />
      <button
        type="button"
        className="flex py-[9px] px-7 text-white text-bold text-xs bg-purple h-full rounded-md hover:bg-opacity-80"
      >
        {t("search")}
      </button>
      <div
        className={`absolute top-[calc(100%+10px)] transition-all duration-300 linear origin-top transform ${
          !focus ? "scale-y-0" : "scale-y-100 shadow-results"
        } left-0 w-full z-[9999] bg-white rounded-2xl border border-gray-2`}
      >
        {animation || focus ? (
          <CustomResultsBlock data={data} input={searchResultInput} />
        ) : null}
      </div>
    </form>
  );
}
