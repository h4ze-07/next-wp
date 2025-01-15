import FaqCard from "@/components/FaqCard";

export const metadata = {
	title: "MkeyMedia - FAQ Page",
	description:
		"Explore our comprehensive FAQ Page, designed to answer all your questions quickly and effectively. Find detailed information and solutions to common issues, ensuring a smooth experience with our services. Stay informed and empowered with our up-to-date FAQ section.",
};

export default async function Faq() {
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

	const res = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({
			query,
		}),
		next: { revalidate: 3600 },
	});
	const faqsData = await res.json();
	const faqs = faqsData.data.page.faq.faq;
	console.log(faqs);

	return (
		<section className="mt-14 container">
			<h2 className="text-center font-bold text-[40px]">Faq</h2>
			<div className="mt-3 flex flex-col gap-3">
				{faqs.length > 0 ? (
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
