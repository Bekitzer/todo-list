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
          :to="{ name: 'Order', params: { id : order.id }}"
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
    props: ['order']
}
</script>