import { useRecoilState } from "recoil";
import { modalState } from "../../store/states";
import Flag from "../ui-kit/Flag";
import StyledLink from "../ui-kit/StyledLink";
interface BlockInfoProps {
  address: string;
  folowers: string;
  folowing: string;
  countryCode: string;
}
export default function BlockInfo(props: BlockInfoProps) {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const { address, folowers, folowing, countryCode } = props;
  return (
    <div className="flex justify-between items-center text-[13px] text-[#37383A] px-[20px]">
      <div className="flex items-center">
        <Flag countryCode={countryCode} size="md" />
        <p className="ml-[10px] text-[12px] font-[600] text-[#37383A]">
          {address}
        </p>
      </div>
      <p>
        Folowers -{" "}
        <StyledLink
          text={folowers || "0"}
          cb={(e: any) => {
            e.stopPropagation();
            setModalState(true);
          }}
        />
      </p>
      <p>
        Folowing -{" "}
        <StyledLink
          text={folowing || "0"}
          cb={(e: any) => {
            e.stopPropagation();
            setModalState(true);
          }}
        />
      </p>
    </div>
  );
}
