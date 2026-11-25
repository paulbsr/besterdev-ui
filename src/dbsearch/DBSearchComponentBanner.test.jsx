import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import DBSearchComponentBanner from './DBSearchComponentBanner';

jest.mock('../oauth2/OAuth2APIClient', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

function renderSearch(props = {}) {
  return render(<MemoryRouter><DBSearchComponentBanner {...props} /></MemoryRouter>);
}

test('searches BesterDev by default and clears an empty result', async () => {
  OAuth2APIClient.get.mockResolvedValue({ data: [] });
  renderSearch({ includeAI: true });

  expect(screen.getByLabelText('BesterDev')).toBeChecked();
  expect(screen.getByPlaceholderText('Search BesterDev or ChatGPT')).toBeInTheDocument();
  const providerOptions = screen.getByLabelText('BesterDev').closest('fieldset');
  expect(screen.getByLabelText('Search query').nextElementSibling).toBe(providerOptions);
  expect(providerOptions.nextElementSibling).toBe(screen.getByRole('button', { name: 'Search' }));
  expect(screen.getByRole('button', { name: 'Search' }).nextElementSibling)
    .toBe(screen.getByRole('button', { name: 'Clear' }));
  fireEvent.change(screen.getByLabelText('Search query'), { target: { value: 'C++ & React' } });
  fireEvent.click(screen.getByRole('button', { name: 'Search' }));

  expect(await screen.findByText(/No record exists/)).toBeInTheDocument();
  expect(OAuth2APIClient.get).toHaveBeenCalledWith(
    expect.stringContaining('keyword=C%2B%2B%20%26%20React'),
    expect.any(Object)
  );
  expect(OAuth2APIClient.post).not.toHaveBeenCalled();

  fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
  expect(screen.getByLabelText('Search query')).toHaveValue('');
  expect(screen.queryByText(/No record exists/)).not.toBeInTheDocument();
});

test('uses the same input to search ChatGPT and clears its response', async () => {
  OAuth2APIClient.post.mockResolvedValue({ data: { answer: '[A useful answer]' } });
  renderSearch({ includeAI: true });

  fireEvent.change(screen.getByLabelText('Search query'), { target: { value: 'What is React?' } });
  fireEvent.click(screen.getByLabelText('ChatGPT'));
  expect(screen.getByLabelText('Search query')).toHaveValue('What is React?');
  expect(screen.getByPlaceholderText('Search BesterDev or ChatGPT')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Search' }));

  expect(await screen.findByText('A useful answer')).toBeInTheDocument();
  expect(OAuth2APIClient.post).toHaveBeenCalledWith(
    expect.stringContaining('/api/ask'),
    { question: 'Answer the following in a maximum of three sentences: What is React?' }
  );
  expect(OAuth2APIClient.get).not.toHaveBeenCalled();

  fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
  expect(screen.queryByText('A useful answer')).not.toBeInTheDocument();
  expect(screen.getByLabelText('Search query')).toHaveValue('');
});

test('displays BesterDev results for a query containing regex characters', async () => {
  OAuth2APIClient.get.mockResolvedValue({
    data: [{ id: 1, website_name: 'C++ guide', website_url: 'https://example.com', website_desc: 'Guide' }],
  });
  renderSearch({ includeAI: true });

  fireEvent.change(screen.getByLabelText('Search query'), { target: { value: 'C++' } });
  fireEvent.click(screen.getByRole('button', { name: 'Search' }));
  expect(await screen.findByText('C++')).toBeInTheDocument();
});

test('ignores a pending response after changing provider', async () => {
  let resolveSearch;
  OAuth2APIClient.get.mockReturnValue(new Promise((resolve) => { resolveSearch = resolve; }));
  renderSearch({ includeAI: true });
  fireEvent.change(screen.getByLabelText('Search query'), { target: { value: 'test' } });
  fireEvent.click(screen.getByRole('button', { name: 'Search' }));
  fireEvent.click(screen.getByLabelText('ChatGPT'));
  await act(async () => { resolveSearch({ data: [] }); });
  expect(screen.getByRole('button', { name: 'Search' })).toBeEnabled();
  expect(screen.queryByText(/No record exists/)).not.toBeInTheDocument();
});

test('retains the standalone BesterDev search without a provider selector', () => {
  renderSearch();
  expect(screen.queryByLabelText('ChatGPT')).not.toBeInTheDocument();
  expect(screen.getByPlaceholderText('Search BesterDev')).toBeInTheDocument();
});

test('places supplied quick actions after the clear button', () => {
  renderSearch({ includeAI: true, actions: <div>Quick actions</div> });
  expect(screen.getByRole('button', { name: 'Clear' }).nextElementSibling)
    .toHaveTextContent('Quick actions');
});
