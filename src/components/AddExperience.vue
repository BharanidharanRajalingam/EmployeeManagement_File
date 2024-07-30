<template>
    <div class="addexperience">
        <v-text-field color="primary" label="Name" variant="underlined" :rules="companys"></v-text-field>
        <div>
            <label>From Date</label>
            <v-date-picker :rules="fromdates"></v-date-picker>
        </div>
        <div>
            <label>To Date </label>
        </div>
        <v-date-picker :rules="todates"></v-date-picker>
        <div>
            <label>Position</label>
            <v-radio-group :rules="positions">
                <v-radio label="Quality Analyst" value="one"></v-radio>
                <v-radio label="Developer" value="two"></v-radio>
                <v-radio label="Business Analyst" value="three"></v-radio>
            </v-radio-group>
        </div>
    </div>

</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { company, fromdate, todate, position } from "@/rules/validation";



export default defineComponent({

    setup() {
        let companys = company;
        let fromdates = fromdate;
        let todates = todate;
        let positions = position;
        const isActive = ref(false);
        const DataObj = ref({
            company: "",
            fromdate: "",
            todate: "",
            position: ""
        })
        return {
            companys,
            fromdates,
            todates,
            positions,
            DataObj
        }
    }
})
</script>