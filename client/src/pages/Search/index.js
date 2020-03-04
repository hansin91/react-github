import React, { useEffect, Fragment, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Col, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import './style.scss'
import { searchUserOrRepository } from '../../actions'
import Result from './components/Result'

function Search () {
  const useQuery = () => {
    return (new URLSearchParams(useLocation().search))
  }
  const query = useQuery()
  const dispatch = useDispatch()
  const search = (params) => dispatch(searchUserOrRepository(params))
  const result = useSelector(state => state.github.result)
  const isLoading = useSelector(state => state.github.isLoading)

  const [type, setType] = useState('')
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    setType(query.get("type"))
    setKeyword(query.get("query"))
    if (keyword && type) {
      search({
        query: keyword,
        type,
        page: 1,
        limit: 10
      })
    }
  }, [keyword, type])

  return (
    <Fragment>
      <Container className="search-container">
        <div>
          <h3 className="find-header">Results for <span className="find-search">"{query.get("query")}"</span></h3>
        </div>
        <Row>
          {result.map((data, index) => <Col key={index} md="12"><Result isLoading={isLoading} /></Col>)}
        </Row>
      </Container>
    </Fragment>
  )
}

export default Search