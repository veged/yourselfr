import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import NotFoundView from 'views/NotFoundView/NotFoundView';
import Preferences from 'components/Preferences';

// Preferences Components
import PreferencesContainer from 'components/Preferences/Container';
import UpdateSocialNetworks from 'components/Preferences/UpdateSocialNetworks';
import PreferencesPhotos from 'components/Preferences/Photos';

import Posts from 'components/Posts';
import User from 'components/User';
import Feed from 'components/Feed';

import Main from 'components/AuthComponents/Main'
import { Signup, Login } from 'components/AuthComponents/SignupAndLogin';

import GetStarted from 'views/GetStarted/GetStarted';
import GetPersonalized from 'views/GetPersonalized/GetPersonalized';
import GetSocialized from 'views/GetSocialized/GetSocialized';
import ShareWithSocial from 'components/ShareWithSocial';

import Followers from 'components/Subscriptions/Followers';
import Following from 'components/Subscriptions/Following';
import UserNavigation from 'components/UserNavigation';

class ShareWithSocialContainer extends React.Component {
  render () {
    return (
      <User>
        <div className='container--right'>
          <h3>Привлекайте людей, рассказывая о Вас в соцсетях.</h3>
          <ShareWithSocial/>
        </div>
      </User>
    )
  }
}

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={Main} />
    <Route path='/404' component={NotFoundView} />
    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
    <Route path='/feed' component={Feed} />
    <Route path='/preferences' component={PreferencesContainer}>
      <IndexRoute component={Preferences} />
      <Route path='photos' component={PreferencesPhotos} />
      <Route path='social' component={UpdateSocialNetworks} />
    </Route>
    <Route path='/nav' component={UserNavigation} />
    <Route path='/share-with-social' component={ShareWithSocialContainer} />

    <Route path='/i/get-started' component={GetStarted} />
    <Route path='/i/get-personalized' component={GetPersonalized} />
    <Route path='/i/get-socialized' component={GetSocialized} />

    <Route path='/:user' component={User} >
      <IndexRoute component={Posts}/>
      <Route path='followers' component={Followers} />
      <Route path='following' component={Following} />
    </Route>
    <Redirect from='*' to='/404' />
  </Route>
);
