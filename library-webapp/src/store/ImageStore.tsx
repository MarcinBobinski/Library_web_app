import {action, makeAutoObservable, makeObservable, observable, runInAction} from "mobx";
import React from "react";
import {uploadImage} from "../api/image/UploadImage";
import {AuthStore} from "./AuthStore";
import {formatDate} from "../common/FormatDate";

export class ImageStore {
  authStore: AuthStore

  constructor(authStore: AuthStore) {
    this.authStore = authStore
    makeObservable(this,{
      uploadImage: action
    });
  }

  async uploadImage(image: Uint8Array): Promise<number>{
    const credentials = {...this.authStore.credentials}
    if(credentials.token == undefined) {
      return Promise.reject(new Error("User is not authorized."))
    } else {
      try {
        const uploadImageResponse = await uploadImage(image, credentials.token)
        if(uploadImageResponse == "unauthorized") {
          await this.authStore.logout()
          return Promise.reject(new Error("User is unauthorized."))
        }
        return Object.assign(uploadImageResponse, {fetchedAt: formatDate(new Date())})
      }catch (e){
        return Promise.reject(e)
      }
    }
  }

}