import axios from "axios";

export default class AnimalService {
static getListData() {
return axios.get('api/animal/Search')
};
}