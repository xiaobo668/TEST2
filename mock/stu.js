// 提供司机相关数据
// 引入第三方mockjs库
import mockjs from 'mockjs';
let datalist = mockjs.mock({
  code: 200,
  msg: '司机列表加载成功',
  'results|100': [
    {
      name: '@cname',
      age: '@integer(50,100)',
      address: '@city',
      date: '@date',
      'objectId|+1': 1,
    },
  ],
});
export default {
  'GET /classes/test': mockjs.mock({
    'list|100': [{ name: '@city', 'value|100': 50, 'type|0-2': 1 }],
  }),
  'GET /classes/stu': datalist,
  'DELETE /classes/stu': (req, res) => {
    let { id } = req.query;
    for (let i = 0; i < datalist.results.length; i++) {
      if (datalist.results[i].objectId == id) {
        datalist.results.splice(i, 1);
        res.send({
          code: 200,
          msg: '删除成功',
        });
        return;
      }
    }
    res.send({
      code: 100,
      msg: '未找到相应数据',
    });
  },
};
