import { useState } from 'react';
import { Tooltip } from '@mui/material';
import { MdAddCircleOutline } from 'react-icons/md';
import { GiCheckMark } from 'react-icons/gi';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import { toast } from 'react-toastify';
import HowtoStepRecordCreate from './HowtoStepRecordCreate';
import { ImageUpload } from '../ImageUpload';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

function HowtoStepRecordAccordion({
  howtodata,
  step_idd,
  step_number,
  step_name,
  checkForRecords,
  setCheckForRecords,
}) {
  const [isExpanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(null);
  const [steprecordNumber, setStepRecordNumber] = useState('');
  const [steprecord, setStepRecord] = useState('');
  const step = howtodata.howto_steps.find((item) => item.step_id === step_idd);
  const stepRecords = [...(step?.step_records ?? [])].sort(
    (a, b) => a.steprecord_number - b.steprecord_number
  );

  const handleEdit = (record) => {
    setEditing(record.steprecord_id);
    setStepRecordNumber(record.steprecord_number);
    setStepRecord(record.steprecord);
  };

  const onEditCancel = () => {
    setEditing(null);
    setStepRecordNumber('');
    setStepRecord('');
  };

  const onEditSave = async (recordId) => {
    try {
      await OAuth2APIClient.put(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteprecord/update/${recordId}`,
        {
          steprecord_number: steprecordNumber,
          steprecord,
          steprecord_date: new Date(),
        }
      );
      setCheckForRecords((value) => !value);
      toast.success('Step record updated.');
      onEditCancel();
    } catch (requestError) {
      console.error('Failed to update step record:', requestError);
      toast.error('Unable to update this step record.');
    }
  };

  const onEditDelete = async (record) => {
    if (!window.confirm(`Delete step record ${step_number}.${record.steprecord_number}?`)) return;
    try {
      await OAuth2APIClient.delete(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteprecord/delete/${record.steprecord_id}`
      );
      setCheckForRecords((value) => !value);
      toast.success('Step record deleted.');
      if (editing === record.steprecord_id) onEditCancel();
    } catch (requestError) {
      console.error('Failed to delete step record:', requestError);
      toast.error('Unable to delete this step record.');
    }
  };

  return (
    <section className="howto-records">
      <header className="howto-records-header">
        <h3>Step records</h3>
        <div className="howto-record-tools">
          <Tooltip title="Add a step record">
            <button
              className="howto-icon-button"
              type="button"
              aria-label="Add a step record"
              aria-expanded={isExpanded}
              onClick={() => setExpanded((value) => !value)}
            >
              <MdAddCircleOutline aria-hidden="true" />
            </button>
          </Tooltip>
          <ImageUpload
            stepidfk={step_idd}
            parentstepname={step_name}
            parentstepid={step_idd}
            checkForRecords={checkForRecords}
            setCheckForRecords={setCheckForRecords}
          />
        </div>
      </header>

      {stepRecords.length ? (
        <ol className="howto-record-list">
          {stepRecords.map((record) => (
            <li className="howto-record-item" key={record.steprecord_id}>
              {record.steprecord_id === editing ? (
                <div className="howto-record-edit-fields">
                  <label className="howto-edit-field howto-record-number-field">
                    <span>Number</span>
                    <input
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
                      required
                    />
                  </label>
                </div>
              ) : (
                <p className="howto-record-text">
                  <strong>{step_number}.{record.steprecord_number}</strong>
                  <span>{record.steprecord}</span>
                </p>
              )}
              <div className="howto-step-actions">
                {record.steprecord_id === editing ? (
                  <>
                    <Tooltip title="Save changes">
                      <button className="howto-icon-button" type="button" aria-label="Save record changes" onClick={() => onEditSave(record.steprecord_id)}>
                        <GiCheckMark aria-hidden="true" />
                      </button>
                    </Tooltip>
                    <Tooltip title="Cancel editing">
                      <button className="howto-icon-button" type="button" aria-label="Cancel record editing" onClick={onEditCancel}>
                        <PiArrowCounterClockwiseBold aria-hidden="true" />
                      </button>
                    </Tooltip>
                    <Tooltip title="Delete record">
                      <button className="howto-icon-button howto-icon-button-danger" type="button" aria-label="Delete step record" onClick={() => onEditDelete(record)}>
                        <FaRegTrashAlt aria-hidden="true" />
                      </button>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip title="Edit record">
                      <button className="howto-icon-button" type="button" aria-label="Edit step record" onClick={() => handleEdit(record)}>
                        <BsPencil aria-hidden="true" />
                      </button>
                    </Tooltip>
                    <Tooltip title="Delete record">
                      <button className="howto-icon-button howto-icon-button-danger" type="button" aria-label="Delete step record" onClick={() => onEditDelete(record)}>
                        <FaRegTrashAlt aria-hidden="true" />
                      </button>
                    </Tooltip>
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="howto-edit-state howto-record-empty">No records have been added to this step yet.</p>
      )}

      {isExpanded && (
        <HowtoStepRecordCreate
          step_idd={step_idd}
          setCheckForRecords={setCheckForRecords}
        />
      )}
    </section>
  );
}

export default HowtoStepRecordAccordion;
