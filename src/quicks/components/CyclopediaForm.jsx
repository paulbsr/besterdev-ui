import { useState } from 'react';
import { toast } from 'react-toastify';
import { createRecord } from '../services/apiService';

export default function CyclopediaForm({ onSuccess }) {
  const [formData, setFormData] = useState({ cyclopediaName: '', cyclopediaDesc: '', cyclopediaUrl: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await createRecord('/api/v1/cyclopedia/create', formData)) {
      toast.success(`${formData.cyclopediaName} memorialized.`);
      setFormData({ cyclopediaName: '', cyclopediaDesc: '', cyclopediaUrl: '' });
      onSuccess?.();
    } else {
      toast.error('Error adding Cyclopedia record.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Cyclopedia:</label>
      <input name="cyclopediaName" value={formData.cyclopediaName} onChange={handleChange} required />

      <label>URL:</label>
      <input name="cyclopediaUrl" value={formData.cyclopediaUrl} onChange={handleChange} />

      <label>Description:</label>
      <textarea name="cyclopediaDesc" value={formData.cyclopediaDesc} onChange={handleChange} required />

      <button type="submit">Memorialize</button>
    </form>
  );
}
