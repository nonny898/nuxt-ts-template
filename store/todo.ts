// import type { Context } from '@nuxt/types'
import type { GetterTree, ActionTree, MutationTree } from 'vuex'
import type { RootState } from './index'

export const namespace = 'todo'

export interface ToDoState{
  toDos: {id: number, description: string}[]
  counter: number
}

export const state = (): ToDoState => ({
  toDos: [],
  counter: 0
})

export const getterType = {
  GET_TOTAL: 'getTotal'
}

export const getters: GetterTree<ToDoState, RootState> = {
  [getterType.GET_TOTAL]: (state): number => state.counter
}

export const MutationType = {
  ADD: 'add',
  REMOVE: 'remove'
}

export const mutations: MutationTree<ToDoState> = {
  [MutationType.ADD]: (state, newItem: {id: number, description: string}) => {
    state.toDos.push(newItem)
    state.counter++
  },

  [MutationType.REMOVE]: (state, id: number) => {
    console.log("From mutation REMOVE");
    state.toDos = state.toDos.filter((toDo) => {
      return toDo.id !== id
    })
  }
}

export const actionType = {
  ADD_ITEM: 'addItem',
  REMOVE_ITEM: 'removeItem'
}

export const actions: ActionTree<ToDoState, RootState> = {
  // nuxtServerInit ({ commit }, _context: Context) {
  //   commit(MutationType.CHANGE_DARK_MODE, true)
  // },

  [actionType.ADD_ITEM] ({ commit }, newItem: {id: number, description: string}) {
    commit(MutationType.ADD, newItem)
  },
  [actionType.REMOVE_ITEM] ({ commit }, id: number) {
    console.log("Removing..." + id);
    commit(MutationType.REMOVE, id)
  }
}
