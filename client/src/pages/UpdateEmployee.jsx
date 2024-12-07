import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee, getEmployee } from '../Redux/Slices/employeeSlice'; // Assuming you have this action

export default function UpdateEmployee() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile_no, setMobile_no] = useState('');
  const [designation, setDesignation] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Get employee data from the Redux store
  const employee = useSelector((state) => state.employee.employeeDetails);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const res=await dispatch(getEmployee(id)); // This will trigger the Redux action to fetch data
        // console.log(res.payload.data)
        setName(res.payload.data.name);
        setEmail(res.payload.data.email);
        setMobile_no(res.payload.data.mobile_no);
        setDesignation(res.payload.data.designation);
      } 
      catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, []); // Fetch employee data when id changes



  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(id);  // Make sure 'id' is defined and accessible

    // Dispatch the action to update employee details with the id
    const res = await dispatch(updateEmployee({ details: { name, email, mobile_no, designation }, id }));

    // console.log(res);  // Check the result

    if (res.type === 'updateEmployee/fulfilled') {  // Check if the action was fulfilled
        alert('Employee updated successfully!');
        navigate('/employees');  // Navigate to employee list after successful update
    } else {
        alert('Failed to update employee!');  // If action failed
    }
};


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Update Employee</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile_no" className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="tel"
            id="mobile_no"
            value={mobile_no}
            onChange={(e) => setMobile_no(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
          <input
            type="text"
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/employees')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
