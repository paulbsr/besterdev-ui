import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import MyCV from './MyCV';

jest.mock('../oauth2/OAuth2APIClient', () => ({ get: jest.fn() }));
jest.mock('./MyCVEmployerRoles', () => () => null);

test('opens areas of expertise by default and allows it to be toggled', async () => {
  OAuth2APIClient.get.mockImplementation((url) => Promise.resolve({
    data: url.endsWith('/expertise') ? [{ id: 1, expertise_desc: 'Example expertise' }] : [],
  }));
  render(<MyCV />);

  const toggle = screen.getByRole('button', { name: /areas of expertise/i });
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(await screen.findByText('Example expertise')).toBeInTheDocument();

  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByText('Example expertise')).not.toBeInTheDocument();

  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText('Example expertise')).toBeInTheDocument();
});
