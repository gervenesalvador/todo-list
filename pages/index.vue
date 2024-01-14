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
                  <v-btn variant="flat" prepend-icon="mdi-delete" color="red" rounded="0" class="mr-2">
                    Tasks Done
                  </v-btn>
                  <v-btn variant="flat" prepend-icon="mdi-delete" color="red" rounded="0">
                    Tasks
                  </v-btn>
                </div>
              </v-card-title>
              <v-card-text>

                <v-list dense class="tasks-lists">
                  <v-list-item v-for="task in tasks" :key="task.id" class="rounded-lg border-grey py-3">
                    <template v-slot:prepend>
                      <v-btn icon variant="flat" color="success" density="compact" >
                        <v-icon color="white">mdi-check</v-icon>
                      </v-btn>
                    </template>

                    <v-list-item-title class="px-3">{{ task.text }}</v-list-item-title>

                    <template v-slot:append>
                      <v-btn icon variant="flat" density="compact" >
                        <v-icon color="red">mdi-delete</v-icon>
                      </v-btn>
                    </template>
                  </v-list-item>
                </v-list>

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
      </v-container>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { id: 1, text: 'Task 1', completed: false },
        { id: 2, text: 'Task 2', completed: true },
        { id: 3, text: 'Task 3', completed: false },
      ],
      newTask: '',
    };
  },
  computed: {
    totalTasks() {
      return this.tasks.length;
    },
    tasksDone() {
      return this.tasks.filter((task) => task.completed).length;
    },
  },
  methods: {
    addTask() {
      if (this.newTask) {
        this.tasks.push({ id: this.tasks.length + 1, text: this.newTask, completed: false });
        this.newTask = '';
      }
    },
  },
};
</script>
