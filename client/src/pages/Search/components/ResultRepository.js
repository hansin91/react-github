import React from 'react'
import { Button } from "reactstrap"
import { useHistory } from 'react-router-dom'
function Result (props) {
  const history = useHistory()
  const { owner, full_name, html_url, description } = props.data
  const goToDetail = (name) => {
    history.push('/repository/' + name)
  }
  return (
    <div className="result-container">
      <div className="result-image">
        <img alt={owner?.login} src={owner?.avatar_url} className="img-fluid w-100 d-block" />
      </div>
      <div className="result-description">
        <table className="table">
          <tbody>
            <tr>
              <td>Name</td>
              <td>:</td>
              <td>{full_name}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>:</td>
              <td>{description}</td>
            </tr>
            <tr>
              <td>URL</td>
              <td>:</td>
              <td><a rel="noopener noreferrer" target="_blank" href={html_url}>{html_url}</a></td>
            </tr>
            <tr>
              <td>Owner</td>
              <td>:</td>
              <td><a rel="noopener noreferrer" target="_blank" href={owner?.html_url}>{owner?.login}</a></td>
            </tr>
          </tbody>
        </table>
        <Button onClick={() => goToDetail(full_name)} outline color="info">Show detail</Button>
      </div>
    </div>
  )
}

export default Result