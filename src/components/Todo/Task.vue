<template>
    <div>
    <v-list-item
        @click="$store.commit('taskDone', task.id)"
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
        <v-list-item-action>
            <task-menu :task='task' />
        </v-list-item-action>
        </template>
    </v-list-item>
    <v-divider></v-divider>    
    </div>
</template>

<script>
export default {
    name: 'Task',    
    props: ['task'],
    components: {
        'task-menu': require('@/components/Todo/TaskMenu.vue').default
    }
}
</script>