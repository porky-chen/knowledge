<template>
  <div>
    <div id="chart" style="width: 100%;height:500px"></div>
  </div>
</template>

<script>
/* eslint-disable */
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

const data = [
    {
      "date": "2015-01-04",
      "nlp": 8,
      "blockchain": 2
    },
    {
      "date": "2015-01-11",
      "nlp": 8,
      "blockchain": 2
    },
    {
      "date": "2015-01-18",
      "nlp": 8,
      "blockchain": 3
    },
    {
      "date": "2015-01-25",
      "nlp": 8,
      "blockchain": 3
    },
    {
      "date": "2015-02-01",
      "nlp": 8,
      "blockchain": 2
    },
    {
      "date": "2015-02-08",
      "nlp": 8,
      "blockchain": 2
    },
    {
      "date": "2015-02-15",
      "nlp": 8,
      "blockchain": 3
    },
    {
      "date": "2015-02-22",
      "nlp": 8,
      "blockchain": 2
    },
    {
      "date": "2015-03-01",
      "nlp": 8,
      "blockchain": 2
    },
    {
      "date": "2015-03-08",
      "nlp": 8,
      "blockchain": 2
    },
    {
      "date": "2015-03-15",
      "nlp": 8,
      "blockchain": 2
    },
    {
      "date": "2015-03-22",
      "nlp": 9,
      "blockchain": 2
    },
    {
      "date": "2015-03-29",
      "nlp": 8,
      "blockchain": 2
    },
    {
      "date": "2015-04-05",
      "nlp": 7,
      "blockchain": 2
    },
    {
      "date": "2015-04-12",
      "nlp": 8,
      "blockchain": 2
    },
    {
      "date": "2015-04-19",
      "nlp": 8,
      "blockchain": 2
    },
    {
      "date": "2015-04-26",
      "nlp": 8,
      "blockchain": 2
    },
    {
      "date": "2015-05-03",
      "nlp": 8,
      "blockchain": 2
    },
    {
      "date": "2015-05-10",
      "nlp": 7,
      "blockchain": 3
    },
    {
      "date": "2015-05-17",
      "nlp": 8,
      "blockchain": 2
    },
    {
      "date": "2015-05-24",
      "nlp": 8,
      "blockchain": 3
    },
    {
      "date": "2015-05-31",
      "nlp": 8,
      "blockchain": 3
    },
    {
      "date": "2015-06-07",
      "nlp": 7,
      "blockchain": 3
    },
    {
      "date": "2015-06-14",
      "nlp": 8,
      "blockchain": 3
    },
    {
      "date": "2015-06-21",
      "nlp": 8,
      "blockchain": 3
    },
    {
      "date": "2015-06-28",
      "nlp": 7,
      "blockchain": 3
    },
    {
      "date": "2015-07-05",
      "nlp": 7,
      "blockchain": 4
    },
    {
      "date": "2015-07-12",
      "nlp": 7,
      "blockchain": 3
    },
    {
      "date": "2015-07-19",
      "nlp": 7,
      "blockchain": 3
    },
    {
      "date": "2015-07-26",
      "nlp": 7,
      "blockchain": 3
    },
    {
      "date": "2015-08-02",
      "nlp": 7,
      "blockchain": 3
    },
    {
      "date": "2015-08-09",
      "nlp": 7,
      "blockchain": 3
    },
    {
      "date": "2015-08-16",
      "nlp": 8,
      "blockchain": 3
    },
    {
      "date": "2015-08-23",
      "nlp": 8,
      "blockchain": 4
    },
    {
      "date": "2015-08-30",
      "nlp": 7,
      "blockchain": 4
    },
    {
      "date": "2015-09-06",
      "nlp": 8,
      "blockchain": 4
    },
    {
      "date": "2015-09-13",
      "nlp": 7,
      "blockchain": 4
    },
    {
      "date": "2015-09-20",
      "nlp": 7,
      "blockchain": 4
    },
    {
      "date": "2015-09-27",
      "nlp": 7,
      "blockchain": 4
    },
    {
      "date": "2015-10-04",
      "nlp": 8,
      "blockchain": 4
    },
    {
      "date": "2015-10-11",
      "nlp": 8,
      "blockchain": 4
    },
    {
      "date": "2015-10-18",
      "nlp": 8,
      "blockchain": 5
    },
    {
      "date": "2015-10-25",
      "nlp": 8,
      "blockchain": 7
    },
    {
      "date": "2015-11-01",
      "nlp": 8,
      "blockchain": 7
    },
    {
      "date": "2015-11-08",
      "nlp": 7,
      "blockchain": 6
    },
    {
      "date": "2015-11-15",
      "nlp": 8,
      "blockchain": 5
    },
    {
      "date": "2015-11-22",
      "nlp": 7,
      "blockchain": 5
    },
    {
      "date": "2015-11-29",
      "nlp": 7,
      "blockchain": 6
    },
    {
      "date": "2015-12-06",
      "nlp": 7,
      "blockchain": 6
    },
    {
      "date": "2015-12-13",
      "nlp": 7,
      "blockchain": 7
    },
    {
      "date": "2015-12-20",
      "nlp": 6,
      "blockchain": 6
    },
    {
      "date": "2015-12-27",
      "nlp": 6,
      "blockchain": 5
    },
    {
      "date": "2016-01-03",
      "nlp": 7,
      "blockchain": 6
    },
    {
      "date": "2016-01-10",
      "nlp": 7,
      "blockchain": 6
    },
    {
      "date": "2016-01-17",
      "nlp": 8,
      "blockchain": 7
    },
    {
      "date": "2016-01-24",
      "nlp": 7,
      "blockchain": 7
    },
    {
      "date": "2016-01-31",
      "nlp": 8,
      "blockchain": 7
    },
    {
      "date": "2016-02-07",
      "nlp": 8,
      "blockchain": 7
    },
    {
      "date": "2016-02-14",
      "nlp": 8,
      "blockchain": 8
    },
    {
      "date": "2016-02-21",
      "nlp": 7,
      "blockchain": 7
    },
    {
      "date": "2016-02-28",
      "nlp": 8,
      "blockchain": 9
    },
    {
      "date": "2016-03-06",
      "nlp": 8,
      "blockchain": 8
    },
    {
      "date": "2016-03-13",
      "nlp": 7,
      "blockchain": 7
    },
    {
      "date": "2016-03-20",
      "nlp": 7,
      "blockchain": 7
    },
    {
      "date": "2016-03-27",
      "nlp": 8,
      "blockchain": 8
    },
    {
      "date": "2016-04-03",
      "nlp": 8,
      "blockchain": 8
    },
    {
      "date": "2016-04-10",
      "nlp": 8,
      "blockchain": 8
    },
    {
      "date": "2016-04-17",
      "nlp": 7,
      "blockchain": 8
    },
    {
      "date": "2016-04-24",
      "nlp": 8,
      "blockchain": 9
    },
    {
      "date": "2016-05-01",
      "nlp": 7,
      "blockchain": 10
    },
    {
      "date": "2016-05-08",
      "nlp": 8,
      "blockchain": 10
    },
    {
      "date": "2016-05-15",
      "nlp": 10,
      "blockchain": 10
    },
    {
      "date": "2016-05-22",
      "nlp": 8,
      "blockchain": 10
    },
    {
      "date": "2016-05-29",
      "nlp": 7,
      "blockchain": 10
    },
    {
      "date": "2016-06-05",
      "nlp": 8,
      "blockchain": 10
    },
    {
      "date": "2016-06-12",
      "nlp": 8,
      "blockchain": 11
    },
    {
      "date": "2016-06-19",
      "nlp": 7,
      "blockchain": 11
    },
    {
      "date": "2016-06-26",
      "nlp": 7,
      "blockchain": 10
    },
    {
      "date": "2016-07-03",
      "nlp": 7,
      "blockchain": 10
    },
    {
      "date": "2016-07-10",
      "nlp": 7,
      "blockchain": 10
    },
    {
      "date": "2016-07-17",
      "nlp": 7,
      "blockchain": 9
    },
    {
      "date": "2016-07-24",
      "nlp": 7,
      "blockchain": 9
    },
    {
      "date": "2016-07-31",
      "nlp": 7,
      "blockchain": 9
    },
    {
      "date": "2016-08-07",
      "nlp": 6,
      "blockchain": 8
    },
    {
      "date": "2016-08-14",
      "nlp": 7,
      "blockchain": 9
    },
    {
      "date": "2016-08-21",
      "nlp": 7,
      "blockchain": 10
    },
    {
      "date": "2016-08-28",
      "nlp": 7,
      "blockchain": 11
    },
    {
      "date": "2016-09-04",
      "nlp": 7,
      "blockchain": 11
    },
    {
      "date": "2016-09-11",
      "nlp": 8,
      "blockchain": 10
    },
    {
      "date": "2016-09-18",
      "nlp": 7,
      "blockchain": 11
    },
    {
      "date": "2016-09-25",
      "nlp": 7,
      "blockchain": 11
    },
    {
      "date": "2016-10-02",
      "nlp": 7,
      "blockchain": 11
    },
    {
      "date": "2016-10-09",
      "nlp": 8,
      "blockchain": 14
    },
    {
      "date": "2016-10-16",
      "nlp": 8,
      "blockchain": 12
    },
    {
      "date": "2016-10-23",
      "nlp": 7,
      "blockchain": 13
    },
    {
      "date": "2016-10-30",
      "nlp": 7,
      "blockchain": 13
    },
    {
      "date": "2016-11-06",
      "nlp": 8,
      "blockchain": 13
    },
    {
      "date": "2016-11-13",
      "nlp": 8,
      "blockchain": 15
    },
    {
      "date": "2016-11-20",
      "nlp": 8,
      "blockchain": 14
    },
    {
      "date": "2016-11-27",
      "nlp": 8,
      "blockchain": 14
    },
    {
      "date": "2016-12-04",
      "nlp": 8,
      "blockchain": 14
    },
    {
      "date": "2016-12-11",
      "nlp": 8,
      "blockchain": 13
    },
    {
      "date": "2016-12-18",
      "nlp": 7,
      "blockchain": 13
    },
    {
      "date": "2016-12-25",
      "nlp": 6,
      "blockchain": 10
    },
    {
      "date": "2017-01-01",
      "nlp": 7,
      "blockchain": 14
    },
    {
      "date": "2017-01-08",
      "nlp": 8,
      "blockchain": 15
    },
    {
      "date": "2017-01-15",
      "nlp": 8,
      "blockchain": 14
    },
    {
      "date": "2017-01-22",
      "nlp": 7,
      "blockchain": 15
    },
    {
      "date": "2017-01-29",
      "nlp": 8,
      "blockchain": 14
    },
    {
      "date": "2017-02-05",
      "nlp": 8,
      "blockchain": 15
    },
    {
      "date": "2017-02-12",
      "nlp": 8,
      "blockchain": 15
    },
    {
      "date": "2017-02-19",
      "nlp": 8,
      "blockchain": 17
    },
    {
      "date": "2017-02-26",
      "nlp": 8,
      "blockchain": 18
    },
    {
      "date": "2017-03-05",
      "nlp": 9,
      "blockchain": 18
    },
    {
      "date": "2017-03-12",
      "nlp": 8,
      "blockchain": 17
    },
    {
      "date": "2017-03-19",
      "nlp": 8,
      "blockchain": 19
    },
    {
      "date": "2017-03-26",
      "nlp": 8,
      "blockchain": 17
    },
    {
      "date": "2017-04-02",
      "nlp": 8,
      "blockchain": 17
    },
    {
      "date": "2017-04-09",
      "nlp": 8,
      "blockchain": 16
    },
    {
      "date": "2017-04-16",
      "nlp": 8,
      "blockchain": 17
    },
    {
      "date": "2017-04-23",
      "nlp": 8,
      "blockchain": 18
    },
    {
      "date": "2017-04-30",
      "nlp": 8,
      "blockchain": 20
    },
    {
      "date": "2017-05-07",
      "nlp": 8,
      "blockchain": 23
    },
    {
      "date": "2017-05-14",
      "nlp": 8,
      "blockchain": 24
    },
    {
      "date": "2017-05-21",
      "nlp": 8,
      "blockchain": 30
    },
    {
      "date": "2017-05-28",
      "nlp": 8,
      "blockchain": 26
    },
    {
      "date": "2017-06-04",
      "nlp": 8,
      "blockchain": 29
    },
    {
      "date": "2017-06-11",
      "nlp": 8,
      "blockchain": 30
    },
    {
      "date": "2017-06-18",
      "nlp": 8,
      "blockchain": 29
    },
    {
      "date": "2017-06-25",
      "nlp": 8,
      "blockchain": 29
    },
    {
      "date": "2017-07-02",
      "nlp": 7,
      "blockchain": 24
    },
    {
      "date": "2017-07-09",
      "nlp": 8,
      "blockchain": 26
    },
    {
      "date": "2017-07-16",
      "nlp": 8,
      "blockchain": 26
    },
    {
      "date": "2017-07-23",
      "nlp": 8,
      "blockchain": 26
    },
    {
      "date": "2017-07-30",
      "nlp": 8,
      "blockchain": 27
    },
    {
      "date": "2017-08-06",
      "nlp": 8,
      "blockchain": 28
    },
    {
      "date": "2017-08-13",
      "nlp": 8,
      "blockchain": 32
    },
    {
      "date": "2017-08-20",
      "nlp": 8,
      "blockchain": 33
    },
    {
      "date": "2017-08-27",
      "nlp": 7,
      "blockchain": 34
    },
    {
      "date": "2017-09-03",
      "nlp": 7,
      "blockchain": 34
    },
    {
      "date": "2017-09-10",
      "nlp": 8,
      "blockchain": 36
    },
    {
      "date": "2017-09-17",
      "nlp": 8,
      "blockchain": 34
    },
    {
      "date": "2017-09-24",
      "nlp": 8,
      "blockchain": 34
    },
    {
      "date": "2017-10-01",
      "nlp": 8,
      "blockchain": 35
    },
    {
      "date": "2017-10-08",
      "nlp": 9,
      "blockchain": 40
    },
    {
      "date": "2017-10-15",
      "nlp": 8,
      "blockchain": 45
    },
    {
      "date": "2017-10-22",
      "nlp": 9,
      "blockchain": 46
    },
    {
      "date": "2017-10-29",
      "nlp": 9,
      "blockchain": 49
    },
    {
      "date": "2017-11-05",
      "nlp": 9,
      "blockchain": 52
    },
    {
      "date": "2017-11-12",
      "nlp": 9,
      "blockchain": 51
    },
    {
      "date": "2017-11-19",
      "nlp": 8,
      "blockchain": 52
    },
    {
      "date": "2017-11-26",
      "nlp": 8,
      "blockchain": 73
    },
    {
      "date": "2017-12-03",
      "nlp": 8,
      "blockchain": 86
    },
    {
      "date": "2017-12-10",
      "nlp": 8,
      "blockchain": 91
    },
    {
      "date": "2017-12-17",
      "nlp": 7,
      "blockchain": 100
    },
    {
      "date": "2017-12-24",
      "nlp": 6,
      "blockchain": 71
    },
    {
      "date": "2017-12-31",
      "nlp": 7,
      "blockchain": 77
    },
    {
      "date": "2018-01-07",
      "nlp": 8,
      "blockchain": 88
    },
    {
      "date": "2018-01-14",
      "nlp": 8,
      "blockchain": 78
    },
    {
      "date": "2018-01-21",
      "nlp": 8,
      "blockchain": 70
    },
    {
      "date": "2018-01-28",
      "nlp": 11,
      "blockchain": 62
    },
    {
      "date": "2018-02-04",
      "nlp": 9,
      "blockchain": 57
    },
    {
      "date": "2018-02-11",
      "nlp": 8,
      "blockchain": 54
    },
    {
      "date": "2018-02-18",
      "nlp": 8,
      "blockchain": 56
    },
    {
      "date": "2018-02-25",
      "nlp": 8,
      "blockchain": 52
    },
    {
      "date": "2018-03-04",
      "nlp": 9,
      "blockchain": 50
    },
    {
      "date": "2018-03-11",
      "nlp": 9,
      "blockchain": 51
    },
    {
      "date": "2018-03-18",
      "nlp": 9,
      "blockchain": 50
    },
    {
      "date": "2018-03-25",
      "nlp": 8,
      "blockchain": 43
    },
    {
      "date": "2018-04-01",
      "nlp": 8,
      "blockchain": 42
    },
    {
      "date": "2018-04-08",
      "nlp": 9,
      "blockchain": 44
    },
    {
      "date": "2018-04-15",
      "nlp": 9,
      "blockchain": 46
    },
    {
      "date": "2018-04-22",
      "nlp": 9,
      "blockchain": 46
    },
    {
      "date": "2018-04-29",
      "nlp": 8,
      "blockchain": 45
    },
    {
      "date": "2018-05-06",
      "nlp": 8,
      "blockchain": 45
    },
    {
      "date": "2018-05-13",
      "nlp": 9,
      "blockchain": 50
    },
    {
      "date": "2018-05-20",
      "nlp": 9,
      "blockchain": 43
    },
    {
      "date": "2018-05-27",
      "nlp": 8,
      "blockchain": 43
    },
    {
      "date": "2018-06-03",
      "nlp": 9,
      "blockchain": 43
    },
    {
      "date": "2018-06-10",
      "nlp": 8,
      "blockchain": 40
    },
    {
      "date": "2018-06-17",
      "nlp": 8,
      "blockchain": 41
    },
    {
      "date": "2018-06-24",
      "nlp": 8,
      "blockchain": 37
    },
    {
      "date": "2018-07-01",
      "nlp": 8,
      "blockchain": 36
    },
    {
      "date": "2018-07-08",
      "nlp": 8,
      "blockchain": 37
    },
    {
      "date": "2018-07-15",
      "nlp": 8,
      "blockchain": 39
    },
    {
      "date": "2018-07-22",
      "nlp": 8,
      "blockchain": 39
    },
    {
      'date': '2018-07-29',
      'nlp': 8,
      'blockchain': 37
    },
    {
      'date': '2018-08-05',
      "nlp": 8,
      "blockchain": 37
    },
    {
      "date": "2018-08-12",
      "nlp": 8,
      "blockchain": 37
    },
    {
      "date": "2018-08-19",
      "nlp": 8,
      "blockchain": 37
    }
  ]

export default {
  name: 'antvG2',
  data(){
    return {
    }
  },
  mounted() {
    this.initChart()
  },
  methods:{
     initChart(){
       const chart = new Chart({
         container: 'chart',
         autoFit: true,
         height: 500,
         padding: [30, 20, 70, 30]
       });

       chart.data(data);
       chart.scale({
         nlp: {
           min: 0,
           max: 100
         },
         blockchain: {
           min: 0,
           max: 100
         }
       });

       chart.axis('nlp', false);

       chart.legend({
         custom: true,
         items: [
           { name: 'blockchain', value: 'blockchain', marker: { symbol: 'line', style: { stroke: '#1890ff', lineWidth: 2 } } },
           { name: 'nlp', value: 'nlp', marker: { symbol: 'line', style: { stroke: '#2fc25b', lineWidth: 2 } } },
         ],
       });

       chart.line().position('date*blockchain').color('#1890ff');
       chart.line().position('date*nlp').color('#2fc25b');

       chart.annotation().dataMarker({
         top: true,
         position: ['2016-02-28', 9],
         text: {
           content: 'Blockchain 首超 NLP',
           style: {
             textAlign: 'left',
           },
         },
         line: {
           length: 30,
         },
       });
       chart.annotation().dataMarker({
         top: true,
         position: ['2017-12-17', 100],
         line: {
           length: 30,
         },
         text: {
           content: '2017-12-17, 受比特币影响，\n blockchain搜索热度达到顶峰\n峰值：100',
           style: {
             textAlign: 'right',
           }
         },
       });
       chart.removeInteraction('legend-filter'); // 自定义图例，移除默认的分类图例筛选交互
       chart.render();
     },
  },
}
</script>

<style scoped>

</style>
