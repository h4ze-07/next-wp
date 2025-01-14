import Link from "next/link"

const Header = () => {
    return (
        <header className="fixed top-0 z-10 bg-red-500 py-[10px] w-full">
            <nav className="flex items-center gap-[15px] justify-center">
                <Link href={'/'} className="text-white font-semibold text-[20px]">
                    Home
                </Link>
                <Link href={'/blog'} className="text-white font-semibold text-[20px]">
                    Blog
                </Link>
                <Link href={'/faq'} className="text-white font-semibold text-[20px]">
                    Faq
                </Link>
            </nav>
        </header>
    )
}

export default Header;