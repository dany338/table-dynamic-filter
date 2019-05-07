import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countfilter: 12,
    viewFilter: false,
    modalview: {
      title: '',
      content: null
    },
    services: [],
    fields: [
      {
        id: 'name',
        name: 'User Name',
        type: 'string',
        operators: [
          {
            id: 'all',
            name: 'All Name',
            selected: true
          },
          {
            id: 'like',
            name: 'like',
            selected: false
          }
        ],
        values: null,
        visible: true,
        filter: false
      },
      {
        id: 'status',
        name: 'Status',
        type: 'range',
        operators: [
          {
            id: 'all',
            name: 'All Status',
            selected: true
          },
          {
            id: 'equal',
            name: 'equal',
            selected: false
          },
          {
            id: 'not_equal',
            name: 'not_equal',
            selected: false
          },
          {
            id: 'like',
            name: 'like',
            selected: false
          }
        ],
        values: [
          {
            id: 'open',
            name: 'Open'
          },
          {
            id: 'pending',
            name: 'Pending'
          },
          {
            id: 'solved',
            name: 'Solved'
          },
          {
            id: 'closed',
            name: 'Closed'
          },
          {
            id: 'hold',
            name: 'Hold'
          }
        ],
        visible: true,
        filter: true
      },
      {
        id: 'subject',
        name: 'Subject',
        type: 'string',
        operators: [
          {
            id: 'all',
            name: 'All Name',
            selected: true
          },
          {
            id: 'like',
            name: 'like',
            selected: false
          }
        ],
        values: null,
        visible: true,
        filter: false
      },
      {
        id: 'body',
        name: 'Body',
        type: 'string',
        operators: [
          {
            id: 'all',
            name: 'All Name',
            selected: true
          },
          {
            id: 'like',
            name: 'like',
            selected: false
          }
        ],
        values: null,
        visible: false,
        filter: false
      },
      {
        id: 'priority',
        name: 'Priority',
        type: 'range',
        operators: [
          {
            id: 'all',
            name: 'All Priority',
            selected: true
          },
          {
            id: 'equal',
            name: 'equal',
            selected: false
          },
          {
            id: 'not_equal',
            name: 'not_equal',
            selected: false
          },
          {
            id: 'like',
            name: 'like',
            selected: false
          }
        ],
        values: [
          {
            id: 'high',
            name: 'High'
          },
          {
            id: 'medium',
            name: 'Medium'
          },
          {
            id: 'low',
            name: 'Low'
          }
        ],
        visible: true,
        filter: false
      },
      {
        id: 'csat',
        name: 'Customer Satisfaction',
        type: 'number',
        operators: [
          {
            id: 'all',
            name: 'All Customer Satisfaction',
            selected: true
          },
          {
            id: 'equal',
            name: 'equal',
            selected: false
          },
          {
            id: 'not_equal',
            name: 'not_equal',
            selected: false
          },
          {
            id: 'gt',
            name: 'gt',
            selected: false
          },
          {
            id: 'lt',
            name: 'lt',
            selected: false
          }
        ],
        values: null,
        visible: true,
        filter: false
      },
      {
        id: 'tags',
        name: 'Tags',
        type: 'array',
        operators: null,
        values: null,
        visible: false,
        filter: false
      },
      {
        id: 'metrics',
        name: 'Metrics',
        type: 'array',
        operators: null,
        values: null,
        visible: false,
        filter: false
      }
    ],
    filters: [
      {
        id: 'status',
        label: 'Status',
        type: 'range',
        selected: true,
        operators: [
          {
            id: 'all',
            name: 'All status',
            selected: true
          },
          {
            id: 'equal',
            name: 'equal',
            selected: false
          },
          {
            id: 'not_equal',
            name: 'not_equal',
            selected: false
          },
          {
            id: 'like',
            name: 'like',
            selected: false
          }
        ],
        values: [
          {
            id: 'open',
            name: 'Open'
          },
          {
            id: 'pending',
            name: 'Pending'
          },
          {
            id: 'solved',
            name: 'Solved'
          },
          {
            id: 'closed',
            name: 'Closed'
          },
          {
            id: 'hold',
            name: 'Hold'
          }
        ]
      }
    ]
  },
  mutations: {
    aumentarFiltro(state) {
      state.countfilter += 12
    },
    reiniciarFiltros(state) {
      state.fields.map(field => field.filter = false)
      state.countfilter = 0
      state.filters = []
    },
    fieldSelection(state, field) {
      field.visible = !field.visible
    },
    fieldFilter(state, field) {
      field.filter = !field.filter
    },
    updateDetailview(state, object) {
      state.modalview.title = object.title
      state.modalview.content = object.content
    },
    updateViewFilter(state) {
      state.viewFilter = !state.viewFilter
    },
    setServices(state, servicesAction) {
      state.services = servicesAction
    },
    setFilters(state, filter) {
      state.filters = [...state.filters, filter]
    }
  },
  actions: {
    async getServices ({ commit }) {
      const data = await fetch('data.json');
      const services = await data.json();
      commit('setServices', services);
    },
    addFilter({ commit, state }, fieldSelection) {
      console.log('entro 2', fieldSelection);
      if(fieldSelection !== undefined) {
        const field = state.fields.find((field) => field.id === fieldSelection)
        const filter = {
          id: field.id,
          label: field.name,
          type: field.type,
          selected: field.visible,
          operators: field.operators,
          values: field.values
        }
        commit('setFilters', filter);
        commit('fieldFilter', field);
        commit('aumentarFiltro');
      }
    },
    initFilters ({ commit, state }) {
      console.log(state.services);
      commit('setServices', state.services);
      commit('reiniciarFiltros');
    }
  }
})
