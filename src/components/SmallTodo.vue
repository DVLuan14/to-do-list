<template>
  <div class="small-todo">
    <div class="checkbox">
      <el-checkbox
        v-model="done"
        label="item 1"
        style="display: flex; padding-top: 10px;"
        @change="checkedItem"
      >{{itemSmall.content}}</el-checkbox>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import userServices from "@/lib/userServices.js";

export default {
  props: ["itemSmall", "toDoId", "page"],
  data() {
    return {
      done: this.itemSmall.done
    };
  },
  methods: {
    checkedItem() {
      console.log(this.page);
      axios({
        method: "PUT",
        url: "https://mockup-api.herokuapp.com/api/v1/todos/:todo_id/items/:id"
          .replace(":todo_id", this.toDoId)
          .replace(":id", this.itemSmall.id),
        headers: {
          Authorization: userServices.userData().auth_token,
          "Content-Type": "application/json"
        },
        data: {
          done: this.done
        }
      }).then(response => {
        this.$emit("loadDataInfo", this.page, 6);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/stylesheets/components/small-todo.scss";
</style>
