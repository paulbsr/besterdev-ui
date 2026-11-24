import { useState } from 'react';
import { Tooltip } from '@mui/material';
import { AiOutlineEdit } from 'react-icons/ai';
import { GiCheckMark } from 'react-icons/gi';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import { IoFootstepsOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import HowtoStepRecordAccordion from './HowtoStepRecordAccordion';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

export default function HowtoStep({
  howto_id,
  step_id,
  step_number,
  step_name,
  step_url,
  step_obj,
  step_image,
  howtodata,
  checkForRecords,
  setCheckForRecords,
}) {
  const [isExpanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [stepnumber, setStepNumber] = useState(step_number);
  const [stepname, setName] = useState(step_name);
  const [stepurl, setStepURL] = useState(step_url);
  const [stepobjective, setStepObjective] = useState(step_obj);

  const handleEdit = () => {
    setStepNumber(step_number);
    setName(step_name);
    setStepURL(step_url);
    setStepObjective(step_obj);
    setEditing(true);
  };

  const onEditCancel = () => {
    setEditing(false);
    setStepNumber(step_number);
    setName(step_name);
    setStepURL(step_url);
    setStepObjective(step_obj);
  };

  const onEditSave = async () => {
    try {
      await OAuth2APIClient.put(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtostep/update/${step_id}`,
        {
          step_number: stepnumber,
          step_name: stepname,
          step_url: stepurl,
          step_obj: stepobjective,
        }
      );
      setCheckForRecords((value) => !value);
      toast.success(`${stepname} updated.`);
      setEditing(false);
    } catch (requestError) {
      console.error('Failed to update Howto step:', requestError);
      toast.error('Unable to update this step.');
    }
  };

  return (
    <article className={`howto-step-card${isExpanded ? ' is-expanded' : ''}`}>
      <header className="howto-step-header">
        <button
          className="howto-step-toggle"
          type="button"
          aria-expanded={isExpanded}
          aria-controls={`howto-step-content-${step_id}`}
          onClick={() => setExpanded((value) => !value)}
        >
          <span className="howto-step-number">
            Step-{editing ? stepnumber || step_number : step_number}
          </span>
          <IoFootstepsOutline className="howto-step-mark" aria-hidden="true" />
          <span className="howto-step-title">
            {editing ? stepname || 'Untitled step' : step_name}
          </span>
          <span className="howto-step-indicator" aria-hidden="true">{isExpanded ? '−' : '+'}</span>
        </button>
        <div className="howto-step-actions">
          {editing ? (
            <>
              <Tooltip title="Save changes">
                <button className="howto-icon-button" type="button" aria-label="Save step changes" onClick={onEditSave}>
                  <GiCheckMark aria-hidden="true" />
                </button>
              </Tooltip>
              <Tooltip title="Cancel editing">
                <button className="howto-icon-button" type="button" aria-label="Cancel step editing" onClick={onEditCancel}>
                  <PiArrowCounterClockwiseBold aria-hidden="true" />
                </button>
              </Tooltip>
            </>
          ) : isExpanded && step_name !== 'DONE' ? (
            <Tooltip title={`Edit step ${step_number}`}>
              <button className="howto-icon-button" type="button" aria-label={`Edit step ${step_number}`} onClick={handleEdit}>
                <AiOutlineEdit aria-hidden="true" />
              </button>
            </Tooltip>
          ) : null}
        </div>
      </header>

      {isExpanded && (
        <div className="howto-step-content" id={`howto-step-content-${step_id}`}>
          {editing ? (
            <div className="howto-step-edit-fields">
              <label className="howto-edit-field">
                <span>Step number</span>
                <input value={stepnumber ?? ''} onChange={(event) => setStepNumber(event.target.value)} required />
              </label>
              <label className="howto-edit-field howto-edit-field-wide">
                <span>Step name</span>
                <input value={stepname ?? ''} onChange={(event) => setName(event.target.value)} required />
              </label>
              <label className="howto-edit-field howto-edit-field-wide">
                <span>Supporting URL</span>
                <input value={stepurl ?? ''} onChange={(event) => setStepURL(event.target.value)} required />
              </label>
              <label className="howto-edit-field howto-edit-field-wide">
                <span>Step objective</span>
                <textarea
                  rows={3}
                  value={stepobjective ?? ''}
                  onChange={(event) => setStepObjective(event.target.value)}
                  required
                />
              </label>
            </div>
          ) : (
            <div className="howto-step-details">
              {step_url && (
                <a className="howto-step-url" href={step_url} target="_blank" rel="noreferrer">
                  {step_url}
                </a>
              )}
              {step_obj && <p className="howto-step-objective">{step_obj}</p>}
              {step_image && (
                <img
                  className="howto-step-image"
                  src={`data:image/jpeg;base64,${step_image}`}
                  alt={`Illustration for step ${step_number}: ${step_name}`}
                />
              )}
            </div>
          )}
          <HowtoStepRecordAccordion
            step_idd={step_id}
            howto_id={howto_id}
            howtodata={howtodata}
            step_number={step_number}
            step_name={step_name}
            checkForRecords={checkForRecords}
            setCheckForRecords={setCheckForRecords}
          />
        </div>
      )}
    </article>
  );
}
