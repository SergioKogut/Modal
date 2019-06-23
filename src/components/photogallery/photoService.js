import axios from "axios";

export default class PhotoService {

static getListData() {
return axios.get('https://localhost:44320/api/photo/search')

};
}