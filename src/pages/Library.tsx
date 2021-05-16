import {
    IonPage, IonCard, IonHeader, IonToolbar, IonButtons, IonMenuButton,
    IonTitle, useIonViewWillEnter, IonContent, IonInput, IonButton,
    IonCardContent, IonCardHeader, IonCol, IonRow, IonImg,
    IonInfiniteScroll, IonInfiniteScrollContent
} from "@ionic/react"
import { AxiosResponse } from "axios"

import React, { useState } from "react"

import { get, post, BASE_API } from "../api/base"
import '../styles/Paginator.css'
console.log(BASE_API)
interface Discipline {
    name: string,
    short_name: string,
    description: string
}

interface Book {
    title: string,
    description: string,
    logo_url: string,
    src_url: string,
    author: string,
    discipline: Discipline
}
interface Props {
    book: Book
}

export class Books extends React.Component<Props, {}> {


    render() {
        return (
            <IonCard style={{ margin: '0' }}>
                <IonCardHeader >
                    <div style={{ display: "block" }}>
                        <span style={{ position: "relative", float: "left", lineHeight: "14px" }}>
                            {this.props.book.title}
                        </span>
                    </div>
                </IonCardHeader>
                <IonCardContent style={{ width: "100%" }}>
                    <IonRow>
                        <IonCol size="6">
                            <IonImg src={BASE_API + this.props.book.logo_url} alt="logo" style={{ width: "100%", height: "100%" }} />
                        </IonCol>
                        <IonCol size="6">
                            <h3>{this.props.book.author}</h3>
                            <h3>{this.props.book.description}</h3>
                            <IonButtons style={{ maxWidth: "100%" }}>
                                <IonButton onClick={() => { }} href={BASE_API + this.props.book.src_url} download={"true"}>Скачать</IonButton>
                            </IonButtons>
                        </IonCol>
                    </IonRow>
                </IonCardContent>
            </IonCard>
        );
    }
}
const Library: React.FC = () => {
    const [books, setBooks] = useState<Book[]>();
    const [booksToShow, setBooksToShow] = useState<Book[]>();
    const [loadByPage, setLoadByPage] = useState(6);
    const [booksTotal, setBooksTotal] = useState(0);
    const [search, setSearch] = useState("")


    useIonViewWillEnter(() => {
        get("polls/books").then((resp: AxiosResponse) => {
            const data: Book[] = resp.data;
            setBooks(data);
            setBooksTotal(resp.data.length);
            setSearch("");
            setTimeout(() => {
                addBooksToShow(filterBooks(data, ""), false)

            }, 10)
        })
    })

    const setValue = (e: HTMLInputElement) => {
        const inp: string = e.value;
        setSearch(inp)
        console.log(inp)
        setBooksToShow([])
        if (!!books)
            setTimeout(() => {
                addBooksToShow(filterBooks(books, inp), false)
            }, 10)
    }

    const filterBooks = (data: Book[], findStr: string) => {
        if (!!findStr)
            return (data.filter(obj => {
                return obj.title.match(new RegExp(findStr, "gi")) != null
            }))
        return data;
    }

    const addBooksToShow = (data: Book[], add: Boolean) => {
        if (data === undefined) return;
        const b: Book[] = add ? [...(booksToShow || [])] : []
        const books1: Book[] = data
        for (let i = b.length; i < b.length + loadByPage && i < books1.length; i += 1) {
            b.push(books1[i])
        }
        setBooksToShow(b)
        return b.length === books1.length
    }

    const updatePage = (e: any) => {
        if (!!books && addBooksToShow(filterBooks(books, search), true)) {
            e.target.disabled = true;
        } else {
            e.target.complete()
        }
    }

    return (
        <IonPage >
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Библиотека</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonInput placeholder="Поиск" autocomplete={'on'} onIonInput={e => setValue(e.target as HTMLInputElement)}
                    style={{ margin: "4px 20px" }}
                />
                <IonRow>
                    {booksToShow !== undefined && booksToShow.map((value: Book, index) => {
                        return <IonCol size="12" sizeXs="12" sizeMd="12" sizeSm="12" sizeLg="12" key={index}><Books book={value} key={index} /></IonCol>
                    })}
                </IonRow>
                <IonInfiniteScroll threshold="100px" id="infinite-scroll" onIonInfinite={updatePage}>
                    <IonInfiniteScrollContent loadingSpinner="circles">

                    </IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </IonContent>



        </IonPage>
    )
}
export default Library;