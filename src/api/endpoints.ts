// local in this system
// const API_BASE = 'http://127.0.0.1:8000'

// local in this LAN
// const API_BASE = 'http://192.168.1.115:8000'

// aws
// const API_BASE = 'http://13.126.56.249:8000'

// render
const API_BASE = 'https://one-academy-backend-we62.onrender.com'

export const endpoints = {
    profile: `${API_BASE}/student/api/profile/`,
    exams: `${API_BASE}/student/api/exams/`,
    get_an_exam: (examId: number) => `${API_BASE}/student/api/exams/${examId}/`,
    verify_exam: `${API_BASE}/student/api/exams/verify/`,
    taken_exams: `${API_BASE}/student/api/exams/taken`,
    get_token: `${API_BASE}/api/token/`,
    register: `${API_BASE}/student/api/register/`
}
