import { useState } from 'react'
import { motion } from 'framer-motion'
import { CircleCheckBig } from 'lucide-react'

const carbohydratesOptions = [
  { id: 'rice', label: 'Rice' },
  { id: 'bread', label: 'Bread' },
  { id: 'noodles', label: 'Noodles' },
  { id: 'noCarbs', label: 'No carbs' },
]

const CarbohydratesSelection: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set())

  const handleSelect = (id: string) => {
    const updatedSelection = new Set(selectedOptions)
    if (updatedSelection.has(id)) {
      updatedSelection.delete(id) // Deselect
    } else {
      updatedSelection.add(id) // Select
    }
    setSelectedOptions(updatedSelection)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Select your preferred carbohydrates
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {carbohydratesOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(option.id)}
            className={`cursor-pointer rounded-xl p-2 transition-all ${
              selectedOptions.has(option.id)
                ? 'bg-purple-50 border-2 border-purple-500'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="relative">
              {selectedOptions.has(option.id) && (
                <div className="absolute top-0 right-0 text-purple-500">
                  <CircleCheckBig className="w-5 h-5" />
                </div>
              )}
              <span
                className={`block font-medium py-2 pl-4 ${
                  selectedOptions.has(option.id)
                    ? 'text-purple-900'
                    : 'text-gray-800'
                }`}
              >
                {option.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CarbohydratesSelection
