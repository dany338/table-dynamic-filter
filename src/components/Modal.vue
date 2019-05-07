<template>
  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">{{modalview.title}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class="list-group" v-if="Array.isArray(modalview.content)">
            <li class="list-group-item" v-for="(item, index) in modalview.content" :key="index">
              <span v-if="(typeof item === 'object')">
                ID: {{item.id}} - Value: {{item.value}}
              </span>
              <span v-else>{{item}}</span>
            </li>
          </ul>
          <ul class="list-group" v-else>
            <li class="list-group-item">
              {{modalview.content}}
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'Modal',
  computed: {
    ...mapState(['modalview']),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
