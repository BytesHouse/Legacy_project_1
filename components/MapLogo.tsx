import Logo from "./ui-kit/Logo";

export const MapLogo = () => {
  return (
    <div className="relative w-full flex justify-center">
      <div className="absolute bottom-0 z-[999] mb-3">
        <Logo />
      </div>
    </div>
  );
};
