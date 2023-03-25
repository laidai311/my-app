const { SpinnerWhiteIcon } = require("./ProviderIcon");

const FullPageLoader = (props) => (
    <div
        {...props}
        className="flex justify-center items-center min-h-[var(--window-inner-height)] bg-primary-focus fixed inset-0 pointer-events-none"
    >
        <SpinnerWhiteIcon className="animate-spin-steps-12 w-10 h-10" />
    </div>
);

export default FullPageLoader;
