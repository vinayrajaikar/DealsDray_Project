import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {getAllEmployees, deleteEmployee} from '../Redux/Slices/employeeSlice';


export default function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);

  const fetchAllEmployees = async () => {
    try {
        const resultAction = await dispatch(getAllEmployees());
        // Access the payload using `unwrapResult` if you need just the payload.
        console.log(resultAction.payload.data)
        setEmployees(resultAction.payload.data);

    } catch (error) {
        console.error("Failed to fetch employees: ", error);
    }
};

  useEffect(() => {
      fetchAllEmployees();
  }, []);

  const deleteEmployeee = async (id) => {
    try {
      const res=await dispatch(deleteEmployee(id));
      console.log(res);
      fetchAllEmployees();
    } catch (error) {
      console.error("Failed to delete employee: ", error);
    }
  };


  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employee List</h1>
        <Link to="/add-employee" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add New Employee
        </Link>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search employees"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee_id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.employee_id}>
                <td className="px-6 py-4 whitespace-nowrap">{employee.employee_id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.mobile_no}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.designation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/update-employee/${employee.employee_id}`} className="text-blue-600 hover:text-blue-900 mr-4">Edit</Link>
                  <button className="text-red-600 hover:text-red-900" onClick={() => deleteEmployeee(employee.employee_id)} >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

