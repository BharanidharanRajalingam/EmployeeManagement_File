import axios from "axios"

class Employeeservice {

    CreateList(DataObj) {
        debugger;
        return axios.post(
            "https://664363bf6c6a65658706e249.mockapi.io/Task/Employees", DataObj
        );
    }
    List() {
        debugger;
        return axios.get(
            "https://664363bf6c6a65658706e249.mockapi.io/Task/Employees"
        );
    }
    Delete(id) {
        debugger;
        return axios.delete(
            "https://664363bf6c6a65658706e249.mockapi.io/Task/Employees/" + id + ""
        );
    }
    Edit(id) {
        debugger;
        return axios.get(
            "https://664363bf6c6a65658706e249.mockapi.io/Task/Employees/" + id + ""
        );
    }
    Update(DataObj, id) {
        debugger;
        return axios.put(
            "https://664363bf6c6a65658706e249.mockapi.io/Task/Employees/" + id, DataObj
        );
    }
}
export default new Employeeservice();

