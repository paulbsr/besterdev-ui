import { useContext, useState } from 'react';
import { GiHummingbird } from 'react-icons/gi';
import { toast } from 'react-toastify';
import AlertContext from '../Generic/Alerts/AlertContext';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import '../cyclopedia/CyclopediaManage.css';

export default function HowtoCreate({ onCreated }) {
  const [isExpanded, setExpanded] = useState(false);
  const [howtoName, setHowtoName] = useState('');
  const [howtoDesc, setHowtoDesc] = useState('');
  const alertCtx = useContext(AlertContext);
  const howtoDate = new Date().toISOString().split('T')[0];

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await OAuth2APIClient.post(
        'https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howto/create',
        {
          howto_name: howtoName,
          howto_desc: howtoDesc,
          howto_author: null,
          howto_date: howtoDate,
        }
      );

      if (response.status !== 200) {
        toast.error('Failed to create Howto.');
        return;
      }

      toast.success(`${howtoName} added to the Howto library.`);
      setHowtoName('');
      setHowtoDesc('');
      setExpanded(false);
      await onCreated?.();
    } catch (createError) {
      console.error('Failed to create Howto:', createError);
      alertCtx.error('Failed to create Howto.');
    }
  };

  return (
    <section className="cyclopedia-create-card" aria-labelledby="howto-create-title">
      <button
        className="cyclopedia-create-toggle"
        type="button"
        aria-expanded={isExpanded}
        aria-controls="howto-create-form"
        onClick={() => setExpanded((expanded) => !expanded)}
      >
        <span className="cyclopedia-create-icon" aria-hidden="true">
          <GiHummingbird />
        </span>
        <span className="cyclopedia-create-copy">
          <strong id="howto-create-title">Add a Howto</strong>
          <span>Create a practical guide or instruction</span>
        </span>
        <span className="cyclopedia-create-action">{isExpanded ? 'Close' : 'New Howto'}</span>
      </button>

      {isExpanded && (
        <form id="howto-create-form" className="cyclopedia-create-form" onSubmit={handleSubmit}>
          <label className="cyclopedia-form-field cyclopedia-form-field-wide">
            <span>Howto name <span aria-hidden="true">*</span></span>
            <input
              className="cyclopedia-form-input"
              placeholder="What does this guide explain?"
              type="text"
              value={howtoName}
              onChange={(event) => setHowtoName(event.target.value)}
              required
            />
          </label>

          <label className="cyclopedia-form-field cyclopedia-form-field-wide">
            <span>Description <span aria-hidden="true">*</span></span>
            <textarea
              className="cyclopedia-form-input cyclopedia-form-textarea"
              placeholder="Add a clear summary of the steps or outcome"
              rows={3}
              value={howtoDesc}
              onChange={(event) => setHowtoDesc(event.target.value)}
              required
            />
          </label>

          <div className="cyclopedia-create-form-actions cyclopedia-form-field-wide">
            <button className="cyclopedia-button cyclopedia-button-primary" type="submit">
              Add Howto
            </button>
            <button
              className="cyclopedia-button cyclopedia-button-secondary"
              type="button"
              onClick={() => setExpanded(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
