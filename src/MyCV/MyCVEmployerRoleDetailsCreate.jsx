import React, { useContext, useState } from "react";
import axios from "axios";
import "../Fonts.css";
import { toast } from 'react-toastify';

export default function MyCVEmployerRoleDetailsCreate(props) {
  const current = new Date();
  const [roledetaildesc, setRoledetaildesc] = useState("");
  const [roledetailname, setRoledetailname] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    var RoleDetailPost =
    {
      roledetail_desc: roledetaildesc,
      roledetail_name: roledetailname,
      fk_role_id: props.parent_role_id1,
      parent_role_id: props.parent_role_id1,
    };

      const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/role_detail/create`, RoleDetailPost);
      if (response.status === 200) {
        props.setCheckForRecords(!props.checkForRecords);
        toast.success(`Role Detail added.`)
      }
      else { toast.error(`oops! Something went wrong in TaskRecordCreate`); }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        &nbsp;
        <input
          required
          defaultValue={props.parent_role_id1}
          onChange={(e) => setRoledetailname(e.target.value)}
          style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '7px', width: '300px' }} />

        &nbsp;

        <input
          required
          defaultValue={props.parent_role_id1}
          onChange={(e) => setRoledetaildesc(e.target.value)}
          style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '7px', width: '780px' }} />
          
        &nbsp;
        
        <button
          className="Font-Verdana-Small-Postgres"
          type="submit"
          style={{ height: '30.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#D5441C', cursor: 'pointer' }}
        > Add 
        </button>
      </form>
      <div>&nbsp;</div>
    </>
  );
}