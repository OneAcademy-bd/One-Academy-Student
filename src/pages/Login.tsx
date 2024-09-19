// @ts-nocheck

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link as NextUILink } from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";
import { Lock, User } from "lucide-react";
import Cookies from 'js-cookie';
import axios, { AxiosError } from "axios";
import clsx from "clsx";

import { LoginCredentials, TokenPairType } from "../types";
import Section from "../components/Section";
import { Input } from "../aceternity-ui/Input";
import SubmitButton from "../components/SubmitButton";
import FormInputError from "../components/FormInputError";
import { endpoints } from "../api/endpoints";
import BlurPageLoadingIndicator from "../components/BlurPageLoadingIndicator";
import bg from "../assets/banner.png"


export default function Login() {
  const navigate = useNavigate()
  const backendErrorMessage = useRef<string>("")

  const mutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => {
      return axios.post<TokenPairType>(endpoints.get_token, credentials)
    },

    // takes response object returned by axios
    onSuccess: (response) => {
      const tokens = response.data
      Cookies.set('oasat', tokens.access, { expires: 1 })
      navigate("../dashboard")
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401)
        backendErrorMessage.current = 'Wrong Credentials!'
      else if (error.response?.status >= 500)
        backendErrorMessage.current = 'Ups! Server Down!!'
      else
        backendErrorMessage.current = error.message + ', Server Issue!' // not clear, make is more precise
    }
  })

  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>()

  const onSubmit: SubmitHandler<LoginCredentials> = (data) => mutation.mutate(data)

  return (
    <Section>
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <legend>
          <h3 className="uppercase">Login</h3>
          {/* {mutation.isError && <p className="text-wrong">Wrong Credentials!</p>} */}
          {mutation.isError && <p className="text-wrong text-center">{backendErrorMessage.current}</p>}
        </legend>

        <div className="form-field-wrapper">
          <div className="flex items-center space-x-1.5">
            <label htmlFor="username">
              <User size={30} className={clsx('transition-all duration-1000', errors.username?.type === 'required' && 'text-wrong animate-bounce')} />
            </label>
            <Input id="username" type="text" placeholder="Username" {...register("username", { required: true })} autoComplete="true" />
          </div>
          {errors.username?.type === "required" && <FormInputError message="username is required" />}
        </div>

        <div className="form-field-wrapper">
          <div className="flex items-center space-x-1.5">
            <label htmlFor="password">
              <Lock size={30} className={clsx('transition-all duration-1000', errors.password?.type === 'required' && 'text-wrong animate-bounce')} />
            </label>
            <Input id="password" type="password" placeholder="Password" {...register("password", { required: true })} />
          </div>
          {errors.password?.type === "required" && <FormInputError message="password is required" />}
        </div>

        <SubmitButton label="Login" />

        <div className="w-full flex justify-between space-x-2">
          <NextUILink><RouterLink to="/">Back to Home</RouterLink></NextUILink>
          <NextUILink><RouterLink to="/register" className="text-right">Register as a new Student</RouterLink></NextUILink>
        </div>

        {mutation.isPending && <BlurPageLoadingIndicator />}
      </form>
    </Section>
  )
}
