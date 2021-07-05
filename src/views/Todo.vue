<template>
  <div>        
    <list-tasks v-if="$store.state.tasks.length" />
    <no-tasks v-else />
    <done-sorting 
      v-if="$store.state.sorting"
    />
  </div>  
</template>

<script>
  export default {
    name: 'Todo',
    components: {      
      'list-tasks': require('@/components/Todo/ListTasks.vue').default,
      'no-tasks': require('@/components/Todo/NoTasks.vue').default,
      'done-sorting': require('@/components/Todo/Dialogs/ButtonDoneSorting.vue').default
    }
  }
</script>
