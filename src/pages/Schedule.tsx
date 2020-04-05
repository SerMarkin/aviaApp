import { IonPage, IonCard, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from "@ionic/react"
import React from "react"

const Schedule : React.FC = ()=>{
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>Расписание</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonCard style={{height:"20vh",width: "95vw",margin: "20vw 2.5vw",position: "absolute"}}>
                Vot tut
            </IonCard>
        </IonPage>
    )
} 
export default Schedule;