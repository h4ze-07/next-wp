import Link from 'next/link'
import React from 'react'

const BlogCard = ({ post }) => {

    const date = post.node.date;
    const slug = post.node.slug;
    const postData = post.node.postContent;

    return (
        <div className='flex flex-col gap-3 p-5'>
            <div className='w-full h-[300px] border-red-500 border-2' />
            <span className='text-slate-300 text-[14px]'>{date}</span>
            <h3 className='font-bold text-[20px]'>{postData.titlePost}</h3>
            <div dangerouslySetInnerHTML={{ __html: postData.textPost }} className='blog-card-text'></div>
            <Link href={`/blog/${slug}`}>
                Читать дальше
            </Link>
        </div>
    )
}

export default BlogCard;