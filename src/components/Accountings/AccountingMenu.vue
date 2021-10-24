<template>
  <div>
    <v-menu
      bottom
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          dense
          plain
          :to="{ name: 'Accounting', params: { id : accounting.id }}"
        >
          <img
            width="26px"
            src="@/components/Icons/edit.svg"
          >
        </v-btn>
      </template>
    </v-menu>
  </div>
</template>

<script>
export default {
    props: ['accounting']
}
</script>