import axios from "axios";
const baseUrl = "/api/persons"

const getAll = () => {
  return axios.get(baseUrl)
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (newObject) => {
  return axios.put(`${baseUrl}/${newObject.id}`, newObject);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  remove: remove,
}
