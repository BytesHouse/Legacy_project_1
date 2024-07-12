import { useTranslation } from "next-i18next";
import SecondaryButton from "../../ui-kit/SecondaryButton";
import { useRecoilState } from "recoil";
import { modalState } from "../../../store/states";

export default function SearchFooter() {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const { t } = useTranslation();
  return (
    <div className="h-[72px] mt-15 relative bottom-0">
      <div className="h-[72px] bg-purple text-white fixed bottom-0 w-full z-10">
        <div className="container flex items-center justify-between h-full">
          <div>
            <p className="text-[20px] font-bold tracking-[0.2px] mb-2">
              {t("with_qoobus")}
            </p>
            <p className="text-[12px] font-[600] tracking-[0.1px]">
              {t("with_qoobus_1")}
            </p>
          </div>
          <SecondaryButton
            onClick={(e: any) => {
              e.stopPropagation();
              setModalState(true);
            }}
            text={t("with_qoobus_login")}
            customStyle={"px-7 py-[12px]"}
          />
        </div>
      </div>
    </div>
  );
}
