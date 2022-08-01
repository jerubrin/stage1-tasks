import '../css/owfont-regular.css'
import '../css/style.css'

import TimeDateAndHello from './TimeDateAndHello'
import BackgroundChanger from './BackgroundChanger'
import Weather from './Weather'
import QOfDay from './QOfDay'
import AudioPlayer from './AudioPlayer'
import Settings from './Settings'
import getLang from './dataSaver'
import i18 from './i18nextRes'

let loading = document.querySelector('.loading')
console.log(i18[getLang()].loading)
loading.innerHTML = `<div>${i18[getLang()].loading}</div>`
setTimeout(() => { loading.classList.add('loading-hide') }, 1200)
setTimeout(() => { loading.classList.add('display-none') }, 2000)

new TimeDateAndHello()
new BackgroundChanger()
new Weather()
new QOfDay()
new AudioPlayer()
new Settings()