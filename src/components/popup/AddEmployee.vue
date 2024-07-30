<template>


    <v-dialog max-width="500" v-model="visible">

        <template v-slot:default="{ visible }">
            <v-card>
                <v-container>
                    <v-row>
                        <v-col class="d-flex justify-space-between">
                            <h3>Add Employee</h3>
                            <v-icon icon="$close" @click="$.emit('closeVisible')"></v-icon>
                        </v-col>
                    </v-row>
                </v-container>

                <v-container>
                    <v-row>
                        <v-col>
                            <v-form @submit.prevent="IsSubmit">
                                <v-text-field :rules="name" color="primary" label="Name" variant="underlined"
                                    v-model="DataObj.name"></v-text-field>
                                <div>
                                    <label>DOB</label>
                                    <v-date-picker :rules="dobs" v-model="DataObj.dob"></v-date-picker>
                                </div>
                                <v-text-field :rules="addresses" color="primary" label="Address" variant="underlined"
                                    v-model="DataObj.address"></v-text-field>
                                <v-text-field :rules="states" color="primary" label="State" v-model="DataObj.state"
                                    variant="underlined" :disabled="true"></v-text-field>
                                <v-select label="City" :rules="citys" v-model="DataObj.city"
                                    :items="['Chennai', 'Tiruppur', 'Coimbatore', 'Erode', 'Salem', 'Villupuram', 'Madurai', 'Attur', 'Dindigal', 'Trichy']"></v-select>

                                <SaveButton btnlabel="Submit" class="my-3" block />
                            </v-form>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </template>
    </v-dialog>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import { nameRules, dob, address, city, state, company, fromdate, todate, position } from "@/rules/validation";
import Addexperience from '@/components/AddExperience.vue'
import Employeeservice from '@/services/employeeservice'
import moment from 'moment';



export default defineComponent({
    components: {
        Addexperience
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        EditItems: {
            type: Object,
            Default: () => { },

        }
    },
    setup(props, { emit }) {
        const model = ref(props.EditItems);

        onMounted(() => {

            if (model.value != null) {
                IsEdit()
            } else {
                clear()
            }
        })


        let name = nameRules;
        let dobs = dob;
        let addresses = address;
        let citys = city;
        let states = state;
        let companys = company;
        let fromdates = fromdate;
        let todates = todate;
        let positions = position;
        const isActive = ref(false);
        const datess = ref(new Date('2024-05-16'))
        const showDialog = ref(false);
        const DataObj = ref({
            name: "",
            dob: ref(),
            address: "",
            city: "",
            state: "Tamilnadu",
            companyname: "",
            fromdate: ref(),
            position: ""
        })
        const copyDataObj = JSON.parse(JSON.stringify(DataObj.value));

        function clear() {
            Object.assign(DataObj.value, copyDataObj);
        }
        async function IsSubmit(event) {
            debugger;

            try {

                debugger;
                const results = await event

                DataObj.value.dob = moment().format("YYYY-MM-DD");
                DataObj.value.fromdate = moment().format("YYYY-MM-DD");
                DataObj.value.todate = moment().format("YYYY-MM-DD");
                if (results.valid) {
                    emit('closeVisible');
                    if (model.value !== null) {
                        const create = await Employeeservice.Update(DataObj.value, model.value);
                        alert('Updated Succesfully')
                    } else {
                        const create = await Employeeservice.CreateList(DataObj.value);
                        alert('Created Succesfully')
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        async function IsEdit() {
            try {
                debugger;
                const create = await Employeeservice.Edit(model.value);
                console.log(create)
                if (create.statusText == "OK") {
                    Object.keys(DataObj.value).forEach((key) => {
                        if (key == 'dob') {
                            DataObj.value.dob = new Date(create.data[key])
                        }
                        else if (create.data[key]) DataObj.value[key] = create.data[key];
                    });

                }


            } catch (error) {
                console.log(error);
            }
        }


        return {
            showDialog,
            isActive,
            name,
            dobs,
            addresses,
            citys,
            states,
            companys,
            fromdates,
            todates,
            positions,
            IsSubmit,
            DataObj,
            datess,
            clear
        }
    }
})
</script>
