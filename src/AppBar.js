import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



const AppNavBar = ({ toggleDarkMode }) => {
    return (
        <AppBar position="static">
            <Container maxWidth="xxl">
                <Toolbar disableGutters>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            fontFamily: 'roboto',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        RestClient
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {/*                         <Tooltip title="Toggle Theme">
                            <FormControlLabel
                                control={<MaterialUISwitch sx={{ m: 1 }}
                                    defaultChecked onChange={toggleDarkMode} />}
                                label=""
                            />
                        </Tooltip> */}
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            fontFamily: 'roboto',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        onClick={(e) => { window.open('https://simple-apps-6fadb.web.app/', '_blank', 'noopener,noreferrer'); }}
                    >
                        @Simple Apps
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default AppNavBar;
