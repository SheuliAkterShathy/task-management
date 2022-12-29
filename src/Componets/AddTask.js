import React from 'react';
import { useForm } from 'react-hook-form';

const AddTask = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const imageHostKey = process.env.REACT_APP_imgbb_key;
        //  console.log(imageHostKey)
      const handleAddTask=data=>{
        //  console.log(data)
         const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
    //  console.log(url)
     fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(imgData=>{
        if(imgData.success){
            // console.log(imgData.data.url)

            const media = {
                details: data.details,
                image: imgData.data.url,
                // email:user.email
            }
            fetch('http://localhost:5000/medias', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json', 
                   
                },
                body: JSON.stringify(media)
            })
            .then(res => res.json())
            .then(result=>{
                // console.log(result);
                alert('Post added successfully')
            })

        }
    })
      }
    return (
        <div className=" bg-sky-100 py-16">
        <h2 className="text-4xl ml-8 underline text-center">Add Task</h2>
  
        <div className=" p-7 flex items-center justify-center">
          <form onSubmit={handleSubmit(handleAddTask)} className=''>
            {/* <div className="form-control w-full">
              <label className="label">
                {" "}
                <span className="label-text"> Product Name</span>
              </label>
              <input
                type="text"
                {...register("productName", {
                  required: "ProductName is Required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.productName && (
                <p className="text-red-500">{errors.productName.message}</p>
              )}
            </div> */}
           
           
            
            {/* <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Add Task</span>
              </label>
              <input
                type="text"
                {...register("addTask", {
                  required: "Add Task is Required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
               {errors.AddTask && (
                <p className="text-red-500">{errors.AddTask.message}</p>
              )}
            </div> */}
  
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Task Details</span>
              </label>
              <textarea
                type="text"
                {...register("details", {
                  required: "Task details are Required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
               {errors.details && (
                <p className="text-red-500">{errors.details.message}</p>
              )}
            </div>
  
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                {...register("image", {
                  
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {/* {errors.img && <p className="text-red-500">{errors.img.message}</p>} */}
            </div>
  
           
  
  
            <input
              className="bg-sky-300 hover:bg-sky-200 cursor-pointer p-3 rounded-md w-full mt-4 max-w-xs"
              value="Submit"
              type="submit"
            />
          </form>
        </div>
      </div>
    );
};

export default AddTask;