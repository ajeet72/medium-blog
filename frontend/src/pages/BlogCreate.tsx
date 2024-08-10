import { Appbar } from "../components/Appbar"
import { CreatePost } from "../components/CreatePost"



export const BlogCreate = ()=> {

    return <div>
        <Appbar />
        <CreatePost button={"Publish"}/>
    </div>
}