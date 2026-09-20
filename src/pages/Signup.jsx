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
  Mail,
} from "lucide-react";

import SocialLogin from "./SocialLogin/SocialLogin";
import { imageUpload, saveUser } from "../utils";

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

  // Profile image preview
  const photoPreview = useMemo(() => {
    if (!selectedPhoto?.[0]) return null;
    return URL.createObjectURL(selectedPhoto[0]);
  }, [selectedPhoto]);

  const handleRegister = async (data) => {
    setLoading(true);

    const profileImage = data.profilePhoto?.[0];
    let uploadedPhotoURL = "";

    try {
      // upload photo if provided
      if (profileImage) {
        uploadedPhotoURL = await imageUpload(profileImage);
      }

      // create Firebase account
      const result = await registerUser(data.email, data.password);
      console.log("Registered Firebase user:", result.user);

      // update Firebase profile with name + photo
      await updateUserProfile({
        displayName: data.name,
        photoURL: uploadedPhotoURL,
      });

      // save user to MongoDB
      const userData = {
        email: data.email,
        name: data.name,
        photoURL: uploadedPhotoURL,
        phone: data.phone || "",
        location: data.location || "",
        status: data.status || "",
        bio: data.bio || "",
      };

      await saveUser(userData);

      // success
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
    } catch (error) {
      console.error("Registration error:", error);

      // Surface the actual error message
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";

      toast.error(message, {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Main Responsive Container */}
      <div className="min-h-screen bg-base-300 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-16 xl:px-24">
        {/* Card */}
        <div className="mx-auto w-full max-w-3xl rounded-2xl bg-base-100 px-4 pb-6 shadow-2xl sm:rounded-3xl sm:px-6 sm:pb-8 md:px-8 lg:px-10">
          {/* Heading */}
          <h2 className="py-5 text-xl font-bold sm:text-2xl md:text-3xl">
            Create Your Account
          </h2>

          {/* Profile Photo */}
          <div className="mb-5">
            <label
              htmlFor="profilePhoto"
              className="group flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3 transition-all duration-200 hover:border-primary hover:bg-background/50 sm:gap-4 sm:px-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-background sm:h-11 sm:w-11">
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
                  <span className="ml-1 font-medium text-gray-400">
                    (Optional)
                  </span>
                </p>

                <p className="mt-0.5 text-[10px] text-gray-400">
                  JPG, PNG or WEBP · up to 5 MB
                </p>

                {selectedPhoto?.[0] && (
                  <p className="mt-0.5 max-w-[180px] truncate text-[10px] font-semibold text-primary sm:max-w-[250px]">
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
                  className="w-full min-w-0 bg-transparent px-3 py-2.5 text-sm text-neutral outline-none placeholder:text-gray-400"
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
                  className="w-full min-w-0 bg-transparent px-3 py-2.5 text-sm text-neutral outline-none placeholder:text-gray-400"
                />
              </div>

              {errors.phone && (
                <p className="mt-1 text-[10px] font-medium text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 mt-4 block text-[10px] font-bold uppercase tracking-wide text-neutral">
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
                className="w-full min-w-0 bg-transparent px-3 py-2.5 text-sm text-neutral outline-none placeholder:text-gray-400"
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-[10px] font-medium text-red-500">
                {errors.email.message}
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
                  className="w-full min-w-0 bg-transparent px-3 py-2.5 text-sm text-neutral outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="shrink-0 p-0.5 text-gray-400 transition-colors hover:text-primary"
                >
                  {showPassword ? (
                    <EyeOff size={15} />
                  ) : (
                    <Eye size={15} />
                  )}
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
                  className="w-full min-w-0 bg-transparent px-3 py-2.5 text-sm text-neutral outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="shrink-0 p-0.5 text-gray-400 transition-colors hover:text-primary"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={15} />
                  ) : (
                    <Eye size={15} />
                  )}
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
                I agree to{" "}
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
            className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-component px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
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

          <div className="divider px-2 sm:px-4">OR</div>

          {/* Social Login */}
          <div className="w-full">
            <SocialLogin />
          </div>

          {/* Login */}
          <p className="mt-2 text-center text-sm">
            Already have an account ?{" "}
            <span className="cursor-pointer text-pink-500">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;