import { Scrollbars } from "react-custom-scrollbars-2";

const CustomScrollbars = (props) => {
    return (
        <Scrollbars
            {...props}
            autoHide
            autoHideDuration={200}
            autoHideTimeout={1000}
            thumbMinSize={52}
            renderTrackVertical={(props) => (
                <div
                    {...props}
                    className="!w-2 rounded-md right-[2px] top-[2px] bottom-[2px]"
                />
            )}
            renderThumbVertical={(props) => (
                <div
                    {...props}
                    className="rounded-md bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
                />
            )}
            universal={true}
        />
    );
};

export default CustomScrollbars;
