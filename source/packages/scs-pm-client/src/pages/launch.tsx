import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { DashBoardPage } from './dash-board-page'
import { ResourceManagementPage } from './resource-management-page'

export const LaunchPage: React.FC = () => {
  return (
    <Router basename="/scspmeditor">
      <Switch>
        <Route exact={true} path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/dashboard" component={DashBoardPage} />
        <Route path="/resourceManagement" component={ResourceManagementPage} />
      </Switch>
    </Router>
  )
}
