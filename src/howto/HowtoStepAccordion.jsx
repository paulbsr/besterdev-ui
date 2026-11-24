import { useEffect, useState } from 'react';
import { BsPatchQuestion } from 'react-icons/bs';
import HowtoStep from './HowtoStep';
import HowtoStepCreate from './HowtoStepCreate';
import HowtoUrlCreate from './HowtoUrlCreate';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

function HowtoStepAccordion({ howto_ids, onResourceCreated }) {
  const [checkForRecords, setCheckForRecords] = useState(false);
  const [howtodata, setHowtoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    OAuth2APIClient.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howto/${howto_ids}`)
      .then(({ data }) => {
        if (!active) return;
        const howto = {
          ...data,
          howto_steps: [...(data.howto_steps ?? [])].sort((a, b) => a.step_number - b.step_number),
        };
        setHowtoData(howto);
        setError(null);
      })
      .catch((requestError) => {
        console.error('Failed to load Howto:', requestError);
        if (active) setError(requestError);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [howto_ids, checkForRecords]);

  if (loading) {
    return <div className="howto-steps-card howto-edit-state" role="status">Loading guide…</div>;
  }

  if (error) {
    return (
      <div className="howto-steps-card howto-edit-state howto-edit-error" role="alert">
        Unable to load this guide: {error.message}
      </div>
    );
  }

  if (!howtodata) {
    return <div className="howto-steps-card howto-edit-state">This guide could not be found.</div>;
  }

  return (
    <section className="howto-steps-card" aria-labelledby="howto-steps-heading">
      <header className="howto-guide-heading">
        <div className="howto-guide-icon" aria-hidden="true"><BsPatchQuestion /></div>
        <div>
          <p className="howto-edit-eyebrow">GUIDE CONTENT</p>
          <h2 id="howto-steps-heading">{howtodata.howto_name}</h2>
          {howtodata.howto_desc && <p>{howtodata.howto_desc}</p>}
        </div>
      </header>

      <div className="howto-create-tools">
        <HowtoStepCreate
          howto_idb={howto_ids}
          howto_name={howtodata.howto_name}
          setCheckForRecords={setCheckForRecords}
        />
        <HowtoUrlCreate
          howto_idb={howto_ids}
          howto_name={howtodata.howto_name}
          setCheckForRecords={setCheckForRecords}
          onResourceCreated={onResourceCreated}
        />
      </div>

      <div className="howto-steps-list">
        {howtodata.howto_steps.length ? (
          howtodata.howto_steps.map((step) => (
            <HowtoStep
              key={step.step_id}
              howto_id={step.howto_id}
              step_id={step.step_id}
              step_number={step.step_number}
              step_name={step.step_name}
              step_url={step.step_url}
              step_obj={step.step_obj}
              step_image={step.step_image?.image_data}
              howtodata={howtodata}
              checkForRecords={checkForRecords}
              setCheckForRecords={setCheckForRecords}
            />
          ))
        ) : (
          <p className="howto-edit-state">No steps yet. Add the first step to this guide.</p>
        )}
      </div>
    </section>
  );
}

export default HowtoStepAccordion;
