import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import PrimaryButton from "../ui-kit/PrimaryButton";
import SecondaryButton from "../ui-kit/SecondaryButton";
import StyledLink from "../ui-kit/StyledLink";

export default function NewToQoobus() {
  const router = useRouter();
  const { locale } = router;
  const isSearch = router.asPath.includes("/search");
  const style = isSearch ? "w-[300px]" : "w-full";
  const { t } = useTranslation();
  return (
    <div
      className={`${style} border border-gray-2  rounded-[14px] flex flex-col bg-white shadow-search`}
    >
      <div className="border-b border-b-gray-2 pt-[23px] pb-[23px] px-[23px] relative flex flex-col">
        <p className="text-[24px] font-[700] tracking-[0.5px] mb-[15px]">
          {t("new_to_qoobus")}
        </p>
        <p className="text-[12px] text-pewter-gray font-[500] tracking-[0.5px] mb-[15px]">
          {t("sign_up_now")}
        </p>
        <PrimaryButton
          onClick={() => router.push("https://qoobus.com/register")}
          customStyle={"w-full py-[10px] text-[14px] text-[500] mb-[15px]"}
          text={t("register")}
        />
        <p className="text-[12px] text-pewter-gray leading-[20px]">
          {t("by_clicking")}{" "}
          <StyledLink
            link={`https://qoobus.com/${locale}/legal`}
            text={t("terms_of_service")}
          />{" "}
          {t("and")}{" "}
          <StyledLink
            link={`https://qoobus.com/${locale}/legal#privacy`}
            text={t("privacy_policy")}
          />{" "}
          {t("including")}{" "}
          <StyledLink
            link={`https://qoobus.com/${locale}/legal#cookie`}
            text={t("cookie_use")}
          />
        </p>
        <div
          className={`absolute bg-[#ffffff] left-[50%] translate-x-[-50%] -bottom-3 border rounded-[14px] border-gray-2 px-[14px] py-[1px] text-center min-w-[170px]`}
        >
          <p className="text-[12px]">{t("already_have_an_account")}</p>
        </div>
      </div>
      <div className="bg-[#F8F9FB] p-[23px] h-full flex flex-col justify-center items-center rounded-b-[14px]">
        <SecondaryButton
          onClick={() => router.push("https://qoobus.com/auth")}
          customStyle={"w-full h-[42px] text-[14px] text-[500]"}
          text={t("login_to_qoobus")}
        />
      </div>
    </div>
  );
}
