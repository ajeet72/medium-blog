import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDate } from "../hooks";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const CreatePost = ({ button }: { button: string }) => {
    const navigate = useNavigate();
    const titleFocus = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const date = useDate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (titleFocus.current) {
            titleFocus.current.focus();
        }
    }, []);

    async function createPost() {
        setLoading(true);
        setError(""); // Clear any existing errors

        try {
            if (title.length > 1 && content.length > 1) {
                const response = await axios.post(
                    `${BACKEND_URL}/api/v1/blog`,
                    {
                        title,
                        content,
                        date,
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem("token") || "",
                        },
                    }
                );
                navigate(`/blog/${response.data.id}`);
            } else {
                setError("Enter title and content");
            }
        } catch (err) {
            setError("An error occurred while creating the post");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-start mx-44 items-start">
            <div className="flex justify-start mx-80 items-start flex-col">
                <div>
                    <input
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        ref={titleFocus}
                        type="text"
                        placeholder="|Title"
                        className="border-b-2 border-gray-300 focus:outline-none focus:border-gray-500 text-5xl line-clamp-4 overflow-hidden"
                    />
                </div>
                <div className="mt-4 w-full">
                    <TextEditor
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        value={content} // Bind value to content state
                    />
                </div>
                <div className="text-red-600">{error}</div>
                <div>
                    <button
                        onClick={createPost}
                        className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-8 rounded-full mt-10"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? "Uploading..." : button}
                    </button>
                </div>
            </div>
        </div>
    );
};

export function TextEditor({ value, onChange }: { value: string, onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-2 w-full">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <textarea
                            onChange={onChange}
                            value={value}
                            id="editor"
                            rows={8}
                            className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
                            placeholder="Write an article..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
