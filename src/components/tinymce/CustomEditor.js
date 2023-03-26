import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import initFullProps from "./initFullProps";

const CustomEditor = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    return (
        <>
            <Editor
                id="Editor"
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                    selector: "textarea#basic-example",
                    height: 500,
                    plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "help",
                        "wordcount",
                    ],
                    toolbar:
                        "undo redo | blocks | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                }}
            />
            <button className="btn" onClick={log}>
                LOG
            </button>
        </>
    );
};

export default CustomEditor;
