import Head from "next/head";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthUserContext";
import { signOut } from "firebase/auth";
import { auth } from "@/configs/firebase";
import Cookies from "js-cookie";
import CustomEditor from "@/components/Tinymce/CustomEditor";
import BarLayout from "@/layouts/BarLayout";

export default function HomePage() {
    const { authUser } = useAuth();

    return (
        <>
            <Head>
                <title>DaiLai 9966</title>
            </Head>
            <main>
                <button className="btn btn-primary">Button</button>
                <div className="">
                    {authUser ? (
                        <button
                            className="btn btn-accent"
                            onClick={() => {
                                signOut(auth).then(() => {
                                    setUser(null);
                                    Cookies.remove("user");
                                });
                            }}
                        >
                            Sign out
                        </button>
                    ) : (
                        <Link href="/sign-in" className="btn btn-primary">
                            Sign in
                        </Link>
                    )}
                </div>

                <div className="">
                    <Link href="/admin" className="btn">
                        Admin
                    </Link>
                </div>
                {/* The button to open modal */}
                <label htmlFor="my-modal" className="btn">
                    open modal
                </label>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">
                            Congratulations random Internet user!
                        </h3>
                        <p className="py-4">
                            You've been selected for a chance to get one year of
                            subscription to use Wikipedia for free!
                        </p>
                        <div className="modal-action">
                            <label htmlFor="my-modal" className="btn">
                                Yay!
                            </label>
                        </div>
                    </div>
                </div>
                <CustomEditor />
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">What is your name?</span>
                        <span className="label-text-alt">Top Right label</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs appearance-none"
                    />
                    <label className="label">
                        <span className="label-text-alt">
                            Bottom Left label
                        </span>
                        <span className="label-text-alt">
                            Bottom Right label
                        </span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your bio</span>
                        <span className="label-text-alt">Alt label</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-24 text-base appearance-none"
                        placeholder="Bio"
                    ></textarea>
                    <label className="label">
                        <span className="label-text-alt">Your bio</span>
                        <span className="label-text-alt">Alt label</span>
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Pick a file</span>
                        <span className="label-text-alt">Alt label</span>
                    </label>
                    <input
                        accept="image/*"
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                    />
                    <label className="label">
                        <span className="label-text-alt">Alt label</span>
                        <span className="label-text-alt">Alt label</span>
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Pick a file</span>
                        <span className="label-text-alt">Alt label</span>
                    </label>
                    <input
                        accept="video/*"
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                    />
                    <label className="label">
                        <span className="label-text-alt">Alt label</span>
                        <span className="label-text-alt">Alt label</span>
                    </label>
                </div>
            </main>
        </>
    );
}

HomePage.getLayout = (page) => <BarLayout>{page}</BarLayout>;
