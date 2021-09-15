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

import { grey } from '@material-ui/core/colors';

import data from './data.json';
import RatingChart from '../../components/RatingChart';
import ChatMessages from '../../components/ChatMessage';
import { DriveEta } from '@material-ui/icons';

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
        alignItems: "center",
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
        height: 312.672,
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
    }

}));



export default function Anime(props) {
    const classes = useStyles();
    // 请求数据
    const [anime, setAnime] = React.useState({isLoaded: false, data: data})
    const [simAnime, setSimAnime] = React.useState({ isLoaded: false, items: [1,2,3,4,5,6]}) 
    // 解构赋值
    const {id} = props.match.params;
    
    React.useEffect(() => { // 函数式组件的hook，空数组表示什么也不监听，只在初始化时执行，如果不写则监听所有状态
        fetch("http://localhost:6010/getAnime?id="+id,
        {
            method: "GET",
        }).then(res => res.json())
        .then(json => {
            console.log(json)
            setAnime({isLoaded: true, data: json})
        })
        // 相似推荐
        fetch("http://localhost:6010/getSimAnime?id="+id+"&start=0&size=6",
        {
            method: "GET",
        }).then(res => res.json())
        .then(json => {
            console.log(json)
            setSimAnime({isLoaded: true, items: json})
        })
    }, []) 

    // 点击动画
    const clickAnime = (animeId) => {
        if (animeId == undefined) return;
        const w = window.open('about:black');
        w.location.href="http://localhost:3000/anime/"+animeId
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
            <div className={classes.main}>
                <Paper elevation={1} className={classes.sideBar}>
                    {anime.isLoaded
                        ?   
                        <Box >
                            {/* <Typography className={classes.sideBarText}>
                            <   Typography color="textSecondary">中文名：</Typography>
                                {anime.data.name_cn}
                            </Typography>
                            <Typography className={classes.sideBarText}>
                            <Typography color="textSecondary">话数：</Typography>
                                {anime.data.eps_count}
                            </Typography>
                            <Typography className={classes.sideBarText}>
                                <Typography color="textSecondary">放送开始：</Typography>
                                {anime.data.air_date}
                            </Typography>
                            <Typography className={classes.sideBarText}>
                                <Typography color="textSecondary">放送星期：</Typography>
                                {anime.data.air_weekday}
                            </Typography>
                            {anime.data.staff.map((item) => (
                                <Typography className={classes.sideBarText}>
                                    <Typography color="textSecondary">{item.jobs}：</Typography>
                                    {item.name}
                                </Typography>
                            ))} */}
                            {/* {Object.entries(anime.data.info).map(([k,v]) => (
                                <Box className={classes.sideBarText} component="div" overflow="visible" >
                                    <Typography color="textSecondary">{k}：</Typography>
                                    <Typography  >{v}</Typography>
                                    <Divider style={{marginTop: 5, marginBottom: 5}} variant="middle"/>
                                </Box>
                            ))} */}
                            {anime.data.info.map(([k,v]) => (
                                <Box className={classes.sideBarText} component="div" overflow="visible" >
                                    <Typography color="textSecondary">{k}：</Typography>
                                    <Typography  >{v}</Typography>
                                    <Divider style={{marginTop: 5, marginBottom: 5}} variant="middle"/>
                                </Box>
                            ))} 
                        </Box>
                        : <Box >
                            <Skeleton width={150}  height={20} variant="rect" style={{marginTop: 8, marginBottom: 8, borderRadius: 8}}/>
                            <Skeleton width={200}  height={20} variant="rect" style={{marginTop: 8, marginBottom: 8, borderRadius: 8}}/>
                            <Skeleton width={100}  height={20} variant="rect" style={{marginTop: 8, marginBottom: 8, borderRadius: 8}}/>
                            <Skeleton width={100}  height={20} variant="rect" style={{marginTop: 8, marginBottom: 8, borderRadius: 8}}/>
                            <Skeleton width={160}  height={20} variant="rect" style={{marginTop: 8, marginBottom: 8, borderRadius: 8}}/>
                            <Skeleton width={170}  height={20} variant="rect" style={{marginTop: 8, marginBottom: 8, borderRadius: 8}}/>
                            <Skeleton width={160}  height={20} variant="rect" style={{marginTop: 8, marginBottom: 8, borderRadius: 8}}/>
                            <Skeleton width={100}  height={20} variant="rect" style={{marginTop: 8, marginBottom: 8, borderRadius: 8}}/>
                        </Box>
                    
                    }

                </Paper >
                <div className={classes.content}>
                    <div style={{display: 'flex', justifyContent:'space-between'}}>
                        <Typography variant="subtitle1">角色介绍</Typography>
                        {anime.isLoaded
                            ? <Button href={"https://bangumi.tv/subject/"+id+"/characters"} color="primary" endIcon={<DoubleArrowRoundedIcon/>} size="small"  >
                                全部角色
                            </Button>
                            :<Skeleton  variant="rect" width={77.5} height={22} style={{marginTop: 8, marginBottom: 8, borderRadius: 8}}/>
                        }
                    </div>
                    <Grid container direction="row" spacing={2} className={classes.crtGridContainer}>
                        {anime.isLoaded
                            ?(anime.data.api.crt &&( anime.data.api.crt.map((item) => (
                                <Grid item key={item.id} className={classes.crtGridItem}>
                                    <Card elevation={1} className={classes.crtCard}>
                                        {/* 角色 */}
                                        <div className={classes.characterDiv}>
                                            <CardMedia image={item.images? item.images.medium : ""} className={classes.crtCardMedia}></CardMedia>
                                            <div className={classes.crtCardText} >
                                                <Typography variant="caption" >{item.name_cn ? item.name_cn : item.name}</Typography>
                                                <Typography variant="caption" color="textSecondary">{item.role_name}</Typography>
                                            </div>
                                        </div>
                                        {/* CV */}
                                        {item.actors &&
                                            <div className={classes.actorDiv}>
                                                <div className={classes.crtCardText}>
                                                    <Typography variant="caption">{item.actors[0].name}</Typography>
                                                    <Typography variant="caption" color="textSecondary">CV</Typography>
                                                </div>
                                                <CardMedia image={item.actors[0].images && item.actors[0].images.medium} className={classes.crtCardMedia}/>
                                            </div>
                                        }
                                    </Card>
                                </Grid>
                            ))))
                            :([1,2,3,4,5,6,7,8,9].map((item) => (
                                <Grid item  className={classes.crtGridItem}>
                                    <Card elevation={1} className={classes.crtCard}>
                                        {/* 角色 */}
                                        <div className={classes.characterDiv}>
                                            <Skeleton  variant="rect"  className={classes.crtCardMedia}/>
                                            
                                            <div className={classes.crtCardText} >
                                                <Skeleton width={50} style={{borderRadius: 8}}/>
                                                <Skeleton width={30} style={{borderRadius: 8}}/>
                                            </div>
                                        </div>
                                        {/* CV */}
                                        <div className={classes.actorDiv}>
                                            <div className={classes.crtCardText} style={{alignItems:"flex-end"}}>
                                                <Typography variant="caption"><Skeleton width={50} style={{borderRadius: 8}}/></Typography>
                                                <Skeleton width={30} style={{borderRadius: 8, alignItems:"flex-end"}}/>
                                            </div>
                                            <Skeleton  variant="rect" className={classes.crtCardMedia}/>
                                        </div>
                                    </Card>
                                </Grid>

                            )))
                        }

                    </Grid>

                    <Divider variant="middle" style={{marginTop: 20, marginBottom: 20}}/>

                    {/* 相似动画 */}
                    <div>
                        <div style={{display: 'flex', justifyContent:'space-between'}}>
                        <Typography variant="subtitle1">相似推荐</Typography>
                            {anime.isLoaded
                                ? <Button href={"/simAnime/"+id} color="primary" endIcon={<DoubleArrowRoundedIcon/>} size="small"  >
                                    更多
                                </Button>
                                :<Skeleton  variant="rect" width={77.5} height={22} style={{marginTop: 8, marginBottom: 8, borderRadius: 8}}/>
                            }
                        </div>
                        <Grid container direction="row" spacing={2}>
                            {simAnime.items.map((item) => (
                                <Grid item key={item.id}>
                                    <Card className={classes.animeCard} elevation={2}> 
                                        <CardActionArea onClick={clickAnime.bind(this, item.id)} style={{height: '100%'}}>
                                            <CardContent className={classes.animeCardContent}>
                                                {simAnime.isLoaded
                                                    ? (item.images
                                                        ? <img src={item.images.large} className={classes.animeCardImg} />
                                                        : <ImageRoundedIcon  style={{ fontSize: 60, color: grey[400] }}/> )
                                                    : <Skeleton animation="wave" variant="rect" className={classes.animeCardImg}/>
                                                }
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                    {simAnime.isLoaded
                                      ? <Tooltip title={item.name_cn ? item.name_cn : item.name} TransitionComponent={Zoom}>
                                            <Typography variant="subtitle1" style={{ width: 130, whiteSpace: 'nowrap', textOverflow:"ellipsis",overflow: "hidden" }}>
                                                {item.name_cn ? item.name_cn : item.name}
                                            </Typography>
                                        </Tooltip>
                                      : <Skeleton variant="text" animation="wave" style={{ width: 100 }} />
                                }
                                </Grid>
                            ))}
                        </Grid>
                    </div>

                    <div className={classes.blogList}>
                        {anime.isLoaded
                        ? ( anime.data.api.blog && (
                                anime.data.api.blog.map((item) => (
                                    <div>
                                        <div className={classes.blogDiv} >
                                            <ChatMessages avatar={item.user.avatar.medium} messages={[item.summary]}/>
                                        </div>
                                        <Divider variant="middle"/>
                                    </div>
                                ))
                            )
                        )
                        : ([1,2,3].map((item) => (
                            <div>
                                <div className={classes.blogDiv} style={{display: 'flex'}}>
                                    <Skeleton variant="circle" c style={{ width: 32, height: 32, marginRight: 8}} />
                                    <Skeleton variant="rect" animation="wave" style={{ width: 584.547 , height: 150, marginLeft: 8, borderRadius: 20}} />
                                </div>
                                <Divider variant="middle"/>                               
                            </div>
                        )))
                        }
                    </div>
                    
  
                </div>

            </div>
        </div>
    )
}
