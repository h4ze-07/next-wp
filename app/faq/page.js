"use client";
import FaqCard from "@/components/FaqCard";
import Skeleton from "@/components/Skeleton";
import { useEffect, useState } from "react";

export default function Faq() {
	const [faqs, setFaqs] = useState([]);
	const [isLoadingPosts, setIsLoadingPosts] = useState(true);

	const fakeArr = new Array(5).fill(0);

	const query = `
        query GetFaqs {
        page(id: "cG9zdDoxNg==") {
            faq {
            faq {
                faqItemTitle
                faqItem {
                text
                }
            }
            }
        }
        }
    `;

	useEffect(() => {
		fetch(process.env.NEXT_PUBLIC_WP_URL, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				query,
			}),
		})
			.then((response) => response.json())
			.then((loadedData) => {
				setFaqs(loadedData.data.page.faq.faq);
				setIsLoadingPosts(false);
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	return (
		<section className="mt-14 container">
			<h2 className="text-center font-bold text-[40px]">Faq</h2>
			<div className="mt-3 flex flex-col gap-3">
				{isLoadingPosts ? (
					fakeArr.map((i, ind) => (
						<Skeleton
							key={ind}
							styles={
								"w-full h-[110px] bg-slate-100 animate-pulse rounded-sm"
							}
						/>
					))
				) : faqs.length > 0 ? (
					faqs.map((faq) => (
						<FaqCard
							key={faq.faqItemTitle}
							title={faq.faqItemTitle}
							text={faq.faqItem[0].text}
						/>
					))
				) : (
					<h3 className="text-center text-[18px]">No FAQ's yet</h3>
				)}
			</div>
		</section>
	);
}
