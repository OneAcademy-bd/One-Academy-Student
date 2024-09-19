import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { Input, Select, SelectItem } from "@nextui-org/react"
import { Save } from "lucide-react"
import { AxiosError } from "axios"

import ProfileActionButton from "./ProfileActionButton"
import { updateProfile, useFetchedProfile } from "../../api/calls"
import { StudentProfileUpdateType } from "../../types"
import FormInputError from "../FormInputError"

interface Props {
  setIsEditMode: any
}

export default function ProfileEditMode({ setIsEditMode }: Props) {
  const [backendError, setBackendError] = useState<any | null>(null)

  const { data } = useFetchedProfile()

  const profileUpdateMutation = useMutation({
    mutationFn: (data: StudentProfileUpdateType) => updateProfile(data),

    // side effects
    onMutate: () => { },
    onSuccess: () => {
      // optimistic update here
      setIsEditMode(false)
    },
    onError: (error: AxiosError) => {
      setBackendError(error.response?.data)
      console.log(error)
    }
  })

  const { register, handleSubmit, formState: { errors } } = useForm<StudentProfileUpdateType>({
    defaultValues: {
      user: {
        username: data?.user.username,
        email: data?.user.email,
        first_name: data?.user.first_name,
        last_name: data?.user.last_name,
      },
      phone: data?.phone || '',
      gender: data?.gender,
      academy: data?.academy
    }
  })

  const onSubmit: SubmitHandler<StudentProfileUpdateType> = (form_data) => {
    let nothingChanged = true
    nothingChanged = nothingChanged && form_data.user.username.trim() === data?.user.username.trim()
    nothingChanged = nothingChanged && form_data.user.email.trim() === (data?.user.email || ' ').trim()
    nothingChanged = nothingChanged && form_data.user.first_name.trim() === (data?.user.first_name || ' ').trim()
    nothingChanged = nothingChanged && form_data.user.last_name.trim() === (data?.user.last_name || ' ').trim()
    nothingChanged = nothingChanged && form_data.phone.trim() === (data?.phone || ' ').trim()
    nothingChanged = nothingChanged && form_data.gender === data?.gender
    nothingChanged = nothingChanged && form_data.academy.trim() === (data?.academy || ' ').trim()

    // if no changes detected at all, then do not send any unnecessary request
    if (nothingChanged) {
      setIsEditMode(false)
      return
    }

    profileUpdateMutation.mutate(form_data)
  }

  return (
    <div className="dashboard-tab">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">
        <div>
          <label>Username</label>
          <Input radius="sm" isClearable {...register("user.username")} aria-label="username" />

          {/* backend errors */}
          {backendError && backendError.user && backendError.user.username && backendError.user.username.map((item: any, idx: any) => <FormInputError key={idx} message={item} />)}
        </div>

        <div>
          <label>Email</label>
          <Input type="email" radius="sm" isClearable {...register("user.email")} aria-label="email" />

          {/* backend errors */}
          {backendError && backendError.user && backendError.user.email && backendError.user.email.map((item: any, idx: any) => <FormInputError key={idx} message={item} />)}
        </div>

        <div>
          <label>First Name</label>
          <Input radius="sm" isClearable {...register("user.first_name")} aria-label="first_name" />
        </div>

        <div>
          <label>Last Name</label>
          <Input radius="sm" isClearable {...register("user.last_name")} aria-label="last_name" />
        </div>

        <div>
          <label>Phone</label>
          {/* regex validate phone number */}
          <Input radius="sm" isClearable {...register("phone", { maxLength: 11 })} maxLength={11} aria-label="phone" />
          {errors.phone?.type === 'maxLength' && <FormInputError message="Phone number must be of length 11." />}

          {/* backend errors */}
          {backendError && backendError.phone && backendError.phone.map((item: any, idx: any) => <FormInputError key={idx} message={item} />)}
        </div>

        <div>
          <label>Gender</label>
          <Select radius="sm" {...register("gender")} aria-label="gender">
            <SelectItem key="male">Male</SelectItem>
            <SelectItem key="female">Female</SelectItem>
            <SelectItem key="others">Others</SelectItem>
          </Select>

          {/* backend errors */}
          {backendError && backendError.gender && backendError.gender.map((item: any, idx: any) => <FormInputError key={idx} message={item} />)}
        </div>

        <div>
          <label>Academy</label>
          <Input radius="sm" isClearable {...register("academy")} aria-label="academy" />
        </div>

        <ProfileActionButton type="submit" content="Save Changes" icon={<Save size={20} />} />
      </form>

    </div>
  )
}
