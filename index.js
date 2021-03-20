const puppeteer = require('puppeteer');

const loggerCheck = async (page) => {
  try {
    
    await page.waitForNavigation({ waitUntil:'networkidle0'})

    return true
  } catch (error) {
    return false
  }
}

(async()=>{

  const userAccount = {
      user:'dens205@gmail.com',
      password:'1234561',
  }

  const browser = await puppeteer.launch({
    // devtools:true
  })

  const page = await browser.newPage()

  await page.goto('https://www.bumeran.com.pe/empresas')

  await page.waitForSelector('[data-target="#modal-login"]')
  await page.click('[data-target="#modal-login"]')

  await page.waitForTimeout(500)

  await page.type('#nombre',userAccount.user)
  await page.type('#password',userAccount.password)
 
  await page.waitForTimeout(500)

 const [ , isLogin ] = await Promise.all([
   await page.click('#loginButton'),
   await loggerCheck(page)
  ])
  
  await page.screenshot({path:'screenshotLogin.jpg'})
  console.log("Jose ~ file: index.js ~ line 39 ~ isLogin", isLogin)

  await browser.close()
})()