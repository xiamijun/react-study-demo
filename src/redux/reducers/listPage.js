// action type
const GETLIST='GETLIST'
const DELETE="DELETE"
const ADD='ADD'

// reducer
export default function (state,action) {
  if (!state) {
    state={
      list:[]
    }
  }
  switch (action.type) {
    case GETLIST:
      let str = 'abcdefghijklmnopqrstuvwxyz'
      let result=[]
      str.split('').forEach(item=>{
        result.push({
          key:item,
          name: item, 
          sex: '男',
          age:Math.floor((Math.random()*(100-1)+1)),
          copy: '点击复制'
        })
      })
      return {
        list: result
      }
    case DELETE:
      let list=[...state.list]
      list=list.filter(item=>!action.keys.includes(item.key))
      return {
        list
      }
    case ADD:
      let arr = [...state.list]
      arr.push(action.item)
      return {
        list: arr
      }
    default:
      return state
  }
}

// action creator
export const getListAction=()=>{
  return {
    type:GETLIST
  }
}

export const deleteItemAction=keys=>{
  return {
    type:DELETE,
    keys
  }
}

export const addItemAction= item => {
  return {
    type:ADD,
    item
  }
}