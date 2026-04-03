import { Stack } from '@mui/material';
import { useBreakingNewsApi } from './BreakingNewsApiContext';

export default function BreakingNews() {
  const { breakingnews, loading, error } = useBreakingNewsApi();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const shuffledNews = [...breakingnews].sort(() => Math.random() - 0.5);
console.log('breakingnews length:', breakingnews?.length);
  return (
    <marquee scrollamount="6">
      <Stack direction="row" spacing={2}>
        {shuffledNews.map((news) => (
          <a
            key={news.news_url}
            href={news.news_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Segoe UI',
              fontSize: 'medium',
              color: '#336791',
              textDecoration: 'none',
            }}
          >
            {news.news_source}:{' '}
            <i style={{ color: '#D5441C' }}>{news.news_title}</i>
          </a>
        ))}
      </Stack>
    </marquee>
  );
}