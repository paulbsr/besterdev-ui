import { useState, useEffect } from 'react';
import axios from 'axios';
import './Fonts.css';
import 'react-dropdown/style.css';
import { FaPen, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

const API_BASE = 'https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/roles';

export default function RoleManage() {
  const [roles, setRoles] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedRole, setEditedRole] = useState({
    rolename: '',
    roledesc: '',
    roleskill1: '',
    roleskill2: '',
    roleskill3: ''
  });

  // Fetch roles on mount or refresh
  useEffect(() => {
    axios
      .get(API_BASE)
      .then(({ data }) => {
        const sorted = data.sort((a, b) => a.rolename.localeCompare(b.rolename));
        setRoles(sorted);
      })
      .catch(console.error);
  }, [refreshFlag]);

  // Start editing a role
  const handleEdit = (role) => {
    setEditingId(role.id);
    setEditedRole({
      rolename: role.rolename || '',
      roledesc: role.roledesc || '',
      roleskill1: role.roleskill1 || '',
      roleskill2: role.roleskill2 || '',
      roleskill3: role.roleskill3 || ''
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditedRole({
      rolename: '',
      roledesc: '',
      roleskill1: '',
      roleskill2: '',
      roleskill3: ''
    });
  };

  // Save changes
  const handleSave = async () => {
    try {
      await axios.put(`${API_BASE}/update/${editingId}`, editedRole);
      alert(`Role "${editedRole.rolename}" has been updated.`);
      setRefreshFlag(!refreshFlag);
      handleCancel();
    } catch (error) {
      console.error(error);
      alert('Failed to update role.');
    }
  };

  // Delete a role
  const handleDelete = async (role) => {
    if (!window.confirm(`Are you sure you want to delete "${role.rolename}"?`)) return;
    try {
      await axios.delete(`${API_BASE}/delete/${role.id}`);
      alert(`Role "${role.rolename}" has been deleted.`);
      setRefreshFlag(!refreshFlag);
    } catch (error) {
      console.error(error);
      alert('Failed to delete role.');
    }
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setEditedRole((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      {/* Tooltips */}
      {['edit', 'commit', 'revert', 'purge'].map((id) => (
        <Tooltip key={id} id={id} />
      ))}

      <table className="Table6">
        <thead>
          <tr>
            <th style={{ width: '20px' }}></th>
            <th className="Font-Verdana-Small_Compliment_Blue" align="center">Role Name</th>
            <th className="Font-Verdana-Small_Compliment_Blue" align="center">Description</th>
            <th className="Font-Verdana-Small_Compliment_Blue" align="center">Skill #1</th>
            <th className="Font-Verdana-Small_Compliment_Blue" align="center">Skill #2</th>
            <th className="Font-Verdana-Small_Compliment_Blue" align="center">Skill #3</th>
          </tr>
        </thead>

        <tbody>
          {roles.map((role) => {
            const isEditing = editingId === role.id;
            const fieldStyle = { height: '22.5px', width: '180px', border: '1.25px solid #1994AD', borderRadius: '4px', paddingLeft: '5px' };

            return (
              <tr key={role.id}>
                <td className="Table6 td">
                  {isEditing ? (
                    <>
                      <button
                        className="icon-btn bg-green"
                        onClick={handleSave}
                      >
                        <a data-tooltip-id="commit" data-tooltip-content="Commit">
                          <FaCheck />
                        </a>
                      </button>
                      &nbsp;
                      <button
                        className="icon-btn bg-gray"
                        onClick={handleCancel}
                      >
                        <a data-tooltip-id="revert" data-tooltip-content="Revert">
                          <PiArrowCounterClockwiseBold />
                        </a>
                      </button>
                      &nbsp;
                      <button
                        className="icon-btn bg-red"
                        onClick={() => handleDelete(role)}
                      >
                        <a data-tooltip-id="purge" data-tooltip-content="Delete">
                          <FaRegTrashAlt />
                        </a>
                      </button>
                    </>
                  ) : (
                    <button
                      className="icon-btn bg-blue"
                      onClick={() => handleEdit(role)}
                    >
                      <a data-tooltip-id="edit" data-tooltip-content="Edit">
                        <FaPen />
                      </a>
                    </button>
                  )}
                </td>

                {['rolename', 'roledesc', 'roleskill1', 'roleskill2', 'roleskill3'].map((field, index) => (
                  <td key={index} className="asmshover Table6 td">
                    {isEditing ? (
                      <input
                        style={{ ...fieldStyle, width: index === 1 ? '480px' : '180px' }}
                        value={editedRole[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                      />
                    ) : (
                      role[field]
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <style>{`
        .icon-btn {
          height: 20px;
          width: 20px;
          padding: 0;
          border: none;
          border-radius: 3px;
          outline: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .bg-blue { background-color: #1994AD; }
        .bg-green { background-color: #169247; }
        .bg-red { background-color: #D5441C; }
        .bg-gray { background-color: silver; }
        .icon-btn svg {
          color: white;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}
