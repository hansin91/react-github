import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Toast, ToastBody, ToastHeader } from 'reactstrap'
import { fetchRepositoryDetail, addToFavourite } from '../../redux/actions'
import { setErrors, setMessage } from '../../redux/actions/user'
import Skeleton from 'react-loading-skeleton'
import './style.scss'

function RepositoryDetail () {
  const dispatch = useDispatch()
  const repository = useSelector(state => state.github.repository)
  const isLoading = useSelector(state => state.github.isLoading)
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const isLoadingFavourite = useSelector(state => state.user.isLoadingFavourite)
  const message = useSelector(state => state.user.message)
  const errors = useSelector(state => state.user.errors)
  const favourites = useSelector(state => state.user.allFavourite)
  const isFavourite = useSelector(state => state.user.isFavourite)
  const [enable, setEnable] = useState(true)
  const fetchDetail = (name) => dispatch(fetchRepositoryDetail(name))
  const markAsFavourite = (params) => dispatch(addToFavourite(params))
  const { user, repo_name } = useParams()
  const repository_name = user + '/' + repo_name
  const [show, setShow] = useState(false)

  useEffect(() => {
    dispatch(setErrors([]))
    dispatch(setMessage(''))
    fetchDetail(repository_name)
  }, [])

  useEffect(() => {
    if (isFavourite) {
      setShow(true)
    }
  }, [isFavourite])

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 5000)
  }, [errors.length, message])

  useEffect(() => {
    if (Object.keys(repository).length) {
      const [found] = favourites.filter((fav) => fav.repository.github_id === repository.id)
      if (found) {
        setEnable(false)
      } else {
        setEnable(true)
      }
    }
  }, [favourites, repository])

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
      {isLoading && <Skeleton count={10} />}
      {repository &&
        <Toast isOpen={show}>
          <ToastHeader icon="success">
            Message
          </ToastHeader>
          <ToastBody>
            {message}
          </ToastBody>
        </Toast>}
      {repository &&
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
                <Button disabled={!enable} onClick={() => markAsFavourite(url)} color="warning">
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