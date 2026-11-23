const ColouredBox = ({ fn, ln, age, gender, jd, state, country, skill1, mobile, email }) => (
  <article className="candidate-profile-card" aria-label={`${fn} ${ln} candidate profile`}>
    <header className="candidate-profile-header">
      <div className="candidate-profile-avatar" aria-hidden="true">
        {fn?.charAt(0)}{ln?.charAt(0)}
      </div>
      <div>
        <h3>{fn} {ln}</h3>
        <p>{age} years old <span aria-hidden="true">·</span> {gender}</p>
      </div>
    </header>
    <dl className="candidate-profile-details">
      <div>
        <dt>Location</dt>
        <dd>{[state, country].filter(Boolean).join(', ') || '—'}</dd>
      </div>
      <div>
        <dt>Job description</dt>
        <dd>{jd || '—'}</dd>
      </div>
      <div>
        <dt>Primary skill</dt>
        <dd>{skill1 || '—'}</dd>
      </div>
      <div>
        <dt>Phone</dt>
        <dd>{mobile || '—'}</dd>
      </div>
      <div className="candidate-profile-email">
        <dt>Email</dt>
        <dd>{email || '—'}</dd>
      </div>
    </dl>
  </article>
);

export default ColouredBox;
