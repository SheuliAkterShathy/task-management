import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";

const MyTask = () => {
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
    <div className="px-4 my-8">
      <div className="mb-6">
        <h3 className="text-3xl text-center underline">My Tasks</h3>
        <p className="text-center">Name:{user?.displayName}</p>
        <p className="text-center">Email: {user?.email}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="font-bold">
              <td>Serial No</td>
              <td>Task</td>
              <td>Update</td>
              <td>Delete</td>
              <td>Compelete</td>
            </tr>
          </thead>
          <tbody>
            {tasks &&
              tasks?.map((task, i) => (
                <tr key={task?._id}>
                  <td>{i + 1}</td>
                  <td>{task?.task}</td>
                  <td>
                    <Link to={`/updated-task/${task?._id}`}>
                      <button className="bg-sky-300 px-2 rounded-md hover:bg-sky-200">
                        Update
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(task?._id)}
                      className="bg-red-300 px-2 rounded-md hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link to="/completed-task">
                      <button className="bg-sky-300 px-2 rounded-md hover:bg-sky-200">
                        Complete
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTask;
