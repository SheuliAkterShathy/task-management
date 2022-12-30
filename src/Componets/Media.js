import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";

const Media = () => {
  const { user } = useContext(AuthContext);
  const url = `https://task-management-server-sheuliaktershathy.vercel.app/medias?email=${user?.email}`;

  const {
    data: medias,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["medias", user?.email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="text-center w-full mx-auto py-12">
      <div className="mb-6">
        <h3 className="text-3xl text-center underline">My Media</h3>
        <p className="text-center">Name:{user?.displayName}</p>
        <p className="text-center">Email: {user?.email}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {medias &&
          medias?.map((media) => (
            <div className="bg-sky-100 p-4 shadow">
              <img src={media.image} alt="" className="w-full h-44" />
              <p className="text-start mt-3 font-bold">
                Details: {media.details}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Media;
