const LoadingScreen = () => {
    return (
        <div className="absolute top-0 z-[11] w-full h-screen flex items-center justify-center bg-[#0000004f]">
            <div className="w-[100px] aspect-square rounded-full border-t-2 border-l-2 border-red-500 animate-spin"></div>
        </div>
    )
}

export default LoadingScreen