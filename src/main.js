
import "./assets/main.css"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { vuetify } from '@/vuetify' // Import Vuetify instance
import SaveButton from "@/components/SaveButton.vue"

const app = createApp(App)
app.use(createPinia())
app.use(router)

// Use Vuetify
app.use(vuetify)
app.component("SaveButton", SaveButton);
app.mount('#app')

