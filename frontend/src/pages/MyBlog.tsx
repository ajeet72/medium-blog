import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useUserBlog } from "../hooks";
import { useEffect } from "react";
import { AppbarSkeleton, BlogsSkeleton } from "../components/Skeletons";

export const MyBlog = () => {
  const navigate = useNavigate();
  const { loading, blogs } = useUserBlog();
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
      <Appbar/>
      {blogs.map((blog) => (
        <BlogCard
          onClick={()=> {
            navigate(`/blog/${blog.id}`)
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
