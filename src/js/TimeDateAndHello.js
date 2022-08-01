import getLang from './dataSaver'
import i18next from './i18nextRes';

export default class TimeDateAndHello {

    constructor(){
        this.showTime()
    }

    showTime() {
        const timeNode = document.querySelector('.time')
        const dateNode = document.querySelector('.date')
        const date = new Date();
        timeNode.textContent = date.toLocaleTimeString('en-En', {hourCycle: "h23"})
        if(getLang() == 'en') {
            dateNode.textContent = date.toLocaleDateString(
                'en-En', 
                {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'}
            )
        } else {
            
            let str = date.toLocaleDateString(
                'ru-Ru', 
                {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'}
            )
            dateNode.textContent = str[0].toUpperCase() + str.slice(1);
        }

        let getTimeOfDayArrowFun = () => TimeDateAndHello.getTimeOfDay()
        document.querySelector(".greeting").textContent = i18next[getLang()][getTimeOfDayArrowFun()]

        setTimeout( () => this.showTime(), 1000 )
    }
    
    static getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 6) return "night"
        if (hour >= 6 && hour < 12) return "morning"
        if (hour >= 12 && hour < 18) return "afternoon"
        return "evening"
    }
}