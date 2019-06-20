import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './RivalList'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={RivalLists} />
    <Route path="/past_games" component={PastGames} />
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
