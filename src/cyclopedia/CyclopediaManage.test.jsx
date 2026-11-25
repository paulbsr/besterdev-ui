import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import { useCyclopediaApi } from './CyclopediaAPIProvider';
import CyclopediaManage from './CyclopediaManage';

jest.mock('./CyclopediaAPIProvider', () => ({ useCyclopediaApi: jest.fn() }));
jest.mock('./CyclopediaCreate', () => () => null);

test('links each entry name to its edit page while preserving inline editing', () => {
  useCyclopediaApi.mockReturnValue({
    cyclopediaData: [
      { cyclopediaId: 123, cyclopediaName: 'First entry', cyclopediaDesc: 'First description' },
      { cyclopediaId: 456, cyclopediaName: 'Second entry', cyclopediaDesc: 'Second description' },
    ],
    loading: false,
    error: null,
    reload: jest.fn(),
  });

  function EditPage() {
    const { cyclopediaId } = useParams();
    return <div>Edit page for {cyclopediaId}</div>;
  }

  render(
    <MemoryRouter initialEntries={['/cyclopediamanage']}>
      <Routes>
        <Route path="/cyclopediamanage" element={<CyclopediaManage />} />
        <Route path="/cyclopediaedit/:cyclopediaId" element={<EditPage />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole('link', { name: 'First entry' })).toHaveAttribute('href', '/cyclopediaedit/123');
  expect(screen.getByRole('link', { name: 'Second entry' })).toHaveAttribute('href', '/cyclopediaedit/456');
  fireEvent.click(screen.getByRole('button', { name: 'Edit First entry' }));
  expect(screen.getByLabelText('Edit name for First entry')).toHaveValue('First entry');
  fireEvent.click(screen.getByRole('link', { name: 'Second entry' }));
  expect(screen.getByText('Edit page for 456')).toBeInTheDocument();
});
