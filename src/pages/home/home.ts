import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  camera;

  constructor(public navCtrl: NavController) {

  }

  takePicture(){

    if (window["cordova"] == undefined) {
      return
    }

    // need device plugin
    // var device = new Device();
    // if (device.platform !== 'ios') {
    //   return
    // }

    if (this.camera == undefined) {
      this.camera = new Camera()
    }

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      var image = document.getElementById('myImage') as HTMLImageElement;
      image.src = base64Image;

    }, (err) => {
      // Handle error
      console.log(err);
      alert(err);
    });
  }

}
