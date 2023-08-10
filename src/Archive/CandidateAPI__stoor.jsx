<GradientLineLinkedIn />

<div className='Font-Verdana-Medium-LinkedIn'>&nbsp; &nbsp;
  <Tooltip id="insert" />
  <div onClick={toggleAccordion}>
    &nbsp; &nbsp;<a data-tooltip-id="insert" data-tooltip-content="Select">
      <FaLinkedin style={{ color: '#0A66C2', fontSize: '35px', cursor: 'pointer' }} /></a>
    &nbsp;<b>Find Candidates on LinkedIn:</b>
  </div>
  <div>&nbsp;</div>
</div>


<div>&nbsp;</div>
<div>
  &nbsp; &nbsp; Country:&nbsp;
  <select className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '230px' }} id="dropdown" value={wa} onChange={(event) => setLinkedinCountry(event.target.value)}>
    <option disabled selected value="Tax Domiciled">Tax Domiciled</option>
    <option value="IE">Ireland (Rep)</option>
    <option value="NI">Ireland (NI)</option>
    <option value="EN">England</option>
    <option value="WA">Wales</option>
    <option value="SC">Scotland</option>
  </select>
  <img alt="1" src={spacer} />Job Title:&nbsp;<input className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '300px' }} placeholder="Software Engineering Manager" type="text" value={linkedinjobdesc} onChange={(event) => setLinkedinJobdesc(event.target.value)} required />
  <img alt="1" src={spacer} />Skill:&nbsp;<input className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '300px' }} placeholder="DevOps" type="text" value={linkedinskill} onChange={(event) => setLinkedinSkill(event.target.value)} required />
  <img alt="1" src={spacer} />

  <button
    className="Font-Verdana-Medium-Postgres"
    type="button" // Change the type to "button" to prevent form submission
    style={{ marginLeft: '10px', height: '37.5px', border: '2px solid #0A66C2', borderRadius: '5px', backgroundColor: '#f7f4f3', color: '#0A66C2', cursor: 'pointer' }}
    onClick={onSearchLinkedIn}>
    <b>Search LinkedIn</b>
  </button>
</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<GradientLineLinkedIn />