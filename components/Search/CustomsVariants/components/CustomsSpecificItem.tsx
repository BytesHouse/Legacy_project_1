interface CustomsSpecificItemInterface {
    title: string;
    data: string;
}

export default function CustomsSpecificItem ({title, data}: CustomsSpecificItemInterface) {
    return (
        <div className="grid grid-cols-12 text-xs2 text-black-carbon">
            <p className="col-span-3 font-medium">
                {title}
            </p>
            <p className="col-span-9 font-semibold">
                {data || '-'}
            </p>
        </div>
    )
}
