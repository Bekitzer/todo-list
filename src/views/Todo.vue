<template>
  <div class="">
    <v-list
      class="pt-0"
      flat
    >
      <div
        v-for="task in tasks"
        :key="task.id"
      >
        <v-list-item
          @click="taskDone(task.id)"
          :class="{ 'blue lighten-5' : task.done }"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content
              :class="{ 'text-decoration-line-through' : task.done }"
            >
              <v-list-item-title>{{task.title}}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>    
  </div>  
</template>

<script>
  export default {
    name: 'Todo',
    data: () => ({ 
      tasks: [
        {
          id: 1,
          title: 'Wake Up',
          done: false
        },
        {
          id: 2,
          title: 'Brush Teeth',
          done: true
        },
        {
          id: 3,
          title: 'Go To Work',
          done: false
        },
      ]
    }),
    methods:{
      taskDone(id){
        let task = this.tasks.filter(task => task.id === id)[0]
        task.done = !task.done 
      }
    }
  }
</script>
