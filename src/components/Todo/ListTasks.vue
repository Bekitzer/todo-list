<template>
    <v-list      
      class="pt-0"
      flat
    >
        <draggable
            v-model="tasks"
            handle=".handle"
        >        
            <task 
                v-for="task in tasks"
                :key="task.id"
                :task="task"
            /> 
        </draggable>
    </v-list>    

</template>

<script>
import draggable from "vuedraggable";
export default {
    name: 'ListTasks',
    components: {
        draggable,
        'task': require('@/components/Todo/Task.vue').default
    },
    computed: {
        tasks: {
            get() {
                return this.$store.getters.tasksFiltered
            },
            set(value) {
                this.$store.commit('updateTaskList', value)
            }
        }
    }
}
</script>