import React from 'react'

function Favourite (props) {
  const { repository } = props.data
  return (
    <div className="favourite">
      <div className="favourite-image">
        <img className="img-fluid d-block w-100"
          src={repository.avatar_url}
          alt={repository.name} />
        <div className="delete-favourite">
          <i onClick={() => props.openModal({
            isOpen: true,
            favouriteId: props.data.id
          })} className="fa fa-trash"></i>
        </div>
      </div>
      <div className="favourite-detail">
        <table className="table">
          <tbody>
            <tr>
              <td>Name</td>
              <td>:</td>
              <td>{repository.name}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>:</td>
              <td>{repository.description}</td>
            </tr>
            <tr>
              <td>URL</td>
              <td>:</td>
              <td><a rel="noopener noreferrer" target="_blank" href={repository.url}>{repository.url}</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Favourite