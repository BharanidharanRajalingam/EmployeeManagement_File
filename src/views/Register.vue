<template>
  <v-container>
    <v-row class="registration">
      <v-col lg="5" md="6" sm="8" cols="12">
        <v-card class="px-4 py-4">
          <v-form @submit.prevent="IsSubmit">
            <v-text-field v-model="DataObj.companyname" :rules="name" color="primary" label="Company Name"
              variant="underlined"></v-text-field>

            <v-text-field v-model="DataObj.logo" color="primary" label="Logo" variant="underlined"></v-text-field>

            <v-text-field v-model="DataObj.email" color="primary" label="Email" :rules="email"
              variant="underlined"></v-text-field>

            <v-text-field v-model="DataObj.password" color="primary" label="Password" :rules="password"
              placeholder="Enter your password" variant="underlined"></v-text-field>
            <SaveButton btnlabel="Register" class="my-3" block />
          </v-form>
          <div class="registerbottom">
            <p>(or)</p>
            <a @click="$router.push('/Login')"> Have an account? Login</a>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar v-model="alreadyemail" timeout="3000">
    Email is Already Registered
  </v-snackbar>
  <v-snackbar v-model="successmsg" timeout="3000">
    Registered Successfully
  </v-snackbar>
</template>



<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { nameRules, emailRules, passwords } from "../rules/validation";
import { useCommonStore } from "@/stores/commonstore"
import Registerservice from "@/services/registerservice"
export default defineComponent({
  setup() {
    let name = nameRules;
    let email = emailRules;
    let password = passwords;
    let alreadyemail = ref(false);
    let successmsg = ref(false);
    let router = useRouter();
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
          alert('dd')
          debugger;
          await useStore.fetchreglist()
          let findlist = useStore.registeredlist.find((i) => i.email == DataObj.value.email)
          if (findlist) {
            alreadyemail.value = true;
          } else {
            const create = await Registerservice.CreateList(DataObj.value);
            successmsg.value = true;
            setTimeout(() => {
              router.push('/Login')
            }, 2000);
            // clear();
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
      name,
      email,
      password,
      DataObj,
      IsSubmit,
      clear,
      alreadyemail,
      successmsg
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
