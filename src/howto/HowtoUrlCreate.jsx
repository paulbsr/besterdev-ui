import { useState } from 'react';
import { GiHummingbird, GiSpiderWeb } from 'react-icons/gi';
import { toast } from 'react-toastify';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

export default function HowtoUrlCreate({
  howto_idb,
  howto_name,
  setCheckForRecords,
  onResourceCreated,
}) {
  const [isExpanded, setExpanded] = useState(false);
  const [websiteName, setWebsiteName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteDesc, setWebsiteDesc] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await OAuth2APIClient.post(
        'https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/create',
        {
          howtoIdFk: howto_idb,
          websiteName,
          websiteUrl,
          websiteDesc,
          websiteCat: howto_name,
        }
      );
      setCheckForRecords((value) => !value);
      onResourceCreated();
      toast.success(`${websiteName} added to this guide.`);
      setWebsiteName('');
      setWebsiteUrl('');
      setWebsiteDesc('');
      setExpanded(false);
    } catch (requestError) {
      console.error('Failed to add Howto resource:', requestError);
      toast.error('Unable to add this resource.');
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
          <GiHummingbird /><GiSpiderWeb />
        </span>
        <span><strong>Add a resource</strong><small>Keep useful links close to the guide.</small></span>
        <span className="howto-create-indicator" aria-hidden="true">{isExpanded ? '−' : '+'}</span>
      </button>
      {isExpanded && (
        <form className="howto-create-form" onSubmit={handleSubmit}>
          <label className="howto-edit-field howto-edit-field-wide">
            <span>Display name</span>
            <input
              value={websiteName}
              onChange={(event) => setWebsiteName(event.target.value)}
              placeholder="Resource title"
              required
            />
          </label>
          <label className="howto-edit-field howto-edit-field-wide">
            <span>Website URL</span>
            <input
              type="url"
              value={websiteUrl}
              onChange={(event) => setWebsiteUrl(event.target.value)}
              placeholder="https://"
              required
            />
          </label>
          <label className="howto-edit-field howto-edit-field-wide">
            <span>Description <small>Optional</small></span>
            <textarea
              rows={2}
              value={websiteDesc}
              onChange={(event) => setWebsiteDesc(event.target.value)}
              placeholder="What is this resource useful for?"
            />
          </label>
          <div className="howto-create-actions">
            <button className="howto-button howto-button-primary" type="submit">
              Add resource to {howto_name}
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
