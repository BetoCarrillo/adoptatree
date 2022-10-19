import { useState, useEffect } from "react";

const useFetch = (url) => {
  console.log("useFecth run>>>");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log("result", result);
      setLoading(false);
      setData(result);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, loading };
};
export default useFetch;
