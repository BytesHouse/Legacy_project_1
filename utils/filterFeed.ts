import { Content } from "../interfaces/qobCompanyProfile/feedBacks.interface";

export function findOwners(review: Content) {
  const {
    fromCompany,
    fromUser,
    fromVirtualCompany,
    toCompany,
    toVirtualCompany,
  } = review;

  const from = fromCompany || fromUser || fromVirtualCompany;
  const to = toCompany || toVirtualCompany;

  return from && to;
}

// const reviewsData = isReviewsFrom ? reviewsFrom.content : reviewsTo.content;

// const filteredReviews = reviewsData?.filter((item) => {
//   return findOwners(item);
// });
