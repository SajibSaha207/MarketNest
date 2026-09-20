
import { useMemo, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router";

import useAuth from "../hooks/useAuth";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import axios from "axios";
import {
  ArrowRight,
  Camera,
  Eye,
  EyeOff,
  Loader2,
  User,
  Phone,
  Lock,
  Mail
} from "lucide-react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { registerUser, updateUserProfile, loading, setLoading } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const selectedPhoto = watch("profilePhoto");

  // profile image preview
  const photoPreview = useMemo(() => {
    if (!selectedPhoto?.[0]) return null;

    return URL.createObjectURL(selectedPhoto[0]);
  }, [selectedPhoto]);

  const handleRegister = (data) => {
    setLoading(true);

    const profileImage = data.profilePhoto?.[0];

    if (!profileImage) {
      toast.error("Please upload a profile photo.");
      setLoading(false);
      return;
    }

    // create firebase account
    registerUser(data.email, data.password)
      .then((result) => {
        console.log("Register user:", result.user);

        // upload profile photo to Imgbb
        const formData = new FormData();
        formData.append("image", profileImage);

        const imgApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

        return axios.post(imgApiUrl, formData);
      })
      .then((res) => {
        const photoURL = res.data.data.url;

        // Update Firebase profile
        const userProfile = {
          displayName: data.name,
          photoURL: photoURL,
        };

        return updateUserProfile(userProfile);
      })
      .then(() => {
        toast.success("Account created successfully! 🎉", {
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

        navigate(location.state || "/");
      })
      .catch((error) => {
        console.error(error);

        toast.error(
          error?.message || "Registration failed. Please try again.",
          {
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
          }
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };



    return (
        <div>
            <div className='min-h-screen bg-base-300 py-10 px-125'>
                <div className='card bg-base-100 px-4 pb-8 shadow-2xl rounded-4xl '>
                    <h2 className='font-bold text-2xl ml-5 py-5'>Create Your Account</h2>
                    {/* <p className=" text-sm leading-relaxed text-slate-500">
                    Join thousands of verified shoppers discovering authentic products and independent creators.
                </p> */}
                      {/* Profile Photo */}
            <div className="mb-5">
                <label
                    htmlFor="profilePhoto"
                    className="group flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all duration-200 hover:border-primary hover:bg-background/50"
                >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-background">
                        {photoPreview ? (
                            <img
                                src={photoPreview}
                                alt="Profile preview"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <Camera size={18} className="text-primary" />
                        )}

            
                    </div>

                     <div className="min-w-0">
                        <p className="text-xs font-bold text-neutral">
                            Upload Photo
                            <span className="ml-1 font-medium text-gray-400">(Optional)</span>
                        </p>
                        <p className="mt-0.5 text-[10px] text-gray-400">
                            JPG, PNG or WEBP · up to 5 MB
                        </p>
                        {selectedPhoto?.[0] && (
                            <p className="mt-0.5 max-w-[200px] truncate text-[10px] font-semibold text-primary">
                                {selectedPhoto[0].name}
                            </p>
                        )}
                    </div>
                </label>
                <input
                    id="profilePhoto"
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    {...register("profilePhoto")}
                    className="hidden"
                />
            </div>

            {/* Full Name + Phone */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Full Name */}
                <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-neutral">
                        Full Name
                    </label>
                    <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                        <User size={15} className="shrink-0 text-gray-400" />
                        <input
                            {...register("name", {
                                required: "Full name is required",
                            })}
                            type="text"
                            placeholder="e.g. Sajib Saha"
                            className="w-full bg-transparent px-3 py-2.5 text-sm text-neutral outline-none placeholder:text-gray-400"
                        />
                    </div>
                    {errors.name && (
                        <p className="mt-1 text-[10px] font-medium text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-neutral">
                        Phone Number
                    </label>
                    <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                        <Phone size={15} className="shrink-0 text-gray-400" />
                        <input
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^01[3-9]\d{8}$/,
                                    message: "Enter a valid Bangladesh phone number",
                                },
                            })}
                            type="tel"
                            placeholder="01XXXXXXXXX"
                            className="w-full bg-transparent px-3 py-2.5 text-sm text-neutral outline-none placeholder:text-gray-400"
                        />
                    </div>
                    {errors.phone && (
                        <p className="mt-1 text-[10px] font-medium text-red-500">
                            {errors.phone.message}
                        </p>
                    )}
                </div>
            </div>

                      {/* name
                      <label className="label text-black font-bold ml-6">Name</label>
                <input type="text" name='name' className="input w-[420px] ml-6" placeholder="Name" /> */}

           <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-neutral mt-2">
                        Email Address
                    </label>
                    <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                        <Mail size={15} className="shrink-0 text-gray-400" />
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Enter a valid Email address",
                                },
                            })}
                            type="email"
                            placeholder="example@gmail.com"
                            className="w-full bg-transparent px-3 py-2.5 text-sm text-neutral outline-none placeholder:text-gray-400"
                        />
                    </div>
                    {errors.phone && (
                        <p className="mt-1 text-[10px] font-medium text-red-500">
                            {errors.phone.message}
                        </p>
                    )}
                </div>
 {/* Password + Confirm Password */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Password */}
                <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-neutral">
                        Password
                    </label>
                    <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                        <Lock size={15} className="shrink-0 text-gray-400" />
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            type={showPassword ? "text" : "password"}
                            placeholder="At least 6 characters"
                            className="w-full bg-transparent px-3 py-2.5 text-sm text-neutral outline-none placeholder:text-gray-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="shrink-0 p-0.5 text-gray-400 transition-colors hover:text-primary"
                        >
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-[10px] font-medium text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-neutral">
                        Confirm Password
                    </label>
                    <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                        <Lock size={15} className="shrink-0 text-gray-400" />
                        <input
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter password"
                            className="w-full bg-transparent px-3 py-2.5 text-sm text-neutral outline-none placeholder:text-gray-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="shrink-0 p-0.5 text-gray-400 transition-colors hover:text-primary"
                        >
                            {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-[10px] font-medium text-red-500">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
            </div>

             {/* Terms */}
            <div className="mt-4">
                <label className="flex cursor-pointer items-start gap-2.5">
                    <input
                        type="checkbox"
                        {...register("terms", {
                            required: "You must agree to the Terms & Conditions",
                        })}
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer accent-primary"
                    />
                    <span className="text-[11px] leading-[1.6] text-slate-500">
                        I agree to the{" "}
                        <Link
                            to="/terms"
                            className="font-semibold text-primary hover:text-secondary"
                        >
                            Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                            to="/privacy"
                            className="font-semibold text-primary hover:text-secondary"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </span>
                </label>
                {errors.terms && (
                    <p className="mt-1.5 text-[10px] font-medium text-red-500">
                        {errors.terms.message}
                    </p>
                )}
            </div>
                 
                    {/* Create Account Button */}
            <button
                type="button"
                onClick={handleSubmit(handleRegister)}
                disabled={loading}
                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-component px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5  hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? (
                    <>
                        <Loader2 size={17} className="animate-spin" />
                        Creating Account…
                    </>
                ) : (
                    <>
                        Create Account
                        <ArrowRight size={16} />
                    </>
                )}
            </button>
                  <div className="divider px-4">OR</div>
                  
                  <div className=''>
                    <button className="btn bg-white text-black border-[#e5e5e5] w-full ml-">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>

                  </div>
                  <p>
                    <p className='text-center ml-6 mt-2'>Already have an account ? <span className='text-pink-500 cursor-pointer'>Login</span></p>
                  </p>
            </div>
            
        </div>
        
        </div>
    );
};

export default Signup;