import { useRecoilState } from "recoil";
import { MouseEventHandler, useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";

import { modalState } from "../store/states";
import StyledLink from "./ui-kit/StyledLink";
import { useRouter } from "next/router";
import SecondaryButton from "./ui-kit/SecondaryButton";
import PrimaryButton from "./ui-kit/PrimaryButton";
import { useOutsideClick } from "../utils/hooks/useOutsideClick";

export default function LoginModal() {
  const [isModalOpen, setModalState] = useRecoilState(modalState);
  const { t } = useTranslation();
  const { locale, push } = useRouter();
  const ref = useRef(null);

  const handleClick = () => {
    setModalState(false);
  };

  useOutsideClick(ref, handleClick);

  useEffect(() => {
    if (!isModalOpen) {
      return document?.body?.removeAttribute("style");
    }
    document.body.style.overflow = "hidden";
  }, [isModalOpen]);

  return isModalOpen ? (
    <div className="fixed z-[999] top-0 left-0 backdrop-blur-sm h-screen w-screen bg-black bg-opacity-70 flex items-center justify-center">
      <div
        ref={ref}
        className="bg-white rounded-[10px] flex flex-col w-[416px]"
      >
        <div className="p-5 pb-8">
          <div className="flex items-start justify-between">
            <h2 className="font-bold text-[#2E2E2F] mb-4">
              {t("new_to_qoobus")}
            </h2>
            <button
              className="border-[#EAEDF4] border p-1.5 mt-1 rounded-lg"
              onClick={() => setModalState(false)}
            >
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="IcnRemoveImage"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.64532 0.354649C7.44945 0.158782 7.13189 0.158782 6.93602 0.354649L4.70711 2.58356C4.31658 2.97408 3.68342 2.97408 3.29289 2.58356L1.06398 0.354649C0.868115 0.158782 0.550552 0.158782 0.354685 0.354649C0.158804 0.55053 0.15882 0.868121 0.354721 1.06398L2.58349 3.2923C2.97405 3.68278 2.97412 4.31595 2.58363 4.70651L0.354613 6.93598C0.15876 7.13187 0.158776 7.44944 0.354649 7.64532C0.550536 7.8412 0.868131 7.8412 1.06402 7.64532L3.29289 5.41644C3.68342 5.02592 4.31658 5.02592 4.70711 5.41644L6.93598 7.64532C7.13187 7.8412 7.44946 7.8412 7.64535 7.64532C7.84122 7.44944 7.84124 7.13188 7.64539 6.93598L5.41637 4.70651C5.02588 4.31595 5.02595 3.68278 5.41651 3.2923L7.64528 1.06398C7.84118 0.868121 7.8412 0.55053 7.64532 0.354649Z"
                  fill="#2E2E2F"
                />
              </svg>
            </button>
          </div>
          <p className="text-[#87949E] font-medium text-xs mb-6">
            {t("sign_up_now")}
          </p>
          <PrimaryButton
            onClick={() => push("https://qoobus.com/register")}
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
        </div>
        <div className="bg-[#F8F9FB] border-t border-[#E2E5E9] p-5 rounded-b-[10px]">
          <SecondaryButton
            onClick={() => push("https://qoobus.com/auth")}
            customStyle={"w-full h-[42px] text-[14px] text-[500] "}
            text={t("login_to_qoobus")}
          />
        </div>
      </div>
    </div>
  ) : null;
}
