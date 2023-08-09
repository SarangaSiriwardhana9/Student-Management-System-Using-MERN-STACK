import React from "react";
import { useSpring, animated } from "react-spring";

const StudentDetailsPage = ({ student, handleBack }) => {
  const animation = useSpring({
    config: {
      tension: 280,
      friction: 20,
    },
    from: {
      opacity: 0,
      transform: "translateY(50px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  });

  return (
    <animated.div className='modal-overlay fixed inset-0 flex justify-center items-center bg-opacity-75 bg-gray-900'>
      <div className='modal-content bg-white p-6 rounded shadow-lg w-96'>
        <button
          className='btn-close absolute right-4 top-4 text-gray-600'
          onClick={handleBack}
        >
          <i className='fas fa-times'></i>
        </button>
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>
          Student Details
        </h1>
        <div className='grid grid-cols-2 gap-4 text-gray-600'>
          <div className='details-row'>
            <span className='font-bold'>Name:</span> {student.name}
          </div>
          <div className='details-row'>
            <span className='font-bold'>Address:</span> {student.address}
          </div>
          <div className='details-row'>
            <span className='font-bold'>Grade:</span> {student.grade}
          </div>
          <div className='details-row'>
            <span className='font-bold'>Class:</span> {student.class}
          </div>
          <div className='details-row'>
            <span className='font-bold'>Home Mobile:</span> {student.homeMobile}
          </div>
          <div className='details-row'>
            <span className='font-bold'>Mother's Name:</span>{" "}
            {student.motherName}
          </div>
          <div className='details-row'>
            <span className='font-bold'>Father's Name:</span>{" "}
            {student.fatherName}
          </div>
          <div className='details-row'>
            <span className='font-bold'>Mother's Mobile:</span>{" "}
            {student.motherMobile}
          </div>
          <div className='details-row'>
            <span className='font-bold'>Father's Mobile:</span>{" "}
            {student.fatherMobile}
          </div>
          <div className='details-row'>
            <span className='font-bold'>Is Mother Employed:</span>{" "}
            {student.isMotherEmployed ? "Yes" : "No"}
          </div>
          {student.isMotherEmployed && (
            <>
              <div className='details-row'>
                <span className='font-bold'>Mother's Employer Name:</span>{" "}
                {student.motherEmployerName}
              </div>
              <div className='details-row'>
                <span className='font-bold'>Mother's Job Position:</span>{" "}
                {student.motherJobPosition}
              </div>
            </>
          )}
          <div className='details-row'>
            <span className='font-bold'>Is Father Employed:</span>{" "}
            {student.isFatherEmployed ? "Yes" : "No"}
          </div>
          {student.isFatherEmployed && (
            <>
              <div className='details-row'>
                <span className='font-bold'>Father's Employer Name:</span>{" "}
                {student.fatherEmployerName}
              </div>
              <div className='details-row'>
                <span className='font-bold'>Father's Job Position:</span>{" "}
                {student.fatherJobPosition}
              </div>
            </>
          )}
          <div className='details-row'>
            <span className='font-bold'>Has Siblings:</span>{" "}
            {student.hasSiblings ? "Yes" : "No"}
          </div>
          {student.hasSiblings && (
            <>
              <div className='details-row'>
                <span className='font-bold'>Sibling 1 Name:</span>{" "}
                {student.sibling1Name}
              </div>
              <div className='details-row'>
                <span className='font-bold'>Sibling 2 Name:</span>{" "}
                {student.sibling2Name}
              </div>
            </>
          )}
        </div>
      </div>
    </animated.div>
  );
};

export default StudentDetailsPage;
