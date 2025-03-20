import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()
  return (
    <div className="ml-20 px-4 container">
      <h1 className="text-3xl font-bold">{t('recipes.title')}</h1>
      <p className="mt-2 text-lg">{t('recipes.subtitle')}</p>
    </div>
  )
}

export default Header
