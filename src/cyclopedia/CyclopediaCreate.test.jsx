import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CyclopediaCreate from './CyclopediaCreate';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import { toast } from 'react-toastify';
import { uploadCyclopediaImage } from './CyclopediaImageUpload';

jest.mock('../oauth2/OAuth2APIClient', () => ({
  __esModule: true,
  default: { post: jest.fn() },
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('./CyclopediaImageUpload', () => {
  const React = jest.requireActual('react');
  return {
    CyclopediaImageUpload: ({ onImageSelected }) =>
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: () => onImageSelected(new File(['image'], 'cyclopedia.png', { type: 'image/png' })),
        },
        'Select image'
      ),
    uploadCyclopediaImage: jest.fn(),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

test('uploads the selected image after the create endpoint returns its new entry ID', async () => {
  const image = new File(['image'], 'cyclopedia.png', { type: 'image/png' });
  OAuth2APIClient.post.mockResolvedValue({
    status: 200,
    data: { cyclopediaId: 42 },
  });
  uploadCyclopediaImage.mockResolvedValue({ status: 200 });

  render(<CyclopediaCreate />);
  fireEvent.click(screen.getByRole('button', { name: /New entry/ }));
  fireEvent.change(screen.getByPlaceholderText('What is it?'), {
    target: { value: 'Example entry' },
  });
  fireEvent.change(screen.getByPlaceholderText('Add a clear, concise explanation'), {
    target: { value: 'An example description.' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Select image' }));
  fireEvent.click(screen.getByRole('button', { name: 'Add entry' }));

  await waitFor(() => {
    expect(uploadCyclopediaImage).toHaveBeenCalledWith(
      expect.objectContaining({ name: image.name }),
      42,
      'Example entry'
    );
  });
  expect(OAuth2APIClient.post).toHaveBeenCalledWith('/api/v1/cyclopedia/create', {
    cyclopediaName: 'Example entry',
    cyclopediaDesc: 'An example description.',
    cyclopediaUrl: '',
  });
});

test('does not attempt image upload if create does not return an entry ID', async () => {
  OAuth2APIClient.post.mockResolvedValue({ status: 200, data: {} });

  render(<CyclopediaCreate />);
  fireEvent.click(screen.getByRole('button', { name: /New entry/ }));
  fireEvent.change(screen.getByPlaceholderText('What is it?'), {
    target: { value: 'Example entry' },
  });
  fireEvent.change(screen.getByPlaceholderText('Add a clear, concise explanation'), {
    target: { value: 'An example description.' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Select image' }));
  fireEvent.click(screen.getByRole('button', { name: 'Add entry' }));

  await waitFor(() => {
    expect(toast.warning).toHaveBeenCalledWith(
      'Example entry was added, but the API did not return its ID for image upload.'
    );
  });
  expect(uploadCyclopediaImage).not.toHaveBeenCalled();
});
