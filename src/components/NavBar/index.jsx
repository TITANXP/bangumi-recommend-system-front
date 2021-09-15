import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import { grey } from '@material-ui/core/colors';
import Color from "color";
import Select from '@material-ui/core/Select';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import '../../config';

import PubSub from 'pubsub-js';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    title: {
        color: 'black',
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    // 移动标题栏
    appBar: {
        backgroundColor: 'white',
        display: 'flex',
        // alignItems: 'flex-start',
        boxShadow: `rgba(0, 0, 0, 0.1) 0px 8px 8px -8px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        borderRadius: 45,
        // backgroundColor: fade(theme.palette.common.white, 0.15),
        backgroundColor: grey[100],
        '&:hover': {
            // backgroundColor: fade(theme.palette.common.white, 0.25),
            backgroundColor: grey[200],
        },
        marginLeft: 0,
        width: '72%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            // width: 'auto',
        },
    },
    // searchIcon: {
    //     padding: theme.spacing(0, 2),
    //     height: '100%',
    //     position: 'absolute',
    //     pointerEvents: 'none',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     color: 'black'
    // },
    inputRoot: {
        // color: 'inherit',
        width: '100%',

    },
    inputInput: {
        padding: theme.spacing(1, 2, 1, 3),
        // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            // width: '140ch',
            // '&:focus': {
            //     width: '140ch',
            // },
        },

    },
    avatarButton: {
        textCapitalize: '3px',
        textAlign: 'left',
        borderRadius:25,
        display: 'flex',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        alignItems: 'center',
        '&:hover': {
            backgroundColor: grey[200],
        },
        },
        userName: {
            lineHeight: 1,
            marginLeft: theme.spacing(1),
            fontWeight: 600,
            fontSize: '1rem',
            color: grey[700],
        },

        userMenu: {
            borderRadius: 25,
            marginTop: 48,
        },
    hide: {
        display: 'none',
    },
    login: {
        padding: '0px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 200,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        borderRadius: 20,
      },
      loginInput: {
        marginLeft: theme.spacing(1),
        flex: 1,

      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
      searchMenu: {
        borderRadius: `1px 1px 25px 25px`,
        marginLeft:10,
        // marginTop: 43,
        position: 'absolute',
        top: 64,
        left: 320
    },
}));

// 下滑隐藏
function HideOnScroll(props) {
    const classes = useStyles();
    const { children, window } = props;
    const trigger = useScrollTrigger({ disableHysteresis: false, target: window ? window() : undefined, threshold: 100 });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}


{/*标题栏*/}
export default function NavBar(props) {
    const classes = useStyles();
    // 头像
    const [clickAvatar, setClickAvatar] = React.useState();
    const [openSuggest, setOpenSuggest] = React.useState();
    const [suggest, setSuggest] = React.useState({isLoaded: false, items: []});

    const handleClickAvatar = event => {
        setClickAvatar(event.currentTarget)
    };

    const handleCloseAvatar = () => {
        setClickAvatar(null)
    };

    const handleOpenSuggest = event => {
        setOpenSuggest(event.currentTarget)
    };

    const handleCloseSuggest = () => {
        setOpenSuggest(null)
    };


    // 左侧抽屉出现时，向右移动
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpenDrawer(true)
        // 发布消息：左侧抽屉状态
        PubSub.publish('openDrawer', true)
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false)
        // 发布消息：左侧抽屉状态
        PubSub.publish('openDrawer', false)
    };
    // 登录用户信息
    const [user, setUser] = React.useState({isLoaded: false, isLoading: false, data: {}})

    // 用户输入的id
    const userIdRef = React.useRef()
    // 搜索词
    const searchRef = React.useRef()
    const [searchIsNull, setSearchIsNull] = React.useState(true)
    // 清除搜索框内容
    const clearSearch = () => {
        searchRef.current.value = ''
        setSearchIsNull(true)
    }
    // 搜索框内容变化
    const searchChange = () => {
        if (searchRef.current.value == ''){
            setSearchIsNull(true)
        }else{
            setSearchIsNull(false)
        }
         // 获取搜索词提示
         fetch(global.constants.BACKEND_URL + "/searchSuggest?keyword="+searchRef.current.value,
         {
             method: "GET",
         })
         .then(res => res.json())
         .then(json => {
             setSuggest({isLoaded: true, items: json})
         })
    }

    const changeKeyword = (s) => {
        searchRef.current.value = s
        search()
    }

    const login = () => {
        setUser({isLoaded: false, isLoading: true, data: {}})
        const userId = userIdRef.current.value
        // 获取用户信息
        fetch(global.constants.BACKEND_URL + "/getUser?id="+userIdRef.current.value,
        {
            method: "GET",
        })
        .then(res => res.json())
        .then(json => {
            console.log("用户数据请求完成：")
            console.log(json)
            setUser({isLoaded: true, isLoading: false, data: json})
            localStorage.setItem("userId", userId)
            console.log(localStorage)
            // 发布消息：登录用户信息
            PubSub.publish('user', json)
        })
        // .then(response => console.log('Success:', response));

    };

    const logout = () => {
        localStorage.removeItem("userId")
        setClickAvatar(null)
        setUser({isLoaded: false, data: {}})
    }

    // 键盘事件
    const onKeyDown = (e) => {
        if (e.keyCode === 13) { //回车键
            search()
        }
    }

    const search = () => {
        if(searchRef.current.value == '') return;
        const w = window.open('about:black');
        w.location.href='/search/' + searchRef.current.value
    }

    let token;
    React.useEffect(() => { // 函数式组件的hook，空数组表示什么也不监听，只在初始化时执行，如果不写则监听所有状态
        token = PubSub.subscribe('openDrawer', (msg, data) => {
            setOpenDrawer(data)
        })
        // 获取用户信息
        if (localStorage.getItem("userId")){ // 如果localStorage中由userId，则直接登录
            fetch(global.constants.BACKEND_URL + "/getUser?id="+localStorage.getItem("userId"),
            {
                method: "GET",
            }).then(res => res.json())
            .then(json => {
                console.log("用户数据请求完成：")
                console.log(json)
                setUser({isLoaded: true, data: json})
                // 发布消息：登录用户信息
                PubSub.publish('user', json)
            })
        }

        return () => { // 在组件卸载前执行，相当于类式组件的componentWillUnmount()
            PubSub.unsubscribe(token)
        }
    }, []) 

    return (
        <HideOnScroll {...props}>
            <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: openDrawer,})} >
                <Toolbar >
                    {/* <IconButton edge="start" className={clsx(classes.menuButton, openDrawer && classes.hide)} color="inherit" aria-label="open drawer" onClick={handleDrawerOpen}> */}
                    {/* <IconButton edge="start" className={clsx(classes.menuButton, openDrawer && classes.hide)} color="black" aria-label="open drawer" onClick={handleDrawerOpen}>
                        <MenuIcon/>
                    </IconButton> */}
                    <IconButton edge="start" className={clsx(classes.menuButton, openDrawer && classes.hide)} color="black" aria-label="open drawer" href='/home'>
                        <HomeRoundedIcon/>
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWarp>
                        Bangumi Recommend
                    </Typography>
                    {/* 搜索框 */}
                    <div className={classes.search} >
                        {/* <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div> */}
                        <InputBase 
                            placeholder="Search..."
                            inputRef={searchRef}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onKeyDown={onKeyDown}
                            onChange={searchChange}
                            onClick={handleOpenSuggest}
                            onBlur={handleCloseSuggest}
                        />
                        {!searchIsNull && 
                            <IconButton onClick={clearSearch}>
                                <CloseRoundedIcon/>
                            </IconButton>
                        }
                        <Divider orientation="vertical" style={{height: 30}}/>
                        <IconButton  onClick={search} style={{paddingRight: 16, paddingLeft: 14}}>
                            <SearchIcon />
                        </IconButton>
                 
                    </div>
                    {/* <Fade  
                        in={(suggest.isLoaded && Boolean(openSuggest))}

                    >
                        <Paper className={classes.searchMenu}>
                                {suggest.items.map((item) =>
                                    <MenuItem style={{minWidth: 500, width: 1300}} onClick={changeKeyword.bind(this, item.name)}>
                                        <ListItemText primary={item.name}/>
                                    </MenuItem>
                                )}
                        </Paper>
                    </Fade > */}
                    <Grow  
                        in={(suggest.isLoaded && Boolean(openSuggest))}
                        style={{ transformOrigin: '0 0 0' }}
                    >
                        <Paper className={classes.searchMenu}>
                                {suggest.items.map((item) =>
                                    <MenuItem style={{minWidth: 500, width: 1300, borderRadius: 19}} onClick={changeKeyword.bind(this, item.name)}>
                                        <ListItemText primary={item.name}/>
                                    </MenuItem>
                                )}
                        </Paper>
                    </Grow >
                    
                    {/* 用户信息 */}
                    <div style={{width: 220}}>
                    {user.isLoaded 
                    ?    
                        <Button color="inherit" onClick={handleClickAvatar} className={classes.avatarButton} aria-haspopup="true" >
                            <Box>
                                <Avatar sizes="44" src={user.data.avatar.large}></Avatar>
                            </Box>
                            <Typography className={classes.userName} >{user.data.nickname}</Typography>
                            <ExpandMoreRoundedIcon style={{color: grey[600]}}/>
                        </Button>
                    :  
                        (user.isLoading 
                        ?
                            <Button color="inherit"  className={classes.avatarButton} aria-haspopup="true" >
                                <Box>
                                    <Skeleton variant="circle" animation="wave" width={40} height={40} />
                                </Box>
                                <Skeleton className={classes.userName} animation="wave" variant="rect" width={72} height={14} />
                            </Button>
                        :
                            // <Button href="https://bgm.tv/oauth/authorize?client_id=bgm15435ef3ee4f211c2&response_type=code&redirect_uri=http://localhost:3000/home?code=CODE">login</Button>
                            <Paper component="form" className={classes.login} variant="outlined">
                                <IconButton className={classes.iconButton} aria-label="menu">
                                    <AccountCircleRoundedIcon />
                                </IconButton>
                                <InputBase
                                    inputRef={userIdRef}
                                    className={classes.loginInput}
                                    placeholder="用户ID"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                />

                                <Divider className={classes.divider} orientation="vertical" />
                                {/* <IconButton type="submit" className={classes.iconButton}  onClick={submitUserId}> */}
                                <IconButton className={classes.iconButton}  onClick={login}>
                                    <ArrowForwardRoundedIcon />
                                </IconButton>
                            </Paper>

                        )

                    }
                    </div>

                    <Menu className={classes.userMenu}
                            // elevation={10}
                        anchorEl={clickAvatar}
                        keepMounted
                        open={Boolean(clickAvatar)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        onClose={handleCloseAvatar}
                    >
                                {/*<Box>*/}
                                {/*    <Avatar sizes="44" />*/}
                                {/*</Box>*/}
                                    {/*<div className={classes.userName}>*/}
                                    {/*    userName*/}
                                    {/*</div>*/}
                                    {/*<span className="text-black-50 text-center">*/}
                                    {/*    Senior React Developer*/}
                                    {/*</span>*/}
                                    {/*<Divider className="w-100 mt-2"/>*/}
                                    {/* <MenuItem style={{minWidth: 200}} onClick={handleCloseAvatar}>
                                        <ListItemIcon><HomeRoundedIcon/></ListItemIcon>
                                        <ListItemText primary={'主页'}/>
                                    </MenuItem> */}
                                    <MenuItem style={{minWidth: 200}} onClick={()=>{window.location.href="/user/1"}}>
                                        <ListItemIcon><PersonRoundedIcon/></ListItemIcon>
                                        <ListItemText primary={'个人中心'}/>
                                    </MenuItem>
                                    <MenuItem onClick={logout}>
                                        <ListItemIcon><ExitToAppRoundedIcon/></ListItemIcon>
                                        <ListItemText primary={'退出登录'}/>
                                    </MenuItem>
                        {/*<Divider className="w-100"/>*/}

                    </Menu>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    )

} 


