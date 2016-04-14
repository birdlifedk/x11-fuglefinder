import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { unionBy, reject } from 'lodash'
import { resolve } from 'redux-simple-promise'
import FullPageNotice from './App/FullPageNotice'
import Api from '../lib/Api'
import { register } from '../store'
import Navigation, { Header, Content } from './Navigation'
import { FETCH_CURRENT_USER } from './App'
import ShareNotice from './App/ShareNotice'
import BirdTileCompact from './BirdTileCompact'

/* ACTIONS */

export const CREATE_USER_SIGHTING = 'sightings/CREATE_USER_SIGHTING'
export function createUserSighting (bird) {
  return {
    type: CREATE_USER_SIGHTING,
    payload: {
      bird, promise: Api.post('/sightings', { bird_id: bird.id })
    }
  }
}

export const DELETE_USER_SIGHTING = 'sightings/DELETE_USER_SIGHTING'
export function deleteUserSighting (bird) {
  return {
    type: DELETE_USER_SIGHTING,
    payload: {
      bird, promise: Api.delete('/sightings', { bird_id: bird.id })
    }
  }
}

/* REDUCER */

export const initialState = {
  sightings: []
}

export function reducer (state = initialState, action) {
  switch (action.type) {
    case resolve(FETCH_CURRENT_USER):
      return { ...state, sightings: action.payload.user.birds }

    case CREATE_USER_SIGHTING:
      return {
        ...state,
        sightings: unionBy(state.sightings, [action.payload.bird], 'id')
      }

    case DELETE_USER_SIGHTING:
      return {
        ...state,
        sightings: reject(state.sightings, {id: action.payload.bird.id})
      }

    default: return state
  }
}

register({ sightings: reducer })

/* COMPONENT */

const stateToProps = (state) => ({
  birds: state.sightings.sightings
})

class SightingsPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    birds: PropTypes.arrayOf(PropTypes.object.isRequired)
  }

  handleShareClick (event) {
    // TODO:
    const url = 'https://'
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
  }

  render () {
    const { birds } = this.props

    return <Navigation>
      <Header title='Mine fund' />
      <Content>
        {birds.length === 0 && (
          <FullPageNotice to='/' buttonText='Find din første fugl' text='Du har ikke spottet nogen fugle endnu. Frem med kikkerten.' />
        )}
        {birds.length > 0 && <ShareNotice count={birds.length} onShareClick={::this.handleShareClick} />}
        {birds.map((bird) => (
          <BirdTileCompact key={bird.id} bird={bird} found />
        ))}
      </Content>
    </Navigation>
  }
}

export default connect(stateToProps)(SightingsPage)
