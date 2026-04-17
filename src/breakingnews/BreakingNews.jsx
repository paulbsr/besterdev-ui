
import { Stack } from '@mui/material';
import { useBreakingNewsApi } from './BreakingNewsApiContext';
import '../Fonts.css'


export default function BreakingNews() {
  const { breakingnews, loading, error } = useBreakingNewsApi();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const shuffledNews = [...breakingnews].sort(() => Math.random() - 0.5);
  console.log('breakingnews length:', breakingnews?.length);
  return (
    <div>
      <marquee scrollamount="6">
        <Stack direction="row" spacing={2}>
          {shuffledNews.map((news) => (
            <div className="ticker" key={news.news_url}>
              <a
                href={news.news_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'Segoe UI',
                  fontSize: 'medium',
                  color: '#336791',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {news.news_source}:{' '}
                <i style={{ color: '#D5441C' }}>{news.news_title}</i>
              </a>
            </div>
          ))}
        </Stack>
      </marquee>
    </div>
  );
}