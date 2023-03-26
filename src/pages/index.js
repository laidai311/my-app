import Head from "next/head";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
    const { user, signOutApp } = useAuth();

    return (
        <>
            <Head>
                <title>DaiLai 9966</title>
            </Head>
            <main>
                <button className="btn btn-primary">Button</button>
                <div className="">
                    {user ? (
                        <button className="btn btn-accent" onClick={signOutApp}>
                            Sign out
                        </button>
                    ) : (
                        <Link href="/sign-in" className="btn btn-primary">
                            Sign in
                        </Link>
                    )}
                </div>

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

// HomePage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
