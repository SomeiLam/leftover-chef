import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

type LoadingType = 'upload' | 'generate' | 'process'

type LoadingProps = {
  type: LoadingType
}

export function Loading({ type }: LoadingProps) {
  const { t } = useTranslation()

  const loadingMessages = {
    upload: t('loading.upload'),
    generate: t('loading.generate'),
    process: t('loading.process'),
  }

  const dotVariants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-6">
      <motion.div
        animate="pulse"
        transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
        className="flex justify-center items-center gap-5"
      >
        <motion.div
          className="w-5 h-5 rounded-full bg-purple-500 will-change-transform"
          variants={dotVariants}
        />
        <motion.div
          className="w-5 h-5 rounded-full bg-indigo-500 will-change-transform"
          variants={dotVariants}
        />
        <motion.div
          className="w-5 h-5 rounded-full bg-blue-500 will-change-transform"
          variants={dotVariants}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <p className="text-xl font-medium text-gray-800">
          {loadingMessages[type]}
        </p>
        <p className="text-gray-600">{t('loading.pleaseWait')}</p>
      </motion.div>
    </div>
  )
}
