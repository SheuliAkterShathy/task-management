import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
     const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
     const [signUpError, setSignUPError] = useState('');
     const navigate = useNavigate();

       const handleSignUp=data=>{
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                 toast('User Created Successfully.')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                         saveUser(data.name, data.email);
                         navigate('/')
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
       }


       const saveUser = (name, email) =>{
        const user ={name, email};
        fetch('https://task-management-server-sheuliaktershathy.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
        })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
          .then((result) => {
           
            const user = result.user;
            saveUser(user.displayName,user.email)
            
            console.log(user);
           
          })
          .catch((error) => {
            console.error(error);
          });
      };
    return (
        <div className="flex flex-col max-w-md mx-auto my-10 p-6 rounded-md sm:p-10 bg-sky-100">
        <div className="mb-8 text-center">
            <h1 className="my-1 text-4xl font-bold">Sign Up</h1>
            
        </div>
        <form onSubmit={handleSubmit(handleSignUp)} novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
            <div className="space-y-4">
                {/* <div>
                    <label for="email" className="block mb-2 text-sm">Email address</label>
                    <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100" />
                </div>
                <div>
                    <div className="flex justify-between mb-2">
                        <label for="password" className="text-sm">Password</label>
                        <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">Forgot password?</a>
                    </div>
                    <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100" />
                </div> */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label for="name" className="text-sm">Name</label>
                     
                    </div>
                    <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} name="name" id="name" placeholder="Enter Your Name" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div>
                    <div className="flex justify-between mb-2">
                        <label for="email" className="text-sm">Email</label>
                       
                    </div>
                    <input type="email" {...register("email", {
                            required: true
                        })} name="email" id="email" placeholder="Enter Your Email" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div>
                    <div className="flex justify-between mb-2">
                        <label for="password" className="text-sm">Password</label>
                        <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">Forgot password?</a>
                    </div>
                    <input type="password"  {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be 6 characters long" }
                // pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
            })} name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100" />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>
            </div>
            <div className="space-y-2">
                <div>
                    <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-sky-300 text-gray-900">Sign Up</button>
                </div>
                {/* <p className="px-6 text-sm text-center text-gray-400">Don't have an account yet?
                    <a rel="noopener noreferrer" href="#" className="hover:underline text-violet-400">Sign up</a>.
                </p> */}
            </div>
            {signUpError && <p className='text-red-600'>{signUpError}</p>}
        </form>

        <button onClick={handleGoogleSignIn} aria-label="Login with Google" type="submit" className="flex items-center justify-center w-full my-5 p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-400 bg-sky-300 py-3">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
				<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
			</svg>
			<p>Login with Google</p>
		</button>

        <p className="px-6 text-sm text-center text-gray-400">Already have an account?
                    <Link to="/login" className="hover:underline text-violet-400">Login</Link>.
                </p>
    </div>
    );
};

export default Register;
