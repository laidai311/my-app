import { debounce } from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDisclosure } from '@/libs/hooks';
import { useToggle } from 'ahooks';

const getMessage = (value) => {
  let result = [
    "<ul style='list-style: inside;'>",
    '',
    '',
    '',
    '',
    '',
    '</ul>',
  ];
  if (!/[A-Z]/.test(value)) {
    result[1] = '<li>At least 1 Uppercase</li>';
  }
  if (!/[a-z]/.test(value)) {
    result[2] = '<li>At least 1 Lowercase</li>';
  }
  if (!/[0-9]/.test(value)) {
    result[3] = '<li>At least 1 Number</li>';
  }
  if (!/[!@#$%^&*_=+-]/.test(value)) {
    result[4] = '<li>At least 1 Symbol, symbol allowed --> !@#$%^&*_=+-</li>';
  }
  if (!/^.{8,12}$/.test(value)) {
    result[5] = '<li>Min 8 chars and Max 12 chars</li>';
  }
  return result.join('');
};

export const passwordValidator = (value) => {
  return value
    ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/.test(
        value
      )
      ? ''
      : getMessage(value)
    : 'Required password';
};

const PasswordField = ({ disabled, error }) => {
  const [data, setData] = useState();
  const [open, { toggle }] = useToggle();

  useEffect(() => {
    setData({ errorMessage: error });

    return () => {
      debounceValue.cancel();
    };
  }, [error]);

  const debounceValue = useCallback(
    debounce((value) => {
      setData({
        errorMessage: passwordValidator(value),
        isLoading: false,
      });
    }, 300),
    []
  );

  return (
    <div className="form-control w-full">
      <label className="label" htmlFor="password">
        <span className="label-text">Password:</span>
      </label>
      <div className="relative">
        <input
          tabIndex={2}
          id="password"
          type={open ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          className={`input input-bordered w-full appearance-none text-base ${
            data?.errorMessage && !data?.isLoading ? 'input-error' : ''
          }`}
          disabled={disabled}
          onBlur={(e) => {
            // setData({ isLoading: true });
            debounceValue(e.target.value);
          }}
          autoComplete="new-password"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <button
            type="button"
            className="btn btn-ghost btn-sm text-gray-500"
            onClick={toggle}
            disabled={disabled}
          >
            {open ? (
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                Hide
              </motion.span>
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                Show
              </motion.span>
            )}
          </button>
        </div>
      </div>
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
                __html: data?.errorMessage,
              }}
            />
          </motion.label>
        )
      )}
    </div>
  );
};

export default memo(PasswordField);
