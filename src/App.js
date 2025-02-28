import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { filterData, apiUrl } from "./data";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

const App = () => {
  const [courses, setCourses] = useState(null);//Holds the data related to courses. Initialized with null.
  const [loading, setLoading] = useState(true);//Tracks whether data is being loaded. Initialized with true.
  const [category, setCategory] = useState(filterData[0].title);//Represents the selected category for course filtering. Initialized with the title of the first item in the filterData array.

  async function fetchData() {
    setLoading(true); // Indicate that data is being fetched, so show loading state
    try {
      let response = await fetch(apiUrl); // Send a request to the apiUrl and wait for the response
      let output = await response.json();// Parse the response body as JSON and store it in 'output'
      //save data into a variable
      //1st is our output and 2nd data is our key
      setCourses(output.data);// Update the 'courses' state with the fetched data
    } catch (error) {
      toast.error("Something went wrong"); // Handle errors by displaying an error message
    }
    setLoading(false);// Indicate that fetching is done, so hide loading state
  }

  useEffect(() => {
    fetchData(); //async fn 
  }, []); //empty means no dependencies, so it will run once when component is mount(render)

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar />
      </div>
      <div className="bg-bgDark2">
        <div>
          <Filter
            filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
          {loading ? (
            <Spinner />
          ) : (
            <Cards courses={courses} category={category} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
