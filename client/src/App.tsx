import LoginForm from "./components/AuthForms/LoginForm"
import NavBar from "./components/NavBar/NavBar"
import { Routes, Route } from "react-router"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
      </Routes >
    </>
  )
}

export default App
