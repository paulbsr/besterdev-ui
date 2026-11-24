import { useState } from 'react';
import { toast } from 'react-toastify';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

export default function HowtoStepRecordCreate({
  step_idd,
  setCheckForRecords,
}) {
  const [steprecordNumber, setStepRecordNumber] = useState('');
  const [steprecord, setStepRecord] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await OAuth2APIClient.post(
        'https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteprecord/create',
        {
          steprecord_parent: step_idd,
          steprecord_number: steprecordNumber,
          steprecord,
          steprecord_date: new Date(),
          step_id_fk: step_idd,
        }
      );
      setCheckForRecords((value) => !value);
      toast.success(`Step record ${steprecordNumber} added.`);
      setStepRecordNumber('');
      setStepRecord('');
    } catch (requestError) {
      console.error('Failed to add step record:', requestError);
      toast.error('Unable to add this step record.');
    }
  };

  return (
    <form className="howto-record-create-form" onSubmit={handleSubmit}>
      <label className="howto-edit-field howto-record-number-field">
        <span>Number</span>
        <input
          type="number"
          min="1"
          value={steprecordNumber}
          onChange={(event) => setStepRecordNumber(event.target.value)}
          required
        />
      </label>
      <label className="howto-edit-field">
        <span>Record details</span>
        <input
          value={steprecord}
          onChange={(event) => setStepRecord(event.target.value)}
          placeholder="Describe this detail"
          required
        />
      </label>
      <button className="howto-button howto-button-primary" type="submit">Add record</button>
    </form>
  );
}
