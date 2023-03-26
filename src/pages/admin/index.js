import { useAuth } from "@/contexts/AuthUserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminApp = (props) => {
    const { authUser, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        router.prefetch("/");
    }, [router]);

    // Listen for changes on loading and authUser, redirect if needed
    useEffect(() => {
        if (!loading && !authUser) router.push("/");
    }, [authUser, loading]);

    return (
        <>
            <Head>
                <title>Admin DaiLai 9966</title>
            </Head>
            <div className="">admin</div>
        </>
    );
};

export default AdminApp;
