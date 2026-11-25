import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import { TaskContext } from '../Contexts';
import TaskOverview from './TaskOverview';

jest.mock('./Task', () => ({ taskname }) => <span>{taskname}</span>);
jest.mock('./TaskCreate', () => () => null);
jest.mock('../MouseoverPopover', () => ({ see }) => <div>{see}</div>);

test('opens the editor for the selected task', () => {
  const tasks = [
    { id: 12, asms: 113092, taskstatus: 'START', taskname: 'First task' },
    { id: 34, asms: 113092, taskstatus: 'START', taskname: 'Second task' },
  ];
  function EditPage() {
    const { task_id } = useParams();
    return <div>Editing task {task_id}</div>;
  }

  render(
    <MemoryRouter initialEntries={['/taskmanage']}>
      <TaskContext.Provider value={tasks}>
        <Routes>
          <Route path="/taskmanage" element={<TaskOverview loading={false} />} />
          <Route path="/taskedit/:task_id" element={<EditPage />} />
        </Routes>
      </TaskContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByRole('link', { name: 'Open task editor for First task' })).toHaveAttribute('href', '/taskedit/12');
  fireEvent.click(screen.getByRole('link', { name: 'Open task editor for Second task' }));
  expect(screen.getByText('Editing task 34')).toBeInTheDocument();
});
