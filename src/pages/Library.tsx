import { IonPage, IonCard, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, useIonViewWillEnter, IonContent } from "@ionic/react"

import React, { useState } from "react"
import axios from "axios"
import {
    FileTransfer,
    FileUploadOptions,
    FileTransferObject
  } from "@ionic-native/file-transfer";
  import { File } from "@ionic-native/file";
  import { Capacitor } from '@capacitor/core';
  import { post } from "../api/base"
interface Book {
    title: string,
    description: string,
    logo: string,
    src: string
}
interface Props{
    book :Book
}
const download = (src:string) => {
    console.log("download");
    let fileTransfer = FileTransfer.create();
    const url = src;
    const name = src.split("/")[src.split("/").length-1]
    const tmp = File.tempDirectory?File.tempDirectory:"/"
    fileTransfer.download(url, tmp + name, true).then(
    async entry => {

        console.log("download complete: " + entry.toURL());
    },
    error => {
        // handle error
        console.log("error", error);
    }
    );
};
export class Books extends React.Component<Props, {}> {
    render(){

        
        return (
            <IonCard  onClick={() => download(this.props.book.src)} style={{width: "95vw",margin: "2px 2.5vw"}}>
            <h3>{this.props.book.title}</h3>
            <img src={this.props.book.logo} alt="logo" style={{height:"20vh"}} />
            <p >Скачать</p>
            </IonCard>
        );
    }
  }
const Library : React.FC = ()=>{
    const [books,setBooks] = useState([]);

    useIonViewWillEnter(()=>{
        post("polls/books").then((resp)=>{
            setBooks(resp.data)
        })
    })
    const [search,setSearch] = useState("")
    const setValue = (e:React.ChangeEvent<HTMLInputElement>) =>{
        console.log(e.target.value)
        setSearch(e.target.value)
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
            <input placeholder="Поиск" onChange={setValue} />
            {books.filter((value:Book)=> value.title.match(search)).map((value:Book, index) => {
                return <Books book={value} key={index}/>
            })}
            {books.filter((value:Book)=> value.title.match(search)).map((value:Book, index) => {
                return <Books book={value} key={index}/>
            })}
            </IonContent>
            

           
        </IonPage>
    )
} 
export default Library;