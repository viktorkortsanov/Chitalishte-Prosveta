import LoginForm from "./components/AuthForms/LoginForm"
import RegisterForm from "./components/AuthForms/RegisterFrom"
import NavBar from "./components/NavBar/NavBar"
import { Routes, Route } from "react-router"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes >
    </>
  )
}

export default App
