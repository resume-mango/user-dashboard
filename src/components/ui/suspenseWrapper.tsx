import { ReactNode, Suspense, useEffect, useState } from 'react'
import { Spinner } from '../../styled/loader'

const SuspenseWrapper = ({ children }: { children: ReactNode }) => {
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])
  return (
    <Suspense
      fallback={
        <div
          className={showLoading ? 'align-center h-100 flex-center' : 'hide'}
        >
          <Spinner size="2.5rem" type="primary" />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export default SuspenseWrapper
