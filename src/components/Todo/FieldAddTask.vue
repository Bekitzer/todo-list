<template>
  <v-text-field
      v-model="newTaskTitle"
      @click:append="addTask"
      @keyup.enter="addTask"
      class="pa-4"
      outlined
      label="Add Task"
      hide-details
      clearable
      append-icon="mdi-plus"
  ></v-text-field>
</template>

<script>
  export default {
    name: 'FieldAddTask',
    data: () => ({ 
      newTaskTitle: '',
      
    }),
    methods:{
      addTask() {
        this.$store.dispatch('addTask', this.newTaskTitle)
        this.newTaskTitle = ''
      }
    }
  }
</script>