import React from 'react'
import { useSelector } from 'react-redux'
import ProfileDetail from './components/ProfileDetail'
import './style.scss'
import { Switch, Route, useRouteMatch, NavLink } from 'react-router-dom'
import Favourites from './components/Favourites'
import Followers from './components/Followers'

function Profile () {
  const { path, url } = useRouteMatch()
  const user = useSelector(state => state.user.user)
  return (
    <div className="profile-container">
      <div className="profile">
        <ProfileDetail user={user} />
      </div>
      <div className="profile-link">
        <div className="profile-tab">
          <NavLink className="active-link" exact to={`${url}`}>Favourites</NavLink>
        </div>
        <div className="profile-tab">
          <NavLink className="active-link profile-tab" to={`${url}/followers`}>Followers</NavLink>
        </div>
      </div>
      <Switch>
        <Route exact path={path}>
          <Favourites />
        </Route>
        <Route path={`${path}/:menu`}>
          <Followers />
        </Route>
      </Switch>
    </div>
  )
}

export default Profile