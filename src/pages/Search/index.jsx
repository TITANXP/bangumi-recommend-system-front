import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';
import InputBase from "@material-ui/core/InputBase";
import Icon from "@material-ui/core/Icon";
import IconButton from '@material-ui/core/IconButton';
import Color from "color";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { Divider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import '../../config';

const useStyles = makeStyles((theme) => ({
    root: {
        // marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: "column", 
        alignItems: 'center'
    },
    searchInput: {
        width: '55%', 
        height: 50,
        display: 'flex', 
        padding: '0px 4px', 
        margin: theme.spacing(3), 
        alignItems: 'center', 
        borderRadius: 45, 
        boxShadow: `0 2px 5px 1px rgb(64 60 67 / 16%)`,
        '&:hover': {
            backgroundColor: theme.palette.grey[250],
            // boxShadow: `0 0 0 0.2rem ${Color('#80bdff').fade(0.75)}`
            boxShadow: `0 2px 12px 2px rgb(64 60 67 / 24%)`
        }
    },
    searchInputRoot: {
        // backgroundColor: theme.palette.grey[200],
        // padding: "11px 16px",
        width: '100%',
        margin: theme.spacing(2),
        borderRadius: 45,
    },
    searchInputInput: {
        // backgroundColor: theme.palette.grey[200],
        padding: "2px 4px",
        borderRadius: 45,
        // '&:focus': {
        //     backgroundColor: theme.palette.grey[250],
        //     boxShadow: `0 0 0 0.2rem ${Color('#80bdff').fade(0.75)}`
        // }
    },
    animeCard: {
        height: '180px',
        width: '55%',
        margin: theme.spacing(2),
        borderRadius: 15,
        boxShadow: `0 1px 20px 0 rgba(0, 0, 0, 0.1)`, // pinterest
        // boxShadow: `0 2px 10px 1px rgb(64 60 67 / 15%)`,
    },
    animeCover: {
        width: '130px',
        height: '180px',
        objectFit:'cover', // 图片的填充方式
        borderRadius: `15px 0px 15px 0px`,
        display: 'flex',
        justifyContent: "center", // 水平居中
        alignItems: "center",    // 垂直居中
    },
    ratingText: {
        verticalAlign: 'top',
        // fontWeight: 'bold',
        fontSize: 20,
        color: '#ffb400',
        marginLeft: theme.spacing(2),
        display: 'inline-block',
    },
}));

export default function Search(props) {
    const classes = useStyles();

    const [res, setRes] = React.useState({isLoaded: false, items: []})
    const [kwIsNull, setKwIsNull] = React.useState(false)
    // 搜索词
    const searchRef = React.useRef()
    
    // 解构赋值
    var {keyword} = props.match.params; // 搜索词

    React.useEffect(() => { // 函数式组件的hook，空数组表示什么也不监听，只在初始化时执行，如果不写则监听所有状态
        // 搜索动画
        console.log(keyword)
        fetch(global.constants.BACKEND_URL + "/searchAnime?keyword="+keyword,
        {
            method: "GET",
        }).then(res => res.json())
        .then(json => {
            setRes({isLoaded: true, items: json})
        })
    },[])
    
    

    // 键盘事件
    const onKeyDown = (e) => {
        if (e.keyCode === 13) { //回车键
            search()
        }
    }

    // 搜索框内容变化
    const keyWordChange = () => {
        if (searchRef.current.value == ''){
            setKwIsNull(true)
        }else{
            setKwIsNull(false)
        }
    }

    const search = () => {
        if(searchRef.current.value == '') return;
        keyword = searchRef.current.value
        setRes({isLoaded: false, items: []})
        props.history.push('/search/' + keyword)
        fetch(global.constants.BACKEND_URL + "/searchAnime?keyword="+keyword,
        {
            method: "GET",
        }).then(res => res.json())
        .then(json => {
            setRes({isLoaded: true, items: json})
        })
    }

    // 清除搜索框内容
    const clearKeyword = () => {
        searchRef.current.value = ''
        setKwIsNull(true)
    }

    // 点击动画
    const clickAnime = (animeId) => {
        const w = window.open('about:black');
        w.location.href="/anime/"+animeId
    }


    return (
        <div className={classes.root}>
            {/* 搜索框 */}
            <Paper  component="form" className={classes.searchInput}>
                <InputBase
                    classes={{root: classes.searchInputRoot, input: classes.searchInputInput}}
                    placeholder={"搜索..."}
                    // startAdornment={<SearchRoundedIcon/>}
                    defaultValue={keyword}
                    inputRef={searchRef}
                    onKeyDown={onKeyDown}
                    onChange={keyWordChange}
                />
                {!kwIsNull && 
                    <IconButton onClick={clearKeyword}>
                        <CloseRoundedIcon/>
                    </IconButton>
                }
                
                <Divider orientation="vertical" style={{height: 30}}/>
                <IconButton  onClick={search}>
                    <SearchRoundedIcon />
                </IconButton>
            </Paper>
            {res.isLoaded
                ? <Grid container spacing={0} direction="column" justify="center" alignItems="center">
                    {res.items.map((item) => (
                        <Card className={classes.animeCard}>
                            <Grid item key={item.id} style={{display: 'flex' }}>
                                <CardActionArea className={classes.animeCover} onClick={clickAnime.bind(this, item.id)}>
                                    {item.api.images
                                        ? <img src={item.api.images.large} className={classes.animeCover} />
                                        : <ImageRoundedIcon  style={{ fontSize: 60, color: grey[400] }}/>
                                    }
                                </CardActionArea>
                                <Grid style={{margin: 8, display: 'flex', flexDirection: "column", justifyContent: 'space-between'}}>
                                    {item.api.name_cn 
                                        ? <div style={{}}>
                                            <Typography variant='h6' style={{margin: 1}}>
                                                {item.api.name_cn ? item.api.name_cn : item.api.name}
                                                {/* <span style={{color: 'grey', fontSize: 13}}>{' ' +item.name}</span> */}
                                            </Typography>
                                            <Typography variant='subtitle2' color="textSecondary">{item.name}</Typography>
                                          </div>
                                        :<Typography variant='h6' style={{margin: 1}}>{item.api.name}</Typography>
                                    }
                                    
                                     <Typography style={{ marginTop: 20, marginBottom: 20}}> 
                                        {item.api.air_date != '0000-00-00' && item.api.air_date}
                                        {item.info.动画制作 && (' / ' + item.info.动画制作)}
                                        {item.info.原作 && (' / ' + item.info.原作)}
                                        {item.info.导演 && (' / ' + item.info.导演)}
                                        {item.info.音乐 && (' / ' + item.info.音乐)}
                                    </Typography>
                                    <div>
                                        < Rating name="half-rating-read" defaultValue={item.rating ? item.rating.score/2 : 0} precision={0.5} readOnly/>
                                        <Typography className={classes.ratingText} display="inline">{item.rating ? item.rating.score.toFixed(1) : '—.—'}</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Card>
                    ))}
                </Grid>
                : <Grid container spacing={0} direction="column" justify="center" alignItems="center">
                    {[1,2, 3, 4, 5].map((item) => (
                        <Paper className={classes.animeCard}>
                            <Grid item  style={{display: 'flex'}}>
                                <Skeleton variant='rect' className={classes.animeCover}/>
                                <Grid style={{margin: 8, display: 'flex', flexDirection: "column", justifyContent: 'space-between'}}>
                                    <Typography variant='h6' style={{margin: 1}}>
                                        <Skeleton width={150}/>
                                    </Typography>
                                    <Typography variant='subtitle2' color="textSecondary"><Skeleton width={300}/></Typography>
                                    
                                    <Typography style={{ marginTop: 20, marginBottom: 20}}> 
                                        <Skeleton width={600}/>
                                    </Typography>
                                    <Skeleton variant='rect' width={180}/>
                                </Grid>
                            </Grid>
                        </Paper>
                     ))}
                </Grid>
            }
                  
        </div>
    )
}
