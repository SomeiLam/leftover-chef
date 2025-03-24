import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()
  return (
    <div className="px-10 container">
      <h1 className="text-2xl sm:text-3xl font-bold">{t('recipes.title')}</h1>
      <p className="mt-2 sm:text-lg">{t('recipes.subtitle')}</p>
    </div>
  )
}

export default Header
