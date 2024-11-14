require('dotenv').config();
const {Bot, GrammyError, HttpError, Keyboard, InlineKeyboard} = require('grammy');
const {hydrate} = require('@grammyjs/hydrate')
const bot = new Bot(process.env.BOT_TOKEN)
bot.use(hydrate())



// command store
bot.api.setMyCommands([
    {command: 'menu', description: 'получить меню'}
])

// commnad create
const kyboard = new InlineKeyboard()
.text('что умеет этот бот', 'btn1')
.url('купить подписаку', 'https://t.me/+q9bQwr5yfDtiOGEy')
.text("сделать хуяку по сасаку",'btn3');

const kyboardTwo = new InlineKeyboard().text('return', 'return')


// command
bot.command('menu', async (ctx) => {
  await ctx.reply('menu', { reply_markup: kyboard} )
})

bot.callbackQuery(/btn[1-3]/, async (params) => {
   await params.callbackQuery.message.editText('ты, себе даже представить не сможешь', {
reply_markup: kyboardTwo
   })
})
bot.callbackQuery(/return/, async (params) => {
   await params.callbackQuery.message.editText('menu', {
reply_markup: kyboard
   })
})


// error handler
bot.catch((err)=>{
    const ctx = err.ctx;
    console.error(`ошибка! ${ctx.update.update_id}`);
    const e = err.error;
     if (e instanceof GrammyError){
        console.error("error in request", e.description)
     }  else if (e instanceof HttpErrorError){
        console.error("error in no conect with Telegram", e)
     } else {
        console.error("unknow error", e)
     }
});




//
bot.start()