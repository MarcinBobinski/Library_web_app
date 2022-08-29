import {action, makeAutoObservable, makeObservable, observable, runInAction} from "mobx";
import {fetchBooksPage} from "../api/book/FetchBooksPage";
import {showNotification} from "@mantine/notifications";
import {IconX} from "@tabler/icons";
import React from "react";
import {uploadBook} from "../api/book/UploadBook";
import {AuthStore} from "./AuthStore";

export type Book = {
  title: string
  description: string
  images: number[]
}

export class BookStore {
  booksPaged: Map<number, Book[]> = new Map<number, Book[]>()
  pages: number = 1
  authStore: AuthStore

  constructor(authStore: AuthStore) {
    this.authStore = authStore
    makeObservable(this,{
      booksPaged: observable,
      pages: observable,
      loadPage: action,
      clearLoaded: action
    });
  }


  loadPage(page: number){
    if(this.booksPaged.get(page) == undefined){
      fetchBooksPage(page, 10)
        .then(action((booksPageResponse) => {
          this.pages = booksPageResponse.pages
          this.booksPaged.set(
            page,
            booksPageResponse.books.map( book => {
                return  {
                  title: book.title,
                  description: book.description,
                  images: book.images
                } as Book
              }
            )
            )
        }))
        .catch(() => {
          showNotification({
            icon: <IconX size={18}/>,
            title: 'Błąd',
            message: 'Z nieznanych przyczyn nie udało się pobrać danych o książkach.',
            color: 'red',
            autoClose: 5000
          })
        })  // handle error
    }
  }

  async addBook(title: string, description: string, images: number[]): Promise<boolean> {
    try {
      const response = await uploadBook(title, description, images)
      if (response == "unauthorized"){
        this.authStore.logout()
        showNotification({
          icon: <IconX size={18}/>,
          title: 'Wylogowanie',
          message: 'Z powodu błędu autoryzacji zostałeś wylogowany.',
          color: 'red',
          autoClose: 5000
        })
        return false
      }
      return true
    } catch (e) {
      showNotification({
        icon: <IconX size={18}/>,
        title: 'Błąd',
        message: 'Podczas dodawania książki wystąpił nieznany błąd.',
        color: 'red',
        autoClose: 5000
      })
      return false
    }
  }

  clearLoaded(){
    this.booksPaged.clear()
    this.pages = 1
  }
}