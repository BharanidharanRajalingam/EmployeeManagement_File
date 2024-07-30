import axios from "axios"

class Registerservice {

    CreateList(DataObj) {
        debugger;
        return axios.post(
            "https://664363bf6c6a65658706e249.mockapi.io/Task/Register", DataObj
        );
    }
}
export default new Registerservice();

