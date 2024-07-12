interface PhoneNotAvailableProps {
  text: string;
}

const PhoneNotAvailable = ({ text }: PhoneNotAvailableProps) => (
  <div className="text-gray-80 font-[600] text-14-20 md:text-16-22 col-span-8">
    {text}
  </div>
);
export default PhoneNotAvailable;
