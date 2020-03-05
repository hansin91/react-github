import React, { Fragment } from 'react'

function ProfileDetail (props) {
  return (
    <Fragment>
      <div className="profile-image">
        <img className="img-fluid d-block w-100" src={props.user.avatar_url} alt={props.user.username} />
      </div>
      <div className="profile-info">
        <table className="table">
          <tbody>
            <tr>
              <td>Username</td>
              <td>:</td>
              <td>{props.user.username}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>:</td>
              <td>{props.user.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>{props.user.email}</td>
            </tr>
            <tr>
              <td>Github url</td>
              <td>:</td>
              <td><a target="_blank" rel="noopener noreferrer" href={props.user.html_url}>{props.user.html_url}</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}

export default ProfileDetail

