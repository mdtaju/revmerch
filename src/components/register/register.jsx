"use client"
import RegisterLayout from "../reusable/RegisterLayout";
import { useForm } from "react-hook-form";
import GoogleLogin from "../reusable/GoogleLogin";
import { emailValidationPattern } from "@/utils/validationCheck";
import { GoogleAuthProvider, createUserWithEmailAndPassword, deleteUser, signInWithPopup, updatePhoneNumber, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase.config";
import useAuthState from "../provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import checkUser from "@/lib/checkUser";
import setUser from "@/lib/setUser";

const Register = () => {
      const { register, handleSubmit, formState: { errors } } = useForm();
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");
      const authState = useAuthState();
      const router = useRouter();

      useEffect(() => {
            if (authState) {
                  router.push("/")
            }
      }, [authState, router]);

      async function registerSubmit(inputs) {
            setLoading(true);
            const isUserExists = await checkUser(`+216${inputs.phone}`);
            if (!isUserExists) {
                  createUserWithEmailAndPassword(auth, inputs.email, inputs.password).then((data) => {
                        updateProfile(auth.currentUser, {
                              displayName: inputs.name,
                        }).then(async () => {
                              await setUser({
                                    phone: `+216${inputs.phone}`,
                                    auth_id: data.user.uid,
                                    email: inputs.email,
                                    name: inputs.name
                              })
                              router.push("/products");
                              setLoading(false);
                        }).catch(() => {
                              setError("Name or phone not added. Please, try again");
                              setLoading(false);
                        })
                  }).catch(() => {
                        setError("Something went wrong. Please, try again");
                        setLoading(false);
                  })
            } else {
                  setError("Phone number already exists. Please, try another one");
                  setLoading(false);
            }
      }

      function handleGoogleSignIn() {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider).then(() => {
                  router.push("/products")
                  setError("")
            }).catch(() => {
                  setError("Something wrong with google login. Please try again")
            })
      }

      return (
            <RegisterLayout>
                  <div className="w-full">
                        <form className="w-full" onSubmit={handleSubmit(registerSubmit)} >
                              {/* name */}
                              <input {...register("name", { required: true })} type="text" className="text_input" placeholder="Enter your name" />
                              {errors.name && <span className="input_error_text">This field is required</span>}

                              {/* phone */}
                              <div className="flex items-center w-full mt-6">
                                    <div className="w-fit bg-white h-full text-gray-400 p-3 rounded-l-[10px]">+216</div>
                                    <div className="flex-1">
                                          <input {...register("phone", { pattern: /^[0-9]/, required: true, maxLength: 8, minLength: 8 })} type="text" className="text_input rounded-l-none" placeholder="Enter your phone" />
                                    </div>
                              </div>
                              {errors.phone &&
                                    <span className="input_error_text">
                                          {
                                                errors.phone.type === "required" &&
                                                "This field is required"
                                          }
                                          {(errors.phone.type === "minLength" || errors.phone.type === "maxLength") && "Phone number must be 8 length"}
                                          {
                                                errors.phone.type === "pattern" && "Enter a valid number"
                                          }
                                    </span>
                              }

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
                                    {loading ? "loading..." : "SIGN UP"}
                              </button>
                              <p className="input_error_text text-center mt-2">{error}</p>
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

export default Register;