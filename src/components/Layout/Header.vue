<template>
    <v-card>
        <v-layout>
            <v-app-bar color="primary" prominent class="layoutheader">
                <div>
                    <img :src="findlist?.logo">
                    <v-toolbar-title>{{ findlist?.companyname }}</v-toolbar-title>
                </div>
                <div>
                    <v-icon icon="mdi-home" @click="$router.push('/Layout')"></v-icon>
                    <v-icon icon="$info" @click="$router.push('/AdditionalInformation')"></v-icon>
                    <v-icon @click="logout" icon="mdi:mdi-logout" size="large"></v-icon>
                </div>
            </v-app-bar>
        </v-layout>
    </v-card>
    <div class="routerscreen">
        <RouterView />
    </div>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { useCommonStore } from "@/stores/commonstore"

export default defineComponent({
    setup() {
        let useStore = useCommonStore()
        const router = useRouter()
        let findlist = ref();
        let userid = ref();
        onMounted(async () => {
            await useStore.fetchreglist();
            userid.value = sessionStorage.getItem("userId");
            getvalues();
        });
        function getvalues() {
            debugger
            findlist.value = useStore.registeredlist.find((i) => i.id == userid.value)
        }
        function logout() {
            sessionStorage.removeItem("userId");
            router.push('/Login');
        }
        return {
            logout,
            userid,
            findlist
        }
    }
})
</script>
