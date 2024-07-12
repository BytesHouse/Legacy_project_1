import React, { Fragment, useMemo } from "react";
import Link from "next/link";
import classNames from "classnames";
import ArrowLeftIcon from "../Icons/ArrowLeftIcon";
import ArrowrightIcon from "../Icons/ArrowRightIcon";
import PaginateArrowLeft from "../Icons/PaginateArrowLeft";
import PaginateArrowRight from "../Icons/PaginateArrowRight";
import { useRouter } from "next/router";

const DOTS = "...";

interface PaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: PaginationProps) =>
  useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount > 30 ? 30 : totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    return [];
  }, [totalCount, pageSize, siblingCount, currentPage]);

interface PaginationCompProps {
  query: any;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage?: number;
}

export const PaginationComponent = (props: PaginationCompProps) => {
  const {
    query,
    totalCount,
    siblingCount = 1,
    currentPage = 1,
    pageSize,
  } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  const router = useRouter();

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="grid grid-flow-col auto-cols-min gap-5 md:gap-2 py-2 text-gray-40">
      <Link
        prefetch={false}
        href={{
          pathname: router.asPath.split("?").shift(),
          query: { ...query, page: Number(query.page) - 1 },
        }}
        className={`cursor-pointer min-w-max my-auto ${
          currentPage === 1 ? "pointer-events-none" : ""
        }`}
      >
        <PaginateArrowLeft firstOrLast={currentPage === 1} />
      </Link>

      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <li key={`${pageNumber}_${i}`} className="text-16-22 text-gray-50">
              &#8230;
            </li>
          );
        }

        return (
          <Fragment key={`${pageNumber}_${i}`}>
            <Link
              prefetch={false}
              href={{
                pathname: router.asPath.split("?").shift(),
                query: { ...query, page: pageNumber },
              }}
              className={classNames(
                "cursor-pointer text-16-22 transition-all",
                {
                  "text-purple hover:text-opacity-70":
                    currentPage === pageNumber,
                  "hover:text-gray-7": currentPage !== pageNumber,
                }
              )}
            >
              {pageNumber}
            </Link>
          </Fragment>
        );
      })}

      <li className="cursor-pointer my-auto">
        <Link
          prefetch={false}
          href={{
            pathname: router.asPath.split("?").shift(),
            query: { ...query, page: Number(query.page) + 1 },
          }}
          className={`text-secondary-70 cursor-pointer hover:opacity-70 min-w-max ${
            currentPage === lastPage ? "pointer-events-none" : ""
          }`}
        >
          <PaginateArrowRight firstOrLast={currentPage === lastPage} />
        </Link>
      </li>
    </ul>
  );
};
