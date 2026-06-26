import LoginForm from "./components/AuthForms/LoginForm"
import RegisterForm from "./components/AuthForms/RegisterFrom"
import VerifyEmail from "./components/AuthForms/VerifyEmail"
import NavBar from "./components/NavBar/NavBar"
import MainContent from "./components/MainContent/MainContent"
import { Routes, Route } from "react-router"
import Footer from "./components/Footer/Footer"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainContent />}></Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes >
      <Footer />
    </>
  )
}

export default App
