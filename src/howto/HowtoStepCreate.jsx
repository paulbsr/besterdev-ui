import { useState } from 'react';
import { GiHummingbird } from 'react-icons/gi';
import { IoFootstepsOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

export default function HowtoStepCreate({
  howto_idb,
  howto_name,
  setCheckForRecords,
}) {
  const [isExpanded, setExpanded] = useState(false);
  const [stepNumber, setStepNumber] = useState('');
  const [stepName, setStepName] = useState('');
  const [stepUrl, setStepUrl] = useState('');
  const [stepObjective, setStepObjective] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await OAuth2APIClient.post(
        'https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtostep/create',
        {
          howto_id_fk: howto_idb,
          step_number: stepNumber,
          step_name: stepName,
          step_url: stepUrl,
          step_obj: stepObjective,
        }
      );
      setCheckForRecords((value) => !value);
      toast.success(`Step ${stepNumber} added.`);
      setStepNumber('');
      setStepName('');
      setStepUrl('');
      setStepObjective('');
      setExpanded(false);
    } catch (requestError) {
      console.error('Failed to add Howto step:', requestError);
      toast.error('Unable to add this step.');
    }
  };

  return (
    <section className="howto-create-panel">
      <button
        className="howto-create-toggle"
        type="button"
        aria-expanded={isExpanded}
        onClick={() => setExpanded((value) => !value)}
      >
        <span className="howto-create-icon" aria-hidden="true">
          <GiHummingbird /><IoFootstepsOutline />
        </span>
        <span><strong>Add a step</strong><small>Break the guide into actionable instructions.</small></span>
        <span className="howto-create-indicator" aria-hidden="true">{isExpanded ? '−' : '+'}</span>
      </button>
      {isExpanded && (
        <form className="howto-create-form" onSubmit={handleSubmit}>
          <label className="howto-edit-field howto-step-number-field">
            <span>Step number</span>
            <input
              type="number"
              min="1"
              value={stepNumber}
              onChange={(event) => setStepNumber(event.target.value)}
              required
            />
          </label>
          <label className="howto-edit-field">
            <span>Step name</span>
            <input
              value={stepName}
              onChange={(event) => setStepName(event.target.value)}
              placeholder="What should the reader do?"
              required
            />
          </label>
          <label className="howto-edit-field howto-edit-field-wide">
            <span>Supporting URL <small>Optional</small></span>
            <input
              type="url"
              value={stepUrl}
              onChange={(event) => setStepUrl(event.target.value)}
              placeholder="https://"
            />
          </label>
          <label className="howto-edit-field howto-edit-field-wide">
            <span>Step objective <small>Optional</small></span>
            <textarea
              rows={3}
              value={stepObjective}
              onChange={(event) => setStepObjective(event.target.value)}
              placeholder="Describe the outcome or supporting details"
            />
          </label>
          <div className="howto-create-actions">
            <button className="howto-button howto-button-primary" type="submit">
              Add step to {howto_name}
            </button>
            <button className="howto-button howto-button-secondary" type="button" onClick={() => setExpanded(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
