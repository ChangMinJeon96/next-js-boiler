import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Home = () => {
  const getFruit = async () => {
    const { data } = await axios.get("/api");

    return data;
  };

  const { data } = useQuery(["dfa"], getFruit);
  console.log("data: ", data);

  return <div>Hello world</div>;
};

export default Home;
