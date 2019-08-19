import React,{Component} from 'react'
import Head from '../../containers/Head'
import SideMenu from '../../containers/SideMenu'
import './style.css'
import {contentRoutes} from '../../router/routes'
import {Route,Switch} from 'react-router-dom'

class Dashboard extends Component {
  render(){
    return (
      <div>
        <Head></Head>
        <div className='content'>
          <SideMenu></SideMenu>
          <div className='content-right'>
            <Switch>
              {
                contentRoutes.map((item,index)=>(
                  <Route
                    key={item.path}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  ></Route>
                ))
              }
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard