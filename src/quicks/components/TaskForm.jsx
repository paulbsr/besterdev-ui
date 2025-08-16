import { useState } from 'react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { createRecord } from '../services/apiService';

export default function TaskForm() {
  const [taskData, setTaskData] = useState({
    module: '',
    projecthandle: '',
    taskname: '',
    taskrequirement: '',
    tasktargetdate: null
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskData.tasktargetdate) return;

    const payload = {
      taskname: taskData.taskname,
      taskrequirement: taskData.taskrequirement,
      taskowner: 'Bester',
      tasktargetdate: taskData.tasktargetdate,
      taskcreatedate: new Date(),
      taskstatus: 'START',
      asms: taskData.module,
      projecthandle: taskData.projecthandle,
      tasknextstep: ''
    };

    if (await createRecord('/api/v1/tasks/create', payload)) {
      toast.success('Task added.');
    } else {
      toast.error('Task not added.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Module:</label>
      <select name="module" onChange={handleChange} required>
        <option disabled value="">Module</option>
        <option value="113092" data-value2="NetworkSecurity">NetworkSecurity</option>
        <option value="14718" data-value2="EnterpriseSecurity">EnterpriseSecurity</option>
        <option value="181268" data-value2="ComputerCloudSecurity">ComputerCloudSecurity</option>
        <option value="171593" data-value2="AppliedCryptography">AppliedCryptography</option>
        <option value="168272" data-value2="Dissertation">Dissertation</option>
        <option value="188118" data-value2="UserStory">UserStory</option>
      </select>

      <label>Task Name:</label>
      <input name="taskname" value={taskData.taskname} onChange={handleChange} required />

      <label>Description:</label>
      <input name="taskrequirement" value={taskData.taskrequirement} onChange={handleChange} />

      <label>Target:</label>
      <DatePicker
        selected={taskData.tasktargetdate}
        onChange={(date) => setTaskData({ ...taskData, tasktargetdate: date })}
        dateFormat="yyyy.MM.dd"
        minDate={new Date()}
        placeholderText="Target Date"
      />

      <button type="submit">Memorialize</button>
    </form>
  );
}
