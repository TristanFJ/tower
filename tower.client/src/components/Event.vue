<template>
  <div class="col-md-3 selectable card p-1 elevation-3">
    <h4>
      {{ event.name }}
    </h4>
    <p>Starts {{ new Date(event.startDate) }}</p>
    <h5>{{ event.capacity }} spots remaining</h5>
    <h5>Located at {{ event.location }}</h5>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
export default {
  props: { event: { type: Object, required: true } },
  setup() {
    return {

    }
  }
}
</script>


<style lang="scss" scoped>
</style>