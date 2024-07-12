import { useTranslation } from "next-i18next";
import { Company } from "../../interfaces/UserProfile/UserProfile.interface";
import { faq } from "../../utils/constants/faq";
import FaqGreenBox from "./FaqGreenBox";
import FaqItem from "./FaqItem";

interface FaqProps {
  faq: FaqItem[];
  companyName?: string;
}

interface FaqItem {
  title: string;
  text: string | string[];
  note?: string[];
}

export default function Faq({ faq, companyName }: FaqProps) {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-[14px] border border-gray-2 shadow-search mb-[25px]">
      <div className="p-[25px] border-b border-gray-2">
        <p>{t("faq")}</p>
      </div>
      {faq.map(({ title, text, note }, i) => (
        <FaqItem
          companyName={companyName}
          key={title}
          title={title}
          text={text}
          note={note}
          last={faq.length - 1 === i}
        />
      ))}
    </div>
  );
}
