import { Appbar } from "../components/Appbar"
import { useParams } from "react-router-dom";
import { EditPost } from "../components/EditPost";
import { AppbarSkeleton } from "../components/Skeletons";
import { useBlog } from "../hooks";

export const Edit = () => {
    const { id } = useParams<{ id: string }>();
    const blogId = id || "";
    const { loading, blog } = useBlog(blogId);
    console.log(blog)
    
    if(loading){
        return <div>
            <AppbarSkeleton />
        </div>
    }

    return <div>
        <Appbar/>
        <EditPost button={"Update"} blog={blog?.blog} />
    </div>
}