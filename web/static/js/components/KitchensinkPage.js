import React, { Component } from 'react'
import Header from './App/Header'
import Filters from './App/Filters'
import BirdTile from './BirdTile'
import './Kitchensink.css'

export default class KitchensinkPage extends Component {
  render () {
    return <div className='Kitchensink'>
      <Header />
      <Header title='Ellen Page' />
      <Header title='Jimmy Page' backButton />
      <Filters />
      <Filters searchIsFocused />
      <Filters sizeDropdownIsOpen />
      <img className='Kitchensink-image' style={{width: '100%'}} src='http://s3.amazonaws.com/wolty/media/56/original/Kitchen_Sink.jpeg?1305542976' />
    </div>
  }
}

// Support require(..) to only include in dev env
module.exports = KitchensinkPage
