import styles from "./index.module.css";

export default function DotsLoading(props) {
    return (
        <div {...props} className={`inline-block`}>
            <div className="inline-block mx-4 mt-3 mb-1">
                <div className={styles["dot-falling"]}></div>
            </div>
        </div>
    );
}
