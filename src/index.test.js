import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OAuth2APIClient from './oauth2/OAuth2APIClient';
import App from './index';

jest.mock('react-dom', () => ({ ...jest.requireActual('react-dom'), render: jest.fn() }));
jest.mock('firebase/app', () => ({ initializeApp: jest.fn() }));
jest.mock('firebase/auth', () => ({ getAuth: jest.fn() }));
jest.mock('firebase/compat/app', () => ({ initializeApp: jest.fn() }));
jest.mock('firebase/compat/firestore', () => ({}));
jest.mock('firebase/compat/auth', () => ({}));
jest.mock('./oauth2/OAuth2APIClient', () => ({ get: jest.fn() }));
jest.mock('./pages/PageHome', () => () => <div>Home page</div>);

test('redirects the root URL to the home page', async () => {
  OAuth2APIClient.get.mockResolvedValue({ data: [] });
  const log = jest.spyOn(console, 'log').mockImplementation(() => {});
  window.history.replaceState({}, '', '/');
  render(<App />);

  expect(await screen.findByText('Home page')).toBeInTheDocument();
  expect(window.location.pathname).toBe('/home');
  log.mockRestore();
});
