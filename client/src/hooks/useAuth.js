import { baseURL } from "../utils/getServerUrl";

function useAuth() {
  const token = localStorage.getItem("token");

  const isLoggedIn = async (req, res) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        baseURL + "/api/users/profile",
        requestOptions
      );
      const results = await response.json();
      console.log("results", results);
    } catch (error) {
      console.log("error", error);
    }
  };

  return isLoggedIn;
}

export { useAuth };
