function Capture (successCallback, errorCallback, opts) {
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;

    this.localMediaStream;
    this.targetWidth = opts.targetWidth;
    this.targetHeight = opts.targetHeight;
    this.cameraWrap = opts.cameraWrap;
    this.video = document.createElement('video');
    this.parent = document.createElement('div');
    this.parent.className = 'cordova-camera-capture';
    this.parent.appendChild(this.video);
    // this.video.width = this.targetWidth;
    // this.video.height = this.targetHeight;
    this.video.poster="";
}
Capture.prototype={
    init:function(){
        var that = this;
        var successCallback = function (stream) {
            that.localMediaStream = stream;
            if ('srcObject' in that.video) {
                that.video.srcObject = that.localMediaStream;
            } else {
                that.video.src = window.URL.createObjectURL(that.localMediaStream);
            }
            that.video.play();
            if(document.getElementById(that.cameraWrap)){
                document.getElementById(that.cameraWrap).appendChild(that.parent);
            }else{
                document.body.appendChild(that.parent);
            }    
        };
        navigator.getUserMedia = navigator.getUserMedia ||
                                 navigator.webkitGetUserMedia ||
                                 navigator.mozGetUserMedia ||
                                 navigator.msGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true, audio: false}, successCallback, that.errorCallback);
        } else {
            alert('Browser does not support camera :(');
        }
    },
    takePicture:function(){
        var that = this;
        var canvas = document.createElement('canvas');
        var width = that.video.videoWidth;
        var height = that.video.videoHeight;
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        context.drawImage(that.video, 0, 0,width,height);
        var imageData = canvas.toDataURL('image/png');
        return that.successCallback(imageData,{keepCallback:true});
    }
}
Capture.create = function (successCallback, errorCallback, opts) {
    var Capture_ = new Capture(successCallback, errorCallback, opts);
    Capture_.init();
    return Capture_
};