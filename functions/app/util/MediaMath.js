class MediaMath {

    ctr(click, imp){
        let ctr = ((click / imp)*100);
        return ctr.toFixed(2);
    }

}

module.exports = MediaMath;