import { Injectable } from '@angular/core';
import { Upload } from './upload';
import * as firebase from 'firebase';
import { AngularFireList } from 'angularfire2/database';
@Injectable()
export class UploadService {

  constructor() { }

  private basePath = '/uploads';
  uploads: AngularFireList<Upload[]>;

  pushUpload(upload: Upload) {
    console.log(upload.file);
    const storageRef = firebase.storage().ref();
    storageRef.child(this.basePath + '/' + upload.file.name).put(upload.file);
  }


}