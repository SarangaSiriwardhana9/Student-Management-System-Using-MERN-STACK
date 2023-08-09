import "./App.css";
import { FaSearch, FaFilter } from "react-icons/fa"; // Import icons from react-icons library
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Formtable from "./components/Formtable";
import StudentDetailsPage from "./components/StudentDetailsPage";
import Header from "./components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://localhost:8090/";

function App() {
  const showSuccessToast = () => {
    toast.success("Data saved successfully", {
      position: toast.POSITION.TOP_CENTER, // You can customize the position
      autoClose: 3000, // Time in milliseconds to auto-close the toast
      hideProgressBar: true, // Hide the progress bar
      closeOnClick: true, // Close the toast when clicked
      draggable: true, // Make the toast draggable
    });
  };

  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    address: "",
    grade: 1,
    class: "",
    motherName: "",
    fatherName: "",
    motherMobile: "",
    fatherMobile: "",
    homeMobile: "",
    isMotherEmployed: false,
    motherEmployerName: "",
    motherJobPosition: "",
    isFatherEmployed: false,
    fatherEmployerName: "",
    fatherJobPosition: "",
    hasSiblings: false,
    sibling1Name: "",
    sibling2Name: "",
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const [formDataEdit, setFormDataEdit] = useState({
    image: "",
    name: "",
    address: "",
    grade: 1,
    class: "",
    homeMobile: "",
    motherName: "",
    fatherName: "",
    motherMobile: "",
    fatherMobile: "",
    isMotherEmployed: false,
    motherEmployerName: "",
    motherJobPosition: "",
    isFatherEmployed: false,
    fatherEmployerName: "",
    fatherJobPosition: "",
    hasSiblings: false,
    sibling1Name: "",
    sibling2Name: "",

    _id: "",
  });

  const [dataList, setDataList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // state to keep track of the selected student

  const handleOnChange = (e) => {
    const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      setFormData({
        image: "",
        name: "",
        address: "",
        grade: 1,
        class: "",
        homeMobile: "",
        motherName: "",
        fatherName: "",
        motherMobile: "",
        fatherMobile: "",
        isMotherEmployed: false,
        motherEmployerName: "",
        motherJobPosition: "",
        isFatherEmployed: false,
        fatherEmployerName: "",
        fatherJobPosition: "",
        hasSiblings: false,
        sibling1Name: "",
        sibling2Name: "",
      });
    }
  };

  // Add these state variables to the `App` component
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle changes in the search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getFetchData = async () => {
    const data = await axios.get("/getData");
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  //filter
  const [filterByGrade, setFilterByGrade] = useState("");
  const [filterByClass, setFilterByClass] = useState("");

  const handleFilterByGrade = (e) => {
    setFilterByGrade(e.target.value);
  };

  const handleFilterByClass = (e) => {
    setFilterByClass(e.target.value);
  };

  const [showFilterSection, setShowFilterSection] = useState(false);

  const toggleFilterSection = () => {
    setShowFilterSection((prevShowFilterSection) => !prevShowFilterSection);
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formDataEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditOnChange = async (e) => {
    const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormDataEdit((prev) => {
      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  const handleMoreDetails = (el) => {
    setSelectedStudent(el); // set the selected student in the state
    // Navigate to the StudentDetailsPage with the student data passed in location.state
    navigate("/student-details", { state: { student: el } });
  };

  return (
    <div className='addcontainer'>
      <button className='btn btn-add' onClick={() => setAddSection(true)}>
        Add New Student
      </button>
      {addSection && (
        <Formtable
          handleSubmit={handlesubmit}
          handleOnChange={handleOnChange}
          handleclose={() => setAddSection(false)}
          rest={formData}
        />
      )}
      <div className='app-container'>
        {/* Search bar */}
        <div className='search-bar'>
          <FaSearch className='search-icon' />
          <input
            type='text'
            value={searchQuery}
            onChange={handleSearch}
            placeholder='Search by student name...'
          />
        </div>

        {/* Filter button */}
        <button className='btn btn-filter' onClick={toggleFilterSection}>
          <FaFilter className='filter-icon' />
          Filter
        </button>

        {/* Filter section */}
        {showFilterSection && (
          <div className='filter-section'>
            <label>
              <span>Filter by Grade:</span>
              <input
                type='text'
                value={filterByGrade}
                onChange={handleFilterByGrade}
                placeholder='Enter grade...'
              />
            </label>
            <label>
              <span>Filter by Class:</span>
              <input
                type='text'
                value={filterByClass}
                onChange={handleFilterByClass}
                placeholder='Enter class...'
              />
            </label>
          </div>
        )}

        {editSection && (
          <Formtable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )}
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Grade</th>
              <th>Class</th>
              <th>More Details</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* Filtered and sorted student data */}
            {dataList
              .filter(
                (student) =>
                  student.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) &&
                  (filterByGrade === "" ||
                    student.grade.toString() === filterByGrade) &&
                  (filterByClass === "" ||
                    student.class.toLowerCase() === filterByClass.toLowerCase())
              )
              .map((el) => {
                return (
                  <tr key={el._id}>
                    <td>{el.name}</td>
                    <td>{el.address}</td>
                    <td>{el.grade}</td>
                    <td>{el.class}</td>
                    <td>
                      <button
                        className='btn btn-details'
                        onClick={() => handleMoreDetails(el)}
                      >
                        More Details
                      </button>
                    </td>
                    <td>
                      <button
                        className='btn btn-edit'
                        onClick={() => handleEdit(el)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className='btn btn-delete'
                        onClick={() => handleDelete(el._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {selectedStudent && ( // conditionally render the StudentDetailsPage component if a student is selected
          <StudentDetailsPage
            student={selectedStudent}
            handleBack={() => setSelectedStudent(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
