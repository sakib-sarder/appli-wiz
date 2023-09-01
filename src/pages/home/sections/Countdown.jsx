
const Countdown = ({count}) => {
    return (
        <div
            className={`fixed z-10 top-0 left-0 w-full h-full bg-[#00000085] transition text-8xl text-white grid items-center`}
        >
            {count}
        </div>
    );
};

export default Countdown;