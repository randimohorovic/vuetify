<template>
  <div class="row">
    <div class="col-1">{{ search.searchTerm }}</div>
    <div class="col-7">
      <!-- nova forma za post -->
      <form @submit.prevent="postNewImage" class="form-inline mb-5">
        <div class="form-group">
          <!-- <label for="imageUrl">Image URL</label>
          <input
            v-model="newImageUrl"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image URL"
            id="imageUrl"
          /> -->
          <croppa
            :width="400"
            :height="400"
            placeholder="Učitaj sliku..."
            v-model="imageReference"
          ></croppa>
        </div>
        <div class="form-group">
          <label for="imageDescription">Description</label>
          <input
            v-model="newImageDescription"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image description"
            id="imageDescription"
          />
        </div>
        <button type="submit" class="btn btn-primary ml-2">Post image</button>
      </form>
      <!-- nova forma za post end -->

      <InstagramCard v-for="x in filteredCards" :key="x.id" :info="x" />
    </div>
    <div class="col-3">Sidebar {{ search.searchTerm }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store.js";
import { db, storage } from "@/firebase";

///let cards = [];
// cards = [
//   {
//     url: "https://picsum.photos/id/1/800/800",
//     description: "laptop ",
//     time: "few mins ago...",
//   },
//   {
//     url: "https://picsum.photos/id/2/800/800",
//     description: "laptop #2",
//     time: "few mins ago...",
//   },
//   {
//     url: "https://picsum.photos/id/3/800/800",
//     description: "laptop #3",
//     time: "few mins ago...",
//   },
// ];

// api firebase dohvata kolekcije koju punimo u fiebase i onda dopunimo tu i prikazemo

export default {
  name: "home",
  data: function () {
    return {
      //    hello: "world",
      //  lista: [1, 2, 3, "da"],
      card: [],
      search: store,
      newImageDescription: "",
      newImageUrl: "",
      imageReference: null,
    };
  },
  mounted() {
    console.log("mounted");
    this.getPosts();
    //dohvati iz firebesa i u metodi cemo dodat jedan dohvat i pozvat u mou ted
    // zasto nova metoda , da mounted bude clean sta treba bit u prikazu
    // i kad treba refreshat obrisane/dodane kolekcije da ih refresha u metodi
  },
  methods: {
    // dozivamo u mounted djelu getPosts metodu
    getPosts() {
      console.log("firebase dohvat..");
      db.collection("posts")
        .orderBy("posted_at", "desc")
        .limit(1000)
        .get()
        .then((query) => {
          this.card = [];
          query.forEach((doc) => {
            console.log("id ", doc.id);
            console.log("podaci ", doc.data());
            const data = doc.data();
            this.card.push({
              id: doc.id,
              time: data.posted_at,
              description: data.desc,
              url: data.url,
            });
          });
        });
    },
    postNewImage() {
      // izvlacimo bajtove iz slike
      this.imageReference.generateBlob((blobData) => {
        console.log(blobData);
        // store.curuser je folder  separator / nakon toga sve se zapisuje u taj folder korisnika
        let imageName = store.currentUser + "/" + Date.now() + ".png";
        console.log(imageName);
        storage
          .ref(imageName)
          .put(blobData)
          .then((result) => {
            // kod nakon uspesnog spremanja
            result.ref
              .getDownloadURL()
              .then((url) => {
                //cuva this
                console.log("javni link", url);
                //const imageUrl = this.newImageUrl;
                const imageDescription = this.newImageDescription;
                //kolekcija gdje spremamo stvari image,,,korisnik koj je poslo post..
                db.collection("posts")
                  .add({
                    url: url,
                    desc: imageDescription,
                    email: store.currentUser,
                    posted_at: Date.now(),
                  })
                  .then((doc) => {
                    // if (imageUrl == "" || imageDescription == "")
                    //   alert("Registration Failed");
                    // else {
                    //   alert(" Registration Success");
                    //   this.newImageDescription = "";
                    //   this.imageReference.remove();
                    //   this.getPosts(); //iznova dohvati postove i refresha page

                    console.log("Form Submitted!", doc);
                    this.newImageDescription = "";
                    this.imageReference.remove();
                    this.getPosts();
                  })
                  .catch((e) => {
                    console.log("Empty fields", e);
                  });
              })
              .catch((e) => {
                console.log(e);
              });
            // console.log(result);
          })
          .catch((error) => {
            console.log("error", error);
          });
      });
    },
  },
  computed: {
    filteredCards() {
      //funkcija za filtriranje
      let termin = this.search.searchTerm;
      let newCards = [];
      for (let card of this.card) {
        if (card.description.indexOf(termin) >= 0) {
          newCards.push(card);
        }
      }
      return newCards;
    },
  }, // je objekt a ne funkcija , unutra navodimo funkcije koje nam mogu sluzit za filter obradu podataka iz data da ih prikaze na drugaciji nacin
  components: {
    InstagramCard,
  },
};
</script>

<style lang="scss">
.card {
  margin-bottom: 20px;
}
</style>
