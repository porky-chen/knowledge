const router = require('koa-router')()
const fsWriter = require('../util/fs')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})


router.post('/formwork', async (ctx, next) => {
  const postParam = ctx.request.body
  fsWriter(postParam.fileStr,'../src/css/base-vars.scss')
  ctx.response.body = {
    staus: 0,
    staus:'success'
  }
})

module.exports = router
