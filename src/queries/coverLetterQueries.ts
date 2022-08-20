import axios from 'axios'
import getQuery from '../hooks/getQuery'
import getQueryAdvance from '../hooks/getQueryAdvance'

/**
 * Gets All Coverletter templates
 * @returns UseQueryResult
 */
export const getAllCoverLetterTemplates = () => {
  return getQuery('CoverLetterTemplates', `/templates/coverletter`)
}

/**
 * Gets all user created coverletters
 * @returns UseQueryResult
 */
export const getAllCoverLetters = () => {
  const fetcher = async () => {
    const { data } = await axios.get(`/coverletter`)
    return data
  }

  return getQueryAdvance('coverletters', () => fetcher())
}

/**
 * Gets Single Coverletter Template
 * @param template object _id
 * @param enabled should query be enabled?
 * @returns UseQueryResult
 */
export const getCoverLetterTemplate = (template: string, enabled?: boolean) => {
  const fetcher = async (name: string) => {
    const { data } = await axios.get(`/templates/coverletter/${name}`)
    return data
  }

  return getQueryAdvance(
    ['CoverLetterTemplates', template],
    () => fetcher(template),
    enabled
  )
}
/**
 * Gets Single Coverletter
 * @param id coverletter object _id
 * @param enabled should query be enabled?
 * @returns UseQueryResult
 */
export const getCoverLetter = (id: string, enabled?: boolean) => {
  const fetchResume = async (id: string) => {
    const { data } = await axios.get(`/coverletter/${id}`)
    return data
  }

  return getQueryAdvance(['coverletter', id], () => fetchResume(id), enabled)
}
