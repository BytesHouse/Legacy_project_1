import { useTranslation } from "next-i18next";
export default function NoCamera() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#E9E9E9] rounded-sm w-full h-full flex flex-col justify-center items-center">
      <svg
        width="38"
        height="28"
        viewBox="0 0 38 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 6.2C19 3.7487 19 2.52304 19.7688 1.76152C20.5377 1 21.7751 1 24.25 1H26C28.4749 1 29.7123 1 30.4812 1.76152C31.25 2.52304 31.25 3.7487 31.25 6.2C31.25 8.6513 31.25 9.87696 30.4812 10.6385C29.7123 11.4 28.4749 11.4 26 11.4H24.25C21.7751 11.4 20.5377 11.4 19.7688 10.6385C19 9.87696 19 8.6513 19 6.2Z"
          stroke="#2F323A"
          strokeWidth="1.5"
        />
        <path
          d="M31.2422 4.03577L34.0691 2.8691C35.165 2.41684 35.7129 2.19071 36.1025 2.44799C36.4922 2.70528 36.4922 3.29322 36.4922 4.4691V7.93577C36.4922 9.11166 36.4922 9.6996 36.1025 9.95688C35.7129 10.2142 35.165 9.98803 34.0691 9.53577L31.2422 8.3691V4.03577Z"
          stroke="#2F323A"
          strokeWidth="1.5"
        />
        <path
          d="M36.5 20.0664H1.5"
          stroke="#2F323A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M36.5 14.8667V16.6C36.5 21.5026 36.5 23.9539 34.9623 25.477C33.4246 27 30.9497 27 26 27H12C7.05025 27 4.57538 27 3.03769 25.477C1.5 23.9539 1.5 21.5026 1.5 16.6V14C1.5 8.3017 1.5 5.45255 3.08893 3.53487C3.37981 3.18381 3.70481 2.8619 4.05925 2.57379C5.99536 1 8.87191 1 14.625 1"
          stroke="#2F323A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-sm text-[#1E1E1E] mt-4">{t("no_camera")}</p>
    </div>
  );
}
