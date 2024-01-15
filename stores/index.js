import Vuex from 'vuex'

var nextTaskId = 4;

export const store = new Vuex.Store({
  state: {
    tasks: [
        { id: 1, text: 'Do something awesome!', status: {done: false} },
        { id: 2, text: 'Buy toilet paper', status: {done: true} },
        { id: 3, text: 'Learn Vue', status: {done: false} },
    ],
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push({ id: nextTaskId, text: task, status: {done: false} });
      nextTaskId++;
    },
    DELETE_TASK(state, taskId) {
        const taskIndex = state.tasks.findIndex(task => task.id === taskId)
        if (taskIndex !== -1) {
          state.tasks.splice(taskIndex, 1)
        }
    },
    TOGGLE_TASK_STATUS(state, taskId) {
        const taskIndex = state.tasks.findIndex(task => task.id === taskId)
        if (taskIndex !== -1) {
            state.tasks[taskIndex].status.done = !state.tasks[taskIndex].status.done
        }
    },
    CLEAR_DONE_TASKS(state) {
        state.tasks = state.tasks.filter(task => !task.status.done);
    },
    DELETE_ALL_TASKS(state) {
        state.tasks = [];
        nextTaskId = 1;
    }
  },
})