import React from "react";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const UpdatedTask = () => {
  const data = useLoaderData();
  

  const handleSubmit=event=>{
    event.preventDefault();
        const form = event.target;
        const task = form.task.value;
       

        const updatedTask = {
            task,
          };

          fetch(
            `https://task-management-server-sheuliaktershathy.vercel.app/update/${data?._id}`,
            {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
                
              },
              body: JSON.stringify(updatedTask),
            }
          )
            .then((res) => res.json())
            .then((data) => {
            //   console.log(data);
              if (data.acknowledged) {
               
                toast.success("Task updated successfully");
                form.reset();
              }
            })
            .catch((er) => console.error(er));
  }
  return (
    <div className=" text-center py-12">
        <h2 className="text-center font-bold text-xl mb-4 underline">Update Your Task</h2>
     <form onSubmit={handleSubmit} action="">
     <input
        id="task"
        type="text"
        name="task"
        placeholder="Update your task"
        className="w-[50%] text-center rounded-md focus:ring focus:ring-violet-400 p-3 bg-sky-100"
        defaultValue={data.task}
      />
      <button
        type="submit"
        className="w-20 py-3 font-semibold rounded bg-sky-300 hover:bg-sky-200"
      >
        Submit
      </button>
     </form>
    </div>
  );
};

export default UpdatedTask;
