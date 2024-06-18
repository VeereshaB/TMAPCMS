<template>
  <div class="hello">
    <h2>DRUD Project Working</h2>
    <div class="containers">
      <md-table v-if="users" v-model="users" class="table" md-card>
        <md-table-toolbar>
          <h1 class="md-title">Users</h1>
          <md-button v-on:click="openDailog()" class="md-raised md-primary"
            >Create users</md-button
          >
        </md-table-toolbar>

        <md-table-row
          slot="md-table-row"
          slot-scope="{ item }"
          v-on:click="getRowRecords(item)"
        >
          <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
          <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
          <md-table-cell md-label="gender">{{ item.gender }}</md-table-cell>
          <md-table-cell md-label="title">{{ item.title }}</md-table-cell>
          <md-table-cell md-label="action">
            <md-button class="md-raised md-primary">Edit</md-button>
            <md-button class="md-raised md-accent">Delete</md-button>
          </md-table-cell>
        </md-table-row>

        <md-table-pagination
          :md-page-size="rowsPerPage"
          :md-page-options="[3, 5, 10, 15]"
          :md-update="updatePagination"
          :md-data.sync="users"
        />
      </md-table>
      <div v-if="!users">No records found</div>
    </div>
  </div>
  
</template>

<script>
import router from "@/router";
export default {
  name: "TablePagination",

  data: () => ({
    users: [
      {
        id: 1,
        name: "Shawna Dubbin",
        email: "sdubbin0@geocities.com",
        gender: "Male",
        title: "Assistant Media Planner",
      },
      {
        id: 2,
        name: "Odette Demageard",
        email: "odemageard1@spotify.com",
        gender: "Female",
        title: "Account Coordinator",
      },
      {
        id: 3,
        name: "Vera Taleworth",
        email: "vtaleworth2@google.ca",
        gender: "Male",
        title: "Community Outreach Specialist",
      },
      {
        id: 4,
        name: "Lonnie Izkovitz",
        email: "lizkovitz3@youtu.be",
        gender: "Female",
        title: "Operator",
      },
      {
        id: 5,
        name: "Thatcher Stave",
        email: "tstave4@reference.com",
        gender: "Male",
        title: "Software Test Engineer III",
      },
    ],
    paginatedUsers: [],
  }),

  methods: {
    getRowRecords(row) {
      console.log(row);
      router.push("/user");
    },
  },
  methods: {
    openDailog() {
      console.log("Open DailogS");
    },
    updatePagination(page, pageSize, sort, sortOrder) {
      console.log("pagination has updated", page, pageSize, sort, sortOrder);
      this.$http
        .get(`https://reqres.in/api/users?page=${page}&per_page=${pageSize}`)
        .then(({ data: resp }) => {
          this.rowsPerPage = pageSize;
          this.users = {
            mdCount: resp.total,
            mdPage: resp.page,
            mdData: resp.data,
          };
        });
    },
  },
};
</script>

<style scoped>
.md-table + .md-table {
  margin-top: 16px;
}
.avatar img {
  max-width: 30px;
}
</style>

