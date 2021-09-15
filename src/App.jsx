import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch,Redirect, Link} from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Tooltip from '@material-ui/core/Tooltip';

import NavBar from'./components/NavBar';
import LeftDrawer from './components/LeftDrawer';
import ScrollToTop from './components/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const Anime = lazy(() => import('./pages/Anime'));
const User = lazy(() => import('./pages/User'));
const Search = lazy(() => import('./pages/Search'));
const SimAnime = lazy(() => import('./pages/SimAnime'));

const Footer = lazy(() => import('./components/Footer'));
const AnimeGrid = lazy(() => import('./components/AnimeGrid'));

const drawerWidth = 240;


// 自定义颜色
const theme = createMuiTheme({
    palette: {
        primary: {
            // main: purple[500],
            main: `rgba(29,161,242,1.00)`,
            contrastText: "#fff"
        },
        secondary: {
            // main: green[500],
            main: `rgba(29,161,242,1.00)`,
            contrastText: "#fff"
        },
    },
});

const useStyles = makeStyles((theme) => ({
    cont: {
        paddingTop: theme.spacing(12),
    },
    backToTop: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export default function App(props) {

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
        <React.Fragment>
            <Suspense
                fallback={
                    <LinearProgress  />
                }>
                <CssBaseline />
                {/*标题栏*/}
                <NavBar/>
                
                <Link to="/home" />
                
                <Typography id="back-to-top-anchor"  />

                {/*抽屉*/}
                <LeftDrawer/>

                {/*Grid*/}
                {/* <AnimeGrid/> */}
                <div className={classes.cont}> 
                    <Switch>
                        <Route path="/home" component={Home} />
                        {/* 声明接收params参数 */}
                        <Route path="/anime/:id" component={Anime} />
                        <Route path="/user/:id" component={User} />
                        <Route path="/search/:keyword" component={Search} />
                        {/* <Route path="/simAnime/:id" component={SimAnime} /> */}
                        <Redirect to="/home" />
                    </Switch>
                </div>
                <ScrollToTop/>

                <Footer/>
            </Suspense>
        </React.Fragment>
        </ThemeProvider>
    )
}