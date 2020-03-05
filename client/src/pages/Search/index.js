import React, { useEffect, Fragment, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Container, Col, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import Pagination from 'react-js-pagination'
import './style.scss'
import { searchUserOrRepository } from '../../actions'
import ResultRepository from './components/ResultRepository'
import ResultUser from './components/ResultUser'

const useQuery = () => {
  return (new URLSearchParams(useLocation().search))
}

function Search () {
  const query = useQuery()
  const dispatch = useDispatch()
  const location = useLocation()
  const search = (params) => dispatch(searchUserOrRepository(params))
  const result = useSelector(state => state.github.result)
  const isLoading = useSelector(state => state.github.isLoading)
  const totalItems = useSelector(state => state.github.totalItems)
  const [selectedPage, setSelectedPage] = useState(+query.get("page"))
  const history = useHistory()
  const handleSelectedPage = (selectedPage) => {
    setSelectedPage(selectedPage)
    history.push({
      pathname: '/search',
      search: '?q=' + query.get("q") + '&type=' + query.get("type") + '&page=' + selectedPage,
    })
  }

  useEffect(() => {
    setSelectedPage(+query.get("page"))
    search({
      query: query.get("q"),
      type: query.get("type"),
      page: query.get("page"),
      limit: 10
    })
  }, [location, selectedPage])

  if (isLoading) {
    return (
      <Container>
        <div className="skeleton-wrapper">
          <Skeleton count={10} />
        </div>
      </Container>
    )
  }
  return (
    <Fragment>
      <Container className="search-container">
        <div>
          <h3 className="find-header">Results for &nbsp;
            <span className="find-search">"{query.get("q")}"</span>
          </h3>
        </div>
        <Row>
          {query.get("type") === 'repo'
            && result
            && result.map((data, index) =>
              <Col key={index} md="12"><ResultRepository data={data} /></Col>)}

          {query.get("type") === 'user'
            && result
            && result.map((data, index) =>
              <Col key={index} md="3" sm="6" xs="12"><ResultUser data={data} /></Col>)}
        </Row>
        {result.length && <Pagination activePage={selectedPage}
          onChange={handleSelectedPage}
          itemClass="page-item"
          linkClass="page-link"
          itemsCountPerPage={10}
          totalItemsCount={totalItems}
          pageRangeDisplayed={5} />}
      </Container>
    </Fragment>
  )
}

export default Search