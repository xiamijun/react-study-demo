// action type
const LOGIN="LOGIN"
const LOGOUT="LOGOUT"

// reducer
export default function(state,action){
  if (!state) {
    state={
      username: window.sessionStorage.getItem('username')||''
    }
  }
  switch (action.type) {
    case LOGIN:
      window.sessionStorage.setItem('username', action.username)
      return {
        username:action.username
      }
    case LOGOUT:
      return {
        username:''
      }  
    default:
      return state
  }
}

// action creator
export const login=username=>{
  return {
    type:LOGIN,
    username
  }
}

export const logout=()=>{
  return {
    type:LOGOUT
  }
}

// selector
export const getUsername=state=>state.user.username