import React from 'react'
import './style.scss'
function LoadingPage () {
  return (
    <div className="loader">
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
export default LoadingPage