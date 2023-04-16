import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

const Form = forwardRef((props, ref) => {
  const { onSubmit, initialValues, ...restProps } = props;
  const formRef = useRef(null);
  useImperativeHandle(ref, () => formRef.current, []);

  useEffect(() => {
    if (formRef.current && initialValues && typeof initialValues === 'object') {
      for (const key in initialValues) {
        if (Object.hasOwnProperty.call(formRef.current, key)) {
          formRef.current[key].value = initialValues[key];
        }
      }
    }
  }, [formRef.current, initialValues]);

  const _onSubmit = useCallback((e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(e, data);
    }
  }, []);

  return <form {...restProps} onSubmit={_onSubmit} ref={formRef} />;
});

Form.displayName = 'Form';

export default Form;
