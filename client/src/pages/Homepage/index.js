import React, { useState, useEffect, Fragment } from 'react'
import { Jumbotron, Container, Row } from 'reactstrap'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './style.scss'
import Logo from '../../assets/images/github-sign.svg'
import Followers from '../../assets/images/teamwork.svg'
import Repository from '../../assets/images/cloud.svg'
import ImageHomepage from './components/ImageHomepage'
import LoadingPage from '../../components/LoadingPage'
import { loginWithGithub } from '../../redux/actions'


function HomePage () {
  const isLoading = useSelector(state => state.user.isLoading)
  const history = useHistory()
  const [images] = useState([{
    src: Followers,
    title: 'Followers'
  },
  {
    src: Repository,
    title: 'Repository'
  }])

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }
  const query = useQuery()
  const code = query.get("code")
  const dispatch = useDispatch()
  useEffect(() => {
    if (code) {
      dispatch(loginWithGithub(query.get("code")))
      history.push('/')
    }
  }, [dispatch])

  return (
    <Fragment>
      {isLoading && <LoadingPage />}
      <Jumbotron fluid>
        <Container className="jumbotron-container" fluid>
          <h1 className="display-3">Welcome home</h1>
          <p className="lead">Discover your github followers and repositories</p>
          <div className="image-wrapper">
            <img alt="Github Logo" className="img-fluid" src={Logo} />
          </div>
        </Container>
      </Jumbotron>
      <Row className="jumbotron-image">
        {images.map((image, index) => <ImageHomepage key={index} image={image} />)}
      </Row>
    </Fragment>
  )
}

export default HomePage