import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { toast } from 'react-toastify';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import MyCVEmployerRoleDetails from './MyCVEmployerRoleDetails';

jest.mock('@mui/material', () => ({ Tooltip: ({ children }) => <>{children}</> }));
jest.mock('react-toastify', () => ({ toast: { success: jest.fn(), error: jest.fn() } }));
jest.mock('../oauth2/OAuth2APIClient', () => ({ delete: jest.fn() }));
jest.mock('./MyCVEmployerRoleDetailsCreate', () => () => null);

const data = [{
  employer_id: 1,
  employer_roles: [{
    role_id: 2,
    role_detail: [{ roledetail_id: 3, roledetail_name: 'Example', roledetail_desc: 'Detail' }],
  }],
}];

function renderDetails() {
  const setCheckForRecords = jest.fn();
  render(
    <MyCVEmployerRoleDetails
      mycvdata2={data}
      employer_id2={1}
      role_idd={2}
      role_desc="Role description"
      setCheckForRecords={setCheckForRecords}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: 'Edit role detail' }));
  return setCheckForRecords;
}

afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

test('confirms before purging and uses the role detail endpoint', async () => {
  jest.spyOn(window, 'confirm').mockReturnValue(true);
  OAuth2APIClient.delete.mockResolvedValue({});
  const refresh = renderDetails();

  fireEvent.click(screen.getByRole('button', { name: 'Purge role detail' }));

  expect(window.confirm).toHaveBeenCalledTimes(1);
  expect(OAuth2APIClient.delete).toHaveBeenCalledWith('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/role_detail/delete/3');
  await waitFor(() => expect(refresh).toHaveBeenCalledTimes(1));
  expect(toast.success).toHaveBeenCalled();
  expect(screen.getByRole('button', { name: 'Edit role detail' })).toBeInTheDocument();
});

test('does not purge when confirmation is cancelled', () => {
  jest.spyOn(window, 'confirm').mockReturnValue(false);
  const refresh = renderDetails();

  fireEvent.click(screen.getByRole('button', { name: 'Purge role detail' }));

  expect(OAuth2APIClient.delete).not.toHaveBeenCalled();
  expect(refresh).not.toHaveBeenCalled();
});

test('reports a failed purge without refreshing or leaving edit mode', async () => {
  jest.spyOn(window, 'confirm').mockReturnValue(true);
  jest.spyOn(console, 'error').mockImplementation(() => {});
  OAuth2APIClient.delete.mockRejectedValue(new Error('Request failed'));
  const refresh = renderDetails();

  fireEvent.click(screen.getByRole('button', { name: 'Purge role detail' }));

  await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Unable to delete this role detail.'));
  expect(refresh).not.toHaveBeenCalled();
  expect(toast.success).not.toHaveBeenCalled();
  expect(screen.getByRole('button', { name: 'Purge role detail' })).toBeInTheDocument();
});
