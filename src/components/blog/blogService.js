import axios from "axios";

export default class BlogService {
    static createNewPost(model) {
        return axios.post('https://localhost:44320/api/blog/create', model)
    };

    static getListData() {
        return axios.get('https://localhost:44320/api/blog/search')
    };
}

