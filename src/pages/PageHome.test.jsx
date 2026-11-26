import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import PageHome from './PageHome';

jest.mock('../oauth2/OAuth2APIClient', () => ({ get: jest.fn() }));
jest.mock('../websites/WebSiteAPIProvider', () => ({
  useWebsiteApi: () => ({ websiterootdata: [], loading: false, error: null }),
}));
jest.mock('../howto/HowtoAPIProvider', () => ({ useHowtoApi: () => ({ howtorootdata: [] }) }));
jest.mock('../tasks/TaskSummaryHomepage', () => () => null);
jest.mock('../banners/BannerWhite', () => () => null);
jest.mock('../banners/BannerLight', () => ({ __esModule: true, default: () => null, TechStackIcons: () => null }));
jest.mock('../gradientlines/GradientLine', () => () => null);
jest.mock('../gradientlines/GradientLineThin', () => () => null);
jest.mock('../Footer', () => () => null);
jest.mock('../ToastComponent', () => () => null);
jest.mock('../breakingnews/BreakingNews', () => () => null);
jest.mock('../cyclopedia/CyclopediaTicker', () => () => null);
jest.mock('../quicks/CombinedCreateFP', () => () => null);
jest.mock('../dutchlanguage/DutchLanguage_Ticker', () => () => null);

test('keeps the homepage in dark mode without a theme switch', async () => {
  OAuth2APIClient.get.mockResolvedValue({ data: [] });
  const { container } = render(<MemoryRouter><PageHome /></MemoryRouter>);

  expect(await screen.findByRole('heading', { name: 'Welcome to my workspace' })).toBeInTheDocument();
  expect(container.querySelector('.home-route')).toHaveAttribute('data-theme', 'dark');
  expect(screen.queryByRole('button', { name: /switch to .* mode/i })).not.toBeInTheDocument();
});
