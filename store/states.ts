import { RecentItemProps } from "./../components/Search/SearchVariants/RecentItem";
import { RecoilState, atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recent_data",
});
const recentLoad = atom({
  key: "recentLoad",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const recentUnload = atom({
  key: "recentUnload",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const recentCustoms = atom({
  key: "recentCustoms",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const resultsState = atom({
  key: "repos",
  default: {
    peoples: [
      {
        displayName: "",
        position: "",
        company: {
          displayName: "",
        },
        imageId: "",
        headerImageId: "",
        lastCheckinStamp: 0,
      },
    ],
    companies: [
      {
        displayName: "",
        address: "",
        imageId: "",
        headerImageId: "",
        countryIsoCode: "",
        lastCheckinStamp: 0,
      },
    ],
  },
});

const peoplesOrCompanies = atom({
  key: "results",
  default: true,
});

const modalState = atom({
  key: "modalState",
  default: false,
});

const recent: RecoilState<RecentItemProps[]> = atom({
  key: "recent",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export {
  resultsState,
  peoplesOrCompanies,
  modalState,
  recent,
  recentUnload,
  recentLoad,
  recentCustoms,
};
