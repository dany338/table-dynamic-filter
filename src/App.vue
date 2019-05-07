<template>
  <div id="app" class="container">
    <Config></Config>
    <Table></Table>
    <Modal></Modal>
  </div>
</template>

<script>
import Config from './components/Config.vue';
import Table from './components/Table.vue';
import Modal from './components/Modal.vue';
import {mapActions} from 'vuex';

export default {
  name: 'app',
  methods: {
    ...mapActions(['getServices'])
  },
  created() {
    console.log('created app')
    this.getServices()
  },
  components: {
    Config,
    Table,
    Modal
  }
}
</script>

<style>
</style>
