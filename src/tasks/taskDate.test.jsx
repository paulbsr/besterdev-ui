import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { compareTaskDatesDescending, formatTaskDate, parseTaskDate } from './taskDate';
import Task from './Task';
import TaskRecordStatusByColourLong from './TaskRecordStatusByColourLong';
import TaskRecordStatusByColourLong_forTaskEdit from './TaskRecordStatusByColourLong_forTaskEdit';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

jest.mock('./TaskPopOut', () => () => null);
jest.mock('./TaskRecordAccordion', () => () => null);
jest.mock('../oauth2/OAuth2APIClient', () => ({ get: jest.fn(), put: jest.fn() }));

test('formats ISO and legacy array dates without shifting the calendar day', () => {
  expect(formatTaskDate('2026-11-24')).toBe('2026.11.24');
  expect(formatTaskDate('2025-01-03T00:00:00Z')).toBe('2025.01.03');
  expect(formatTaskDate([2025, 1, 3])).toBe('2025.01.03');
  expect(formatTaskDate('2025-02-30')).toBe('Invalid date');
  expect(formatTaskDate(null)).toBe('Date unavailable');
  expect(parseTaskDate([2025, 13, 1])).toBeNull();
});

test('sorts mixed date formats newest first and puts invalid dates last', () => {
  const dates = ['2025-01-01', [2026, 11, 24], '2026-02-01', 'invalid'];
  expect(dates.sort(compareTaskDatesDescending)).toEqual([
    [2026, 11, 24], '2026-02-01', '2025-01-01', 'invalid',
  ]);
});

test('renders record dates correctly in both task pages', () => {
  render(
    <>
      <TaskRecordStatusByColourLong date="2026-11-24" status="WIP" childrecord="First record" />
      <TaskRecordStatusByColourLong_forTaskEdit date={[2025, 1, 3]} status="START" childrecord="Second record" />
    </>
  );
  expect(screen.getByText(/2026\.11\.24: First record/)).toBeInTheDocument();
  expect(screen.getByText(/2025\.01\.03: Second record/)).toBeInTheDocument();
});

test('shows an ISO due date correctly in the task management detail', () => {
  render(<Task id={42} taskname="Example task" taskstatus="START" tasktargetdate="2025-10-15" parenttask={[]} />);
  fireEvent.click(screen.getByText('Example task'));
  expect(screen.getByText(/2025\.10\.15/)).toBeInTheDocument();
});

test('preserves the calendar date when a task is edited from task management', async () => {
  OAuth2APIClient.put.mockResolvedValue({ status: 202 });
  render(<Task id={42} taskname="Example task" taskstatus="START" tasktargetdate={[2025, 10, 15]} parenttask={[]} setCheckForRecords={jest.fn()} />);
  fireEvent.click(screen.getByText('Example task'));
  fireEvent.click(screen.getByLabelText('Edit Task: 42'));
  expect(screen.getByDisplayValue('2025.10.15')).toBeInTheDocument();
  fireEvent.click(screen.getByLabelText('Commit'));
  await waitFor(() => expect(OAuth2APIClient.put).toHaveBeenCalledWith(
    expect.stringContaining('/tasks/update/taskdetails/42'),
    expect.objectContaining({ tasktargetdate: '2025-10-15' })
  ));
});
