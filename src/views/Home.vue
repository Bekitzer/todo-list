<template>
  <div class="about pa-5">
    <h1>אודות - {{ $store.state.appTitle }}</h1>
    <list-tasks v-if="$store.state.tasks.length" />
    <no-tasks v-else />
    <done-sorting
      v-if="$store.state.sorting"
    />
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {
      'list-tasks': require('@/components/Todo/ListTasks.vue').default,
      'no-tasks': require('@/components/Todo/NoTasks.vue').default,
      'done-sorting': require('@/components/Todo/Dialogs/ButtonDoneSorting.vue').default
    }
  }
</script>