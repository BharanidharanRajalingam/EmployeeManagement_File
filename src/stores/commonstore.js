import { defineStore } from 'pinia';
import axios from "axios"

export const useCommonStore = defineStore({
  id: 'CommonStore',
  state: () => ({
    registeredlist: []
  }),

  getters: {

  },

  actions: {


    async fetchreglist() {
      debugger
      try {
        const getlist = await axios.get(
          "https://664363bf6c6a65658706e249.mockapi.io/Task/Register");
        this.registeredlist = getlist['data']


      } catch (error) {
        console.error(error);
      }
    },


  }
});