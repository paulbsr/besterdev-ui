import { useState } from "react";
import { GiHummingbird } from "react-icons/gi";
import { toast } from "react-toastify";
import OAuth2APIClient from "../oauth2/OAuth2APIClient";

export default function CyclopediaCreate({ onCreated }) {
  const [isExpanded, setExpanded] = useState(false);
  const [cyclopediaName, setCyclopediaName] = useState("");
  const [cyclopediaDescription, setCyclopediaDescription] = useState("");
  const [cyclopediaUrl, setCyclopediaUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await OAuth2APIClient.post("/api/v1/cyclopedia/create", {
        cyclopediaName,
        cyclopediaDesc: cyclopediaDescription,
        cyclopediaUrl,
      });

      toast.success(`${cyclopediaName} added to the Cyclopedia.`);
      setCyclopediaName("");
      setCyclopediaDescription("");
      setCyclopediaUrl("");
      setExpanded(false);
      await onCreated?.();
    } catch (error) {
      console.error("Failed to add Cyclopedia entry:", error);
      toast.error("Failed to add Cyclopedia entry.");
    }
  };

  return (
    <section className="cyclopedia-create-card" aria-labelledby="cyclopedia-create-title">
      <button
        className="cyclopedia-create-toggle"
        type="button"
        aria-expanded={isExpanded}
        aria-controls="cyclopedia-create-form"
        onClick={() => setExpanded((expanded) => !expanded)}
      >
        <span className="cyclopedia-create-icon" aria-hidden="true">
          <GiHummingbird />
        </span>
        <span className="cyclopedia-create-copy">
          <strong id="cyclopedia-create-title">Add a Cyclopedia entry</strong>
          <span>Create a searchable knowledge entry</span>
        </span>
        <span className="cyclopedia-create-action">
          {isExpanded ? "Close" : "New entry"}
        </span>
      </button>

      {isExpanded && (
        <form
          id="cyclopedia-create-form"
          className="cyclopedia-create-form"
          onSubmit={handleSubmit}
        >
          <label className="cyclopedia-form-field">
            <span>Entry name <span aria-hidden="true">*</span></span>
            <input
              className="cyclopedia-form-input"
              placeholder="What is it?"
              type="text"
              value={cyclopediaName}
              onChange={(event) => setCyclopediaName(event.target.value)}
              required
            />
          </label>

          <label className="cyclopedia-form-field cyclopedia-form-field-wide">
            <span>Description <span aria-hidden="true">*</span></span>
            <textarea
              className="cyclopedia-form-input cyclopedia-form-textarea"
              placeholder="Add a clear, concise explanation"
              rows={3}
              value={cyclopediaDescription}
              onChange={(event) => setCyclopediaDescription(event.target.value)}
              required
            />
          </label>

          <label className="cyclopedia-form-field cyclopedia-form-field-wide">
            <span>Reference URL <span className="cyclopedia-form-optional">(optional)</span></span>
            <input
              className="cyclopedia-form-input"
              placeholder="https://"
              type="url"
              value={cyclopediaUrl}
              onChange={(event) => setCyclopediaUrl(event.target.value)}
            />
          </label>

          <div className="cyclopedia-create-form-actions cyclopedia-form-field-wide">
            <button className="cyclopedia-button cyclopedia-button-primary" type="submit">
              Add entry
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
