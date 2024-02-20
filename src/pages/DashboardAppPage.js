import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Welcome from './pagesComponentsFolder/welcome';
import navConfig from 'src/layouts/dashboard/nav/config';
import NavSection from 'src/components/nav-section/NavSection';
import Slideshow from './landingPage';
import "./pages.css"
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const marqueeStyles = {
    position: 'relative',
    whiteSpace: 'nowrap',
    paddingLeft: '20px',
    paddingRight: '20px',
    animation: 'marquee 30s linear infinite',
    maxWidth:'60%',
    
  };

  // Define inline styles for the marquee text
  const marqueeTextStyles = {
    position: 'absolute',
    animation: 'marquee-text 23s linear infinite',
    top: '0 ',
    
  };
  return (
    <div>
      <Helmet>
        <title> Home | Prime life insurance</title>
      </Helmet>
      <Container   maxWidth="xl">
        <Typography  variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
         <div className=' absolute'>
         <NavSection data={navConfig} />
         </div>
        <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={12}>
          <Slideshow></Slideshow>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
