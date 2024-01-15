<style>
  .newTask-textField .v-field {
    border: rgb(var(--v-theme-primary)) 4px solid;
    box-shadow: none;
  }
</style>

<template>
  <v-app id="app">
    <div class="container-wrapper">
      <v-container fluid>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6">
            <div class="text-h2 text-white text-center">Vue ToDo List</div>
            <v-card>
              <v-card-title class="bg-grey-lighten-3">
                <div class="text-right">
                  <v-chip variant="flat" color="primary" class="pa-1 mr-2">
                    <span class="px-2">Tasks</span>
                    <template v-slot:append>
                      <v-avatar class="bg-white">
                        {{ totalTasks }}
                      </v-avatar>
                    </template>
                  </v-chip>
                  <v-chip variant="flat" color="primary" class="pa-1 mr-2">
                    <span class="px-2">Tasks Done</span>
                    <template v-slot:append>
                      <v-avatar class="bg-white">
                        {{ tasksDone }}
                      </v-avatar>
                    </template>
                  </v-chip>
                  <v-btn 
                    v-if="tasksDone > 0"
                    variant="flat" prepend-icon="mdi-delete" color="red" rounded="0" class="mr-2" @click="clearDoneTasks">
                    Tasks Done
                  </v-btn>
                  <v-btn variant="flat" prepend-icon="mdi-delete" color="red" rounded="0" @click="deleteAllTasks">
                    Tasks
                  </v-btn>
                </div>
              </v-card-title>
              <v-card-text>
                <div v-if="tasks.length > 0" class="lists-scroll">
                  <v-slide-x-transition group dense tag="v-list" class="tasks-lists">
                    <v-list-item 
                      v-for="task in tasks" :key="task.id" 
                      transition="slide-x-transition"
                      :class="'rounded-lg border-grey py-3 ' + (task.status.done ? 'task-done' : '')"
                    >
                      <template v-slot:prepend>
                        <v-btn icon variant="flat" color="success" density="compact" @click="toggleTaskStatus(task.id)">
                          <v-icon color="white">mdi-check</v-icon>
                        </v-btn>
                      </template>
                      <v-list-item-title class="px-3">{{ task.text }}</v-list-item-title>
                      <template v-slot:append>
                        <v-btn icon variant="flat" density="compact" @click="deleteTask(task.id)" >
                          <v-icon color="red">mdi-delete</v-icon>
                        </v-btn>
                      </template>
                    </v-list-item>
                  </v-slide-x-transition>
                </div>
                <div v-if="tasks.length == 0" class="align-center d-flex justify-center lists-scroll text-center text-grey">
                  <div>You have no tasks yet. Add one to get started!</div>
                </div>
              </v-card-text>
              <v-card-actions class="bg-grey-lighten-3 py-3 px-5">
                <v-text-field
                  v-model="newTask"
                  placeholder="New Task"
                  @keyup.enter="addTask"
                  outlined
                  rounded
                  color="primary"
                  variant="solo"
                  class="newTask-textField"
                  hide-details
                >
                  <template v-slot:append-inner>
                    <v-btn icon variant="flat" color="primary" density="compact" @click="addTask">
                      <v-icon color="white" size="large">mdi-plus</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-snackbar
          v-model="snackbarDisplay"
          :timeout="snackbarTimeout"
        >
          {{ snackbarMessage }}
          <template v-slot:actions>
            <v-btn
              variant="flat"
              @click="snackbarDisplay = false"
              icon="mdi-close"
            >
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { store } from '~/stores/';

export default {
  data() {
    return {
      newTask: '',
      snackbarDisplay: false,
      snackbarMessage: 'Please enter a task',
      snackbarTimeout: 2000,
    };
  },
  computed: {
    tasks() {
      return store.state.tasks;
    },
    totalTasks() {
      return this.tasks.length;
    },
    tasksDone() {
      return this.tasks.filter((task) => task.status.done).length;
    },
  },
  methods: {
    addTask() {
      if (!this.newTask) {
        this.snackbarDisplay = true;
      }
      if (this.newTask) {
        store.commit("ADD_TASK", this.newTask);
        this.newTask = '';
        setTimeout(() => { // this will wait for the DOM to be updated and will get the actuall height
          document.querySelector('.lists-scroll').scrollTop = document.querySelector('.lists-scroll').scrollHeight;
        }, 1);
      }
    },
    toggleTaskStatus(taskId) {
      store.commit('TOGGLE_TASK_STATUS', taskId);
    },
    clearDoneTasks() {
      store.commit('CLEAR_DONE_TASKS');
    },
    deleteTask(taskId) {
      store.commit('DELETE_TASK', taskId)
    },
    deleteAllTasks() {
      store.commit('DELETE_ALL_TASKS');
    },
  },
};
</script>
