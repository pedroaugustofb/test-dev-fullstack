import Axios from "axios";

const isLocalHost = process.env.NODE_ENV === "development";

// se tiver api em produção, colocar aqui
const [localhost, prod] = ["http://localhost:8080", ""];

const base = Axios.create({
  baseURL: isLocalHost ? localhost : prod,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default base;
