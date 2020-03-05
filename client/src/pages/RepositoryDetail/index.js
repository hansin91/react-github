import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { fetchRepositoryDetail, addToFavourite } from '../../actions'
import Skeleton from 'react-loading-skeleton'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './style.scss'

function RepositoryDetail () {
  const dispatch = useDispatch()
  const repository = useSelector(state => state.github.repository)
  const isLoading = useSelector(state => state.github.isLoading)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const isLoadingFavourite = useSelector(state => state.user.isLoading)
  const message = useSelector(state => state.user.message)
  const error = useSelector(state => state.user.error)
  // const profile = useSelector(state => state.auth.user)
  const fetchDetail = (name) => dispatch(fetchRepositoryDetail(name))
  const markAsFavourite = (params) => dispatch(addToFavourite(params))
  const { user, repo_name } = useParams()
  const repository_name = user + '/' + repo_name

  useEffect(() => {
    fetchDetail(repository_name)
  }, [])

  useEffect(() => {
    if (message) {
      toast(message, { type: toast.TYPE.SUCCESS, autoClose: 5000 })
    }
  }, [message])

  useEffect(() => {
    if (error) {
      toast(error, { type: toast.TYPE.ERROR, autoClose: 5000 })
    }
  }, [error])

  const { owner,
    forks_count,
    stargazers_count,
    description,
    name,
    html_url,
    url,
    full_name } = repository
  return (
    <Fragment>
      <ToastContainer />
      {isLoading && <Skeleton count={10} />}
      {owner &&
        <div className="repository-detail">
          <div className="repository-image">
            <img className="img-fluid d-block w-100" src={owner ? owner.avatar_url : ''} alt={name} />
          </div>
          <div className="repository-info">
            <table className="table">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>Full name</td>
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
                  <td><a target="_blank" rel="noopener noreferrer" href={html_url}>{html_url}</a></td>
                </tr>
                {owner &&
                  <tr>
                    <td>Owner</td>
                    <td>:</td>
                    <td>
                      <a target="_blank" rel="noopener noreferrer" href={owner ? owner.html_url : ''}>{owner.login}</a>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
            <div className="fork-star">
              <div className="fork">
                <i className="fa fa-code-fork font-medium" aria-hidden="true"></i>
                <span className="fork-count">{forks_count}</span>
              </div>
              <div className="star">
                <i className="fa fa-star font-medium" aria-hidden="true"></i>
                <span className="star-count">{stargazers_count}</span>
              </div>
            </div>
            {
              isAuthenticated &&
              !isLoadingFavourite &&
              <div className="button-favourite">
                <Button onClick={() => markAsFavourite(url)} color="warning">
                  <i className="fa fa-thumbs-up icon-favourite" aria-hidden="true"></i>
                  <span className="text">Favourite</span>
                </Button>
              </div>
            }
            {
              isAuthenticated &&
              isLoadingFavourite &&
              <div className="button-favourite">
                <button className="btn btn-warning" type="button" disabled>
                  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  Loading...
              </button>
              </div>
            }
          </div>
        </div>}
    </Fragment>
  )
}

export default RepositoryDetail