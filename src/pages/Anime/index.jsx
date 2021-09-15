import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded';
import { makeStyles } from '@material-ui/core/styles';
import {Route,Switch,Redirect, Link, NavLink} from 'react-router-dom'

import { grey } from '@material-ui/core/colors';

import data from './data.json';
import RatingChart from '../../components/RatingChart';
import AnimeContent from '../../components/AnimeContent';
import SimAnimePage from '../SimAnime';
import '../../config';


// const anime = data;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        marginTop: -theme.spacing(8),
        // backgroundColor: "skyblue"
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: theme.spacing(16),
        paddingBottom: theme.spacing(8),
        paddingLeft: '5%',
        paddingRight: '5%',
        // backgroundColor: "#f7acbc"
        backgroundColor: "white",
    },
    cover: {
        paddingLeft: "7%",
        // backgroundColor: "#b28fce",
        // width: '215px',
        height: '312.672px',
    },
    coverImage: {
        height: '312.672px',
        width: '221.11px',
        display: 'flex',
        justifyContent: "center", // 水平居中
        alignItems: "center",    // 垂直居中
        objectFit:'cover' // 图片的填充方式
    },
    inline: {
        display: 'inline-block',
    },
    headerMid: {
        paddingLeft: '5%',
        paddingRight: '5%',
        // backgroundColor: "#FEDFE1",
        width: '62%',
        // height: 312.672,
    },
    title: {
        paddingBottom: theme.spacing(8),
    },
    main: {
        paddingLeft: "13%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    sideBar: {
        // backgroundColor: "#7db9de",
        // backgroundColor: "white",
        padding: theme.spacing(2),
        width: "16%",
        borderRadius: 10,
    },
    sideBarText: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        // display: "flex",
        wordBreak: 'break-all'  // 遇到英文时，词不会被拆开，导致文本溢出
    },
    content: {
        paddingLeft: theme.spacing(6),
        width: "57%",
        // backgroundColor: "#8b81c3"
    },
    crtGridContainer: {
        paddingTop: theme.spacing(1),
    },
    crtGridItem: {
        width: 300,
        height: 81,
    },
    crtCard: {
        display: "flex",
        justifyContent: "space-between", // 两端对齐
        width: "100%",
        height: "100%",
        borderRadius: 10,
        boxShadow: `0 1px 5px 1px rgb(64 60 67 / 24%)`,
    },
    crtCardMedia: {
        width: 60,
        height: 81
    },
    crtCardContent: {
        display: "flex",
        flexDirection: "row",
        width: '50%'
    },
    crtCardText: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // 两端对齐
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 4,
        paddingBottom: 4,
    },
    characterDiv: {
        display: "flex",
        justifyContent: "flex-start",
    },
    actorDiv: {
        display: "flex",
        justifyContent: "flex-end",
        textAlign:"right"
    },
    blogList: {
        paddingTop: theme.spacing(4),
    },
    blogDiv: {
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
    animeCard: {
        height: 180,
        width: 130,
    },
    animeCardContent: {
        padding: 0,
        display: 'flex',
        justifyContent: "center", // 水平居中
        alignItems: "center",    // 垂直居中
        height: '100%'
    },
    animeCardImg: {
        height: '180px',
        width: '130px',
        objectFit:'cover' // 图片的填充方式
    },

    navLink: {
        color: grey[500],
        textDecoration: 'none',
        fontSize: 18,
        lineHeight: '45px',
        marginLeft: theme.spacing(8)
    },
    active: {
        color: `rgba(29,161,242,1.00)`,
        textDecoration: 'none',
        borderBottomWidth: 3,
        borderBottomStyle: 'solid',
        borderBottomColor: `rgba(29,161,242,1.00)`
    },

}));



export default function Anime(props) {
    const classes = useStyles();
    // 请求数据
    const [anime, setAnime] = React.useState({isLoaded: false, data: data})
    // const [simAnime, setSimAnime] = React.useState({ isLoaded: false, items: [1,2,3,4,5,6]}) 
    // 解构赋值
    const {id} = props.match.params;
    
    React.useEffect(() => { // 函数式组件的hook，空数组表示什么也不监听，只在初始化时执行，如果不写则监听所有状态
        fetch(global.constants.BACKEND_URL + "/getAnime?id="+id,
        {
            method: "GET",
        }).then(res => res.json())
        .then(json => {
            console.log(json)
            setAnime({isLoaded: true, data: json})
        })
        // 相似推荐
        // fetch("http://localhost:6010/getSimAnime?id="+id+"&start=0&size=6",
        // {
        //     method: "GET",
        // }).then(res => res.json())
        // .then(json => {
        //     console.log(json)
        //     setSimAnime({isLoaded: true, items: json})
        // })
    }, []) 

    // 点击动画
    const clickAnime = (animeId) => {
        if (animeId == undefined) return;
        const w = window.open('about:black');
        w.location.href="/anime/"+animeId
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.cover}>
                    <Paper  elevation={8} className={classes.coverImage}>
                        {anime.isLoaded
                            ? (anime.data.api.images 
                                ? <img src={anime.data.api.images.large} className={classes.coverImage} />
                                : <ImageRoundedIcon  style={{ fontSize: 60, color: grey[400] }}/> )
                            : <Skeleton animation="wave" variant="rect" width={221.11} height={312.67}/>
                        }
                    </Paper>
                </div>
                <div className={classes.headerMid}>
                    <Typography variant="h5" className={classes.inline, classes.title}>
                        {anime.isLoaded ? (anime.data.api.name_cn ? anime.data.api.name_cn : anime.data.name) : <Skeleton animation="wave" variant="rect" width={200} style={{borderRadius: 8}}/>}
                    </Typography>
                    {/* <Typography variant="h6" color="textSecondary" className={classes.inline}>
                        {anime.data.type}
                    </Typography> */}
                    <Typography variant="body1">
                        {/* {anime.data.summary} */}
                        {anime.isLoaded 
                            ? anime.data.summary
                            :
                            <Box >
                                <Skeleton width={781} />
                                <Skeleton width={781} />
                                <Skeleton width={781} />
                                <Skeleton width={781} />
                                <Skeleton width={300} />
                            </Box>
                        }
                            
                    </Typography>
                </div>
                {anime.isLoaded
                    ? (anime.data.api.rating && <RatingChart anime={anime.data.api}/>) 
                    : <Skeleton  variant="rect" width={200} height={200} style={{borderRadius: 8}}/>
                }
            </div>
            {/* <Link to={{pathname:"/anime/"+id+"/content", state:{id: id, anime: anime, simAnime: simAnime}}}>aa</Link> */}
            <div style={{display: 'flex', backgroundColor: 'white',justifyContent: "flex-start", alignItems: "center", paddingLeft:220}}>
                <NavLink activeClassName={classes.active} className={classes.navLink} to={"/anime/"+id+"/content"} >概览</NavLink>
                <NavLink activeClassName={classes.active} className={classes.navLink} to={"/anime/"+id+"/simAnime"}>相似推荐</NavLink>
            </div>
            {/* <AnimeContent id={id} anime={anime} simAnime={simAnime}/> */}
            <Switch>
                {/* 声明接收params参数 */}
                <Route path="/anime/:id/content" component={AnimeContent} />
                <Route path="/anime/:id/simAnime" component={SimAnimePage} />
                {/* <Redirect to={{pathname:"/anime/"+id+"/content", state:{id: id, anime: anime, simAnime: simAnime}}} /> */}
                <Redirect to={"/anime/"+id+"/content"} />
            </Switch>
            {/* <SimAnimePage id={id} /> */}
        </div>
    )
}
