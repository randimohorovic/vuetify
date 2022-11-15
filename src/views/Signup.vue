<template>
  <div class="about">
    <h1>This is an login page</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                v-model="username"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
              >
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Repeat Password</label>
              <input
                type="password"
                v-model="passwordRepeat"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <button type="submit" @click="signup" class="btn btn-primary">
              Submit
            </button>
            <!--               //@click="metoda" naziv -->
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase.js";

export default {
  data() {
    // data: function() { retu  rn{usernam...}}
    return {
      username: "",
      password: "",
      passwordRepeat: "",
    };
  },
  // methods je objekt gdje definiram metodekoje mogu pozivat iz html-a
  methods: {
    signup() {
      // alert(this.username); ////////// this.username iz ove komponente da ucita tu
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then(function () {
          console.log("uspjesna registracija");
        })
        .catch(function (error) {
          console.error("doslo je do greske", error);
        });
      console.log("nastavak");
    },
  },
};
</script>
