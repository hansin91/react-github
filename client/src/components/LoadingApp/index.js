import React from 'react'
import './style.scss'
import LoadingGIF from '../../assets/images/octocat-spinner-128.gif'

function LoadingApp () {
  return (
    <div className="loader-app">
      <img src={LoadingGIF} alt="loading" />
    </div>
  )
}

export default LoadingApp