import { useEffect, useRef, useState } from "react";
import { useDate } from "../hooks";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { TextEditor } from "./CreatePost";

export const EditPost = ({ button, blog }: { button: string; blog: any }) => {
    const navigate = useNavigate();
    const titleFocus = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const date = useDate();

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
        }
    }, [blog]);

    useEffect(() => {
        if (titleFocus.current) {
            titleFocus.current.focus();
        }
    }, []);

    async function updatePost() {
        setLoading(true);
        setError(""); // Clear any existing errors

        // Validate title and content
        if (!title.trim() || !content.trim()) {
            setError("Title or content is empty");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.put(
                `${BACKEND_URL}/api/v1/blog`,
                {
                    title,
                    content,
                    date,
                    id: blog.id,
                    authorId: blog.authorId,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                }
            );
            navigate(`/blog/${response.data.id}`);
        } catch (err) {
            setError("You are not the author of this post / some server error");
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
                        value={title}
                        placeholder="|Title"
                        className="border-b-2 border-gray-300 focus:outline-none focus:border-gray-500 text-5xl line-clamp-4 overflow-hidden"
                    />
                </div>
                <div className="mt-4 w-full">
                    <TextEditor
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        value={content}
                    />
                </div>
                <div className="text-red-600">{error}</div>
                <div>
                    <button
                        onClick={updatePost}
                        className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-8 rounded-full mt-10"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? "Updating..." : button}
                    </button>
                </div>
            </div>
        </div>
    );
};
