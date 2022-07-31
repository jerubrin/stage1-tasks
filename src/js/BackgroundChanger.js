import TimeDateAndHello from './TimeDateAndHello'
import UnsplashLoader from './UnsplashLoader'
import FlickrLoader from './FlickrLoader'
import { getSettingsParams } from './dataSaver'

export default class BackgroundChanger {

    constructor() {
        this.currentNum = 0
        this.firstIn = true
        this.isChangingNow = false
        this.timeout = null

        document.querySelector('.slide-next').onclick = () => this.getSlideNext()
        document.querySelector('.slide-prev').onclick = () => this.getSlidePrev()
        this.unsplashLoader = new UnsplashLoader()
        this.flickrLoader = new FlickrLoader()
    }

    getSlideNext() {
        let imgSrcParam = getSettingsParams().imgSource
        if (imgSrcParam == 0) {
            this.gitHubNext()
        } else if (imgSrcParam == 1) {
            this.unsplashLoader.nextImg()
        } else {
            this.flickrLoader.nextImg()
        }
    }

    getSlidePrev() {
        console.log('prev click')
        let imgSrcParam = getSettingsParams().imgSource
        if (imgSrcParam == 0) {
            this.gitHubPrev()
        } else if (imgSrcParam == 1) {
            this.unsplashLoader.prevImg()
        } else {
            this.flickrLoader.prevImg()
        }
    }

    gitHubNext() {
        if (this.isChangingNow) return
        this.isChangingNow = true
        if(this.timeout) clearTimeout(this.timeout)

        if (this.firstIn) {
            this.currentNum = Math.trunc( Math.random() * 19 + 1 )
            this.firstIn = false
        } else {
            if (this.currentNum > 19) { 
                this.currentNum = 1 
            } else { 
                this.currentNum++ 
            }
        }
        this.setBg(this.currentNum)
    }

    gitHubPrev() {
        if (this.isChangingNow) return
        this.isChangingNow = true
        if(this.timeout) clearTimeout(this.timeout)

        if (this.firstIn) {
            this.currentNum = Math.trunc( Math.random() * 19 + 1 )
            this.firstIn = false
        } else {
            if (this.currentNum <= 1) { 
                this.currentNum = 20 
            }
            else { 
                this.currentNum-- 
            }
        }
        this.setBg(this.currentNum)
    }

    setBg(num) {  
        let picNum = this.getFileName( num )
        this.setBackground(
            "https://raw.githubusercontent.com/jerubrin/stage1-tasks/assets/images/"+
            TimeDateAndHello.getTimeOfDay() +
            "/" +
            picNum +
            ".jpg"
        )
        this.timeout = setTimeout(() => {
            this.isChangingNow = false
        }, 5000)
    }

    setBackground(url) {
        const img = new Image()
        img.src = url
        img.onload = () => {
            document.body.style.backgroundImage = "url(" + img.src + ")"
            setTimeout(() => {
                this.isChangingNow = false
            }, 1050 )
        }
    }

    getFileName(num) {
        return num > 9 ? "" + num : "0" + num
    }
}