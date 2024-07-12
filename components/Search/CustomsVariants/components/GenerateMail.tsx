import Link from "next/link";

export default function GenerateMail({ data }: { data: string | string[] }): any {
    return (
        <Link className="col-span-9 col-start-4 font-semibold text-[#166AFF]" href={'mailto:' + data}>
            {data || '-'}
        </Link>
    )
}