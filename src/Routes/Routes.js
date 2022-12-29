import AddTask from "../Componets/AddTask";
import CompletedTask from "../Componets/CompletedTask";
import Home from "../Componets/Home";
import Login from "../Componets/Login";
import Media from "../Componets/Media";
import MyTask from "../Componets/MyTask";
import Register from "../Componets/Register";
import Main from "../Layout/Main";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
 {
    path: '/',
    element: <Main></Main>,
    children:[
        {
           path: '/',
           element: <Home></Home>
        },
        {
            path: '/add-task',
            element: <AddTask></AddTask>
        },
        {
            path: '/my-task',
            element: <MyTask></MyTask>
        },
        {
            path: '/completed-task',
            element: <CompletedTask></CompletedTask>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/signup',
            element: <Register></Register>
        },
        {
            path: '/media',
            element: <Media></Media>
        }
    ]
 }
])
export default router;