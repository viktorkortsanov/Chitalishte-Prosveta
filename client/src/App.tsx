import LoginForm from "./components/AuthForms/LoginForm"
import RegisterForm from "./components/AuthForms/RegisterFrom"
import VerifyEmail from "./components/AuthForms/VerifyEmail"
import NavBar from "./components/NavBar/NavBar"
import MainContent from "./components/MainContent/MainContent"
import { Routes, Route, useNavigate } from "react-router"
import Footer from "./components/Footer/Footer"
import ArticleForm from "./components/Articles/CreateArticle/CreateArticle"
import ArticlesMain from "./components/Articles/ArticlesMain/ArticlesMain"
import ArticleDetails from "./components/Articles/ArticleDetails/ArticleDetails"
import EditArticle from "./components/Articles/EditArticle/EditArticle"
import { AuthProvider } from "./context/AuthContext"
import { useAuth } from "./hooks/useAuth"

function AppRoutes() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/novini-i-sabitiya" element={<ArticlesMain isAdmin={isAdmin} />} />
        <Route path="/novini-i-sabitiya/create" element={<ArticleForm onClose={() => navigate(-1)} onSubmit={() => { }} />} />
        <Route path="/novini-i-sabitiya/:slug/edit" element={<EditArticle />} />
        <Route path="/novini-i-sabitiya/:slug" element={<ArticleDetails />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App