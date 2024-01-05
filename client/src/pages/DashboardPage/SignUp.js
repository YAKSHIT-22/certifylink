import React, { useState } from "react";
import { FcGoogle } from 'react-icons/fc'
import login from '../../assets/login.svg'

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [form, setFormValues] = useState({
    });
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)

            setLoading(false);
            setFormValues({ });

        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...form, [name]: value });
    };
    return (
        <section className="w-screen min-h-screen lg:h-screen flex items-center justify-center">
            <div className="w-full h-full flex items-center max-w-screen-2xl mx-auto justify-center px-4 xs:p-4">
                <div className="w-full text-white h-full flex items-center justify-center flex-col-reverse lg:flex-row p-4 gap-[1rem] lg:gap-[5rem] xl:gap-[14rem]">
                    <div className="w-full lg:w-[50%] h-full flex items-center md:items-end justify-center p-0 md:p-4 flex-col gap-[1rem]">
                        <div className="w-full lg:w-[85%] h-full flex items-center justify-center p-0 md:p-4 flex-col gap-[1rem]">
                            <div className="w-full flex items-start justify-center flex-col gap-2 select-none">
                                <h1 className="w-full font-bold text-4xl">
                                    Hello There!
                                </h1>
                                <p className="w-full font-normal text-sm sm:text-base">
                                    Today is a new day. It's your day. You shape it. Sign in to
                                    start managing your projects.
                                </p>
                            </div>
                            <div className="w-full flex items-center justify-center flex-col gap-1">
                                {error && (
                                    <p className="text-center bg-red-300 p-1 text-xs m-1 capitalize rounded">
                                        {error}
                                    </p>
                                )}
                                <form
                                    onSubmit={onSubmit}
                                    className="w-full h-full flex items-start justify-center flex-col gap-4"
                                >
                                    <div className="flex items-center justify-center flex-col w-full gap-[1rem]">
                                        <div className="w-full h-full flex items-start justify-center flex-col gap-2">
                                            <label className="w-full text-base text-[#a4aab5]">
                                                Email
                                            </label>
                                            <input
                                                placeholder="Enter your email"
                                                required
                                                type="email"
                                                name="email"
                                                value={form.email || ""}
                                                onChange={handleChange}
                                                className="py-3 px-4 rounded-md border border-[#252525] bg-transparent text-[#cbcbcb] w-full focus:outline-none focus:ring-1 focus:ring-[#FFC947] focus:border-transparent"
                                            />
                                        </div>
                                        <div className="w-full h-full flex items-start justify-center flex-col gap-2">
                                            <label className="w-full text-base text-[#a4aab5]">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                required
                                                name="password"
                                                value={form.password || ""}
                                                onChange={handleChange}
                                                placeholder="Enter your password"
                                                className="py-3 px-4 rounded-md border border-[#252525] bg-transparent text-[#cbcbcb] w-full focus:outline-none focus:ring-1 focus:ring-[#FFC947] focus:border-transparent"
                                            />
                                        </div>
                                        <div className="w-full h-full flex items-start justify-center flex-col gap-2">
                                            <label className="w-full text-base text-[#a4aab5]">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="confirmPassword"
                                                required
                                                name="confirmPassword"
                                                value={form.confirmPassword || ""}
                                                onChange={handleChange}
                                                placeholder="Confirm password"
                                                className="py-3 px-4 rounded-md border border-[#252525] bg-transparent text-[#cbcbcb] w-full focus:outline-none focus:ring-1 focus:ring-[#FFC947] focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full h-full flex items-center justify-start">
                                        <button className="bg-[#FFC947] text-white font-semibold px-12 rounded-md py-3 border-2 border-transparent hover:border-2 hover:border-[#FFC947] hover:text-[#FFC947] hover:bg-transparent transition-all duration-500 w-full flex items-center justify-center text-base">
                                            Sign Up
                                        </button>
                                    </div>
                                </form>
                                <div className="w-full h-full gap-[1rem] flex items-center justify-center">
                                    <span className="w-12 h-[1px] bg-[#CFDFE2] rounded-full"></span>
                                    <p className="text-base font-light text-[#777777]">or</p>
                                    <span className="w-12 h-[1px] bg-[#CFDFE2] rounded-full"></span>
                                </div>
                                <div className="w-full h-full flex items-center justify-center">
                                    <button
                                        type="submit"
                                        onClick={() => { }
                                        }
                                        className="bg-[#F3F9FA] text-[#313957] px-12 whitespace-nowrap rounded-md py-3 w-full flex items-center justify-center gap-2 text-base"
                                    >
                                        <FcGoogle className="w-6 h-6" />
                                        Sign in with Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:flex hidden lg:w-[50%] h-full items-center justify-center">
                        <div className="w-full h-80 sm:h-64 sm:w-full md:w-full md:h-full flex items-center justify-center rounded-3xl overflow-hidden">
                            <img
                                src={login}
                                alt="login"
                                className="w-full h-full object-cover object-center rounded-3xl hover:scale-110 hover:origin-bottom transition-all duration-1000 aspect-video"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
