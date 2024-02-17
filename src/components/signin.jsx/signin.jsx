"use client";
import { useForm } from "react-hook-form";
import RegisterLayout from "../reusable/RegisterLayout";
import GoogleLogin from "../reusable/GoogleLogin";
import { emailValidationPattern } from "@/utils/validationCheck";

const SignIn = () => {
      const { register, handleSubmit, formState: { errors }, setError } = useForm();

      function signInSubmit(data) {
            console.log(data)
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
                              <button type="submit" className="register_btn w-full mt-8">SIGN IN</button>
                        </form>
                        {/* divider */}
                        <div className="register_divider">Or connect with</div>
                        {/* provider */}
                        <div className="w-full flex justify-center mt-10">
                              <GoogleLogin />
                        </div>
                  </div>
            </RegisterLayout>
      );
};

export default SignIn;