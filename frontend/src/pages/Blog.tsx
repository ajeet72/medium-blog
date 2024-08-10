import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BlogView } from "../components/BlogView";
import { useBlog } from "../hooks";
import { NotFound } from "../components/NotFound";
import { AppbarSkeleton, BlogSkeleton } from "../components/Skeletons";

export const Blog: React.FC = () => {
  const { id } = useParams();
  const blogId = id || "";
  const navigate = useNavigate();
  const { loading, blog } = useBlog(blogId);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, []);

  if (loading) {
    return (
      <div>
        <AppbarSkeleton />
        <BlogSkeleton />
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return (
    <div>
      <BlogView blog={blog.blog} userId={blog.userId} />
    </div>
  );
};
