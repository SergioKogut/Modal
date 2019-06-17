import axios from "axios";

export default class AnimalService {
static getListData() {
return axios.get('https://localhost:44320/api/product/search')
};
}