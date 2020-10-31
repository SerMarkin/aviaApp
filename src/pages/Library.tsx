import { IonPage, IonCard, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, useIonViewWillEnter, IonContent, IonInput, IonButton, IonIcon, IonCardContent, IonCardHeader, IonCol, IonRow, IonImg } from "@ionic/react"

import React, { useState } from "react"
import {
    FileTransfer,
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { post } from "../api/base"
import '../styles/Paginator.css'

import { add, informationCircle } from 'ionicons/icons';

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
            <IonCard >
                <IonCardHeader >
                    <div style={{display: "block"}}>
                        <span style={{position: "relative",float: "left",lineHeight: "14px"}}>
                            {this.props.book.title}
                        </span>
                    </div>
                    <IonIcon style={{cursor: "pointer"}} src={informationCircle}  size="small" />
                </IonCardHeader>
                <IonCardContent>
                    <IonImg src={this.props.book.logo} alt="logo"  />
                </IonCardContent>
            <IonButtons style={{maxWidth:"100%"}}>
            <IonButton onClick={() => download(this.props.book.src)}>Скачать</IonButton>
            <IonButton onClick={() => {}}><IonIcon src={add}></IonIcon></IonButton>
            </IonButtons>
            </IonCard>
        );
    }
  }
const Library : React.FC = ()=>{
    const [books,setBooks] = useState([]);
    const [booksToShow,setBooksToShow] = useState([]);
    const [page,setPage] = useState(0);
    const [pageCount,setPageCount] = useState(0);
    const [booksTotal,setBooksTotal] = useState(0);
    const [booksOnPage, setBooksOnPage] = useState(1);
    

    useIonViewWillEnter(()=>{
        post("polls/books").then((resp)=>{
            setBooks(resp.data);
            setPage(1);
            setPageCount(Math.ceil(resp.data.length/booksOnPage));
            setBooksTotal(resp.data.length);
            setSearch("");
            setBooksToShow(books.slice((page-1)*booksOnPage,page*booksOnPage));
        })
    })
    const [search,setSearch] = useState("")
    const setValue = (e:string) =>{

        console.log(e)
        setPage(1);
        updaBooksToShow();
        setSearch(e)
    }


    const updaBooksToShow = ()=>{
        const t = books.filter((value:Book)=> value.title.match(search)).slice((page-1)*booksOnPage,page*booksOnPage+1)
        setBooksToShow(t);
    }

    interface upd{
        selected:number;
    }
    const updatePage = (e:upd) =>{
        setPage(e.selected);
        updaBooksToShow();
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
            <IonInput placeholder="Поиск" autocomplete={'on'} onIonChange={e => setValue(e.detail.value!)} 
                style={{margin:"4px 20px"}}
            />
            <IonRow>
         
            {books.filter((value:Book)=> value.title.match(search)).map((value:Book, index) => {
                return <IonCol size="12" sizeSm="3" sizeLg="2"  key={index}><Books book={value} key={index}/></IonCol>
            })}
            </IonRow>
            <IonRow>     
                {/* <Paginate 
                pageCount={pageCount} 
                pageClassName="pagination" 
                activeClassName="active"
                pageRangeDisplayed={10} 
                onPageChange={updatePage} 
                marginPagesDisplayed={3} 
                previousClassName={"next-tab"}
                nextClassName={"next-tab"}
                nextLabel="Вперед&rarr;"
                previousLabel="&larr;Назад"
                /> */}
            </IonRow>
            </IonContent>
            

           
        </IonPage>
    )
} 
export default Library;