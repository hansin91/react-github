import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import { fetchFavourites, loadMoreFavourites } from '../../../redux/actions'
import Favourite from './Favourite'
import DeleteModal from './DeleteModal'
import { Row, Col, Button } from 'reactstrap'
function Favourites () {
  const dispatch = useDispatch()
  const favourites = useSelector(state => state.user.favourites)
  const isLoading = useSelector(state => state.user.isLoading)
  const total = useSelector(state => state.user.totalFavourites)
  const isDeleted = useSelector(state => state.user.isDeleted)
  const [page, setPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [deletedId, setDeletedId] = useState(0)
  useEffect(() => {
    dispatch(fetchFavourites({
      page,
      limit: 10
    }))
  }, [dispatch])

  useEffect(() => {
    if (isDeleted) {
      setIsOpen(false)
      setPage(1)
    }
  }, [isDeleted])

  const loadMore = (page) => {
    setPage(page)
    dispatch(loadMoreFavourites({
      page,
      limit: 10
    }))
  }

  const openModal = (payload) => {
    setIsOpen(payload.isOpen)
    setDeletedId(payload.favouriteId)
  }

  const closeModal = (value) => {
    setIsOpen(value)
  }

  return (
    <Fragment>
      {isLoading && <Skeleton counter={10} />}
      <Row>
        {favourites.map((favourite, index) =>
          <Col key={index} md="6" xs="12">
            <Favourite openModal={openModal} data={favourite} />
          </Col>)}
        {favourites.length < total ?
          <Button onClick={() => loadMore(page + 1)}
            outline color="primary">Load more</Button> : ''}
      </Row>
      {!favourites.length &&
        <p className="not-found-favourites">There is no repository in your favourites</p>
      }
      <DeleteModal
        deletedId={deletedId}
        closeModal={closeModal}
        isOpen={isOpen} />
    </Fragment>
  )
}

export default Favourites