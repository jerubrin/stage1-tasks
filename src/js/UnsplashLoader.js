import getLang, { getSettingsParams } from './dataSaver'
import i18 from './i18nextRes'

export default class UnsplashLoader {
    constructor() {
        this.imgUnsplashList = []
        this.currentImg = -1
        this.tag = null
        this.isChangingNow = false
    }

    nextImg() {
        if(this.currentImg >= this.imgUnsplashList.length - 1 && this.isChangingNow == false) {
            this.isChangingNow = true
            let imgTag = getSettingsParams().tag
            if (this.tag != imgTag) {
                this.imgUnsplashList = []
                this.currentImg = -1
                this.tag = imgTag
            }
            fetch(this.getNewImg(imgTag != '' && imgTag ? imgTag : this.getTimeOfDay()))
                .then(res => res.json())
                .then(data => {
                    this.imgUnsplashList.push(data.urls.regular)
                    this.currentImg++
                    this.setBackGround(data.urls.regular)
                    setTimeout(() => {
                        this.isChangingNow = false
                    }, 1000)
                })
                .catch(e => {
                    document.querySelector('.tag-tittle').textContent = i18[getLang()].tagNotFound
                    this.isChangingNow = false
                })
        } else {
            this.currentImg++
            this.setBackGround(this.imgUnsplashList[this.currentImg])
            setTimeout(() => {
                this.isChangingNow = false
            }, 1000)
        }
    }

    prevImg() {
        if(this.currentImg <= 0 && this.isChangingNow == false) {
            this.isChangingNow = true
            let imgTag = getSettingsParams().tag
            if (this.tag != imgTag) {
                this.imgUnsplashList = []
                this.currentImg = -1
                this.tag = imgTag
            }
            fetch(this.getNewImg(imgTag != '' && imgTag ? imgTag : this.getTimeOfDay()))
                .then(res => res.json())
                .then(data => {
                    this.imgUnsplashList.unshift(data.urls.regular)
                    this.currentImg = 0
                    this.setBackGround(data.urls.regular)
                    setTimeout(() => {
                        this.isChangingNow = false
                    }, 1000)
                })
                .catch(e => {
                    document.querySelector('.tag-tittle').textContent = i18[getLang()].tagNotFound
                    this.isChangingNow = false
                })
        } else {
            this.currentImg--
            this.setBackGround(this.imgUnsplashList[this.currentImg])
            setTimeout(() => {
                this.isChangingNow = false
            }, 1000)
        }
    }

    getNewImg(tag) {
        const url = "https://api.unsplash.com/photos/random?orientation=landscape&query=" + tag + "&client_id=0MdCT7Hxxkbq4oz83QRuSVmuTfzdW4YZnkat_TeyMDI"
        return url
    }

    setBackGround(url) {
        const img = new Image()
        img.src = url
        img.onload = () => {
            document.body.style.backgroundImage = "url(" + img.src + ")"
            setTimeout(() => {
                this.isChangingNow = false
            }, 1050 )
        }
    }

    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 6) return "night"
        if (hour >= 6 && hour < 12) return "morning"
        if (hour >= 12 && hour < 18) return "afternoon"
        return "evening"
    }
}