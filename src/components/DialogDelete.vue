<template>
  <div v-if="isShowDelete">
      <tbody class="dialog-delete">
      <div class="back-ground-delete" @click.left="closeDialogDelete"></div>
        <el-card class="card-delete">
            <b class="title1">Are you sure?</b>
            <p class="choose">Are you sure you want to delete this record?</p>
            <div class="btn-action">
              <div class="cancel" @click="closeDialogDelete"><p>Cancel</p></div>
            <el-button class="btn-accept" @click="accept"><p>Accept</p></el-button>
            </div>
        </el-card>
      </tbody>  
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import userServices from "@/lib/userServices.js";

export default {
    computed: {
    ...mapGetters(["isShowDelete"])
  },
  props: ['toDoId', 'curentPageMain'],
data() {
    return {
    };
  },
  methods: {
    accept(){
       axios({
        method: 'DELETE',
        url: 'https://mockup-api.herokuapp.com/api/v1/todos/:id'.replace(':id', this.toDoId),
        headers: {
          Authorization: userServices.userData().auth_token,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        this.closeDialogDelete();
        this.$emit('loadData', this.curentPageMain, 6);
      })
    },
    ...mapActions(["updateIsShowDelete"]),
    closeDialogDelete() {
      this.updateIsShowDelete(false);
    }
  }
};
</script>
<style lang="scss" scope>
@import "@/assets/stylesheets/components/dialog-delete.scss";
</style>