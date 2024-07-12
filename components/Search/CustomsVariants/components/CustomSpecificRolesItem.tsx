interface CustomsSpecificItemInterface {
    title: string;
    data: string[];
}

export default function CustomsSpecificRolesItem({ title, data }: CustomsSpecificItemInterface) {
    return (
        <div className="grid grid-cols-12 text-xs2 text-black-carbon">
            <p className="col-span-3 font-medium">
                {title}
            </p>
            <div className="col-span-9">
                {
                    data ? data?.map((role) => {
                        const type = role.split(' ').pop()!
                        const name = role.replace(type, '')
                        return (
                            <div key={role} className="flex my-2">
                                <p className="font-semibold">{type}</p>
                                <span className="mx-1">-</span>
                                <p>{name}</p>
                            </div>
                        )
                    }) : '-'
                }

            </div>
        </div>
    )
}
