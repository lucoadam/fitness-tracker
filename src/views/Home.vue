<template>
  <div class="page" v-hotkey="keymap">
    <div class="text-center">
      <h1>Fitness Tracker</h1>
      <h2>Keyboard Shortcuts:</h2>
      <p>
        <b>Ctrl + Del:</b> Delete the latest fitness tracker entry.
        <b>Ctrl + Shift + B:</b> Open the modal to add a fitness tracker entry.
      </p>
    </div>
    <b-button-toolbar class="button-toolbar">
      <b-button @click="openAddModal()" variant="primary">Add Distance Walked</b-button>
    </b-button-toolbar><b-table-simple responsive>
      <b-thead>
        <b-tr>
          <b-th sticky-column>Date</b-th>
          <b-th>Distance Walked</b-th>
          <b-th>Edit</b-th>
          <b-th>Delete</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="d in distances" :key="d.id">
          <b-th sticky-column>{{ new Date(d.date) | dateFormat('YYYY-MM-DD') }}</b-th>
          <b-td>{{d.distance}}</b-td>
          <b-td>
            <b-button @click="openEditModal(d)">Edit</b-button>
          </b-td>
          <b-td>
            <b-button @click="deleteOneWeight(d.id)">Delete</b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple><b-modal id="add-modal" title="Add Distance Walked" hide-footer>
      <FitnessForm @saved="closeModal()" @cancelled="closeModal()" :edit="false" />
    </b-modal><b-modal id="edit-modal" title="Edit Distance Walked" hide-footer>
      <FitnessForm
        @saved="closeModal()"
        @cancelled="closeModal()"
        :edit="true"
        :distance="selectedDistance"
      />
    </b-modal>
  </div>
</template><script>
// @ is an alias to /src
import FitnessForm from "@/components/FitnessForm.vue";
import { requestsMixin } from "@/mixins/requestsMixin";
export default {
  name: "home",
  components: {
    FitnessForm
  },mixins: [requestsMixin],
  computed: {
    distances() {
      return this.$store.state.distances;
    },
    keymap() {
      return {
        "ctrl+del": this.deleteLatest,
        "ctrl+shift+b": this.openAddModal
      };
    }
  },
  beforeMount() {
    this.getAllDistances();
  },
  data() {
    return {
      selectedDistance: {},
    };
  },
  methods: {
    openAddModal() {
      this.$bvModal.show("add-modal");
    },
    openEditModal(Distance) {
      this.$bvModal.show("edit-modal");
      this.selectedDistance = Distance;
    },
    closeModal() {
      this.$bvModal.hide("add-modal");
      this.$bvModal.hide("edit-modal");
      this.selectedDistance = {};
    },
    async deleteOneDistance(id) {
      await this.deleteDistance(id);
      this.getAllDistances();
    },
    async getAllDistances() {
      const { data } = await this.getDistances();
      this.$store.commit("setDistances", data);
    },
    deleteLatest() {
      this.deleteOneDistance(this.distances[0].id);
    }
  }
};
</script>