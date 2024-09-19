import { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Input, RadioGroup, Radio, Link as NextUILink } from "@nextui-org/react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

// local
import Section from "../components/Section";
import SubmitButton from "../components/SubmitButton";
import { StudentRegistrationInfo, TokenPairType } from "../types";
import FormInputError from "../components/FormInputError";
import { useMutation } from "@tanstack/react-query";
import BlurPageLoadingIndicator from "../components/BlurPageLoadingIndicator";
import { endpoints } from "../api/endpoints";


export default function Register() {
  const navigate = useNavigate()
  const [userError, setUserError] = useState<any | null>(null)

  const registerMutation = useMutation({
    mutationFn: (data: StudentRegistrationInfo) => axios.post<TokenPairType>(endpoints.register, data),

    onSuccess: (response) => {
      const tokens = response.data
      Cookies.set('oasat', tokens.access, { expires: 1 })
      navigate("../dashboard")
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data
      setUserError(data)
    }
  })

  const { register, handleSubmit, control, formState: { errors }, setError } = useForm<StudentRegistrationInfo>()

  const onSubmit: SubmitHandler<StudentRegistrationInfo> = (data) => {
    if (data.user.password.trim() != data.user.password_confirmation.trim()) {
      setError("user.password", { type: "passwords_mismatch" })
      setError("user.password_confirmation", { type: "passwords_mismatch" })
      return
    }

    registerMutation.mutate(data)
  }

  if (registerMutation.isPending) return <BlurPageLoadingIndicator />

  return (
    <Section>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-2 py-3 grid col-span-1 gap-3">
        <legend>
          <h3 className="uppercase">Student Register</h3>
        </legend>

        <Input label="First Name" isClearable radius="sm" {...register("user.first_name")} />

        <Input label="Last Name" isClearable radius="sm" {...register("user.last_name")} />

        <div>
          <Input label="Username" isClearable isRequired radius="sm" {...register("user.username", { required: true })} aria-label="username" />
          {errors.user?.username?.type === 'required' && <FormInputError message="username can not be empty" />}

          {/* backend error */}
          {userError && userError.user && userError.user.username && userError.user.username.map((item: any, idx: any) => <FormInputError key={idx} message={item} />)}
        </div>

        <div>
          <Input type="password" label="Password" isClearable isRequired radius="sm" {...register("user.password", { required: true })} aria-label="password" />
          {errors.user?.password?.type === 'required' && <FormInputError message="password can not be empty" />}
          {errors.user?.password?.type === 'passwords_mismatch' && <FormInputError message="passwords didn't match" />}

          {/* backend error */}
          {userError && userError.user && userError.user.password && userError.user.password.map((item: any, idx: any) => <FormInputError key={idx} message={item} />)}
        </div>

        <div>
          <Input type="password" label="Password Confirmation" isClearable isRequired radius="sm" {...register("user.password_confirmation", { required: true })} aria-label="password confirmation" />
          {errors.user?.password_confirmation?.type === 'required' && <FormInputError message="retype your password" />}
          {errors.user?.password_confirmation?.type === "passwords_mismatch" && <FormInputError message="passwords didn't match" />}

          {/* backend error */}
          {userError && userError.user && userError.user.password_confirmation && userError.user.password_confirmation.map((item: any, idx: any) => <FormInputError key={idx} message={item} />)}
        </div>

        <div>
          <Input type="email" label="Email" isClearable isRequired radius="sm" {...register("user.email")} />

          {/* backend error */}
          {userError && userError.user && userError.user.email && userError.user.email.map((item: any, idx: any) => <FormInputError key={idx} message={item} />)}
        </div>

        <div>
          <Input label="Phone" isClearable isRequired radius="sm" {...register("phone")} minLength={11} maxLength={11} aria-label="phone" />

          {/* backend error */}
          {userError && userError.phone && userError.phone.map((item: any, idx: any) => <FormInputError key={idx} message={item} />)}
        </div>

        <div>
          <Controller
            control={control}
            name="gender"
            rules={{ required: true }}
            render={({ field }) =>
              <RadioGroup label="Select Gender" isRequired orientation="horizontal" disableAnimation={false} {...field} aria-label="gender">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="others">Others</Radio>
              </RadioGroup>
            }
          />
          {errors.gender?.type === 'required' && <FormInputError message="gender not selected" />}
        </div>

        <Input label="Academy" isClearable radius="sm" {...register("academy")} />

        <SubmitButton label="Register" />

        <div className="w-full flex justify-between space-x-2">
          <NextUILink>
            <RouterLink to="/">Back to Home</RouterLink>
          </NextUILink>
          <NextUILink>
            <RouterLink to="/login" className="text-right">Already have an account? Login</RouterLink>
          </NextUILink>
        </div>
      </form>
    </Section>
  )
}
