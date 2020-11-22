<template>
  <div>
    <draggable class="list-group"
               tag="ul"
               v-model="listVal"
               v-bind="dragOptions"
               @start="drag = true"
               @end="drag = false">
      <transition-group type="transition"
                        :name="!drag ? 'flip-list' : null">
        <li class="list-group-item"
            v-for="(element,index) in listVal"
            :key="element.order">
          <i :class="
                element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
              "
             @click="element.fixed = !element.fixed"
             aria-hidden="true"></i>
          {{ element.name }}
          <i class="fa fa-times close"
             @click="remove(index)">remove</i>
          <slot />
        </li>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
export default {
  name: 'drag-item',
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      drag: true
    }
  },
  components: {
    Draggable
  },
  computed: {
    listVal: {
      get () {
        return [...this.value]
      },
      set (val) {
        this.$emit('input', [...val])
      }
    },
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  mounted () {
  },
  methods: {
    remove (id) {
      console.log(id)
      console.log(this.listVal)
      this.listVal.splice(id, 1)
      this.$emit('input', this.listVal)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
