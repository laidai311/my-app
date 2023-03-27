import { debounce } from "lodash";
import { memo, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const emailValidator = (value) => {
    return value
        ? /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)
            ? ""
            : "Invalid email address"
        : "Required email";
};

const EmailField = ({ disabled, error }) => {
    const [data, setData] = useState();

    useEffect(() => {
        setData({ errorMessage: error });

        return () => {
            debounceValue.cancel();
        };
    }, [error]);

    const debounceValue = useCallback(
        debounce((value) => {
            setData({
                errorMessage: emailValidator(value),
                isLoading: false,
            });
        }, 300),
        []
    );

    return (
        <div className="form-control w-full">
            <label className="label" htmlFor="email">
                <span className="label-text">Email address:</span>
            </label>
            <input
                tabIndex={1}
                id="email"
                type="text"
                name="email"
                placeholder=" Email Address"
                className={`input input-bordered w-full appearance-none text-base ${
                    data?.errorMessage && !data?.isLoading ? "input-error" : ""
                }`}
                disabled={!!disabled}
                onFocus={(e) => e.preventDefault()}
                onBlur={(e) => {
                    // setData({ isLoading: true });
                    debounceValue(e.target.value);
                }}
                role="presentation"
                autoComplete="off"
            />
            {data?.isLoading ? (
                <motion.label
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="label"
                >
                    <span className="label-text-alt">Typing...</span>
                </motion.label>
            ) : (
                data?.errorMessage && (
                    <motion.label
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="label"
                    >
                        <span
                            className="label-text-alt text-error"
                            dangerouslySetInnerHTML={{
                                __html: data.errorMessage,
                            }}
                        />
                    </motion.label>
                )
            )}
        </div>
    );
};

export default memo(EmailField);
