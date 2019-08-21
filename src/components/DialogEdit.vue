<template>
  <div v-if="isShowEdit">
    <tbody class="dialog-eit">
      <div class="back-ground-edit" @click.left="closeDialogEdit"></div>
      <el-card class="card-edit">
        <p class="edit">EDIT</p>
        <p class="title-edit">Title</p>
        <el-input class="input-edit" v-model="todoEdit.title"></el-input>
        <p class="todo-edit">Todo</p>
        <div class="api-items" v-for="item in listItem" :key="item.id">
          <div class="left" v-if="showIdEditing !== item.id">
            <p>{{item.content}}</p>
            <div class="right">
              <div class="fa fa-pencil" @click="showEditItem(item.id)"></div>
              <div class="fa fa-trash-o" @click="deleteItem(item.id)"></div>
            </div>
          </div>
          <!-- xự kiện edit -->
          <div v-else class="edit-item">
            <el-input
              class="input-edit-item"
              v-model="item.content"
              type="textarea"
              maxlength="500"
              show-word-limit
            ></el-input>
            <div class="btn-check-item" v-show="isHidden = true">
              <div class="el-icon-check" @click="updateItemTodo(item)"></div>
              <div class="el-icon-close" @click="cancelEditItem"></div>
            </div>
          </div>
        </div>
        <div class="additem">
          <el-button
            class="btn-addnew"
            v-if="isHidden"
            type="text"
            v-on:click="isHidden = !isHidden"
          >Add item</el-button>
          <el-input
            class="input-item"
            v-show="!isHidden"
            type="textarea"
            placeholder="Enter item content"
            v-model="textarea"
            maxlength="500"
            show-word-limit
          ></el-input>
          <div class="btn-check" v-show="!isHidden">
            <div class="el-icon-check" @click="createTodo"></div>
            <div class="el-icon-close" @click="isHidden=true"></div>
          </div>
        </div>
        <el-button class="btnsave" @click="updateTitle">
          <p>Save</p>
        </el-button>
      </el-card>
    </tbody>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import userServices from "@/lib/userServices.js";

export default {
  components: {},
  props: ["todoEdit", "curentPageMain"],
  computed: {
    ...mapGetters(["isShowEdit"])
  },
  data() {
    return {
      textarea: "",
      listItem: [],
      isHidden: false,
      isShowInfo: false,
      showIdEditing: null
    };
  },
  watch: {
    isShowEdit: "loadData"
  },
  methods: {
    loadData() {
      this.listItem = this.todoEdit.items;
    },
    createTodo() {
      axios({
        method: "POST",
        url: "https://mockup-api.herokuapp.com/api/v1/todos/:todo_id/items".replace(
          ":todo_id",
          this.todoEdit.id
        ),
        headers: {
          Authorization: userServices.userData().auth_token,
          "Content-Type": "application/json"
        },
        data: {
          content: this.textarea
        }
      }).then(() => {
        this.getListItems();
        this.textarea = "";
      });
    },
    updateItemTodo(item) {
      axios({
        method: "PUT",
        url: "https://mockup-api.herokuapp.com/api/v1/todos/:todo_id/items/:id"
          .replace(":todo_id", this.todoEdit.id)
          .replace(":id", item.id),
        headers: {
          Authorization: userServices.userData().auth_token,
          "Content-Type": "application/json"
        },
        data: {
          content: item.content,
        }
      }).then(() => {
        this.cancelEditItem();
        this.getListItems();
      });
    },
    updateTitle() {
      axios({
        method: "PUT",
        url: "https://mockup-api.herokuapp.com/api/v1/todos/:id".replace(
          ":id",
          this.todoEdit.id
        ),
        headers: {
          Authorization: userServices.userData().auth_token,
          "Content-Type": "application/json"
        },
        data: {
          title: this.todoEdit.title
        }
      }).then(() => {
        this.closeDialogEdit();
        this.$emit("loadData", this.curentPageMain, 6);
      });
    },
    deleteItem(id) {
      axios({
        method: "DELETE",
        url: "https://mockup-api.herokuapp.com/api/v1/todos/:todo_id/items/:id"
          .replace(":todo_id", this.todoEdit.id)
          .replace(":id", id),
        headers: {
          Authorization: userServices.userData().auth_token,
          "Content-Type": "application/json"
        }
      }).then(response => {
        this.getListItems();
      });
    },
    getListItems() {
      axios({
        method: "GET",
        url: "https://mockup-api.herokuapp.com/api/v1/todos/:todo_id/items".replace(
          ":todo_id",
          this.todoEdit.id
        ),
        headers: {
          Authorization: userServices.userData().auth_token,
          "Content-Type": "application/json"
        }
      }).then(response => {
        this.listItem = response.data;
      });
    },
    showEditItem(id) {
      this.showIdEditing = id;
    },
    cancelEditItem() {
      this.showIdEditing = null;
    },
    ...mapActions(["updateIsShowInfo", "updateIsShowEdit"]),
    openDialogInfo() {
      // this.updateIsShowInfo(true);
      this.$emit("updateSelectedItem", this.toDo);
    },
    closeDialogEdit() {
      this.updateIsShowEdit(false);
    }
  }
};
</script>
<style lang="scss" scope>
@import "@/assets/stylesheets/components/dialog-edit.scss";
</style>