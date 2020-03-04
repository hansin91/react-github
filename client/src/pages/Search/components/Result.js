import React from 'react'
import Skeleton from 'react-loading-skeleton'

function Result (props) {
  console.log(props.isLoading)
  if (props.isLoading) {
    return <Skeleton count={5} />
  } else {
    return (
      <div>Result</div>
    )
  }
}

export default Result