import { useEffect, useRef } from "react";
import Form from "./Form";
import { IoSend } from "react-icons/io";

const TextFieldAutoHeight = (props) => {
    const { value } = props;
    const inputAutoHeightRef = useRef(null);
    const inputRef = useRef(null);
    const btnSubmitRef = useRef(null);

    useEffect(() => {
        if (inputAutoHeightRef.current) {
            inputAutoHeightRef.current.innerText = value || "";
        }
    }, [inputAutoHeightRef.current]);

    return (
        <>
            <style jsx>
                {`
                    /* Hide scrollbar for Chrome, Safari and Opera */
                    .hide-scroll::-webkit-scrollbar {
                        display: none;
                    }
                    /* Hide scrollbar for IE, Edge and Firefox */
                    .hide-scroll {
                        -ms-overflow-style: none; /* IE and Edge */
                        scrollbar-width: none; /* Firefox */
                    }

                    .text-field-placeholder[placeholder]:empty:before {
                        content: attr(placeholder);
                        color: #555;
                    }
                    .text-field-placeholder[placeholder]:empty:focus:before {
                        content: "";
                    }
                `}
            </style>
            <Form
                onSubmit={(value) => {
                    console.log(value);
                }}
            >
                <div
                    style={{ border: "thin solid #d9d9d9" }}
                    className="bg-white rounded-md relative flex"
                >
                    <div className="text-[#000000e0] grow max-h-32 overflow-y-auto overflow-x-hidden hide-scroll ">
                        <input ref={inputRef} name="name" className="hidden" />
                        <div
                            spellCheck={false}
                            contentEditable={true}
                            className="relative w-full min-w-0 py-2 px-3 leading-6 align-bottom outline-none text-field-placeholder"
                            placeholder="What did you like or dislike?"
                            ref={inputAutoHeightRef}
                            onInput={() => {
                                inputRef.current.value =
                                    inputAutoHeightRef.current.textContent;
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    btnSubmitRef.current.click();
                                } else {
                                    e.stopPropagation();
                                }
                            }}
                            onPaste={(e) => {
                                e.stopPropagation();
                                e.preventDefault();

                                // Get pasted data via clipboard API
                                const clipboardData =
                                    e.clipboardData || window.clipboardData;
                                const pastedData =
                                    clipboardData.getData("text/plain");
                                const clearBreakLine = pastedData.replace(
                                    /\n/g,
                                    " "
                                );

                                const selection = window.getSelection();
                                if (!selection.rangeCount) return;

                                selection.deleteFromDocument();
                                selection
                                    .getRangeAt(0)
                                    .insertNode(
                                        document.createTextNode(clearBreakLine)
                                    );
                                selection.collapseToEnd();
                            }}
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="md:hidden py-2 px-3"
                            ref={btnSubmitRef}
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default TextFieldAutoHeight;
