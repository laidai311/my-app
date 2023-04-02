import ReactPlayer from "react-player";

const CustomPlayer = (props) => {
    return (
        <div className="relative pt-[56.25%]">
            <ReactPlayer
                className="absolute top-0 left-0 !w-full !h-full bg-black"
                controls
                url="https://khonhapho.sgp1.cdn.digitaloceanspaces.com/mov-1-1679911224135.mov"
            />
        </div>
    );
};

export default CustomPlayer;
