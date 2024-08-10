import { useNavigate } from "react-router-dom";
import { Blog } from "../hooks";
import { Appbar } from "./Appbar"
import { UserIcon } from "./UserIcon";

interface BlogViewInterface {
  blog: Blog;
  userId: string;
}

export const BlogView = ({ blog, userId }: BlogViewInterface ) => {
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate(`/blog/${blog.id}/edit`);
  };

  const isAuthor = blog.authorId === userId;

  return (
    <div>
      <Appbar/>
      <div className="flex justify-center mx-80 p-4">
        <div className="w-full">
          <div className="bg-white p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
              {isAuthor && (
                <button 
                  onClick={handleEdit} 
                  className="bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-8 rounded-full"
                >
                  Edit
                </button>
              )}
            </div>
            <p className="text-gray-600 mb-4">Published on {blog.date}</p>
            <p className="text-gray-800">{blog.content}</p>
          </div>
        </div>
        <div className="w-96">
          <div className="bg-white p-6">
            <h1 className="text-sm font-bold mb-2">Author</h1>
            <div className="flex justify-start align-center">
              <UserIcon name={blog.author.name} />
              {blog.author.name}
            </div>
            <p className="text-gray-600 mt-2">Random catch phrase about the author's ability to grab the user's attention</p>
          </div>
        </div>
      </div>
    </div>
  );
};