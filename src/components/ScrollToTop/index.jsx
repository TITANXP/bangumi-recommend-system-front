import React from 'react'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    backToTop: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger()

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if(anchor) {
            anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    };

    return (
        <Zoom in={trigger} >
            <div onClick={handleClick} role="presention" className={classes.backToTop}>
                {children}
            </div>
        </Zoom>
    );
}

export default function ScrollToTop(props) {
    return (
        <ScrollTop {...props}>
            <Fab color="secondary" size="medium" aria-label="scrool back to top">
                <KeyboardArrowUpIcon style={{fontSize:28}}/>
            </Fab>
        </ScrollTop>
    )
}
