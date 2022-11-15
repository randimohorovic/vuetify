<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col">
          <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a class="navbar-brand" href="#">
                <img
                  src="@/assets/logs.png"
                  alt="Girl in a jacket"
                  width="80"
                  height="50"
                />
              </a>
              <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item">
                  <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li v-if="!store.currentUser" class="nav-item">
                  <router-link to="/login" class="nav-link">Login</router-link>
                </li>
                <li v-if="!store.currentUser" class="nav-item">
                  <router-link to="/signup" class="nav-link"
                    >Sign up</router-link
                  >
                </li>
                <li v-if="store.currentUser" class="nav-item">
                  <a href="#" @click="logout" class="nav-link">Log out</a>
                </li>
              </ul>
              <form class="form-inline my-2 my-lg-0">
                <input
                  v-model="store.searchTerm"
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>
          </nav>
          {{ store.searchTerm }}
        </div>
      </div>
    </div>

    <div class="container">
      <router-view />
      <!-- tu router dinamicki ubaci screen -->
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
import { firebase } from "@/firebase.js";
import router from "@/router";

firebase.auth().onAuthStateChanged((user) => {
  const currentRoute = router.currentRoute;
  //tu firebase detektira promjene stanja ulogiranosti,i tu cemo provjeravat trnutnu rutu isto
  if (user) {
    console.log("User is logged in with email " + user.email);
    store.currentUser = user.email;

    if (!currentRoute.meta.needsUser) {
      router.push({ name: "home" });
    }
  } else {
    console.log("User is not logged in");
    store.currentUser = null;
    //ako korisnik nije na ruti  login  da ide tamo odmah, ali moze ic na druge rute
    if (currentRoute.meta.needsUser) {
      router.push({
        name: "login",
      });
    }
  }
});
export default {
  name: "app",
  data: function () {
    return {
      //search: store,
      store: store,
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "login" });
        });
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: rgba(var(--b3f, 250, 250, 250), 1);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  background-color: white;
  border-bottom: #ccc 1px solid;
  margin-bottom: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
