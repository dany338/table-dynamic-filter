<template>
  <div class="d-flex flex-column justify-content-center text-center">
    <img alt="Vue logo" src="@/assets/logo.png">
    <h4>Filters Config</h4>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">% Filters Added</h5>
        <div class="progress">
          <div class="progress-bar"
          :class="color"
          role="progressbar"
          :style="{'width': countfilter+'%'}"
          :aria-valuenow="countfilter"
          aria-valuemin="0"
          :aria-valuemax="96">
            {{countfilter}} %
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-around">
          <div class="form-group">
            <label for="fields">Mostrar Columnas en Tabla</label>
            <select id="fields" multiple class="form-control">
              <option :value="field.id" :selected="field.visible" v-for="(field, index) of fields" @click="fieldSelection(field)" :key="index">{{field.name}}</option>
            </select>
          </div>
          <div class="form-group" v-if="viewFilter">
            <label for="filter_column">Adicionar Filtro</label>
            <select class="form-control" v-model="filterSelected" @change="selectedFieldPerFilter">
              <option :value="field.id" v-for="(field, index) of fieldsNoFiltered" :key="index">{{field.name}}</option>
            </select>
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-outline-success" @click="updateViewFilter">Add Filter</button>
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-outline-danger" @click="initFilters">Reset Filters</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
  name: 'Config',
  data() {
    return {
      filterSelected: ''
    }
  },
  computed: {
    ...mapState(['countfilter', 'fields', 'viewFilter']),
    color: function() {
      return {
        'bg-success' : this.countfilter <=48,
        'bg-warning' : this.countfilter > 48 && this.countfilter <=72,
        'bg-danger'  : this.countfilter > 72
      }
    },
    fieldsNoFiltered() {
      return this.fields.filter((field) => !field.filter)
    }
  },
  methods: {
    ...mapMutations(['fieldSelection','updateViewFilter']),
    ...mapActions(['addFilter','initFilters']),
    selectedFieldPerFilter() {
      if(this.filterSelected !== '') {
        this.addFilter(this.filterSelected)
      }
    }
  },
}
</script>
