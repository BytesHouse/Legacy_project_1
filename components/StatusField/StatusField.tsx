import { useTranslation } from "next-i18next";
import PendingIcon from "../Icons/PendingIcon";
import VerifiedIcon from "../Icons/VerifiedIcon";

interface StatusFieldProps {
  status: string;
  isVerified: boolean;
}

export default function StatusField({ status, isVerified }: StatusFieldProps) {
  const { t } = useTranslation();
  const isBlackList = status === "blacklist";
  return (
    <div className="flex items-center gap-[4px] text-[13px] font-bold">
      {isVerified ? (
        <VerifiedIcon size={"sm"} />
      ) : !isBlackList ? (
        <PendingIcon size={"sm"} />
      ) : null}
      <p
        className={
          isBlackList ? "bg-black text-white px-[8px] py-[2px] rounded-xl" : ""
        }
      >
        {t(status)}
      </p>
    </div>
  );
}
