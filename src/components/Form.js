import React, {
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";

const Form = forwardRef((props, ref) => {
    const { onSubmit, initialValues, ...restProps } = props;
    const formRef = useRef(null);
    useImperativeHandle(ref, () => formRef.current, []);

    useEffect(() => {
        if (
            formRef.current &&
            initialValues &&
            typeof initialValues === "object"
        ) {
            for (const key in initialValues) {
                if (Object.hasOwnProperty.call(formRef.current, key)) {
                    formRef.current[key].value = initialValues[key];
                }
            }
        }
    }, [formRef.current, initialValues]);

    const _onSubmit = useCallback((event) => {
        event.preventDefault();

        const dataArr = [...new FormData(event.target)];
        const data = Object.fromEntries(dataArr);

        if (onSubmit && typeof onSubmit === "function") {
            onSubmit(event, data);
        }
    }, []);

    return <form {...restProps} onSubmit={_onSubmit} ref={formRef} />;
});

Form.displayName = "Form";

export default memo(Form);
