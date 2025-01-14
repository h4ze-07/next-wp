"use client";
import { useEffect, useState } from "react";

export default function FetchData({ query, }) {
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
        <div className="">
            {isLoadingPosts ? (
                <div className="fixed w-full h-screen flex items-center justify-center">
                    <div className="w-[70px] aspect-square rounded-full border-t-2 border-l-2 border-indigo-500 animate-spin"></div>
                </div>
            ) : data.length > 0 ? (
                data.map((post) => (
                    <div key={post.node.date}>
                        Post num {post.node.date}
                    </div>
                ))
            ) : (
                <div>No posts found</div>
            )}
        </div>
    );
}
