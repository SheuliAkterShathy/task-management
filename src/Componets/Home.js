import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../Contexts/AuthProvider';

const Home = () => {
    // const { user } = useContext(AuthContext);

    // const handleSubmit=event=>{
    //     event.preventDefault();
    //     const form = event.target;
    //     const task = form.task.value;
    //     const name = user?.displayName;
    //     const email = user?.email;
    //     // console.log(task,name,email)

    //     const userTask = {
    //         name,
    //         email,
    //         task,
    //       };

    //       fetch(
    //         "http://localhost:5000/tasks",
    //         {
    //           method: "POST",
    //           headers: {
    //             "content-type": "application/json",
                
    //           },
    //           body: JSON.stringify(userTask),
    //         }
    //       )
    //         .then((res) => res.json())
    //         .then((data) => {
    //         //   console.log(data);
    //           if (data.acknowledged) {
               
    //             toast.success("Task placed successfully");
    //             form.reset();
    //           }
    //         })
    //         .catch((er) => console.error(er));
    // }

    return (
        <section className="p-6 py-10 bg-sky-100">
	<div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
		<div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2">
			
			<h1 className="text-4xl font-extrabold">Task Management</h1>
			<p className="my-8">
            Task Management is smart task list for everyday use. It is truly usable with great user experience.
			</p>
			<form  novalidate="" action="" className="self-stretch space-y-3 ng-untouched ng-pristine ng-valid">
				{/* <div>
					<label for="task" className="text-sm text-start">Your Task Name</label>
					<input id="task" type="text" name='task' placeholder="Enter your task" className="w-full text-center rounded-md focus:ring focus:ring-violet-400 p-3" />
				</div> */}
				
				<div>
                <Link to='/signup'><button type="submit" className="w-full py-3 font-semibold rounded bg-sky-300 hover:bg-sky-200">See Details</button></Link>
                </div>
			</form>
		</div>
		<img src="https://t3.ftcdn.net/jpg/03/72/05/14/240_F_372051409_bBBjCY4YyvuGSjWat7geVwsFcOC0vnkN.jpg" alt="" className="object-cover w-full rounded-md xl:col-span-3 dark:dark:bg-gray-500" />
	</div>
</section>
    );
};

export default Home;