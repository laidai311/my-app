import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const PreviewAccounts = ({ onClick, disabled }) => {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        const local = Cookies.get();

        setEmails(() =>
            Object.entries(local)
                .filter((item) => item[0].startsWith("account"))
                .map((item) => JSON.parse(item[1]))
        );
    }, []);

    const handleClick = (value) => {
        setEmails((prev) =>
            prev.map((item) => {
                if (item.email === value.email) {
                    return { ...item, isActive: !item?.isActive };
                } else if (item?.isActive) {
                    return { ...item, isActive: false };
                }
                return item;
            })
        );

        if (onClick && typeof onClick === "function") {
            onClick(value);
        }
    };

    if (emails?.length <= 0) {
        return null;
    }

    return (
        <div className="flex justify-center space-x-2 w-full overflow-x-auto overflow-y-hidden">
            {emails.map((item, index) => (
                <button
                    key={index}
                    className={`flex flex-col justify-center space-y-1 btn btn-ghost flex-nowrap h-fit py-2 px-1 border ${
                        item?.isActive
                            ? "bg-[#1f293733]"
                            : "hover:bg-transparent hover:border-gray-300"
                    }`}
                    onClick={() => handleClick(item)}
                    disabled={!!disabled}
                >
                    {item.photoUrl ? (
                        <div className="avatar">
                            <div className="w-12 h-12 rounded-full mx-auto">
                                <img src={item?.photoURL || item?.photoUrl} />
                            </div>
                        </div>
                    ) : (
                        <div className="avatar placeholder">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-12 h-12 mx-auto">
                                <span className="text-xl uppercase">
                                    {item.email[0]}
                                </span>
                            </div>
                        </div>
                    )}
                    <div className="text-xs text-center">
                        {item?.email?.split("@")[0]}
                    </div>
                </button>
            ))}
        </div>
    );
};

export default PreviewAccounts;
