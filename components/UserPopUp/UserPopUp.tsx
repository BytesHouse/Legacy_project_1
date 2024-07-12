import Image from "next/image";
import Mask from "../../public/assets/images/Mask.png";
import Link from "next/link";
import Flag from "../ui-kit/Flag";
import PrimaryButton from "../ui-kit/PrimaryButton";
import SecondaryButton from "../ui-kit/SecondaryButton";
import { useRouter } from "next/router";
import { PopUpProps } from "../interfaces/PopUp.interface";
import { useTranslation } from "next-i18next";
import { useRecoilState } from "recoil";
import { modalState } from "../../store/states";

export default function UserPopUp({
  name,
  imageId,
  address,
  countryIsoCode,
  position,
  department,
}: PopUpProps) {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div className="max-w-[270px] rounded-[8px] shadow-popup bg-white">
      <div className="flex p-[10px] border-b border-gray-2">
        <Image
          src={imageId ? `${process.env.API}/files/${imageId}` : Mask}
          alt={"Company Logo"}
          width="36"
          height="36"
          className="w-[36px] h-[36px]"
        />
        <div className="ml-[10px] mt-[5px] self-center">
          <Link href={"/users"}>
            <h4 className="text-[18px] font-bold">{name}</h4>
          </Link>
          <p className="text-[#626262] text-[12px]">
            {position} / {department}
          </p>
        </div>
      </div>
      <div className="bg-[#F7F7F8] rounded-b-[8px] p-[12px]">
        <div className="flex gap-[10px] text-[12px] justify-between">
          <PrimaryButton
            text={t("view_profile")}
            customStyle={"flex-1 py-[5px] font-[600]"}
            onClick={() => router.push("/users")}
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
