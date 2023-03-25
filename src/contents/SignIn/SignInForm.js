import EmailField from "./EmailField";
import Form from "@/components/Form";
import PasswordField from "./PasswordField";

const SignInForm = ({ disabled, onSubmit, errors, initialValues }) => {
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            autoComplete="off"
        >
            <div className="space-y-2">
                <EmailField disabled={disabled} error={errors?.email} />

                <PasswordField disabled={disabled} error={errors?.password} />

                <div className="form-control">
                    <label className="label cursor-pointer justify-start space-x-3">
                        <input
                            tabIndex={3}
                            type="checkbox"
                            name="isRemember"
                            className="checkbox peer"
                            defaultChecked
                            disabled={disabled}
                        />
                        <span className="label-text text-gray-400 peer-checked:text-black">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="space-x-3 py-3">
                    <button
                        tabIndex={4}
                        type="submit"
                        className={`btn btn-primary w-full ${
                            disabled ? "loading" : ""
                        }`}
                        disabled={disabled}
                    >
                        {disabled ? "" : "Sign in"}
                    </button>
                </div>
            </div>
        </Form>
    );
};

export default SignInForm;
