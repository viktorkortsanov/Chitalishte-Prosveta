import LoginForm from "./components/AuthForms/LoginForm"
import RegisterForm from "./components/AuthForms/RegisterFrom"
import VerifyEmail from "./components/AuthForms/VerifyEmail"
import NavBar from "./components/NavBar/NavBar"
import MainContent from "./components/MainContent/MainContent"
import { Routes, Route, useNavigate } from "react-router"
import Footer from "./components/Footer/Footer"
import ArticleForm from "./components/Articles/CreateArticle/CreateArticle"

function App() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/novini-i-sаbitiya" element={<ArticleForm onClose={() => navigate(-1)} onSubmit={(data) => console.log(data)} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App