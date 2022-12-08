import axios from "axios";

export default axios.create({
  baseURL: "https://xvy4yik9yk.us-west-2.awsapprunner.com",
  headers: {
    "Content-type": "application/json",
  },
});
