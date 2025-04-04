import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button,
  Stack
} from '@mui/material';
import Header from './Header';

const Home: React.FC = () => {
  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 15, mb: 15 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          <Box sx={{ flex: { xs: '0 0 100%', md: '0 0 calc(50% - 24px)' } }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                mb: 3
              }}
            >
              Turn your ideas into{' '}
              <Box 
                component="span" 
                sx={{ 
                  color: 'primary.main',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '30%',
                    bottom: '-5px',
                    left: 0,
                    backgroundColor: 'primary.light',
                    opacity: 0.3,
                    zIndex: -1,
                  }
                }}
              >
                success
              </Box>
              .
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ mb: 4 }}
            >
              Horizon will make your product look modern and professional while saving you precious time.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 4
                }}
              >
                View pages
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 4
                }}
              >
                Documentation
              </Button>
            </Stack>
          </Box>
          <Box sx={{ flex: { xs: '0 0 100%', md: '0 0 calc(50% - 24px)' } }}>
            <Box
              sx={{
                position: 'relative',
                transform: 'rotate(-5deg)',
                '& img': {
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3
                }
              }}
            >
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 