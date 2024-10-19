import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectLanguage, changeLanguage } from "../../store/slices/languages"

const LanguageSelect = () => {
  const dispatch = useAppDispatch()
  const language = useAppSelector(selectLanguage)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <select
      id="languageSelect"
      name="languageSelect"
      value={language}
      onChange={handleChange}
      className="block w-full px-4 py-2 text-primary font-bold uppercase shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm lg:text-base sm:leading-6 max-w-20 min-h-11 rounded-2xl bg-white border-2 border-primary hover:border-primary-50"
    >
      <option value="en">En</option>
      <option value="it">It</option>
      <option value="de">De</option>
    </select>
  )
}

export { LanguageSelect }
