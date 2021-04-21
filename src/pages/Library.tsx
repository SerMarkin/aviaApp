import { IonPage, IonCard, IonHeader, IonToolbar, IonButtons, IonMenuButton,
     IonTitle, useIonViewWillEnter, IonContent, IonInput, IonButton, IonIcon, 
     IonCardContent, IonCardHeader, IonCol, IonRow, IonImg,
    IonInfiniteScroll,IonInfiniteScrollContent, IonFabButton } from "@ionic/react"

import React, { useState } from "react"
import {
    FileTransfer,
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { get, post } from "../api/base"
import '../styles/Paginator.css'

import { add, informationCircle } from 'ionicons/icons';
import { AxiosResponse } from "axios";

interface Discipline{
    name:string,
    short_name:string,
    description:string
}

interface Book {
    title: string,
    description: string,
    logo: string,
    src: string,
    author:string,
    discipline: Discipline
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
type BookState = {
    showPict:Boolean
}

export class Books extends React.Component<Props, BookState> {

    constructor(props:Props){
        super(props)
        this.state = {
            showPict: false
        }
    }

    updateShow = ()=>{
        this.setState({showPict:true})
    }

    render(){
        const { showPict } = this.state
        console.log(showPict)
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
                <IonCardContent style={{width:"100%",height:"200px"}}>
                    <IonImg src={this.props.book.logo} alt="logo" style={{width:"100%",height:"100%"}} onIonImgDidLoad={this.updateShow} />
                    <div style={{width:"100%",height:"100%",display:showPict?"none":"block"}}></div>
                </IonCardContent>
            <IonButtons style={{maxWidth:"100%"}}>
            <IonButton onClick={() => download(this.props.book.src)}>Скачать</IonButton>
            <IonFabButton style={{height: "1.5em", width: "1.5em"}}>
            <IonIcon icon={add} size="small" color="blue" />
            </IonFabButton>
            </IonButtons>
            </IonCard>
        );
    }
  }
const Library : React.FC = ()=>{
    const [books,setBooks] = useState<Book[]>();
    const [booksToShow,setBooksToShow] = useState<Book[]>();
    const [loadByPage, setLoadByPage] = useState(6);
    const [booksTotal,setBooksTotal] = useState(0);
    const [search,setSearch] = useState("")
    

    useIonViewWillEnter(()=>{
        get("polls/books").then((resp:AxiosResponse)=>{
            const data:Book[] = resp.data;
            setBooks(data);
            setBooksTotal(resp.data.length);
            setSearch("");
            setTimeout(()=>{
                addBooksToShow(filterBooks(data,""),false)
                
            },10)
        })
    })

    const setValue = (e:HTMLInputElement) =>{
        const inp:string = e.value;
        setSearch(inp)
        console.log(inp)
        setBooksToShow([])
        if (!!books)
            setTimeout(()=>{
                addBooksToShow(filterBooks(books,inp),false)
            },10)
    }

    const filterBooks = (data:Book[],findStr:string) => {
        if (!!findStr)
            return (data.filter(obj=>{
                console.log(obj.title.match(findStr))
        return                obj.title.match(findStr)!=null
            }))
        return data;
    }

    const addBooksToShow = (data:Book[],add:Boolean)=>{
        console.log(data,booksToShow)
        if (data===undefined) return;
        const b:Book[] = add? [...(booksToShow || [])]:[]
        const books1:Book[] = data
        console.log(books1)
        for (let i=b.length; i<b.length+loadByPage && i < books1.length;i+=1){
            b.push(books1[i])
        }
        console.log(b)
        setBooksToShow(b)
        return b.length===books1.length
    }

    const updatePage = (e: any) =>{
        if (!!books && addBooksToShow(filterBooks(books,search),true)){
            e.target.disabled = true;
        }else{
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
                style={{margin:"4px 20px"}}
            />
            <IonRow>
            {booksToShow!==undefined && booksToShow.map((value:Book, index) => {
                return <IonCol size="12" sizeXs="6" sizeMd="6" sizeSm="3" sizeLg="2"  key={index}><Books book={value} key={index}/></IonCol>
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