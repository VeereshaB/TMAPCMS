import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import UserProfile from '@/components/UserProfile';
import Login from '@/components/Login';
import dashBoard from '@/components/dashBoard';
import EnterConfirm from '@/components/EnterConfirm';
import resetPassword from '@/components/resetPassword';
import NotFound from '@/components/NotFound';
import ToolBarComponent from '@/components/ToolBarComponent'

Vue.use(Router)


// O/p Url for http://localhost:8080/#/tool
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     },
//     {
//       path: '/tool',
//       name: 'ToolBarComponent',
//       component: ToolBarComponent
//     },
//   ]
// })



// O/p URL for this http://localhost:8080/tool
export default new Router({
  mode: 'history', // Add this line to enable history mode
  routes: [
    {
      path: '/users',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        
      ]
    },
    {
      path: '/tool',
      name: 'ToolBarComponent',
      component: ToolBarComponent
    },
    {
      path: '/user',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reset',
      name: 'resetPassword',
      component: resetPassword
    },
    {
      path: '/dashboard',
      name: 'dashBoard',
      component: dashBoard
    },
    {
      path: '/confirm',
      name: 'EnterConfirm',
      component: EnterConfirm
    },
    {
      path: '**',
      name: 'NotFound',
      component: NotFound
    },
  
  ]
})