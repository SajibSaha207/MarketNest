import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";

import { Link, useLocation, useNavigate } from "react-router";

import useAuth from "../hooks/useAuth";

import SocialLogin from "../pages/SocialLogin/SocialLogin";





const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { signinUser, loading, setLoading } = useAuth();

    const location = useLocation();

    const navigate = useNavigate();

    const handleSing = (data) => {

        signinUser(data.email, data.password)

            .then((result) => {

                console.log(result.user);

                toast.success("Welcome back to MessHub! 🎉", {
                    duration: 3000,
                    style: {
                        borderRadius: "12px",
                        background: "#D5FBF9",
                        color: "#173B3A",
                        border: "1px solid #006B68",
                        fontWeight: "600",
                    },
                    iconTheme: {
                        primary: "#006B68",
                        secondary: "#ffffff",
                    },
                });

                navigate(location?.state || "/");

            })

            .catch((error) => {

                console.log(error);

                toast.error("Login failed. Please check your email and password.", {
                    duration: 3500,
                    style: {
                        borderRadius: "12px",
                        background: "#ffffff",
                        color: "#173B3A",
                        border: "1px solid #FF8A00",
                        fontWeight: "600",
                    },
                    iconTheme: {
                        primary: "#FF8A00",
                        secondary: "#ffffff",
                    },
                });

            }).finally(() => {

                setLoading(false);

            });

    };

    return (

        <div>

            <div className="min-h-screen bg-base-300 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-16">

                <div className="card mx-auto w-full max-w-2xl rounded-2xl bg-base-100 px-4 pb-6 shadow-2xl sm:rounded-3xl sm:px-6 sm:pb-8 md:px-8 lg:px-10">

                    <h2 className="py-5 text-center text-xl font-bold sm:text-2xl md:text-3xl">
                        Welcome Back to MarketNest
                    </h2>

                    <form onSubmit={handleSubmit(handleSing)} className="space-y-5">

                        <div>

                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-neutral"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="you@example.com"
                                className="w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-neutral outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10 sm:px-4"
                            />

                            {errors.email?.type === "required" && (

                                <p className="mt-1.5 text-xs font-medium text-red-500">
                                    Email is required.
                                </p>

                            )}

                        </div>


                        {/* Password */}

                        <div>

                            <div className="mb-1.5 flex items-center justify-between">

                                <label
                                    htmlFor="password"
                                    className="text-xs font-bold uppercase tracking-wide text-neutral"
                                >
                                    Password
                                </label>

                            </div>

                            <input
                                id="password"
                                type="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 8,
                                })}
                                placeholder="Enter your password"
                                className="w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-neutral outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10 sm:px-4"
                            />

                            {errors.password?.type === "required" && (

                                <p className="mt-1.5 text-xs font-medium text-red-500">
                                    Please enter your password.
                                </p>

                            )}

                            {errors.password?.type === "minLength" && (

                                <p className="mt-1.5 text-xs font-medium text-red-500">
                                    Password must contain at least 6 characters.
                                </p>

                            )}

                            {errors.password?.type === "maxLength" && (

                                <p className="mt-1.5 text-xs font-medium text-red-500">
                                    Password must contain maximum 8 characters.
                                </p>

                            )}

                            <a
                                href="#"
                                className="mt-2 inline-block text-xs font-semibold text-primary transition-colors hover:text-secondary"
                            >
                                Forgot password?
                            </a>

                        </div>


                        {/* Login Button */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-component px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Logging in…" : "Login"}
                        </button>

                    </form>


                    <div className="divider px-2 sm:px-4">
                        OR
                    </div>


                    <div className="w-full">
                        <SocialLogin></SocialLogin>
                    </div>


                    <p className="mt-5 border-gray-100 pt-5 text-center text-xs text-slate-500 sm:text-sm">

                        Don't have an account?{" "}

                        <Link
                            state={location.state}
                            to="/register"
                            className="font-bold text-primary transition-colors hover:text-secondary"
                        >
                            Create account
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};



export default Login;