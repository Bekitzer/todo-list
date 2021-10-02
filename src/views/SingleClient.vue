<template>
  <div>
    <p>{{ client.name }}</p>
    <p>{{ client.phone }}</p>
    <p>{{ client.email }}</p>
    <p>{{ client.number }}</p>
    <p>{{ client.type }}</p>
    <p>{{ client.address }}</p>    
    <p>{{ client.contactPerson }}</p>
    <p>{{ client.contactPersonPhone }}</p>
    <p>{{ client.creationDate }}</p>
    <p>{{ client.clientUpdated }}</p>
  </div>    
</template>

<script>
import { format } from 'date-fns'
export default {
  name: 'SingleClient',
  props: ['client']
}
</script>
