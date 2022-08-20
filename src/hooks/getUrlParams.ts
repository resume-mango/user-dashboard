/* istanbul ignore file */

import React from 'react'
import { useLocation } from 'react-router-dom'
/**
 * decode parameters form url
 * @returns memoized URLSearchParams
 */
const getUrlParams = () => {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

export default getUrlParams
