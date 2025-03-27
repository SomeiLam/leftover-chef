import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import AppBar from './components/AppBar'
import './i18n'
import InputPage from './pages/InputPage'
import IngredientsPage from './pages/IngredientsPage'
import PreferencesPage from './pages/PreferencesPage'
import RecipesPage from './pages/RecipesPage'
import SavedPage from './pages/SavedPage'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollToTop, NavigateBack } from './components/UI'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import { IngredientsProvider } from './contexts/IngredientsContext'

const pageTransition = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
  transition: { duration: 0.3, ease: 'easeInOut' },
}

const AnimatedRoutes = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageTransition}>
        <div
          style={{
            width: '100%',
            margin: '0 auto',
          }}
        >
          <Routes location={location}>{children}</Routes>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <IngredientsProvider>
        <div className="max-w-screen overflow-x-hidden min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <AppBar />
          <ScrollToTop />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <NavigateBack />
            <Suspense fallback={<div>Loading recipe...</div>}>
              <AnimatedRoutes>
                {/* Define the routes here for each step */}
                <Route path="/" element={<InputPage />} />
                <Route path="/ingredients" element={<IngredientsPage />} />
                <Route path="/preferences" element={<PreferencesPage />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/saved" element={<SavedPage />} />
                <Route path="/signin" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
              </AnimatedRoutes>
            </Suspense>
          </main>
        </div>
      </IngredientsProvider>
    </Router>
  )
}

export default App
