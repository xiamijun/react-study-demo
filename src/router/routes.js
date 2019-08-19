import Loadable from 'react-loadable'
import Loading from '../components/Loading'
const Login=Loadable({
  loader: () => import('../containers/Login/LoginContainer'),
  loading:Loading
})
const Dashboard = Loadable({
  loader: () => import('../containers/dashboard/Dashboard'),
  loading:Loading
})
const SchoolManage = Loadable({
  loader: () => import('../containers/school-count/school-manage'),
  loading:Loading
})
const ListPage = Loadable({
  loader: () => import('../containers/ListPage'),
  loading:Loading
})
const DefaultContent = Loadable({
  loader: () => import('../containers/DefaultContent'),
  loading:Loading
})
const G2 = Loadable({
  loader: () => import('../containers/G2'),
  loading:Loading
})

export default [
  {
    path:'/',
    exact:true,
    component: Login
  },
  {
    path: '/dashboard',
    component: Dashboard
  }
]

export const contentRoutes=[  
  {
    path: '/dashboard/schoolCount/schoolManage',
    component: SchoolManage,
    name:'学校管理'
  },
  {
    path: '/dashboard/components/listPage',
    component: ListPage,
    name:'列表'
  },
  {
    path: '/dashboard/chart/G2',
    component: G2,
    name:'G2'
  },
  {
    path: '/',
    component: DefaultContent
  },
]