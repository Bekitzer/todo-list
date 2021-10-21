<template>
  <div class="about pa-5">
    <nav-appbar :pname="pageName"/>
    <list-tasks v-if="$store.state.tasks" />
    <no-tasks v-else />
    <done-sorting
      v-if="$store.state.sorting"
    />
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data: () => ({
      pageName: 'עמוד בית',
    }),
    components: {
      'list-tasks': require('@/components/Todo/ListTasks.vue').default,
      'no-tasks': require('@/components/Todo/NoTasks.vue').default,
      'done-sorting': require('@/components/Todo/Dialogs/ButtonDoneSorting.vue').default,
      'nav-appbar'          : require('@/components/Global/AppBar.vue').default
    }
  }
</script>