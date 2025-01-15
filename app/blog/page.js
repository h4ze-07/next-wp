import BlogCard from "@/components/BlogCard";

export const metadata = {
	title: "MkeyMedia - Blog Page",
	description:
		"Welcome to our blog! Here you will find fresh articles, tips and news on a variety of topics. Read, get inspired and stay up to date with the latest trends!",
};

export default async function Blog() {
	const query = `
        query GetAllPosts {
            posts {
                edges {
                node {
                    date
                    id
                    seo {
                    title
                    description
                    }
                    postContent {
                    titlePost
                    textPost
                    }
                }
                }
            }
        }
    `;

	let posts = [];

	try {
		const response = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				query,
			}),
			next: {
				revalidate: 3600,
			},
		});
		if (response.ok) {
			const responseData = await response.json();
			posts = responseData.data.posts.edges || [];
			console.log(posts);
		} else {
			posts = [];
		}
	} catch (error) {
		console.error("Error", error);
	}

	return (
		<section className="mt-14 container">
			<h2 className="text-center font-bold text-[40px]">Blog</h2>

			<div className="mt-3">
				{posts.length > 0 ? (
					<div className="grid grid-cols-2 items-start gap-3">
						{posts.map((post) => (
							<BlogCard key={post.node.id} post={post} />
						))}
					</div>
				) : (
					<div>No posts found</div>
				)}
			</div>
		</section>
	);
}
