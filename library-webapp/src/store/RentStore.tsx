import {action, makeObservable, observable} from "mobx";
import React from "react";
import {AuthStore} from "./AuthStore";
import {fetchRents, Rents} from "../api/rent/FetchRentedBooks";
import {showNotification} from "@mantine/notifications";
import {IconX} from "@tabler/icons";
import {rentBook} from "../api/rent/RentBook";
import {returnBook} from "../api/rent/ReturnRentedBook";

export class RentStore {
  authStore: AuthStore

  rentedBooks: Rents[] | null = null

  constructor(authStore: AuthStore) {
    this.authStore = authStore
    makeObservable(this, {
      rentedBooks: observable,
      fetchRents: action,
      clear: action
    });
  }

  fetchRents(): void {
    if(this.rentedBooks == null){
      const credentials = {...this.authStore.credentials}
      if (credentials.token != undefined) {
        fetchRents(credentials.token)
          .then((response) => {
            if (response == "unauthorized") {
              this.authStore.logout()
              showNotification({
                icon: <IconX size={18}/>,
                title: 'Wylogowanie',
                message: 'Z powodu błędu autoryzacji zostałeś wylogowany.',
                color: 'red',
                autoClose: 5000
              })
              return null
            } else {
              return response
            }
          })
          .then(action((rents) => {
            this.rentedBooks = rents
          }))
          .catch(() => {
            showNotification({
              icon: <IconX size={18}/>,
              title: 'Błąd',
              message: 'W trakcie pobierania wypożyczonych książek wystąpił błąd',
              color: 'red',
              autoClose: 5000
            })
          })
      }
    }
  }

  async rentBook(bookId: number): Promise<void> {
    const credentials = {...this.authStore.credentials}
    if (credentials.token != undefined) {
      const response = await rentBook(bookId, credentials.token)
      if (response == "unauthorized") {
        this.authStore.logout()
        showNotification({
          icon: <IconX size={18}/>,
          title: 'Wylogowanie',
          message: 'Z powodu błędu autoryzacji zostałeś wylogowany.',
          color: 'red',
          autoClose: 5000
        })
      }
    }
  }

  async returnRent(rentId: number): Promise<void> {
    const credentials = {...this.authStore.credentials}
    if (credentials.token != undefined) {
      const response = await returnBook(rentId, credentials.token)
      if (response == "unauthorized") {
        this.authStore.logout()
        showNotification({
          icon: <IconX size={18}/>,
          title: 'Wylogowanie',
          message: 'Z powodu błędu autoryzacji zostałeś wylogowany.',
          color: 'red',
          autoClose: 5000
        })
        return Promise.reject(new Error())
      }
    }
  }

  clear(): void {
    this.rentedBooks = null
  }

}