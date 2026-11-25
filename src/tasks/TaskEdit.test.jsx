import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import TaskEdit from './TaskEdit';

jest.mock('../oauth2/OAuth2APIClient', () => ({ get: jest.fn(), put: jest.fn() }));
jest.mock('./TaskRecordAccordion_forTaskEdit', () => () => <div>Task progress</div>);

test('displays the task and preserves expanding and inline editing', async () => {
  OAuth2APIClient.get.mockResolvedValue({
    data: {
      id: 42,
      taskname: 'Update documentation',
      taskrequirement: 'Describe the feature',
      taskUrl: 'https://example.com',
      tasktargetdate: '2025-10-15',
      taskstatus: 'START',
      tasks: [],
    },
  });
  render(<MemoryRouter><TaskEdit task_id="42" /></MemoryRouter>);

  const task = await screen.findByRole('button', { name: 'Update documentation' });
  expect(task).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(task);
  expect(task).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText('Describe the feature')).toBeInTheDocument();
  expect(screen.getByText('Task progress')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Edit task' }));
  expect(screen.getByLabelText('Task name')).toHaveValue('Update documentation');
  expect(screen.getByLabelText('Requirement')).toHaveValue('Describe the feature');
  fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
  expect(screen.getByRole('button', { name: 'Update documentation' })).toBeInTheDocument();

  OAuth2APIClient.put.mockResolvedValue({ status: 202 });
  fireEvent.click(screen.getByRole('button', { name: 'Edit task' }));
  fireEvent.change(screen.getByLabelText('Task name'), { target: { value: 'Updated documentation' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  await waitFor(() => expect(OAuth2APIClient.put).toHaveBeenCalledWith(
    expect.stringContaining('/tasks/update/taskdetails/42'),
    expect.objectContaining({
      taskname: 'Updated documentation',
      tasktargetdate: '2025-10-15',
      taskUrl: 'https://example.com',
    })
  ));
});
