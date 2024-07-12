import Image from "next/image";
import { useTranslation } from "next-i18next";
import StyledLink from "../ui-kit/StyledLink";
import { CompanyUsersInterface } from "../../interfaces/qobCompanyProfile/companyUsers.interface";
import { getInitials } from "../../utils/getInitials";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { modalState } from "../../store/states";

interface BlockEmployeesProps {
  employees?: CompanyUsersInterface[];
  followers?: number;
  following?: number;
  isCompany?: boolean;
}

export default function BlockEmpoyees({
  employees,
  followers,
  following,
  isCompany = false,
}: BlockEmployeesProps) {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);

  const { t } = useTranslation();
  if (!employees && !followers && !isCompany) {
    return null;
  }
  return (
    <div className="flex items-center [&>*:not(:last-child)]:mr-[40px] text-[13px] text-[#37383A] px-[20px]  mb-[25px]">
      {employees?.length ? (
        <div className="flex items-center relative">
          <div
            style={{
              width:
                ((employees?.length! > 3 ? 3 : employees?.length!) || 1) * 29,
            }}
            className="text-normal h-[33px] relative"
          >
            {employees
              ?.slice(0, 3)
              .map((employe: CompanyUsersInterface, i: number) => {
                const { imageId, displayName, id } = employe;

                return (
                  <Link
                    href={`/users/${id}`}
                    key={displayName + i}
                    style={{ left: i === 0 ? 0 : i * 20 }}
                    className={`absolute ${
                      i !== 0 ? "border-[4px]" : " mt-1"
                    }  rounded-full bg-purple text-white border-white top-0`}
                  >
                    {imageId ? (
                      <div className="z-50 w-[25px] h-[25px]">
                        <Image
                          src={`${process.env.API}/files/${imageId}`}
                          alt={"alt"}
                          width="25"
                          height="25"
                          className="w-[25px] h-[25px] rounded-full"
                        />
                      </div>
                    ) : (
                      <div
                        className={`text-[10px] w-[25px] h-[25px] bg-transparent rounded-full flex justify-center items-center`}
                      >
                        {displayName ? getInitials(displayName) : "-"}
                      </div>
                    )}
                  </Link>
                );
              }) || "No data"}
          </div>
          <StyledLink
            text={t("view_employees")}
            cb={(e: any) => {
              e.stopPropagation();
              setModalState(true);
            }}
          />
        </div>
      ) : null}
      {followers ? (
        <p>
          {t("folowers")} -{" "}
          <StyledLink
            text={String(followers || 0)}
            cb={(e: any) => {
              e.stopPropagation();
              setModalState(true);
            }}
          />
        </p>
      ) : null}

      {!isCompany && (
        <p>
          Folowing -{" "}
          <StyledLink
            text={String(following || 0)}
            cb={(e: any) => {
              e.stopPropagation();
              setModalState(true);
            }}
          />
        </p>
      )}
    </div>
  );
}
