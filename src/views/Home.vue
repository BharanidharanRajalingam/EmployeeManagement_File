<template>
    <v-container>
        <v-row>
            <v-col>
                <v-btn type="submit" size="sm" color="blue-darken-4 buttons float-right" density="default" rounded="sm"
                    eleveation="4" variant="elevated" @click="openpopup">Add Employee</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table :headers="headers" :items="tablearray" height="400">
                    <template v-slot:item.actions="{ item }">
                        <div>
                            <v-icon icon="$edit" size="large" @click="EditItem(item)" class="mr-2"></v-icon>
                            <v-icon icon="mdi:mdi-delete" size="large" @click="DeleteItem(item)"></v-icon>
                        </div>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
    <AddEmployee v-model:visible="visiblepopup" @closeVisible="closePopup" v-model:EditItems="EditItems"
        v-if="visiblepopup" />

</template>

<script>
import { defineComponent, ref, watch } from "vue";
import Employeeservice from '@/services/employeeservice'
import AddEmployee from "@/components/popup/AddEmployee.vue"
export default defineComponent({
    components: {
        AddEmployee
    },
    setup(props, { emit }) {
        let visiblepopup = ref(false)
        const headers = [
            { title: 'S.No', align: 'start', key: 'sno' },
            { title: 'Name', align: 'end', key: 'name' },
            { title: 'DOB', align: 'end', key: 'dob' },
            { title: 'Address', align: 'end', key: 'address' },
            { title: 'City', align: 'end', key: 'city' },
            { title: 'State', align: 'end', key: 'state' },
            // { title: 'Experience', align: 'end', key: 'experience' },
            { title: 'Actions', align: 'end', key: 'actions' },
        ];

        const tablearray = ref([]);
        const EditItems = ref();
        IsShow();
        function openpopup() {
            EditItems.value = null;
            visiblepopup.value = true;
        }
        function closePopup() {
            visiblepopup.value = false
        }
        watch(() => visiblepopup.value, () => {
            setInterval(() => {
                IsShow()
            }, 1000);
        })
        async function IsShow() {
            debugger;
            try {
                const create = await Employeeservice.List();
                console.log(create)
                let count = 0;
                tablearray.value = create.data.map((item) => {
                    count = count + 1
                    item.sno = count;
                    item.actions = "";
                    return item;
                });
            } catch (error) {
                console.log(error);
            }
        }

        function EditItem(data) {
            EditItems.value = data.id;
            visiblepopup.value = true;
        }
        async function DeleteItem(data) {
            try {
                console.log(data);
                const create = await Employeeservice.Delete(data.id);
                debugger;
                console.log(create)
                if (create.statusText == "OK") {
                    alert("Deleted Successfully");
                    IsShow();
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        return {
            EditItems,
            EditItem,
            DeleteItem,
            headers,
            tablearray,
            openpopup,
            visiblepopup,
            closePopup,
            IsShow
        }
    }
})



</script>