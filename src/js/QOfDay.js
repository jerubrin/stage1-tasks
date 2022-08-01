import json from '../assets/data.json'
import getLang from './dataSaver'

export default class QOfDay {

    constructor() {
        QOfDay.setNewQ()
        document.querySelector('button.change-quote').onclick = () => QOfDay.setNewQ()
    }

    static setNewQ() {
        let rnd = Math.round(Math.random() * 99)
        let lang = getLang()
        document.querySelector('.quote').textContent = json[lang][rnd]["text"]
        document.querySelector('.author').textContent = json[lang][rnd]["author"]
    }
}