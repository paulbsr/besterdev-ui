import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import BannerWhite from './BannerWhite';

test('displays the supplied avatar without changing the home link', () => {
  render(<MemoryRouter><BannerWhite /></MemoryRouter>);

  expect(screen.getByAltText('Hooded hacker avatar')).toHaveAttribute('src', 'banner-avatar.jpeg');
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home');
});
