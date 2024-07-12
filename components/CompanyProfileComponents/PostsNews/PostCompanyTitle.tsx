import Image from "next/image";

export default function PostCompanyTitle(){
    return (
        <div className="border-b border-gray-2 flex p-5 gap-5">
            <Image width={40} height={40} alt="company avatar" src="/assets/images/Oval.png" />
            <div className="flex flex-col justify-between">
                <h4 className="text-xs2 text-black-carbon font-bold">
                    PARADIGM GROUP L.T.D.
                </h4>
                <p className="text-xxs font-medium text-pewter-gray">
                    23 minutes ago
                </p>
            </div>
        </div>
    )
}