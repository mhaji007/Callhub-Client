import axios from "axios";

// Custom axios object
export default axios.create({
  baseURL:  `${process.env.REACT_APP_API}`,
  responseType:"json"
})

