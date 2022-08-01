import getLang, { getSettingsParams } from './dataSaver'
import i18 from './i18nextRes'

export default class FlickrLoader {

    constructor() {
        this.imgList = []
        this.currentImg = 0
        this.tag = null
        this.isChangingNow = false
    }

    nextImg() {
        if(this.isChangingNow == false) {
            this.isChangingNow = true
            let imgTag = getSettingsParams().tag
            this.setNewTag(imgTag)
            if(this.imgList.length == 0) {
                this.getImageList(imgTag)
            } else {
                if(this.currentImg <= this.imgList.length - 1) {
                    this.currentImg++
                } else {
                    this.currentImg = 0
                }
                this.setBackGround(this.imgList[this.currentImg])
            }
        }
    }

    prevImg() {
        if(this.isChangingNow == false) {
            this.isChangingNow = true
            let imgTag = getSettingsParams().tag
            this.setNewTag(imgTag)
            if(this.imgList.length == 0) {
                this.getImageList(imgTag)
            } else {
                if(this.currentImg > 0) {
                    this.currentImg--
                } else {
                    this.currentImg = this.imgList.length - 1
                }
                this.setBackGround(this.imgList[this.currentImg])
            }
        }
    }

    setNewTag(imgTag) {
        if (this.tag != imgTag) {
            this.imgUnsplashList = []
            this.currentImg = 0
            this.imgList = []
            this.tag = imgTag
        }
    }

    getImageList(imgTag) {
        fetch(this.getNewImg(imgTag != '' && imgTag ? imgTag : this.getTimeOfDay()))
            .then(res => res.json())
            .then(data => {
                this.imgList = data.photos.photo.map(it => it.url_h).filter(it => it)
                if (this.imgList.length > 0) {
                    this.imgList.sort(() => (Math.random() > .5) ? 1 : -1);
                    this.currentImg = Math.trunc(this.imgList.length / 2)
                    this.setBackGround(this.imgList[this.currentImg])
                } else {
                    document.querySelector('.tag-tittle').textContent = i18[getLang()].tagNotFound
                    this.currentImg = 0
                    this.imgList = []
                    this.isChangingNow = false
                }
            })
            .catch(e => {
                this.currentImg = 0
                this.imgList = []
                this.isChangingNow = false
            })
    }

    getNewImg(tag) {
        const url = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d48db3055797261ffc32bc1be17b6a6e&tags=" + tag + "&extras=url_h&format=json&nojsoncallback=1"
        return url
    }

    setBackGround(url) {
        const img = new Image()
        img.src = url
        img.onload = () => {
            document.body.style.backgroundImage = "url(" + img.src + ")"
            setTimeout(() => {
                this.isChangingNow = false
                document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
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