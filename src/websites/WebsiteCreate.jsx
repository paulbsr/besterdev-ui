import React, { useState } from "react";
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import { GiHummingbird } from "react-icons/gi";
import { toast } from 'react-toastify';

export default function WebSiteCreate({ onCreated }) {
  const [isExpanded, setExpanded] = useState(false);
  const [website_name, setWebsite_name] = useState('');
  const [website_desc, setWebsite_desc] = useState('');
  const [website_url, setWebsite_url] = useState('');
  const [website_cat, setWebsite_cat] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newRecord = {
      'websiteName': website_name,
      'websiteDesc': website_desc,
      'websiteUrl': website_url,
      'websiteCat': website_cat,
    };

    try {
      await OAuth2APIClient.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/create`, newRecord);
      toast.success(`${website_name} has been added.`);
      setWebsite_name('');
      setWebsite_desc('');
      setWebsite_url('');
      setWebsite_cat('');
      setExpanded(false);
      await onCreated?.();
    } catch (error) {
      console.error('Failed to add web resource:', error);
      toast.error('Failed to add web resource.');
    }
  };

  return (
    <section className="cyclopedia-create-card" aria-labelledby="web-resource-create-title">
      <button
        className="cyclopedia-create-toggle"
        type="button"
        aria-expanded={isExpanded}
        aria-controls="web-resource-create-form"
        onClick={() => setExpanded((expanded) => !expanded)}
      >
        <span className="cyclopedia-create-icon" aria-hidden="true"><GiHummingbird /></span>
        <span className="cyclopedia-create-copy">
          <strong id="web-resource-create-title">Add a web resource</strong>
          <span>Create a searchable tool, website, or book entry</span>
        </span>
        <span className="cyclopedia-create-action">{isExpanded ? "Close" : "New resource"}</span>
      </button>

      {isExpanded && (
        <form id="web-resource-create-form" className="cyclopedia-create-form" onSubmit={handleSubmit}>
          <label className="cyclopedia-form-field">
            <span>Resource name <span aria-hidden="true">*</span></span>
            <input className="cyclopedia-form-input" placeholder="What is it?" type="text" value={website_name} onChange={(event) => setWebsite_name(event.target.value)} required />
          </label>
          <label className="cyclopedia-form-field">
            <span>Category</span>
            <input className="cyclopedia-form-input" placeholder="Tools, websites, books..." type="text" value={website_cat} onChange={(event) => setWebsite_cat(event.target.value)} />
          </label>
          <label className="cyclopedia-form-field cyclopedia-form-field-wide">
            <span>Description <span aria-hidden="true">*</span></span>
            <textarea className="cyclopedia-form-input cyclopedia-form-textarea" placeholder="Add a clear, concise description" rows={3} value={website_desc} onChange={(event) => setWebsite_desc(event.target.value)} required />
          </label>
          <label className="cyclopedia-form-field cyclopedia-form-field-wide">
            <span>Resource URL <span aria-hidden="true">*</span></span>
            <input className="cyclopedia-form-input" placeholder="https://" type="url" value={website_url} onChange={(event) => setWebsite_url(event.target.value)} required />
          </label>
          <div className="cyclopedia-create-form-actions cyclopedia-form-field-wide">
            <button className="cyclopedia-button cyclopedia-button-primary" type="submit">Add resource</button>
            <button className="cyclopedia-button cyclopedia-button-secondary" type="button" onClick={() => setExpanded(false)}>Cancel</button>
          </div>
        </form>
      )}
    </section>
  );
}
