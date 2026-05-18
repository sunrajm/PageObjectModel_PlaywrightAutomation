class BasePage{
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
   constructor(page){
        this.page = page;
   }

   async navigateTo(path="/"){
    await this.page.goto(path);
   }

   async clickElement(locator){
    await locator.click();
   }

   async typeText(locator,text){
    await locator.fill(text);
   }

   async getText(locator){
    await locator.waitFor({state:'visible'});
    return await locator.textContent();
   }

   async isVisible(locator){
    await locator.waitFor({state:'visible'});
    return await locator.isVisible();
   }

   async getCurrentURL(){
    return this.page.url();
   }
}
module.exports = BasePage;
