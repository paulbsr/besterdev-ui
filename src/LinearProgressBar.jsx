import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 50) {
          return 0;
        }
        const diff = Math.random() * 8;
        return Math.min(oldProgress + diff, 400);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '36%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}

