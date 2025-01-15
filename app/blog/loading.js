import React from "react";

export default function Loading() {
	return (
		<div className="absolute top-0 z-[11] w-full h-screen flex items-center justify-center">
			<div className="w-[100px] aspect-square rounded-full border-t-2 border-l-2 border-red-500 animate-spin"></div>
		</div>
	);
}
