import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import EmployeeList from './pages/EmployeeList';
import Login from './pages/Login';
import AddEmployee from './pages/AddEmployee';
import UpdateEmployee from './pages/UpdateEmployee';

function App() {
  return (
    <Router>
      <Routes>
            {/* Route for the Login Page */}
          <Route path="/login" element={<Login />} />
            {/* Nested routes under Layout */}
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="update-employee/:id" element={<UpdateEmployee />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
