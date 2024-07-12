import { useRouter } from "next/router";
import PeoplePost from "../components/Trends/PeoplePost";

import PrimaryButton from "../components/ui-kit/PrimaryButton";
import SearchFooter from "../components/Search/components/SearchFooter";
import SecondaryButton from "../components/ui-kit/SecondaryButton";
import StyledLink from "../components/ui-kit/StyledLink";
import StatusField from "../components/StatusField/StatusField";
import UserPopUp from "../components/UserPopUp/UserPopUp";
import CompanyPopUp from "../components/CompanyPopUp/CompanyPopUp";

export default function Components() {
  const router = useRouter();
  const { locale } = router;

  return (
    <div className="w-[520px] h-[520px] m-auto mt-[50px] p-[20px] border flex flex-col justify-around rounded-2xl bg-[#d4d4d4]">
      <CompanyPopUp
        name={"QOOBUS CORPORATION L.T.D"}
        imageId={""}
        address={"mun. Chişinău, Codru, str. Malinovschi Tadeuş, 16"}
        countryIsoCode={"MD"}
      />
      <UserPopUp
        name={"Sterling Mcdaniel Long Stratulat"}
        imageId={""}
        address={""}
        countryIsoCode={""}
        position="Position"
        department="Department"
      />
      <UserPopUp
        name={"Maxim Stratulat"}
        imageId={""}
        address={""}
        countryIsoCode={""}
        position="Position"
        department="Department"
      />
    </div>
  );
}
