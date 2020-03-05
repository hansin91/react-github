import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import { fetchFavourites, loadMoreFavourites } from '../../../redux/actions'
import Favourite from './Favourite'
import { Row, Col, Button } from 'reactstrap'
function Favourites () {
  const dispatch = useDispatch()
  const favourites = useSelector(state => state.user.favourites)
  const isLoading = useSelector(state => state.user.isLoading)
  const total = useSelector(state => state.user.totalFavourites)
  const [page, setPage] = useState(1)
  useEffect(() => {
    dispatch(fetchFavourites({
      page,
      limit: 10
    }))
  }, [dispatch])

  const loadMore = (page) => {
    setPage(page)
    dispatch(loadMoreFavourites({
      page,
      limit: 10
    }))
  }

  return (
    <Fragment>
      {isLoading && <Skeleton counter={10} />}
      <Row>
        {favourites.map((favourite, index) =>
          <Col key={index} md="6" xs="12">
            <Favourite data={favourite} />
          </Col>)}
        {favourites.length < total ?
          <Button onClick={() => loadMore(page + 1)}
            outline color="primary">Load more</Button> : ''}
      </Row>
    </Fragment>
  )
}

export default Favourites