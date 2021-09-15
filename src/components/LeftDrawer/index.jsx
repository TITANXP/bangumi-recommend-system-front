import React from 'react';
import {NavLink} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PubSub from 'pubsub-js';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
    }

}));

export default function LeftDrawer() {
    const classes = useStyles();
    // 左侧抽屉
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const handleDrawerClose = () => {
        setOpenDrawer(false)
        // 发布消息：关闭左侧抽屉
        PubSub.publish('openDrawer', false)
    };

    let token;
    React.useEffect(() => { // 函数式组件的hook，空数组表示什么也不监听，只在初始化时执行，如果不写则监听所有状态
        token = PubSub.subscribe('openDrawer', (msg, data) => {
            setOpenDrawer(data)
        })
        return () => { // 在组件卸载前执行，相当于类式组件的componentWillUnmount()
            PubSub.unsubscribe(token)
        }
    }, []) 
    
    return (
        <Drawer className={classes.drawer} variant="persistent" anchor="left" open={openDrawer} classes={{paper: classes.drawerPaper,}} >
            <div className={classes.drawerHeader} >
                <IconButton onClick={handleDrawerClose}> <ChevronLeftIcon/> </IconButton>
            </div>
            <Divider/>
            <List>
                <NavLink to="/home" className={classes.link}>
                    <ListItem button key={'Home'}>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary={'主页'}/>
                    </ListItem>
                </NavLink>
                <NavLink to="/user" className={classes.link}>
                    <ListItem button key={'User'}>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary={'个人中心'}/>
                    </ListItem>
                </NavLink>
            </List>
        </Drawer>
    )
}
