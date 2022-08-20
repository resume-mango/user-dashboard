/**
 * Converts Normal date to ISO string
 * @param date as Date
 * @returns ISO Date
 */
export const convertDatetoISO = (date: Date) => {
  return new Date(date).toISOString()
}

/**
 * Converts UNIX date to ISO date
 * @param date as UNIX Date
 * @returns ISO Date
 */
export const convertUnixToISODate = (date: number) => {
  const result = new Date(date * 1000).toISOString()
  return result
}

/**
 * Converts ISO Date to UNIX date
 * @param date as Date
 * @returns Unix Date
 */
export const convertISOToUnixDate = (date: Date) => {
  const result = Math.floor(new Date(date).getTime() / 1000)
  return result
}

/**
 * converts Normal Date to HTML Input friendly date
 * @param date Date
 * @returns HTML Input freindly date
 */
export const convertDateToInput = (date: Date) => {
  return new Date(date).toISOString().slice(0, 16) as any
}
