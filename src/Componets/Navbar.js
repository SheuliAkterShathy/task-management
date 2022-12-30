import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';

const Navbar = () => {
    const [navbar, setNavbar] = useState(false);


    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }
    const handleSubmit=event=>{
        event.preventDefault();
        const form = event.target;
        const task = form.task.value;
        const name = user?.displayName;
        const email = user?.email;
        // console.log(task,name,email)

        const userTask = {
            name,
            email,
            task,
          };

          fetch(
            "https://task-management-server-sheuliaktershathy.vercel.app/tasks",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                
              },
              body: JSON.stringify(userTask),
            }
          )
            .then((res) => res.json())
            .then((data) => {
            //   console.log(data);
              if (data.acknowledged) {
               
                toast.success("Task placed successfully");
                form.reset();
              }
            })
            .catch((er) => console.error(er));
    }

    return (
        <nav className="w-full bg-sky-400 shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link to='/'>
                            <h2 className="text-2xl font-bold text-white">Task Management</h2>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-white hover:text-indigo-200">
                                <Link to='/'>Home</Link>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <Link to='/blog'>Blog</Link>
                            </li>
                            {
                                user?.uid?
                                 <>
                                    

                                    <form  onSubmit={handleSubmit} >
                                   <div className='flex'>
                                   <input id="task" type="text" name='task' placeholder="Enter your task" className="w-36 text-center rounded-md focus:ring focus:ring-violet-400" />
                                   

                                   <div>
                            <button type="submit" className="w-10 p-3 font-semibold rounded-full bg-sky-300 hover:bg-sky-200">+</button>
                            
                       </div>
                                   </div>
                        </form>

                               <li className="text-white hover:text-indigo-200">
                                <Link to='/my-task'>My Task</Link>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <Link to='/completed-task'>Completed Task</Link>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <Link to='/add-task'>Add Task</Link>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <Link to='/media'>My Media</Link>
                            </li>
                                 </>
                                :
                                <>
                                </>
                            }
                           
                        </ul>

                        <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                   
                    {
                        user?.uid ?
                         <>
                          <Link
                       onClick={handleLogOut}
                        className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                    >
                        Log Out
                    </Link>
                         </>
                        :
                        <>
                         <Link
                        to='/login'
                        className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                    >
                        Log In
                    </Link>
                        </>
                    }
                </div>
                    </div>
                </div>
                <div className="hidden space-x-2 md:inline-block">
                    {/* <a
                        href="javascript:void(0)"
                        className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                    >
                        Sign in
                    </a> */}
                   

                    {
                        user?.uid ?
                         <>
                          <Link
                       onClick={handleLogOut}
                        className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                    >
                        Log Out
                    </Link>
                         </>
                        :
                        <>
                         <Link
                        to='/login'
                        className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                    >
                        Log In
                    </Link>
                        </>
                    }
                   
                </div>
            </div>
        </nav>

    );
};

export default Navbar;