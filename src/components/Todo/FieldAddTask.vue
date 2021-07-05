<template>
  <v-text-field
    v-model="newTaskTitle"
    @keyup.enter="addTask"
    class="pa-4"
    outlined
    placeholder="Add Task"
    hide-details
    clearable
    >
    <template v-slot:append>
        <v-icon
          @click="addTask"
          :disabled="taskTitleInvalid"
        >
          mdi-plus
        </v-icon>
    </template>
  </v-text-field>
</template>

<script>
  export default {
    name: 'FieldAddTask',
    data: () => ({ 
      newTaskTitle: '',
      
    }),
    computed: {
      taskTitleInvalid() {
        return !this.newTaskTitle
      }
    },
    methods:{
      addTask() {
        if(!this.taskTitleInvalid){
          this.$store.dispatch('addTask', this.newTaskTitle)
          this.newTaskTitle = ''
        }        
      }
    }
  }
</script>