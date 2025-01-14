import Image from "next/image"

const Hero = () => {
    return (
        <section className="w-full h-screen">
            <Image
                src={'/images/hero.jpg'}
                alt="hero-cover"
                width={1920}
                height={1080}
                className="w-full hero-img"
            />
        </section>
    )
}

export default Hero