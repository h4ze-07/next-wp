
const FaqCard = ({ title, text }) => {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-[20px]">{title}</h3>
            <p>
                {text}
            </p>
        </div>
    )
}

export default FaqCard