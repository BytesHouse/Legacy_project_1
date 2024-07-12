import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import PaginateArrowLeft from "../Icons/PaginateArrowLeft";
import PaginateArrowRight from "../Icons/PaginateArrowRight";
interface ResultsPaginateProps {
  itemsPerPage: number;
  items: any[];
}

export default function ResultsPaginate({
  itemsPerPage,
  items,
}: ResultsPaginateProps) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="flex justify-center border-t border-gray-2 mt-auto">
      <ReactPaginate
        activeLinkClassName={"text-purple"}
        breakLabel="..."
        nextLabel={<PaginateArrowRight firstOrLast={false} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={itemsPerPage}
        pageCount={pageCount}
        previousLabel={<PaginateArrowLeft firstOrLast={false} />}
        className="flex justify-center bg-white w-full rounded-b-xl py-[15px] items-center [&>*]:mx-[12px]"
      />
    </div>
  );
}
