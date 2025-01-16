export async function generateMetadata({ params }) {
	const { slug } = await params;
	const query = `
      query GetPostBySlug($slug: String!) {
        postBy(slug: $slug) {
          seo {
            title
            description
          }
        }
      }
    `;

	const response = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query,
			variables: { slug },
		}),
	});

	const responseData = await response.json();
	const seoData = responseData.data.postBy.seo;

	return {
		title: seoData.title,
		description: seoData.description,
	};
}

export default async function Page({ params }) {
	const { slug } = await params;
	const query = `
        query GetPostBySlug($slug: String!) {
        postBy(slug: $slug) {
            date
            postContent {
            textPost
            titlePost
            }
        }
        }
    `;

	const response = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query,
			variables: { slug },
		}),
		next: {
			revalidate: 3600,
		},
	});

	const responseData = await response.json();
	console.log(responseData);
	const postData = responseData.data.postBy;

	return (
		<div className="mt-[100px] container">
			<p>{postData.date}</p>
			<h1 className="">{postData.postContent.titlePost}</h1>
			<div
				dangerouslySetInnerHTML={{
					__html: postData.postContent.textPost,
				}}
			></div>
		</div>
	);
}
