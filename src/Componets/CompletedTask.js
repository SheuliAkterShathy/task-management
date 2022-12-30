import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";

const CompletedTask = () => {
  const { user } = useContext(AuthContext);
  const url = `https://task-management-server-sheuliaktershathy.vercel.app/tasks?email=${user?.email}`;

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleComplete = (id) => {
    fetch(`https://task-management-server-sheuliaktershathy.vercel.app/complete/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Congrats! Task completed.");
          refetch();
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      fetch(`https://task-management-server-sheuliaktershathy.vercel.app/tasks/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("deleted successfully");
            refetch();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="text-center w-full mx-auto py-20">
      <div className="grid md:grid-cols-3 gap-5">
        {tasks &&
          tasks?.map((task) => (
            <div className="bg-sky-100 p-8 shadow">
              <h3>
                {task.isCompleted === true ? (
                  <p className="line-through">Task: {task.task}</p>
                ) : (
                  <p>Task: {task.task}</p>
                )}
              </h3>
              <div className="mt-3">
                <Link to="/my-task">
                  <button className="bg-sky-300 rounded-md px-2 py-1 mr-2 hover:bg-sky-200">
                    Incomplete
                  </button>
                </Link>
                <button
                  onClick={() => handleComplete(task._id)}
                  className="bg-sky-300 rounded-md px-2 py-1 hover:bg-sky-200"
                >
                  Complete
                </button>
                <p className="mt-3">
                  {task.isCompleted === true ? "Comment:  Task Completed" : ""}
                </p>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-300 rounded-md px-2 py-1 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CompletedTask;
