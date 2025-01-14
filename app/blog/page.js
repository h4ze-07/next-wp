"use client";
import { useEffect, useState } from "react";

export default function Blog() {
	const [data, setData] = useState([]);
	const [isLoadingPosts, setIsLoadingPosts] = useState(true);

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
			.then((posts) => {
				setData(posts.data.posts.edges);
				setIsLoadingPosts(false);
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	return (
		<section className="mt-14 container">
			<h2 className="text-center font-bold text-[40px]">Blog</h2>

			<div className="mt-3">
				{isLoadingPosts ? (
					<div className="fixed top-0 z-[9] w-full h-[100vh] flex items-center justify-center">
						<div className="w-[70px] aspect-square rounded-full border-t-2 border-l-2 border-indigo-500 animate-spin"></div>
					</div>
				) : data.length > 0 ? (
					<div className="grid grid-cols-2 items-center gap-3">
						{data.map((post) => (
							<div key={post.node.date}>
								Post num {post.node.date}
							</div>
						))}
					</div>
				) : (
					<div>No posts found</div>
				)}
			</div>
		</section>
	);
}
