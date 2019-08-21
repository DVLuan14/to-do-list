<template>
  <div v-if="isShowInfor">
    <div class="dialog">
      <div class="back-ground" @click.left="closeDialogInfo"></div>
      <el-card class="card-info">
        <p class="title">{{toDoInfo.title}}</p>
        <p class="todo">Todo</p>
        <small-todo :itemSmall="item" :toDoId="toDoInfo.id" 
        v-for="item in toDoInfo.items" :key="item.id"
        :page="curentPageMain" @loadDataInfo="loadData"></small-todo>
        <button class="btnclose" @click="closeDialogInfo">
          <p>Close</p>
        </button>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import SmallTodo from "@/components/SmallTodo.vue";

export default {
  components: {
    SmallTodo,
  },
  props: ["toDoInfo", 'curentPageMain'],
  computed: {
    ...mapGetters(["isShowInfor"])
  },
  data() {
    return {
      title: "Title",
    };
  },
  methods: {
    ...mapActions(["updateIsShowInfo"]),
    closeDialogInfo() {
      this.updateIsShowInfo(false);
    },
    loadData(){
      this.$emit('loadData', this.curentPageMain, 6);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/stylesheets/components/dialog-info.scss";
</style>
