import React from 'react'
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap'

function ResultUser (props) {
  const { login, avatar_url, html_url } = props.data
  return (
    <div className="result-user">
      <Card>
        <CardImg top width="100%" src={avatar_url} alt={login} />
        <CardBody>
          <CardTitle><a rel="noopener noreferrer" target="_blank" href={html_url}>{login}</a></CardTitle>
        </CardBody>
      </Card>
    </div>
  )
}

export default ResultUser