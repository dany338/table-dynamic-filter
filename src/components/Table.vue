<template>
  <div class="d-flex flex-column justify-content-center text-center">
    <div class="card">
      <div class="card-body">
        <div class="table-responsive-lg">
          <table class="table">
            <caption @click="getServices">List of services <span class="badge badge-secondary">{{searchServices.length}}</span></caption>
            <thead>
              <tr>
                <th v-for="(item, index) in fieldsVisibles" :key="index" scope="col">
                  <span class="badge badge-info">{{item.name}}</span>
                </th>
              </tr>
              <tr>
                <th v-for="(item, index) of fieldsVisibles" :key="index" scope="col">
                  <span v-if="item.filter">
                    <span v-if="item.id === 'status'">
                      <select class="form-control" v-model="status">
                        <option value="">Seleccione Filtro</option>
                        <option :value="value.name" v-for="(value, index2) of searchFilter(item).values" :key="index2">{{value.name}}</option>
                      </select>
                    </span>
                    <span v-if="item.id === 'priority'">
                      <select class="form-control" v-model="priority">
                        <option value="">Seleccione Filtro</option>
                        <option :value="value.name" v-for="(value, index2) of searchFilter(item).values" :key="index2">{{value.name}}</option>
                      </select>
                    </span>
                    <span v-if="item.id === 'name'">
                      <input type="text" placeholder="Ingrese Valor" v-model="name"/>
                    </span>
                    <span v-if="item.id === 'subject'">
                      <input type="text" placeholder="Ingrese Valor" v-model="subject"/>
                    </span>
                    <span v-if="item.id === 'csat'">
                      <input type="text" placeholder="Ingrese Valor" v-model="csat"/>
                    </span>
                  </span>
                  <span v-else>
                    <span class="badge badge-secondary">Not Filter</span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody v-if="searchServices.length > 0">
              <tr v-for="(item, index) of searchServices" :key="index">
                <td v-for="(field, index2) of fieldsVisibles" :key="index2">
                  <span v-if="field.id === 'name'">{{item.name}}</span>
                  <span v-if="field.id === 'subject'">{{item.subject}}</span>
                  <span v-if="field.id === 'csat'">{{item.csat}}%</span>
                  <span v-if="field.id === 'priority'">{{item.priority}}</span>
                  <span v-if="field.id === 'status'">{{item.status}}</span>
                  <span v-if="field.id === 'body'">
                    <button type="button" class="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#exampleModalCenter" @click="updateDetailview({title: field.name, content: item.body})">
                      Detail Body
                    </button>
                  </span>
                  <span v-if="field.id === 'tags'">
                    <button type="button" class="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#exampleModalCenter" @click="updateDetailview({title: field.name, content: item.tags})">
                      Detail Tags
                    </button>
                  </span>
                  <span v-if="field.id === 'metrics'">
                    <button type="button" class="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#exampleModalCenter" @click="updateDetailview({title: field.name, content: item.metrics})">
                      Detail metrics
                    </button>
                  </span>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <th class="text-center" :colspan="fieldsVisibles.length">There are no services available</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
  name: 'Table',
  data() {
    return {
      servicesSearch: [],
      filterSelected: '',
      name: '',
      subject: '',
      csat: 0,
      status: '',
      priority: ''
    }
  },
  computed: { /* eslint-disable */
    ...mapState(['countfilter','services','fields','filters']),
    searchServices: function() {
      if(this.countfilter === 0) {
        return this.services
      } else if(this.name !== '') {
        return this.services.filter(({name}) => name.includes(this.name))
      } else if(this.subject !== '') {
        return this.services.filter(({subject}) => subject.includes(this.subject))
      } else if(this.csat !== 0) {
        return this.services.filter(({csat}) => csat === parseInt(this.csat))
      } else if(this.status !== '') {
        console.log('status', this.status);
        return this.services.filter(({status}) => status.includes(this.status))
      } else if(this.priority !== '') {
        console.log('priority', this.priority);
        return this.services.filter(({priority}) => priority.includes(this.priority))
      } else if(this.name === '') {
        return this.services.sort((a, b) => b.csat - a.csat)
      } else if(this.subject === '') {
        return this.services.sort((a, b) => b.csat - a.csat)
      } else if(this.csat === '') {
        return this.services.sort((a, b) => b.csat - a.csat)
      }
    },
    fieldsVisibles: function() {
      return this.fields.filter((field) => field.visible)
    }
  },
  methods: {
    ...mapMutations(['updateDetailview']),
    ...mapActions(['getServices']),
    searchFilter(field) {
      return this.filters.find((filter) => filter.id === field.id)
    },
    searchServicesFunc() {
      console.log('searchServicesFunc');
    }
  },
  beforeCreated() {
    console.log('beforeCreated table')
  },
  created() {
    console.log('created table')
    this.servicesSearch = this.services
  }
}
</script>
