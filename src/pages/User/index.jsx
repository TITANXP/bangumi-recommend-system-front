import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import PubSub from 'pubsub-js';
import '../../config';



const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: theme.spacing(4),
    },
    header: {
        display: "flex",
        width: '50%',
        borderRadius: 15,
        boxShadow: `0 1px 12px 0 rgba(0, 0, 0, 0.1)`, 
    },
    headerRight: {
        marginLeft: theme.spacing(2)
    },
    userNameDiv: {
        display: "flex",
        alignItems: "center",
    },
    userList: {
        width: '50%',
        marginTop: theme.spacing(2),
        borderRadius: 25,
    },
    userListHeader: {
        padding: theme.spacing(2),
    },
    listItem: {
        width: '100%',
        // backgroundColor: '#EEA9A9',
    },
    contentItem: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        // backgroundColor: '#FEDFE1'
    },
    contentItemMain: {
        display: "flex",
        flexDirection: "row",
        margin: theme.spacing(2),
    },
    contentItemAvatar: {
        // 设定头像大小
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: theme.spacing(2),
    },
    contentItemText: {
        width: '100%',
        // backgroundColor: '#B28FCE',
    },
    contentUserAvatar: {
        // 设定头像大小
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    avatarButton: {
        borderRadius: 50,
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    nameButton: {
        borderRadius: 25,
    }

}));



export default function User() {
    const classes = useStyles();
    const [simUser, setSimUser] = React.useState({isLoaded: false, items: [0,1,2,3,4,5,6,7,8,9]});
    // 登录用户信息
    const [user, setUser] = React.useState({isLoaded: false, data: {}});

    let userSub;
    React.useEffect(() => { // 函数式组件的hook，空数组表示什么也不监听，只在初始化时执行，如果不写则监听所有状态
        userSub = PubSub.subscribe('user', (msg, data) => {
            setUser({isLoaded: true, data: data})
            fetch(global.constants.BACKEND_URL + "/getSimUser?id="+data.id+"&size=30", //注意在这里要使用data，而不是user，否则取不到数据
            {
                method: "GET",
            }).then(res => res.json())
            .then(json => {
                console.log(json)
                setSimUser({isLoaded: true, items: json})
            })
            console.log('user:')
            console.log(data)
        })
        return () => { // 在组件卸载前执行，相当于类式组件的componentWillUnmount()
            PubSub.unsubscribe(userSub)
        }
    }, []) 

    return (
        <div className={classes.root}>
            <Paper className={classes.header}>
                {user.isLoaded 
                    ? <img src={user.data.avatar.large} width="75" height="75" style={{borderRadius: 15}} />
                    : <Skeleton variant="rect" width={75} height={75} style={{borderRadius: 15}}/>
                }
                <div className={classes.headerRight}>
                    <div className={classes.userNameDiv}>
                        <Typography variant="h4">{user.isLoaded ? user.data.nickname : <Skeleton width={150}  style={{borderRadius: 6}}/>}</Typography>
                        <Typography variant="caption" color="textSecondary" style={{marginLeft: 2}}>{user.isLoaded ? '@'+user.data.username : <Skeleton width={50}/>}</Typography>
                    </div>
                    <div>
                        <Typography >{user.isLoaded ? user.data.sign : <Skeleton width={500} style={{borderRadius: 6}}/>}</Typography>
                    </div>
                </div>
            </Paper>
            <Paper elevation={2} className={classes.userList}>
                <div className={classes.userListHeader}>
                    <Typography variant='h5'>兴趣相似的用户</Typography>
                </div>
                <Divider></Divider>
                {simUser.items.map((item) => (
                    <div className={classes.listItem}>
                        <div className={classes.contentItem}>
                            <div className={classes.contentItemMain}>
                                <div className={classes.contentItemAvatar}>
                                <Button className={classes.avatarButton} href={simUser.isLoaded ? item.url : ''}>
                                    <span>
                                            {simUser.isLoaded 
                                                ? <Avatar src={item.avatar.large} className={classes.contentUserAvatar}/>
                                                : <Skeleton variant='circle' className={classes.contentUserAvatar}/>
                                            }
                                    </span>
                                    </Button>
                                </div>
                                <div className={classes.contentItemText} >
                                    <Button href={item.url} className={classes.nameButton}>
                                        <Typography variant="h5" >{simUser.isLoaded ? item.nickname : <Skeleton width={100}/>}</Typography>
                                    </Button>
                                    <Typography >{simUser.isLoaded ? item.sign : <Skeleton width={300}/> }</Typography>
                                </div>
                            </div>                            
                            <Divider variant="middle" />
                        </div>
                    </div>
                ))}

            </Paper>
        </div>
    )
}
