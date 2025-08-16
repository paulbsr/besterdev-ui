import { useState } from 'react';
import { toast } from 'react-toastify';
import { createRecord } from '../services/apiService';

export default function WebsiteForm({ categories, onSuccess }) {
  const [formData, setFormData] = useState({ websiteName: '', websiteDesc: '', websiteUrl: '', websiteCat: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await createRecord('/api/v1/websites/create', formData)) {
      toast.success(`${formData.websiteName} added.`);
      setFormData({ websiteName: '', websiteDesc: '', websiteUrl: '', websiteCat: '' });
      onSuccess?.();
    } else {
      toast.error('Error adding website.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Website:</label>
      <input name="websiteName" value={formData.websiteName} onChange={handleChange} required />

      <label>URL:</label>
      <input name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} required />

      <label>Category:</label>
      <select name="websiteCat" value={formData.websiteCat} onChange={handleChange} required>
        <option value="" disabled>Required</option>
        {categories?.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      <button type="submit">Memorialize</button>
    </form>
  );
}
