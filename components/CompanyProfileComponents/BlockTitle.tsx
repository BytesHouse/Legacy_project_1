import { useTranslation } from "next-i18next";

interface BlockTitleInterface {
  text: string;
}

export default function BlockTitle({ text }: BlockTitleInterface) {
  const { t } = useTranslation();
  return (
    <div className="w-full flex justify-between px-5 py-2.5 border-b border-gray-2 text-[#37383A]">
      <p className="text-[14px] font-semibold">{t(text)}</p>
    </div>
  );
}
