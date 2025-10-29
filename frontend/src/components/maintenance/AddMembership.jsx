import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import axios from "../services/api";


const AddMembership = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    contactAddress: '',
    aadharCardNo: '',
    startDate: new Date().toISOString().split('T')[0],
    membershipDuration: '6months'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate all fields
    if (!formData.firstName || !formData.lastName || !formData.contactNumber || 
        !formData.contactAddress || !formData.aadharCardNo || !formData.startDate) {
      setError('All fields are required');
      return;
    }

    // Validate contact number
    if (!/^[0-9]{10}$/.test(formData.contactNumber)) {
      setError('Please enter a valid 10-digit contact number');
      return;
    }

    // Validate Aadhar number
    if (!/^[0-9]{12}$/.test(formData.aadharCardNo)) {
      setError('Please enter a valid 12-digit Aadhar number');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/maintenance/membership/add', formData);
      navigate('/transaction-success');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add membership');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Add Membership</h1>
        
        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>First Name: *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Last Name: *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Contact Number: *</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="10-digit number"
              maxLength="10"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Contact Address: *</label>
            <textarea
              name="contactAddress"
              value={formData.contactAddress}
              onChange={handleChange}
              rows="3"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Aadhar Card No: *</label>
            <input
              type="text"
              name="aadharCardNo"
              value={formData.aadharCardNo}
              onChange={handleChange}
              placeholder="12-digit number"
              maxLength="12"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Start Date: *</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Membership Duration: *</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="membershipDuration"
                  value="6months"
                  checked={formData.membershipDuration === '6months'}
                  onChange={handleChange}
                  disabled={loading}
                />
                6 Months
              </label>
              <label>
                <input
                  type="radio"
                  name="membershipDuration"
                  value="1year"
                  checked={formData.membershipDuration === '1year'}
                  onChange={handleChange}
                  disabled={loading}
                />
                1 Year
              </label>
              <label>
                <input
                  type="radio"
                  name="membershipDuration"
                  value="2years"
                  checked={formData.membershipDuration === '2years'}
                  onChange={handleChange}
                  disabled={loading}
                />
                2 Years
              </label>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Confirm'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate('/admin/home')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMembership;