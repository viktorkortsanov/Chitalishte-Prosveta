import LoginForm from "./components/AuthForms/LoginForm"
import RegisterForm from "./components/AuthForms/RegisterFrom"
import VerifyEmail from "./components/AuthForms/VerifyEmail"
import NavBar from "./components/NavBar/NavBar"
import { Routes, Route } from "react-router"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes >
    </>
  )
}

export default App
