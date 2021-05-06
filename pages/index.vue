<template>
  <div class="container">
    <div class="todo__header">To Do List</div>
    <div class="todo__form">
      <input
        v-model="newItem"
        type="text"
        name="newItem"
        id="new__todo"
        class="input input-todo__form"
        v-on:keyup.enter="add"
        placeholder="New Item"
      />
      <button class="btn btn-todo__form__options" @click.prevent="add">
        Options...
      </button>
      <button class="btn btn-todo__form__add" @click.prevent="add">Add</button>
      <!-- <div class="container-todo__form__options">
        <input
          v-model="newItem"
          type="text"
          name="newItem"
          id="new__todo"
          class="input input-todo__form"
          v-on:keyup.enter="add"
          placeholder="New Item"
        />
      </div> -->
    </div>
    <div class="todo__container">
      <ul class="todo__lists">
        <transition-group name="list" tag="div" class="todo__transition">
          <li class="todo__list" v-for="todo in fetchedTodos" :key="todo.id">
            <div class="todo__description">
              {{ todo.description }}
            </div>
            <button class="btn btn-todo__list" @click="remove(todo.id)">
              <DeleteIcon />
            </button>
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import {
  actionType,
  namespace as toDoStoreNamespace,
  getterType,
} from '~/store/todo';

export default Vue.extend({
  data() {
    return {
      fetchedTodos: [] as { id: number; description: string }[],
      newItem: '' as string,
    };
  },

  mounted() {
    this.fetchedTodos = this.getToDos();
  },
  computed: mapState(toDoStoreNamespace, ['toDos']),
  watch: {
    toDos() {
      console.log('Watching..');
      this.fetchedTodos = this.getToDos();
    },
  },

  methods: {
    getToDos() {
      return this.$store.state.todo.toDos;
    },
    add() {
      if (this.newItem === '') {
        alert('Please fill out the form!');
      } else {
        this.$store.dispatch(`${toDoStoreNamespace}/${actionType.ADD_ITEM}`, {
          id: this.$store.getters[
            `${toDoStoreNamespace}/${getterType.GET_TOTAL}`
          ],
          description: this.newItem,
        });
        this.newItem = '';
      }
    },
    remove(id: number) {
      this.$store.dispatch(
        `${toDoStoreNamespace}/${actionType.REMOVE_ITEM}`,
        id,
      );
    },
  },
});
</script>

<style scoped>
.container {
  margin: 0;
  height: 100vh;
  display: grid;
  grid-template-rows: 4rem fit-content(6rem) auto;
  grid-template-areas: 'header' 'form' 'list';
}

.todo__header {
  padding: 1rem;
  display: flex;
  align-items: center;
  grid-area: header;
  font-size: 1.5rem;
  background: hsl(209, 61%, 16%);
  color: white;
  box-shadow: 0 1px 14px rgba(0, 0, 0, 0.51);
  z-index: 1;
}

.todo__form {
  display: grid;
  grid-template-columns: 80% auto;
  grid-template-rows: repeat(2, 2.4rem);
  grid-template-areas: 'input options add' 'extra extra extra';
  padding: 1.5rem;
  grid-area: form;
  column-gap: 1rem;
  row-gap: 1rem;
}

.input {
  border: 1px solid transparent;
  padding: 0 1rem;
  font: inherit;
  background: hsl(210, 36%, 96%);
  border-radius: 18px;
  grid-area: input;
}

.input:focus,
.input:focus {
  outline: none;
}

.btn-todo__form__options {
  grid-area: options;
  background: hsl(210, 31%, 80%);
  color: hsl(209, 61%, 16%);
  font: inherit;
  font-weight: bold;
  border: none;
  padding: 0.5rem;
  border-radius: 18px;
  cursor: pointer;
}

.btn-todo__form__add {
  grid-area: add;
  background: hsl(209, 61%, 16%);
  color: hsl(210, 31%, 80%);
  font: inherit;
  font-weight: bold;
  border: none;
  padding: 0.5rem;
  border-radius: 18px;
  cursor: pointer;
}

.btn-todo__form__add:hover,
.btn-todo__form__add:active {
  color: hsl(209, 61%, 16%);
  background: hsl(210, 31%, 80%);
}

.btn-todo__form__add:focus {
  outline: none;
}

.container-todo__form__options {
  grid-area: extra;
}

.todo__container {
  grid-area: list;
}

.todo__lists {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
}

.todo__transition {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.todo__list {
  width: 100%;
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.1);
  border-radius: 18px;
  margin: 0 1rem 1rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo__description {
  font-size: 1.5rem;
  word-break: break-word;
}

.btn-todo__list {
  grid-area: button;
  background: hsl(360, 64%, 55%);
  font: inherit;
  font-weight: bold;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  margin-left: 1rem;
}

.btn-todo__list:hover,
.btn-todo__list:active {
  background: hsl(360, 82%, 89%);
}

.btn-todo__list:focus {
  outline: none;
}

.list-enter-active,
.list-leave-active {
  transition: all 500ms;
}

.list-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
