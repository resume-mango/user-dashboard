import axios from 'axios'
import getQuery from '../hooks/getQuery'
import getQueryAdvance from '../hooks/getQueryAdvance'
export interface GetResumesParams {
  title?: string
  page: number
  limit: number
}
/**
 * Gets All resume templates
 * @returns UseQueryResult
 */
export const getAllResumeTemplates = () => {
  return getQuery('resumeTemplates', `/templates/resume`)
}

/**
 * Gets all user created resume
 * @returns UseQueryResult
 */
// export const getAllResumes = () => {
//   const fetcher = async () => {
//     const { data } = await axios.get(`/resume`)
//     return data
//   }

//   return getQueryAdvance('resumes', () => fetcher())
// }
export const getAllResumes = (params: GetResumesParams) => {
  const fetcher = async () => {
    const { data } = await axios.get(`/resume`, { params })
    return data
  }
  return getQueryAdvance(['resumes', params], () => fetcher())
}

/**
 * Gets single resume template
 * @param template resume template object _id
 * @param enabled should quey be enabled?
 * @returns UseQueryResult
 */
export const getResumeTemplate = (template: string, enabled?: boolean) => {
  const fetcher = async (name: string) => {
    const { data } = await axios.get(`/templates/resume/${name}`)
    return data
  }

  return getQueryAdvance(
    ['resumeTemplates', template],
    () => fetcher(template),
    enabled
  )
}
/**
 * Gets single user resume
 * @param id resume object _id
 * @param enabled should query be enabled?
 * @returns UseQueryResult
 */
export const getResume = (id: string, enabled?: boolean) => {
  const fetchResume = async (id: string) => {
    const { data } = await axios.get(`/resume/${id}`)
    return data
  }
  return getQueryAdvance(['resume', id], () => fetchResume(id), enabled)
}
