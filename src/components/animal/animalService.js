import axios from 'axios';

export default class AnimalService {
  
  static getListData () {
    return axios.get ('https://localhost:44320/api/animal/search');
  }

  static createNewAnimal (model) {
    return axios.post ('https://localhost:44320/api/animal/create', model);
  }

  static addLikeAnimal (model) {
    return axios.put ('https://localhost:44320/api/animal/addlike'+model.id, model);
  }
}
