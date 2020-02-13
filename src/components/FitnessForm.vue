<template>
  <ValidationObserver ref="observer" v-slot="{ invalid }">
    <b-form @submit.prevent="onSubmit" novalidate>
      <b-form-group label="Date (YYYY-MM-DD)">
        <ValidationProvider name="date" rules="required|date" v-slot="{ errors }">
          <b-form-input
            type="text"
            :state="errors.length == 0"
            v-model="form.date"
            required
            placeholder="Date"
            name="date"
          ></b-form-input>
          <b-form-invalid-feedback :state="errors.length == 0">{{errors.join('. ')}}</b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>      <b-form-group label="Distance Walked (km)">
        <ValidationProvider
          name="distance"
          rules="required|min_value:0|max_value:9999"
          v-slot="{ errors }"
        >
          <b-form-input
            type="text"
            :state="errors.length == 0"
            v-model="form.distance"
            required
            placeholder="Distance Walked"
            name="distance"
          ></b-form-input>
          <b-form-invalid-feedback :state="errors.length == 0">{{errors.join('. ')}}</b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>      <b-button type="submit" variant="primary" style="margin-right: 10px">Submit</b-button>
      <b-button type="reset" variant="danger" @click="cancel()">Cancel</b-button>
    </b-form>
  </ValidationObserver>
</template><script>
import { requestsMixin } from "@/mixins/requestsMixin";
import * as moment from 'moment';export default {
  name: "FitnessForm",
  mixins: [requestsMixin],
  props: {
    edit: Boolean,
    distance: Object
  },
  data() {
    return {
      form: {}
    };
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
      const offDate = new Date(this.form.date);
      const correctedDate = new Date(
        offDate.getTime() + Math.abs(offDate.getTimezoneOffset() * 60000)
      );const params = {
        ...this.form,
        date: correctedDate
      };if (this.edit) {
        await this.editDistance(params);
      } else {
        await this.addDistance(params);
      }
      const { data } = await this.getDistances();
      this.$store.commit("setDistances", data);
      this.$emit("saved");
    },
    cancel() {
      this.$emit("cancelled");
    }
  },
  watch: {
    distance: {
      handler(val) {
        this.form = JSON.parse(JSON.stringify(val || {}));
        this.form.date = moment(this.form.date).format("YYYY-MM-DD");
      },
      deep: true,
      immediate: true
    }
  }
};
</script>