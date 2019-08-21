<template>
<div>
  <div class="api-calling" >
    <div class="left">
      <p @click="openDialogInfo">{{toDo.title}}</p>
    </div>
    <div class="right">
      <div class="fa fa-pencil" @click="openDialogEdit"></div>
      <div class="fa fa-trash-o" @click="openDialogDelete"></div>
    </div>
  </div>
</div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  components:{
  },
  props: ["toDo"],
  data() {
    return {
    };
  },
  methods:{
    ...mapActions(['updateIsShowInfo', 'updateIsShowEdit','updateIsShowDelete']),
    openDialogInfo(){
      this.updateIsShowInfo(true);
      this.$emit('updateSelectedItem', this.toDo)
    },
    openDialogEdit(){
      this.updateIsShowEdit(true);
      this.$emit('updateSelectedItem', this.toDo)
    },
    openDialogDelete(){
      this.updateIsShowDelete(true);
      this.$emit('updateTodoId', this.toDo.id);
    },
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/stylesheets/components/todo.scss";
</style>
