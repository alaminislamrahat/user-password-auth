import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';










const HeroRegister = () => {

    const [registerError, setRegisterError] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    // success result 
    const handleSuccess = () => {
        toast.warn('success fully register', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",

        });
    }

    // handle error with toast 
    const handleError = () => {
        toast.error('error bellow', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",

        });
    }
    // error handle 

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checked = e.target.terms.checked;
        console.log(name, email, password, checked);

        // reset error 

        setRegisterError('');

        // charecter length 
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('your password should be at least 1 uppercase charecter');
            return;
        }
        else if(!checked){
            setRegisterError('checked our terms and conditon');
            return;
        }



        // create user 
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                handleSuccess();

                // update profile 
                updateProfile(user,{
                    displayName : name,
                    photoURL : "https://example.com/jane-q-user/profile.jpg"
                })
                .then(()=>{
                    console.log('profile update')
                })
                .catch()
                // send email varivication 

                sendEmailVerification(user)
                .then( ()=> {
                    alert('check your email to varify')
                })
            })
            .catch(error => {
                console.log(error.message);
                setRegisterError(error.message);
                handleError();

            })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-purple-800">Register now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        {
                            registerError && <p className="text-4xl font-bold text-red-600">{registerError}</p>
                        }
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="Name" name="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered relative" required />
                                <span
                                    className="cursor-pointer absolute btn btn-xs right-9 top-[172px]"
                                    onClick={() => setShowPassword(!showPassword)}>
                                   {showPassword ? 'off' : 'show'}
                                </span>


                               <div className="flex">
                               <input type="checkbox" name="terms" id="terms" />
                                <label className="label" htmlFor="terms ">
                                    <a href="#" className="label-text-alt link link-hover">except our terms and condition?</a>
                                </label>
                               </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                                <p>Allready have account. Go to  <Link to="/login"><a className="text-purple-800 font-bold" href="">Login</a></Link></p>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
            <ToastContainer />
        </div>
    );
};

export default HeroRegister;