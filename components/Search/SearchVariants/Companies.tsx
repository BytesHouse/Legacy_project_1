import { ChangeEvent, useEffect, useRef, useState } from "react";
import router from "next/router";

import { SearchService } from "../../../services/Search.service";
import { useDebounceValue } from "../../../utils/hooks/useDebounceValue";
import { useOutsideClick } from "../../../utils/hooks/useOutsideClick";
import { Input } from "./Input";
import ResultsBlock from "./ResultsBlock";

interface CompaniesProps {
  placeholder?: string;
  isProfile?: boolean;
}

export default function Companies({
  placeholder = "search_people_companies",
  isProfile = false,
}: CompaniesProps) {
  const [animation, startAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [peoples, setPeoples] = useState([]);
  const [focus, setFocus] = useState(false);
  const [searchResultInput, setSearchResultInput] = useState("");
  const debounceData = useDebounceValue(searchResultInput, 100);
  const ref = useRef<HTMLFormElement>(null);
  useOutsideClick(ref, () => {
    setFocus(false);
  });

  const handleEmptySearchResult = () => {
    setCompanies([]);
    setPeoples([]);
    setIsLoading(false);
  };
  const handleClick = () => {
    if (!searchResultInput) {
      return;
    }
    router.push("/results?searchStr=" + searchResultInput);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    e.preventDefault();
    setSearchResultInput(e.target.value);
  };

  const getData = async () => {
    const [companies, people] = await Promise.allSettled([
      SearchService.searchCompanies(searchResultInput),
      SearchService.searchPeoples(searchResultInput),
    ]).then((values) => values.map((value: any) => value.value));
    setCompanies(companies?.data?.content?.slice(0, 3));
    setPeoples(people?.data?.content?.slice(0, 3));
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchResultInput === "") {
      handleEmptySearchResult();
    }
    return;
  }, [searchResultInput]);
  useEffect(() => {
    startAnimation(true);
    if (!focus) {
      setTimeout(() => {
        startAnimation(false);
      }, 300);
    }
  }, [focus]);
  useEffect(() => {
    if (!debounceData) {
      return;
    }
    getData();
  }, [debounceData]);

  const classes = !isProfile
    ? `relative z-10 rounded-md border border-gray-2 bg-white flex w-full transition-all p-[5px]`
    : `relative z-10 rounded-lg mb-5 border border-gray-2 flex w-full transition-all items-center `;

  return (
    <form
      ref={ref}
      action="."
      className={`${
        focus
          ? " border-black-focus bg-white"
          : `${
              isProfile
                ? "hover:border-blue-600 bg-gray-2 hover:bg-opacity-70"
                : "hover:border-hover-violet"
            }`
      } ${classes} `}
    >
      <Input
        onChange={onChange}
        setFocus={setFocus}
        handleClick={handleClick}
        placeholder={placeholder}
        isProfile={isProfile}
      />
      <div
        className={`absolute top-[calc(100%+10px)] transition-all duration-300 linear origin-top transform ${
          !focus ? "scale-y-0" : "scale-y-100 shadow-results"
        } left-0 w-full z-[9999] bg-white ${
          isProfile ? "rounded-xl" : "rounded-md"
        }`}
      >
        {animation || focus ? (
          <ResultsBlock
            companies={companies}
            peoples={peoples}
            input={debounceData}
            isProfile={isProfile}
            isLoading={isLoading}
            onClick={() => setFocus(false)}
          />
        ) : null}
      </div>
    </form>
  );
}
