import { motion } from 'framer-motion'
import React from 'react'

const PreferenceCard = ({
  id,
  icon: Icon,
  label,
  description,
  handlePreferenceClick,
  enabled,
}: {
  id: string
  icon: React.ElementType
  label: string
  description: string
  handlePreferenceClick: (id: string) => void
  enabled: boolean
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => handlePreferenceClick(id)}
      className={`cursor-pointer rounded-xl p-4 transition-all ${
        enabled
          ? 'bg-purple-50 border-2 border-purple-500'
          : 'bg-white border border-gray-200'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 mt-1">
          <Icon
            className={`w-5 h-5 ${
              enabled ? 'text-purple-500' : 'text-gray-400'
            }`}
          />
        </div>
        <div>
          <h3
            className={`font-medium ${
              enabled ? 'text-purple-900' : 'text-gray-900'
            }`}
          >
            {label}
          </h3>
          <p
            className={`mt-1 text-sm ${
              enabled ? 'text-purple-600' : 'text-gray-500'
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default PreferenceCard
