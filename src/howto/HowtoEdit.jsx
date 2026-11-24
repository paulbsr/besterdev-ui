import { useMemo } from 'react';
import { BsPatchQuestion } from 'react-icons/bs';
import { useWebsiteApi } from '../websites/WebSiteAPIProvider';
import HowtoStepAccordion from './HowtoStepAccordion';

export default function HowtoEdit({ howto_id }) {
  const { websiterootdata, loading, error, setRefreshWebsiterootdata } = useWebsiteApi();

  const websites = useMemo(() => {
    if (!Array.isArray(websiterootdata)) return [];
    return websiterootdata
      .filter((site) => String(site.howtoIdFk) === String(howto_id))
      .sort((a, b) => (a.websiteName || '').localeCompare(b.websiteName || ''));
  }, [websiterootdata, howto_id]);

  return (
    <main className="howto-edit-page">
      <header className="howto-edit-header">
        <span className="howto-edit-header-icon" aria-hidden="true"><BsPatchQuestion /></span>
        <div>
          <p className="howto-edit-eyebrow">HOW-TO LIBRARY</p>
          <h1>Edit guide</h1>
          <p>Manage the guide’s resources, steps, and supporting details.</p>
        </div>
      </header>

      <div className="howto-edit-layout">
        <aside className="howto-resources-card" aria-labelledby="howto-resources-heading">
          <div className="howto-resources-header">
            <div>
              <p className="howto-edit-eyebrow">REFERENCE MATERIAL</p>
              <h2 id="howto-resources-heading">Related resources</h2>
            </div>
            <span className="howto-resource-count">{loading ? '…' : websites.length}</span>
          </div>
          {loading ? (
            <p className="howto-edit-state" role="status">Loading resources…</p>
          ) : error ? (
            <p className="howto-edit-state howto-edit-error" role="alert">
              Unable to load resources: {error.message}
            </p>
          ) : websites.length ? (
            <ul className="howto-resource-list">
              {websites.map((site) => (
                <li key={site.websiteId}>
                  <a href={site.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <strong>{site.websiteName}</strong>
                    {site.websiteDesc && <span>{site.websiteDesc}</span>}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="howto-edit-state">No related resources have been added to this guide.</p>
          )}
        </aside>

        <HowtoStepAccordion
          howto_ids={howto_id}
          onResourceCreated={() => setRefreshWebsiterootdata((value) => !value)}
        />
      </div>
    </main>
  );
}
