import React, { useState } from "react";
import "../App.css";
import { MdClose } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showSuccessToast = () => {
  toast.success("Data saved successfully", {
    position: toast.POSITION.TOP_CENTER, // You can customize the position
    autoClose: 3000, // Time in milliseconds to auto-close the toast
    hideProgressBar: true, // Hide the progress bar
    closeOnClick: true, // Close the toast when clicked
    draggable: true, // Make the toast draggable
  });
};

const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  const [isMotherEmployed, setIsMotherEmployed] = useState(false);
  const [isFatherEmployed, setIsFatherEmployed] = useState(false);
  const [hasSiblings, setHasSiblings] = useState(false);

  const [image, setImage] = useState("");

  function convertToBase64(e) {
    console.log(e);
    var render = new FileReader();
    render.readAsDataURL(e.target.files[0]);
    render.onload = () => {
      console.log(render.result);
      setImage(render.result);
    };
    render.onerror = (error) => console.log("Error :", error);
  }

  const handleMotherEmployedChange = (e) => {
    setIsMotherEmployed(e.target.checked);
  };

  const handleFatherEmployedChange = (e) => {
    setIsFatherEmployed(e.target.checked);
  };

  const handleSiblingsChange = (e) => {
    setHasSiblings(e.target.checked);
  };

  return (
    <div className='addContainer'>
      <form onSubmit={handleSubmit}>
        <div className='close-btn' onClick={handleclose}>
          <MdClose />
        </div>
        <label htmlFor='image'>Select an Image:</label>
        <input
          type='file'
          id='image'
          name='image'
          accept='image/*'
          onChange={convertToBase64}
          value={rest.i}
        />
        {image == "" || image == null ? (
          ""
        ) : (
          <img width={100} height={100} src={image} />
        )}

        <label htmlFor='name'>Full Name:</label>
        <input
          type='text'
          id='name'
          name='name'
          onChange={handleOnChange}
          value={rest.name}
        />

        <label htmlFor='grade'>Grade:</label>
        <input
          type='number'
          id='grade'
          name='grade'
          onChange={handleOnChange}
          value={rest.grade}
        />
        <label htmlFor='class'>class:</label>
        <select
          id='class'
          name='class'
          onChange={handleOnChange}
          value={rest.class}
        >
          <option value=''>Select Class</option>
          <option value='A'>Class A</option>
          <option value='B'>Class B</option>
          <option value='C'>Class C</option>
          <option value='D'>Class D</option>
          <option value='E'>Class E</option>
        </select>

        <label htmlFor='address'>Address:</label>
        <input
          type='text'
          id='address'
          name='address'
          onChange={handleOnChange}
          value={rest.address}
        />

        <label htmlFor='motherName'>Mother's Name:</label>
        <input
          type='text'
          id='motherName'
          name='motherName'
          onChange={handleOnChange}
          value={rest.motherName}
        />

        <label htmlFor='fatherName'>Father's Name:</label>
        <input
          type='text'
          id='fatherName'
          name='fatherName'
          onChange={handleOnChange}
          value={rest.fatherName}
        />

        <label htmlFor='motherMobile'>Mother's Mobile:</label>
        <input
          type='text'
          id='motherMobile'
          name='motherMobile'
          onChange={handleOnChange}
          value={rest.motherMobile}
        />

        <label htmlFor='fatherMobile'>Father's Mobile:</label>
        <input
          type='text'
          id='fatherMobile'
          name='fatherMobile'
          onChange={handleOnChange}
          value={rest.fatherMobile}
        />

        <label htmlFor='homeMobile'>Home Mobile:</label>
        <input
          type='text'
          id='homeMobile'
          name='homeMobile'
          onChange={handleOnChange}
          value={rest.homeMobile}
        />

        <label htmlFor='isMotherEmployed'>Is Mother Employed?</label>
        <input
          type='checkbox'
          id='isMotherEmployed'
          name='isMotherEmployed'
          onChange={(e) => {
            handleOnChange(e);
            handleMotherEmployedChange(e);
          }}
          checked={isMotherEmployed}
        />

        {isMotherEmployed && (
          <>
            <label htmlFor='motherEmployerName'>Mother's Employer Name:</label>
            <input
              type='text'
              id='motherEmployerName'
              name='motherEmployerName'
              onChange={handleOnChange}
              value={rest.motherEmployerName}
            />

            <label htmlFor='motherJobPosition'>Mother's Job Position:</label>
            <input
              type='text'
              id='motherJobPosition'
              name='motherJobPosition'
              onChange={handleOnChange}
              value={rest.motherJobPosition}
            />
          </>
        )}

        <label htmlFor='isFatherEmployed'>Is Father Employed?</label>
        <input
          type='checkbox'
          id='isFatherEmployed'
          name='isFatherEmployed'
          onChange={(e) => {
            handleOnChange(e);
            handleFatherEmployedChange(e);
          }}
          checked={isFatherEmployed}
        />

        {isFatherEmployed && (
          <>
            <label htmlFor='fatherEmployerName'>Father's Employer Name:</label>
            <input
              type='text'
              id='fatherEmployerName'
              name='fatherEmployerName'
              onChange={handleOnChange}
              value={rest.fatherEmployerName}
            />

            <label htmlFor='fatherJobPosition'>Father's Job Position:</label>
            <input
              type='text'
              id='fatherJobPosition'
              name='fatherJobPosition'
              onChange={handleOnChange}
              value={rest.fatherJobPosition}
            />

            {/* Add more fields related to father's employment as needed */}
          </>
        )}

        <label htmlFor='hasSiblings'>Does the student have siblings?</label>
        <input
          type='checkbox'
          id='hasSiblings'
          name='hasSiblings'
          onChange={(e) => {
            handleOnChange(e);
            handleSiblingsChange(e);
          }}
          checked={hasSiblings}
        />

        {hasSiblings && (
          <>
            <label htmlFor='sibling1Name'>Sibling 1 Name and Class:</label>
            <input
              type='text'
              id='sibling1Name'
              name='sibling1Name'
              onChange={handleOnChange}
              value={rest.sibling1Name}
            />

            <label htmlFor='sibling2Name'>Sibling 2 Name and Class:</label>
            <input
              type='text'
              id='sibling2Name'
              name='sibling2Name'
              onChange={handleOnChange}
              value={rest.sibling2Name}
            />

            {/* Add more fields related to siblings as needed */}
          </>
        )}

        <button onClick={showSuccessToast} className='btn'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Formtable;
