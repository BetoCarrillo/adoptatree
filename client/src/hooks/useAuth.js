import { baseURL } from "../utils/getServerUrl";

function useAuth() {
  const token = localStorage.getItem("token");

  const isLoggedIn = async (req, res) => {
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzNjMjBiYWU1YWJjYmMzZTIyYTAwYjUiLCJpYXQiOjE2NjU3NTg2ODQsImV4cCI6MTY2NjM2MzQ4NH0.8cY2kLlAX5mEU7BJrkzOC8jtrnatCAyMbxQfEDlsWGw"
    );

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
