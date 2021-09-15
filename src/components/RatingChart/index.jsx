import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';
import { Rose } from '@ant-design/charts';
import { Pie } from '@ant-design/charts';
import { Bar } from '@ant-design/charts';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import RoseChart from '@ant-design/charts/es/rose';

const useStyles = makeStyles((theme) => ({
    ratingDiv: {
        height: 200,
        width: 220,
    },
    ratingTextDiv: {
        display: "flex",
        alignItems: "center",
    },
    ratingTextScore: {
        paddingRight: theme.spacing(2),
        fontSize: 43,
        color: '#ffb400',
    }
}));
const RatingColumn = React.FC = (props) => {
    const anime = props.anime;
    var data = [
        {
            rating: '1',
            value: anime.rating.count[1],
        },
        {
            rating: '2',
            value: anime.rating.count[2],
        },
        {
            rating: '3',
            value: anime.rating.count[3],
        },
        {
            rating: '4',
            value: anime.rating.count[4],
        },
        {
            rating: '5',
            value: anime.rating.count[5],
        },
        {
            rating: '6',
            value: anime.rating.count[6],
        },
        {
            rating: '7',
            value: anime.rating.count[7],
        },
        {
            rating: '8',
            value: anime.rating.count[8],
        },
        {
            rating: '9',
            value: anime.rating.count[9],
        },        {
            rating: '10',
            value: anime.rating.count[10],
        },
    ];
    var paletteSemanticRed = '#F4664A';
    var brandColor = `rgba(29,161,242,1.00)`;
    var config = {
        data: data,
        xField: 'rating',
        yField: 'value',
        seriesField: '人数',
        color: function color(_ref) {
          var rating = _ref.rating;

          return brandColor;
        },

        meta: {
          rating: { alias: '评分' },
          value: { alias: '人数' },
        },
      };
      return <Column {...config} />;
};

const DemoRose =  React.FC = (props) => {
    const anime = props.anime;
    var data = [
      {
        type: '想看',
        value: anime.collection.wish,
      },
      {
        type: '看过',
        value: anime.collection.collect,
      },
      {
        type: '在看',
        value: anime.collection.doing,
      },
      {
        type: '搁置',
        value: anime.collection.on_hold,
      },
      {
        type: '抛弃',
        value: anime.collection.dropped,
      },
    ];
    var config = {
      data: data,
      xField: 'type',
      yField: 'value',
      seriesField: 'type',
      radius: 0.9,
    //   label: { offset: -15 },
    };
    return <Rose {...config} />;
  };

  const DemoPie = React.FC = (props) => {
    const anime = props.anime;
    var data = [
      {
        type: '想看',
        value: anime.collection.wish,
      },
      {
        type: '看过',
        value: anime.collection.collect,
      },
      {
        type: '在看',
        value: anime.collection.doing,
      },
      {
        type: '搁置',
        value: anime.collection.on_hold,
      },
      {
        type: '抛弃',
        value: anime.collection.dropped,
      },
    ];
    var config = {
      appendPadding: 10,
      data: data,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.64,
      meta: {
        value: {
          formatter: function formatter(v) {
            return ''.concat(v, ' \xA5');
          },
        },
      },
      label: {
        type: 'inner',
        offset: '-50%',
        style: { textAlign: 'center' },
        autoRotate: false,
        content: '{value}',
      },
      interactions: [
        { type: 'element-selected' },
        { type: 'element-active' },
        { type: 'pie-statistic-active' },
      ],
    };
    return <Pie {...config} />;
  };

  
const DemoBar= React.FC = (props) => {
    const anime = props.anime;
    var data = [
        {
            group: 1,
            type: '想看',
            value: anime.collection.wish,
          },
          {
            group: 1,
            type: '看过',
            value: anime.collection.collect,
          },
          {
            group: 1,
            type: '在看',
            value: anime.collection.doing,
          },
          {
            group: 1,
            type: '搁置',
            value: anime.collection.on_hold,
          },
          {
            group: 1,
            type: '抛弃',
            value: anime.collection.dropped,
          },
        ];
    var config = {
      data: data,
      xField: 'value',
      yField: 'group',
      seriesField: 'type',
      isPercent: true,
      isStack: true,
      label: {
        position: 'middle',
        content: function content(item) {
          return item.value.toFixed(2);
        },
        style: { fill: '#fff' },
      },
    };
    return <Bar {...config} />;
  };
  
export default function RatingChart(props){
    const classes = useStyles();
    return(
        <div className={classes.ratingDiv}>
            <div className={classes.ratingTextDiv}>
                <Typography className={classes.ratingTextScore} variant="h4" display="inline">{props.anime.rating.score.toFixed(1)}</Typography>
                <div>
                    <Rating name="half-rating-read" defaultValue={props.anime.rating.score/2} precision={0.5} readOnly/>
                    <Typography variant="subtitle2" >{props.anime.rating.total}人评分</Typography>
                </div>
            </div>
            <RatingColumn {...props}/>
            {/* <DemoBar {...props}/> */}
        </div>
    )
}