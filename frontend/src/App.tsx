import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { BlogCreate } from './pages/BlogCreate'
import { NotFound } from './components/NotFound'
import { MyBlog } from './pages/MyBlog'
import { Edit } from './pages/Edit'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Signup/> }></Route>
          <Route path='/signup' element={ <Signup/> }></Route>
          <Route path='/signin' element={ <Signin/> }></Route>
          <Route path='/blogs' element={ <Blogs/> }></Route>
          <Route path='/blog/create' element={ <BlogCreate /> }></Route>
          <Route path='/blog/myblog' element={ <MyBlog /> }></Route>
          <Route path='/blog/:id' element={ <Blog /> }></Route>
          <Route path='/blog/:id/edit' element={ <Edit /> }></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
