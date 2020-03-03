import React, { useState, useEffect } from 'react'
import { Jumbotron, Container, Row } from 'reactstrap'
import Logo from '../../../assets/images/github-sign.svg'
import Followers from '../../../assets/images/teamwork.svg'
import Repository from '../../../assets/images/cloud.svg'
import ImageHomepage from './ImageHomepage'
import api from '../../../api'


function HomePage () {
  const [images] = useState([{
    src: Followers,
    title: 'Followers'
  },
  {
    src: Repository,
    title: 'Repository'
  }])

  // useEffect(() => {
  //   api({
  //     method: 'GET',
  //     url: '/users'
  //   })
  //     .then(response => {
  //       console.log(response)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }, [])

  return (
    <div>
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
    </div>
  )
}

export default HomePage