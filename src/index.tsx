import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import Header from './components/common/Header'
import RivalList from './components/rivals/RivalList'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PastGames from './components/past-games/PastGames'

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact={true} path="/" component={RivalList} />
      <Route path="/past_games/" component={PastGames} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
