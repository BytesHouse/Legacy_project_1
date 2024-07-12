import classNames from "classnames";
import { DeviationArrowIcon } from "../../Icons/DeviationArrowIcon";

export default function FinancialArrow({ relative }: { relative: any }) {
  return (
    <div
      className={classNames("flex flex-row-reverse mr-0 ml-auto w-max", {
        "text-gray-70": relative.color === "gray",
        "text-primary-40": relative.color === "primary",
        "text-tertiary-40": relative.color === "tertiary",
      })}
    >
      {relative.result > 0 && "+"}
      {relative.result
        .toFixed(0)
        .split(/(?=(?:...)*$)/)
        .join(" ")}{" "}
      %
      {relative.arrow === "none" ? null : relative.arrow === "up" ? (
        <span className="mb-1 mr-2 transform rotate-180">
          <DeviationArrowIcon />
        </span>
      ) : (
        <span className="my-auto mr-2 mb-1">
          <DeviationArrowIcon />
        </span>
      )}
    </div>
  );
}
