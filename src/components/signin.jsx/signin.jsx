"use client";
import { useForm } from "react-hook-form";
import RegisterLayout from "../reusable/RegisterLayout";
import GoogleLogin from "../reusable/GoogleLogin";
import { emailValidationPattern } from "@/utils/validationCheck";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase.config";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
      const { register, handleSubmit, formState: { errors }, setError } = useForm();
      const [loading, setLoading] = useState(false);
      const [err, setErr] = useState("");
      const router = useRouter();

      function signInSubmit(data) {
            setLoading(true);
            signInWithEmailAndPassword(auth, data.email, data.password).then(() => {
                  router.push("/showroom");
                  setLoading(false);
            }).catch(() => {
                  setErr("Wrong email or password. Please, try again");
                  setLoading(false);
            })
      }

      function handleGoogleSignIn() {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider).then(() => {
                  router.push("/showroom")
                  setErr("")
            }).catch(() => {
                  setErr("Something wrong with google login. Please try again")
            })
      }
      return (
            <RegisterLayout>
                  <div className="w-full">
                        <form className="w-full" onSubmit={handleSubmit(signInSubmit)}>
                              {/* email */}
                              <input {...register("email", { required: true, pattern: emailValidationPattern })} type="email" className="text_input mt-6" placeholder="Enter your email address" />

                              {errors.email &&
                                    <span className="input_error_text">
                                          {errors.email.type === "pattern" ? "Enter a valid email" : "This field is required"}
                                    </span>
                              }

                              {/* password */}
                              <input {...register("password", { required: true, minLength: 6 })} type="password" className="text_input mt-6" placeholder="Password" />

                              {errors.password &&
                                    <span className="input_error_text">
                                          {errors.password.type === "minLength" ? "Password length minimum 6" : "This field is required"}
                                    </span>
                              }

                              {/* remember */}
                              <label htmlFor="register_terms" className="flex items-center gap-2 mt-3 cursor-pointer" >
                                    <input type="checkbox" name="" id="register_terms" className="w-[22px] h-[22px] rounded-sm cursor-pointer" />
                                    <span className="text-xs">Remember me</span>
                              </label>

                              {/* submit button */}
                              <button
                                    disabled={loading}
                                    type="submit"
                                    className="register_btn w-full mt-8">
                                    {loading ? "loading..." : "SIGN IN"}
                              </button>
                              <p className="input_error_text text-center mt-2">{err}</p>
                        </form>
                        {/* divider */}
                        <div className="register_divider">Or connect with</div>
                        {/* provider */}
                        <div className="w-full flex justify-center mt-10">
                              <GoogleLogin
                                    disabled={loading}
                                    onClick={handleGoogleSignIn}
                              />
                        </div>
                  </div>
            </RegisterLayout>
      );
};

export default SignIn;