import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import MaskComp from "../../public/assets/images/MaskComp.png";
import LoadTypeIconRender from "../Icons/LoadTypeIconRender";
import { PopUpProps } from "../interfaces/PopUp.interface";
import StarRate from "../StarRate/StarRate";
import Flag from "../ui-kit/Flag";
import PrimaryButton from "../ui-kit/PrimaryButton";
import SecondaryButton from "../ui-kit/SecondaryButton";
import { useRecoilState } from "recoil";
import { modalState } from "../../store/states";

export default function CompanyPopUp({
  name,
  imageId,
  address,
  countryIsoCode,
}: PopUpProps) {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div className="max-w-[295px] rounded-[8px] shadow-popup bg-white">
      <div className="flex p-[12px] border-b border-gray-2">
        <Image
          src={imageId ? `${process.env.API}/files/${imageId}` : MaskComp}
          alt={"Company Logo"}
          width="25"
          height="25"
          className="w-[25px] h-[25px]"
        />
        <Link href={"/companies"}>
          <h4 className="ml-[12px] font-bold">{name}</h4>
        </Link>
      </div>
      <div className="bg-[#F7F7F8] rounded-b-[8px] p-[12px]">
        <div className="flex items-center pb-[10px]">
          <Flag countryCode={countryIsoCode} size="md" />
          <p className="ml-[10px] text-[#626262] text-[10px] text-xs truncate">
            {address}
          </p>
        </div>
        <div className="flex items-center mb-[12px] ml-[24px]">
          <StarRate rate={4.5} />
          <div className="ml-[12px]">
            <LoadTypeIconRender type="carrier" />
          </div>
        </div>
        <div className="flex gap-[10px] text-[12px] justify-between">
          <PrimaryButton
            text={t("view_profile")}
            customStyle={"flex-1 py-[5px] font-[600]"}
            onClick={(e: any) => {
              e.stopPropagation();
              setModalState(true);
            }}
          />
          <SecondaryButton
            text={t("write_message")}
            customStyle={"flex-1 font-[600]"}
            onClick={(e: any) => {
              e.stopPropagation();
              setModalState(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}
