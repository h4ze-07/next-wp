export default function PostPage({ params }) {
	console.log(params);
	const { slug } = params;

	return <h1 className="mt-5">My Post: {slug}</h1>;
}
