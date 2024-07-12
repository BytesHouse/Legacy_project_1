import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import ArrowrightIcon from "../Icons/ArrowRightIcon";
import ResultSelector from "../ResultsComponents/ResultSelector";
import PrimaryButton from "../ui-kit/PrimaryButton";
import ReviewItem, { ReviewItemProps } from "./ReviewItem";
import { FeedBacksInterface } from "../../interfaces/qobCompanyProfile/feedBacks.interface";
import NoDataStar from "../NoDataStar/NoDataStar";
import { Content } from "../../interfaces/qobCompanyProfile/feedBacks.interface";
import { UtilityService } from "../../services/Utility.Service";
import { useRecoilState } from "recoil";
import { modalState } from "../../store/states";
import ViewMore from "../CompanyProfileComponents/ViewMore";

interface ReviewBlockInterface {
  reviewDataTo?: FeedBacksInterface;
  reviewDataFrom?: FeedBacksInterface;
  companyName: string;
}

const filterReviews = (data: FeedBacksInterface): ReviewItemProps[] => {
  return data.content
    .map((item): ReviewItemProps => {
      const {
        fromUser,
        fromCompany,
        toVirtualCompany,
        fromVirtualCompany,
        toCompany,
        score,
        reasons,
        comment,
      } = item;

      const isUser = Boolean(fromUser?.id);

      const imageId = isUser
        ? fromUser?.imageId
        : fromVirtualCompany
        ? fromVirtualCompany.imageId
        : fromCompany?.imageId;

      const name = isUser
        ? fromUser?.displayName!
        : fromVirtualCompany
        ? fromVirtualCompany.displayName
        : fromCompany?.displayName;

      const companyName = toCompany
        ? toCompany?.displayName!
        : toVirtualCompany && toVirtualCompany?.displayName!;

      const companyImage = toCompany
        ? toCompany?.imageId!
        : toVirtualCompany && toVirtualCompany?.imageId;

      const fromId = {
        id: isUser
          ? fromUser?.id!
          : UtilityService.getSlugB2B({
              name: name,
              shortName: "",
              brandName: "",
              internationalNumber: fromVirtualCompany
                ? fromVirtualCompany.companyNumber
                : fromCompany?.companyNumber,
            }),
        countryCode: !isUser
          ? fromVirtualCompany
            ? fromVirtualCompany.countryIsoCode.toLocaleLowerCase()
            : fromCompany?.countryIsoCode.toLocaleLowerCase()
          : "",
        isUser: isUser,
      };

      const toId = {
        id: UtilityService.getSlugB2B({
          name: companyName,
          shortName: "",
          brandName: "",
          internationalNumber: toCompany
            ? toCompany?.companyNumber!
            : toVirtualCompany && toVirtualCompany?.companyNumber!,
        }),
        countryCode: toCompany
          ? toCompany?.countryIsoCode!.toLocaleLowerCase()
          : toVirtualCompany &&
            toVirtualCompany?.countryIsoCode!.toLocaleLowerCase(),
      };
      return (
        companyName &&
        name &&
        comment &&
        score &&
        reasons && {
          companyName,
          name,
          comment,
          fromId,
          toId,
          score,
          reasons,
          imageId,
          companyImage,
        }
      );
    })
    .filter((item) => item)
    .slice(0, 2);
};

export default function ReviewBlock({
  reviewDataTo,
  reviewDataFrom,
  companyName,
}: ReviewBlockInterface) {
  const [_, setModalState] = useRecoilState(modalState);
  const [statesData, setStatesData] = useState([
    filterReviews(reviewDataTo!),
    filterReviews(reviewDataFrom!),
  ]);
  const [data, setData] = useState(filterReviews(reviewDataTo!));
  const [fromTo, setFromTo] = useState(1);

  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    setData(filterReviews(reviewDataTo!));
    setStatesData([
      filterReviews(reviewDataTo!),
      filterReviews(reviewDataFrom!),
    ]);
  }, [reviewDataTo, reviewDataFrom, router.asPath]);

  const selectData = (type: number) => {
    setData(statesData[type]);
    setFromTo(type);
  };
  const reviewsCount =
    reviewDataTo?.totalElements! + reviewDataFrom?.totalElements!;

  return (
    <div className="border border-gray-2 rounded-2xl bg-white mt-[20px] shadow-search">
      <div className="flex items-center justify-between py-[10px] px-[20px] border-b border-gray-2">
        <p className="text-[14px] font-semibold text-[#37383A]">
          {t("reviews")}{" "}
          <span
            className={`bg-gray-2 py-[3px] px-[6px] rounded-[7px] ml-[10px] leading-[23px] ${
              reviewsCount ? "inline" : "hidden"
            }`}
          >
            {reviewsCount}
          </span>
        </p>
        <PrimaryButton
          text={t("leave_a_reaview")}
          customStyle={"py-[5px] px-[12px] text-[12px]"}
          onClick={() => router.push("https://qoobus.com/auth")}
        />
      </div>
      <div>
        <div className="px-[15px] my-[15px]">
          <ResultSelector
            peoplesCount={reviewDataTo?.totalElements! || 0}
            companiesCount={reviewDataFrom?.totalElements! || 0}
            leftText={t("reviews_received")}
            rightText={t("reviews_placed")}
          />
        </div>
        <ul className="p-[20px]">
          {data! && data?.length ? (
            data?.map((item, i) => {
              return (
                <ReviewItem
                  {...item}
                  key={item?.companyName + item?.name + i}
                />
              );
            })
          ) : (
            <NoDataStar
              company={companyName}
              text={
                !fromTo ? t("not_yet_reviews") : t("not_yer_placed_reviews")
              }
            />
          )}
        </ul>
      </div>
      {data! && data?.length ? (
        <ViewMore
          cb={(e: any) => {
            e.stopPropagation();
            setModalState(true);
          }}
          text={"view_all_reviews"}
        />
      ) : null}
    </div>
  );
}
