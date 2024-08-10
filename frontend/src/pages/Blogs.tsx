import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { useEffect } from "react";
import { AppbarSkeleton, BlogsSkeleton } from "../components/Skeletons";

export const Blogs = () => {
  const navigate = useNavigate();
  const { loading, blogs } = useBlogs();
  const token = localStorage.getItem("token")

  useEffect(()=> {
    if(!token){
      navigate("/signin")
    }
  })

  if(loading){
    return <div>
      <AppbarSkeleton />
      <BlogsSkeleton />
      <BlogsSkeleton />
      <BlogsSkeleton />
      <BlogsSkeleton />
    </div>
  }
  return (
    <div>
      <Appbar />
      {blogs
        .slice()
        .reverse()
        .map((blog) => (
          <BlogCard
            key={blog.id}
            onClick={() => {
              navigate(`/blog/${blog.id}`);
            }}
            id={blog.id}
            title={blog.title}
            content={blog.content}
            date={blog.date}
            authorName={blog.author.name}
          />
      ))}
    </div>
  );
};
