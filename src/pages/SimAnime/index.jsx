import React from 'react'
import {Link,Route} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';
import CardActionArea from '@material-ui/core/CardActionArea';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import clsx from 'clsx';
import PubSub from 'pubsub-js';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

import Anime from '../Anime'

import data from '../../data1.json'
import { grey } from '@material-ui/core/colors';

import InfiniteScroll from 'react-infinite-scroll-component';
import '../../config';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        // paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(26),
        paddingRight: theme.spacing(26),
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center", // 水平居中
        alignItems: "center",    // 垂直居中
    },
    anime: {
        position: 'relative',
        '&:hover': {
            '& $animeDetail':{ //子元素
                display: 'block',
            }
        }
    },
    animeDetail: {
        position: 'absolute',
        left: 222,
        top: 0,
        zIndex: 1000,
        padding: theme.spacing(2),
        width: 350,
        display: 'none',

    },
    card: {
        height: '265px',
        width: '185px',
        display: 'flex',
        borderRadius: 10, // 圆角
        // flexDirection: 'column',
        boxShadow:  '0 8px 40px -12px rgba(0,0,0,0.3)', //更改阴影效果
        '&:hover': {
            transform: `scale(1.01)`,
            // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            // boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
            boxShadow: '0 16px 70px -10.125px rgba(0,0,0,0.3)',
        },
    },
    cardActionArea: {
        display: 'flex',
        flexDirection: 'row',
    },
    cardMedia: {
        // 图片尺寸：300 x 425
        // paddingTop: '56.25%', // 16:9
        height: '100%',
        width: '100%',
        display: 'flex',
        flexShrink: 0,
    },
    cardContent: {
        flexGrow: 1,
    },
    ratingText: {
        verticalAlign: 'top',
        // fontWeight: 'bold',
        fontSize: 20,
        color: '#ffb400',
        marginLeft: theme.spacing(2),
        display: 'inline-block',
    },
    // 移动内容
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen, //持续时间
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth/2,
    },
}));

export default function SimAnime(props) {
    // 解构赋值
    const {id} = props.match.params;

    const classes = useStyles();
    const [hover, setHover] = React.useState(false);
    const handleMouseEnter = () => {
        setHover(true)
    };
    const handleMouseLeave = () => {
        setHover(false)
    };

    // 请求数据
    const [data, setData] = React.useState({isLoaded: false, items: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]})
    const [hasMore, setHasMore] = React.useState(true);


    // 左侧抽屉出现时，向右移动内容
    const [openDrawer, setOpenDrawer] = React.useState(false);
    let token;
    React.useEffect(() => { // 函数式组件的hook，空数组表示什么也不监听，只在初始化时执行，如果不写则监听所有状态
        token = PubSub.subscribe('openDrawer', (msg, data) => {
            setOpenDrawer(data)
        })
        // 相似推荐
        fetch(global.constants.BACKEND_URL + "/getSimAnime?id="+id+"&start=0&size=30",
        {
            method: "GET",
        }).then(res => res.json())
        .then(json => {
            console.log(json)
            setData({isLoaded: true, items: json})
        })
        return () => { // 在组件卸载前执行，相当于类式组件的componentWillUnmount()
            PubSub.unsubscribe(token)
        }
    }, []) 

    
    // 点击动画
    const clickAnime = (animeId) => {
        if (animeId == undefined) return;
        const w = window.open('about:black');
        w.location.href="/anime/"+animeId
    }

    const fetchMoreData = () => {
        if (data.items.length >= 100) {
          setHasMore(false);
          return;
        }
        // 相似推荐
        fetch(global.constants.BACKEND_URL+"/getSimAnime?id="+id+"&start="+data.items.length+"&size=30",
        {
            method: "GET",
        }).then(res => res.json())
        .then(json => {
            setData({isLoaded: true, items: data.items.concat(json)})
            console.log("tttttt")
        })
      };

    return (
        <main className={clsx(classes.content, {[classes.contentShift]: openDrawer})}>
            <div className={classes.drawerHeader}/>
            <InfiniteScroll
                dataLength={data.items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<CircularProgress />}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>没有更多推荐结果</b>
                    </p>
                }
                className={classes.cardGrid}
            >
                <Grid container  direction="row" justify="center" spacing={8} style={{margin:0, height:'100%', width:'100%'}}>
                    {data.items.map((item) => (
                        <Grid item  key={item.id} className={classes.anime}>
                            <Card className={classes.card} onMouseEnte={handleMouseEnter}
                                onMouseLeave={handleMouseLeave} elevation={2}>
                                <CardActionArea className={classes.cardActionArea} onClick={clickAnime.bind(this, item.id)}>
                                {data.isLoaded
                                    ? (item.images 
                                        ? <CardMedia className={classes.cardMedia} image={item.images.large} title="Image title"/> 
                                        : <ImageRoundedIcon  style={{ fontSize: 60, color: grey[400] }}/>
                                       )
                                    : <Skeleton animation="wave" variant="rect" className={classes.cardMedia}/>
                                }
                                </CardActionArea>
                            </Card>
                            <div  style={{display: 'flex', marginTop: 5}}>
                                {data.isLoaded
                                    ? <Tooltip title={item.name_cn ? item.name_cn : item.name} TransitionComponent={Zoom} >
                                        <Typography variant="subtitle1"  style={{ width: 130, whiteSpace: 'nowrap', textOverflow:"ellipsis",overflow: "hidden" }}>
                                            {item.name_cn ? item.name_cn : item.name}
                                        </Typography>
                                    </Tooltip>
                                    : <Skeleton variant="text" animation="wave" style={{ width: 150 , borderRadius: 6}} />
                                }

                                {data.isLoaded && <Typography className={classes.ratingText} display="inline">{item.rating ? item.rating.score.toFixed(1) : '-.-'}</Typography>}
                            </div>
                            {data.isLoaded &&
                                <Paper className={classes.animeDetail}>
                                    <Typography gutterBottom variant="h6" component="h2">{item.name_cn ? item.name_cn : item.name}</Typography>
                                    < Rating name="half-rating-read" defaultValue={item.rating ? item.rating.score/2 : 0} precision={0.5} readOnly/>
                                    <Typography className={classes.ratingText} display="inline">{item.rating ? item.rating.score.toFixed(1) : '—.—'}</Typography>
                                    <Typography variant="body1"  style={{ fontSize: 13 }} display="block"> { item.summary} </Typography>
                                </Paper>
                            }
                        </Grid>
                    ) )}

                          {/* {items.map((item) => (
                            <Grid item   className={classes.anime}>
                                <Card className={classes.card} onMouseEnte={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave} elevation={2}>
                                    <CardActionArea className={classes.cardActionArea} >
                                            <Skeleton animation="wave" variant="rect" className={classes.cardMedia}/>
                                    </CardActionArea>
                                </Card>
                                <div  style={{display: 'flex', marginTop: 5}}>
                                        <Skeleton variant="text" animation="wave" style={{ width: 150 , borderRadius: 6}} />
                                </div>
                            </Grid>
                        ))} */}
                </Grid>
            </InfiniteScroll>
                
        </main>
    )
}
