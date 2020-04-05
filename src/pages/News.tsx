import { IonPage, IonCard, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from "@ionic/react"
import React, { useState } from "react"
import axios from "axios"
const News : React.FC = ()=>{
    const [name,setName] = useState("");
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle className="title-large">Новости</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonCard style={{height:"20vh",width: "95vw",margin: "20vw 2.5vw",position: "absolute"}}>
                {name}
            </IonCard>
        </IonPage>
    )
} 
export default News;