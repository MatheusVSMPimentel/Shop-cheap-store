import { SafeUrl } from "@angular/platform-browser";
import { ImageTransform } from "ngx-image-cropper";

export class ImageCroppedSettings{
  constructor(){
    this.output = 'base64';
  }
  imageChangedEvent: any ='';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  output: 'base64';
  imageUrl!: SafeUrl;
  imageName!: string;
}