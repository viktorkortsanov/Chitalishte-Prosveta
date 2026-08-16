import LoginForm from "./components/AuthForms/LoginForm"
import RegisterForm from "./components/AuthForms/RegisterFrom"
import VerifyEmail from "./components/AuthForms/VerifyEmail"
import NavBar from "./components/NavBar/NavBar"
import MainContent from "./components/MainContent/MainContent"
import { Routes, Route } from "react-router"
import Footer from "./components/Footer/Footer"
import ArticleForm from "./components/Articles/ArticleForm/ArticleForm"
import ArticlesMain from "./components/Articles/ArticlesMain/ArticlesMain"
import ArticleDetails from "./components/Articles/ArticleDetails/ArticleDetails"
import { AuthProvider } from "./context/AuthContext"
import { useAuth } from "./hooks/useAuth"
import AboutUsPage from "./components/AboutUsPage/AboutUsPage"

function AppRoutes() {
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
        <Route path="/novini-i-sabitiya/create" element={<ArticleForm mode="create" />} />
        <Route path="/novini-i-sabitiya/:slug/edit" element={<ArticleForm mode="edit" />} />
        <Route path="/novini-i-sabitiya/:slug" element={<ArticleDetails />} />
        <Route path="/za-nas" element={<AboutUsPage />} />
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