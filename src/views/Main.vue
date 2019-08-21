<template>
  <div class="main">
    <div class="header">
      <div class="mail-header">
        <div class="fa fa-user"></div>
        <p>{{email}}</p>
      </div>
      <el-button class="logout" @click="logout()">
        <p>Logout</p>
      </el-button>
    </div>
    <div class="body">
      <div class="cube">
        <div class="topcube">
          <h1>MY TO-DO LIST</h1>
          <div class="wrapper">
            <el-input placeholder="Enter to search" prefix-icon="el-icon-search" v-model="input"></el-input>
            <el-button class="btn-addnew" @click="showAddNew">
              <p>Add New</p>
            </el-button>
          </div>
        </div>
        <div class="addNew" v-if="isShowAddNew">
          <div class="input-title">
            <el-input v-model="title" placeholder="Enter title"></el-input>
          </div>
        </div>
        <to-do
          :toDo="item"
          v-for="item in listToDoMain"
          :key="item.index"
          @updateSelectedItem="updateSelectedItem"
          @updateTodoId="updateTodoId"
        ></to-do>
        <el-pagination
          :current-page="currentPage"
          @current-change="changePage"
          :page-size="1"
          background
          layout="prev, pager, next"
          :page-count="totalPage"
        ></el-pagination>
        <div class="footer">
          <p>Coppyright @2019</p>
        </div>
      </div>
    </div>
    <dialog-info :toDoInfo="selectedItem" :curentPageMain="currentPage" @loadData="getListTodo"></dialog-info>
    <edit-todo :curentPageMain="currentPage" @loadData="getListTodo" :todoEdit="selectedItem"></edit-todo>
    <delete-todo :toDoId="id" :curentPageMain="currentPage" @loadData="getListTodo"></delete-todo>
  </div>
</template>
<script>
import axios from "axios";
import userServices from "@/lib/userServices.js";
import ToDo from "@/components/Todo.vue";
import DialogInfo from "@/components/DialogInfo.vue";
import EditTodo from "@/components/DialogEdit.vue";
import { mapGetters, mapActions } from "vuex";
import DeleteTodo from "@/components/DialogDelete.vue";

export default {
  name: "Main",
  components: {
    ToDo,
    DialogInfo,
    DeleteTodo,
    EditTodo
  },
  data() {
    return {
      email: userServices.userData().email,
      listToDoMain: [],
      currentPage: 1,
      totalPage: 0,
      input: "",
      visible: false,
      selectedItem: "",
      isShowAddNew: false,
      title: "",
      id: "",
      selectedTitle: null
    };
  },
  watch: {
    input: "sheartText"
  },
  created() {
    this.getListTodo(this.currentPage, 6);
  },
  methods: {
    showAddNew() {
      this.$prompt("Input Title", "Add New", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputErrorMessage: "Invalid Title"
      })
        .then(({ value }) => {
          if (value === null || value === "") {
            this.$message({
              type: "error",
              message: "Title cannot be null"
            });
          } else {
            this.addNew(value);
            this.$message({
              type: "success",
              message: "Title is:" + value
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Input canceled"
          });
        });
    },
    addNew(value) {
      axios({
        method: "POST",
        url: "https://mockup-api.herokuapp.com/api/v1/todos",
        headers: {
          Authorization: userServices.userData().auth_token,
          "Content-Type": "application/json"
        },
        data: {
          title: value
        }
      }).then(response => {
        this.getListTodo(1, 6);
        this.currentPage = 1;
      });
    },
    updateSelectedItem(item) {
      this.selectedItem = item;
    },
    openAddNew() {
      this.isShowAddNew = true;
    },
    sheartText() {
      this.sheart(this.input, this.currentPage, 6);
    },
    logout() {
      userServices.signOut();
      this.$router.push("/Login");
    },
    getListTodo(page, limit) {
      axios
        .get(
          `https://mockup-api.herokuapp.com/api/v1/todos?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: userServices.userData().auth_token,
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          this.listToDoMain = response.data;
          this.totalPage = parseInt(response.headers["x-total-pages"], 0);
        });
    },
    changePage(newPage) {
      this.currentPage = newPage;
      if (this.input === "") {
        this.getListTodo(newPage, 6);
      } else {
        this.sheart(this.input, newPage, 6);
      }
    },
    updateTodoId(idToDo) {
      this.id = idToDo;
    },
    //ham tong de search
    sheart(text, page, limit) {
      axios
        .get(
          `https://mockup-api.herokuapp.com/api/v1/todos/search?page=${page}&limit=${limit}&q=${text}`,
          {
            headers: {
              Authorization: userServices.userData().auth_token,
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          this.listToDoMain = response.data;
          this.totalPage = parseInt(response.headers["x-total-pages"], 0);
        });
    }
  }
};
</script>
<style lang="scss" scope>
@import "@/assets/stylesheets/components/main.scss";
</style>
