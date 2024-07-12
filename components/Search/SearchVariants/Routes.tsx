import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { CountryService } from "../../../services/Countries.service";
import { useDebounceValue } from "../../../utils/hooks/useDebounceValue";
import { countries } from "../../../assets/constants/countries";
import { useRouter } from "next/router";
import RoutesInput from "../components/RoutesInput";
import { useRecoilState, useRecoilValue } from "recoil";
import { recentLoad, recentUnload } from "../../../store/states";

export default function Routes() {
  const { t } = useTranslation();
  const router = useRouter();
  const [recentLoadArr, setRecentLoad] = useRecoilState(recentLoad);
  const [recentUnloadArr, setRecentUnload] = useRecoilState(recentUnload);
  // Loading states
  const [loadingResultInput, setLoadingResultInput] = useState("");
  const [loadingRes, setLoadingRes] = useState([]);
  const [loadShow, setLoadShow] = useState(false);
  const [loadChecked, setLoadChecked] = useState(false);
  const [loadCountry, setLoadCountry] = useState("");
  const debounceDataLoad = useDebounceValue(loadingResultInput, 600);
  // Unloading states
  const [unloadingResultInput, setUnloadingResultInput] = useState("");
  const [unloadingRes, setUnloadingRes] = useState([]);
  const [unloadShow, setUnloadShow] = useState(false);
  const [unloadChecked, setUnloadChecked] = useState(false);
  const [unloadCountry, setUnloadCountry] = useState("");
  const debounceDataUnload = useDebounceValue(unloadingResultInput, 600);

  const blocker = loadChecked && unloadChecked ? false : true;

  useEffect(() => {
    if (!loadingResultInput) {
      setLoadingRes(recentLoadArr);
      return () => {};
    }
    getLoadingData(loadingResultInput);
    if (!loadChecked) setLoadShow(true);
    return () => {};
  }, [debounceDataLoad, loadingResultInput, loadChecked]);

  useEffect(() => {
    if (!unloadingResultInput) {
      setUnloadingRes(recentUnloadArr);
      return () => {};
    }
    getUnloadingData(unloadingResultInput);
    if (!unloadChecked) setUnloadShow(true);
    return () => {};
  }, [debounceDataUnload, unloadingResultInput, unloadChecked]);

  // Redirect to result page
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!blocker) {
      router.push(`results?load=${loadCountry}&unload=${unloadCountry}`);
    }
  };
  // Loading and Unloading inputs handlers
  const onChangeLoading = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoadingResultInput(e.target.value);
    setLoadChecked(false);
    setLoadCountry("");
  };

  const onChangeUnloading = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUnloadingResultInput(e.target.value);
    setUnloadChecked(false);
    setUnloadCountry("");
  };
  // Loading and Unloading fetching countries data
  const getLoadingData = async (query: string) => {
    const { data } = await CountryService.searchCountry(query);
    setLoadingRes(data.results);
  };

  const getUnloadingData = async (query: string) => {
    const { data } = await CountryService.searchCountry(query);
    setUnloadingRes(data.results);
  };
  // Loading and Unloading click handlers
  const handlerClickLoad = (item: any) => {
    setLoadingResultInput(countries[item.country_code]);
    setLoadCountry(item.country_code);
    setRecentLoad([
      item,
      ...recentLoadArr
        .filter((el: any) => el.country_code !== item.country_code)
        .slice(0, 6),
    ]);
    setLoadChecked(true);
    setLoadShow(false);
  };

  const handlerClickUnload = (item: any) => {
    setUnloadingResultInput(countries[item.country_code]);
    setUnloadCountry(item.country_code);
    setUnloadChecked(true);
    setRecentUnload([
      item,
      ...recentUnloadArr
        .filter((el: any) => el.country_code !== item.country_code)
        .slice(0, 6),
    ]);
    setUnloadShow(false);
  };

  return (
    <form
      onSubmit={(e: any) => handleSubmit(e)}
      className="relative flex w-full p-[5px] gap-x-5"
    >
      <RoutesInput
        onChange={onChangeLoading}
        value={loadingResultInput}
        results={loadingRes}
        focusState={[loadShow, setLoadShow]}
        handleClick={handlerClickLoad}
        placeholder={t("loadingplace_title")}
        color={"#20AC93"}
        country={loadCountry}
      />
      <RoutesInput
        onChange={onChangeUnloading}
        value={unloadingResultInput}
        focusState={[unloadShow, setUnloadShow]}
        results={unloadingRes}
        handleClick={handlerClickUnload}
        placeholder={t("unloadingplace_title")}
        color={"#6734BA"}
        country={unloadCountry}
      />
      <button
        type="submit"
        className={`flex py-[12px] bg-purple  text-white px-7 text-bold text-xs h-full rounded-md transition-all ${
          blocker
            ? "bg-opacity-30  cursor-default "
            : "hover:bg-opacity-80 cursor-pointer"
        }`}
      >
        {t("search")}
      </button>
    </form>
  );
}
