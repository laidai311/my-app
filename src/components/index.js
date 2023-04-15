import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Button = ({ children, loading, ...restProps }) => {
  return (
    <button
      disabled={!!loading}
      {...restProps}
      className="rounded-lg py-3 px-6 font-semibold text-sm uppercase text-white bg-indigo-600 hover:bg-indigo-700 transition-all ease-out active:scale-95 disabled:pointer-events-none disabled:opacity-90"
    >
      {loading ? (
        <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
      ) : (
        children || ''
      )}
    </button>
  );
};

export const Input = ({ placeholder, label, ...restProps }) => {
  return (
    <div className={`relative h-14 inline-block`}>
      <input
        {...restProps}
        className="peer h-full w-full appearance-none outline-none focus:outline-none px-3 pt-6 pb-2 bg-gray-100 transition-all rounded-md border-b border-gray-200 focus:border-indigo-500 hover:bg-gray-200/70 focus:bg-gray-100 disabled:pointer-events-none disabled:opacity-90"
        placeholder=" "
      />
      <label className="after:content[' '] pointer-events-none absolute inset-0 px-3 flex h-full w-full select-none text-gray-400 text-xs peer-focus:text-xs peer-placeholder-shown:text-base transition-all leading-7 peer-focus:leading-7 peer-placeholder-shown:leading-[56px] rounded-md overflow-hidden after:absolute after:bottom-0 after:left-0 after:transition-transform after:border-b-2 after:border-b-indigo-500 after:w-full after:scale-x-0 peer-focus:after:scale-x-100 peer-disabled:text-gray-300">
        {placeholder || label || ''}
      </label>
    </div>
  );
};
