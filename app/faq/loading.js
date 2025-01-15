import Skeleton from "@/components/Skeleton";

export default function Loading() {
	const fakeArr = new Array(5).fill(0);
	return (
		<div className="flex flex-col gap-5">
			{fakeArr.map((i, ind) => (
				<Skeleton
					key={ind}
					styles={
						"w-full h-[110px] bg-slate-100 animate-pulse rounded-sm"
					}
				/>
			))}
		</div>
	);
}
