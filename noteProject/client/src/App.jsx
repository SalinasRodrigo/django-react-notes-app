import './App.css'
import { Header } from './components/Header'
import { NoteListPage } from './pages/NoteListPage'
import { OneNote } from './pages/OneNote'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <NoteListPage/>,
  },
  {
    path: "/notes/:id",
    element: <OneNote/>,
  },
]);

 
function App() {

  return (
    <div>  
      <Header/>
      <div className='paper'>
        <RouterProvider router={router}/>
      </div>
    </div>
  )
}

export default App
