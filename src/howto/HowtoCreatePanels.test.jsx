import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HowtoStepCreate from './HowtoStepCreate';
import HowtoUrlCreate from './HowtoUrlCreate';

jest.mock('../oauth2/OAuth2APIClient', () => ({ post: jest.fn() }));

test('marks each create panel as expanded only while it is open', () => {
  render(
    <>
      <HowtoStepCreate />
      <HowtoUrlCreate />
    </>
  );
  const step = screen.getByRole('button', { name: /add a step/i });
  const resource = screen.getByRole('button', { name: /add a resource/i });

  expect(step.closest('section')).not.toHaveClass('is-expanded');
  expect(resource.closest('section')).not.toHaveClass('is-expanded');
  fireEvent.click(step);
  expect(step.closest('section')).toHaveClass('is-expanded');
  expect(resource.closest('section')).not.toHaveClass('is-expanded');
  fireEvent.click(resource);
  expect(resource.closest('section')).toHaveClass('is-expanded');
  fireEvent.click(step);
  expect(step.closest('section')).not.toHaveClass('is-expanded');
  expect(resource.closest('section')).toHaveClass('is-expanded');
  fireEvent.click(resource);
  expect(resource.closest('section')).not.toHaveClass('is-expanded');
});
