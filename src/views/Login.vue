<template>
  <v-container>
    <v-row class="registration">
      <v-col lg="5" md="6" sm="8" cols="12">
        <v-card class="px-4 py-4">
          <v-form @submit.prevent="IsSubmit">

            <v-text-field v-model="DataObj.email" color="primary" label="Email" :rules="email"
              variant="underlined"></v-text-field>

            <v-text-field v-model="DataObj.password" color="primary" label="Password" :rules="password"
              placeholder="Enter your password" variant="underlined"></v-text-field>
            <SaveButton btnlabel="Login" class="my-3" block />
          </v-form>
          <div class="registerbottom">
            <p>(or)</p>
            <a @click="$router.push('/Register')">Don't have an account? Register</a>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-snackbar v-model="incorrectpassword" timeout="3000">
    Incorrect Password
  </v-snackbar>
  <v-snackbar v-model="regiteremail" timeout="3000">
    Email is not registered
  </v-snackbar>
  <v-snackbar v-model="loginsuccessmsg" timeout="3000">
    Logedin Successfully
  </v-snackbar>
</template>



<script>
import { defineComponent, ref } from "vue";
import { useRouter, RouterLink } from 'vue-router';
import { emailRules, passwords } from "../rules/validation";
import axios from "axios"
import { useCommonStore } from "@/stores/commonstore"

export default defineComponent({
  setup() {
    const email = emailRules;
    const password = passwords;
    const incorrectpassword = ref(false);
    const regiteremail = ref(false);
    const loginsuccessmsg = ref(false);
    const router = useRouter();
    let useStore = useCommonStore()
    const DataObj = ref({
      companyname: "",
      logo: "",
      email: "",
      password: "",
      id: 0
    })
    const copyDataObj = JSON.parse(JSON.stringify(DataObj.value));

    async function IsSubmit(event) {
      const results = await event
      try {
        if (results.valid) {
          await useStore.fetchreglist()
          let findlist = useStore.registeredlist.find((i) => i.email == DataObj.value.email)
          if (findlist) {
            if (findlist.password === DataObj.value.password) {
              loginsuccessmsg.value = true;
              setTimeout(() => {
                router.push('/Layout')
              }, 2000);
              sessionStorage.setItem("userId", findlist.id);
              // clear();
            } else {
              incorrectpassword.value = true;
            }
          } else {
            regiteremail.value = true;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    function clear() {
      Object.assign(DataObj.value, copyDataObj);
    }
    return {
      email,
      password,
      DataObj,
      IsSubmit,
      clear,
      incorrectpassword,
      regiteremail,
      loginsuccessmsg
    }
  }
})
</script>
<style>
.registration {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95vh;
}

.registrationcolumn {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
