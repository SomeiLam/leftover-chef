import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const ForgotPasswordPage = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Here you would implement your actual password reset logic
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated delay
      setSuccess(true)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Failed to send reset link. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <Link
            to="/signin"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t('auth.backToSignIn')}
          </Link>

          <div className="text-center space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text"
            >
              {t('auth.forgotPassword')}
            </motion.h1>
            <p className="text-gray-600">
              {t('auth.forgotPasswordDescription')}
            </p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-50 text-green-600 text-sm rounded-lg p-4 text-center"
            >
              {t('auth.resetLinkSent')}
            </motion.div>
          ) : (
            <>
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-50 text-red-500 text-sm rounded-lg p-3 text-center"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t('auth.email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={t('auth.emailPlaceholder')}
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? t('auth.sendingLink') : t('auth.resetLink')}
                </motion.button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPasswordPage
