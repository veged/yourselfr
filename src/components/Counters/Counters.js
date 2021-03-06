import React, { Component, PropTypes } from 'react'
import s from './Counters.scss'
import { Link } from 'react-router'
import { cpEnding } from '../Toools'
import Translate from 'react-translate-component'

class Counters extends Component {
  static propTypes = {
    visits: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    alias: PropTypes.string.isRequired
  };

  render () {
    var pronounce = {
      visits: cpEnding(this.props.visits, 'counters.visits'),
      followers: cpEnding(this.props.followers, 'counters.followers'),
      following: cpEnding(this.props.following, 'counters.following')
    }
    const { visits, followers, following } = this.props
    var followersLink = `/${this.props.alias}/followers`
    var followingLink = `/${this.props.alias}/following`
    return (
      <div className={s.counters}>
        <div className={s.counter}>
          <div className={s.counter_count}>{visits}</div>
          <div className={s.counter_title}>
            <Translate content={pronounce.visits} />
          </div>
        </div>
        <Link to={followersLink} className={s.counter}>
          <div className={s.counter_count}>{followers}</div>
          <div className={s.counter_title}>
            <Translate content={pronounce.followers} />
          </div>
        </Link>
        <Link to={followingLink} className={s.counter}>
          <div className={s.counter_count}>{following}</div>
          <div className={s.counter_title}>
            <Translate content={pronounce.following} />
          </div>
        </Link>
      </div>
      )
  }
}
export default Counters
