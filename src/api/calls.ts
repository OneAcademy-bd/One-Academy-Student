import axios from "axios";
import { ExamType, ExamPaperPostType, StudentProfileType, TakenExamType, StudentProfileUpdateType, StudentRegistrationInfo } from "../types";
import { endpoints } from "./endpoints";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";


// function call cause we need retrieve each time in axios call
const getAccessToken = () => Cookies.get('oasat')
const getHeaders = () => ({ Authorization: `Bearer ${getAccessToken()}` })

// get calls
const fetchProfile = (): Promise<StudentProfileType> => axios.get(endpoints.profile, { headers: getHeaders() }).then(res => res.data).catch(err => console.error(err))
const fetchExams = (): Promise<Array<ExamType>> => axios.get(endpoints.exams, { headers: getHeaders() }).then(res => res.data).catch(err => console.error(err))
const fetchAnExam = (examId: number): Promise<ExamType> => axios.get(endpoints.get_an_exam(examId), { headers: getHeaders() }).then(res => res.data).catch(err => console.error(err))
const fetchTakenExams = (): Promise<Array<TakenExamType>> => axios.get(endpoints.taken_exams, { headers: getHeaders() }).then(res => res.data).catch(err => console.error(err))

export const useFetchedProfile = () => useQuery({ queryKey: ["profile"], queryFn: fetchProfile })
export const useFetchedExams = () => useQuery({ queryKey: ["exams"], queryFn: fetchExams })
export const useAFetchedExam = (examId: number) => useQuery({ queryKey: ['an_exam'], queryFn: () => fetchAnExam(examId) })
export const useFetchedTakenExams = () => useQuery({ queryKey: ['taken_exams'], queryFn: fetchTakenExams })

// mutation calls
export const registerNewAccount = (registrationData: StudentRegistrationInfo) => axios.post(endpoints.register, registrationData)
export const postPaperToVerifyExam = (answerSheet: ExamPaperPostType) => axios.post(endpoints.verify_exam, answerSheet, { headers: getHeaders() })
export const updateProfile = (updateData: StudentProfileUpdateType) => axios.patch(endpoints.profile, updateData, { headers: getHeaders() })
