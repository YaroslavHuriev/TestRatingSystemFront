<template>
  <div class="container">
    <div class="user_items">
      <div class="item_1">
        <form class="form" action="/" method="post">
          <div class="form_group">
            <input v-model="postBody.surname" class="form__control" type="text" placeholder="Surname">
          </div>

          <div class="form_group">
            <input v-model="postBody.name" class="form__control" type="text" placeholder="Name">
          </div>

          <div class="form_group">
            <input v-model="postBody.fathersName" class="form__control" type="text" placeholder="Father`s name">
          </div>

          <div class="form_group">
            <input v-model="postBody.phoneNumber" class="form__control" type="text" placeholder="Phone number">
          </div>

          <div class="form_group">
            <input v-model="postBody.email" class="form__control" type="text" placeholder="Email">
          </div>

          <div class="form_group">
            <input v-model="postBody.gitHubURL" class="form__control" type="text" placeholder="GitHub URL">
          </div>

          <div class="form_group">
            <input v-model="postBody.notes" class="form__control" type="text" placeholder="Notes">
          </div>
          <button v-on:click="submitForm">Send</button>
        </form>
      </div>

    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "submissionForm",
  data() {
    return {
      postBody:{
        surname:'',
        name:'',
        fathersName:'',
        phoneNumber:'',
        email:'',
        gitHubURL:'',
        notes:''
      }
    };
  },
  methods : {
    submitForm:function (){
      axios.post('https://localhost:44334/Submissions', this.postBody)
          .then(() => {
            console.log(this.postBody);
          })
          .catch(() => {// catch error});
          })
    }
  }
}
</script>

<style scoped>

</style>