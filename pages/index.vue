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
      />
      <button class="btn btn-todo__form" @click.prevent="add">Add</button>
    </div>
    <div class="todo__container">
      <ul class="todo__lists">
        <li class="todo__list" v-for="todo in fetchedTodos" :key="todo.id">
          <div class="todo__description">
            {{ todo.description }}
          </div>
          <button class="btn btn-todo__list" @click="remove(todo.id)">
            Remove
          </button>
        </li>
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
  grid-template-rows: 4rem 6rem auto;
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  grid-area: form;
}

.btn {
  margin-left: 1rem;
}

.todo__container {
  grid-area: list;
}

.todo__lists {
  list-style: none;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.todo__list {
  width: 50%;
  border: 1px solid grey;
  margin: 0 1rem 1rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}
</style>
