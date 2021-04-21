import { IonPage, IonCard, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonRow, IonCardHeader, IonImg, IonCardContent, IonButton } from "@ionic/react"
import React, { useState }  from "react"

interface Props{
    newsCardInfo :NewsCardInfo,
    fullDesc: boolean
}

interface NewsCardInfo{
    title:string,
    img: string,
    description:string,
    linkToProof: string,
    full:boolean,
    dateCreated: Date
}

export class NewsCard  extends React.Component<Props, {}, {}> {
    
    handleClick(f:boolean){
        console.log(f)
    }

    render(){


        return (
            <IonRow>
                <IonCard>
                    <IonCardHeader>{this.props.newsCardInfo.title}</IonCardHeader>
                    <IonImg src={this.props.newsCardInfo.img} />
                    <IonCardContent>{!this.props.fullDesc?this.props.newsCardInfo.description.slice(0,100):this.props.newsCardInfo.description}</IonCardContent>
                    <IonButton buttonType="text" style={{fontSize:"0.5rem"}} onClick={(e)=>{this.handleClick(this.props.fullDesc)}}>Показать полностью</IonButton>
                </IonCard>
            </IonRow>
        )
    }
}

const News : React.FC = ()=>{
    const [news, setNews ]= useState([
        {
            title:"Захарова объяснила свою запись в соцсетях о переговорах Вучича и Трампа",
            img: "string",
            description:"МОСКВА, 6 сен — РИА Новости. Официальный представитель российского МИД Мария Захарова сообщила, что ее запись в соцсетях, вызвавшая критику в Сербии, была неверно истолкована. \
            Накануне сербская делегация во главе с президентом республики Александром Вучичем участвовала в переговорах с \"премьером\" самопровозглашенного Косово Авдулахом Хоти в США. По итогам встречи стороны подписали соглашение об экономическом сотрудничестве при посредничестве президента США Дональда Трампа. \
            В соцсетях распространилась фотография, сделанная в ходе визита Вучича в Белый дом. На ней сербский президент сидит на стуле на расстоянии от стола Трампа. Захарова на Facebook прокомментировала снимок, приложив к фотографии Вучича скриншот из фильма \"Основной инстинкт\" с известной сценой \"нога на ногу\". \
            \"Прошу прощения, но мой пост был неверно истолкован! Единственное, что в нем содержалось — неприятие высокомерного отношения со стороны \"исключительных\". Протокольные уловки стали одним из приемов, на которые регулярно идут американские чиновники, чтобы искусственно создать видимость собственной исключительности. А это неприемлемо\", — написала Захарова на своей странице в соцсети. \
            Ранее пост официального представителя МИД России осудили министр обороны Сербии Александр Вулин и директор канцелярии по Косово и Метохии Марко Джурич. Сам Вучич заявил, что не будет объяснять \"чужой примитивизм\".",
            linkToProof: "string",
            full:false,
            dateCreated: new Date()
        },
        {
            title:"Захарова объяснила свою запись в соцсетях о переговорах Вучича и Трампа",
            img: "string",
            description:"МОСКВА, 6 сен — РИА Новости. Официальный представитель российского МИД Мария Захарова сообщила, что ее запись в соцсетях, вызвавшая критику в Сербии, была неверно истолкована. \
            Накануне сербская делегация во главе с президентом республики Александром Вучичем участвовала в переговорах с \"премьером\" самопровозглашенного Косово Авдулахом Хоти в США. По итогам встречи стороны подписали соглашение об экономическом сотрудничестве при посредничестве президента США Дональда Трампа. \
            В соцсетях распространилась фотография, сделанная в ходе визита Вучича в Белый дом. На ней сербский президент сидит на стуле на расстоянии от стола Трампа. Захарова на Facebook прокомментировала снимок, приложив к фотографии Вучича скриншот из фильма \"Основной инстинкт\" с известной сценой \"нога на ногу\". \
            \"Прошу прощения, но мой пост был неверно истолкован! Единственное, что в нем содержалось — неприятие высокомерного отношения со стороны \"исключительных\". Протокольные уловки стали одним из приемов, на которые регулярно идут американские чиновники, чтобы искусственно создать видимость собственной исключительности. А это неприемлемо\", — написала Захарова на своей странице в соцсети. \
            Ранее пост официального представителя МИД России осудили министр обороны Сербии Александр Вулин и директор канцелярии по Косово и Метохии Марко Джурич. Сам Вучич заявил, что не будет объяснять \"чужой примитивизм\".",
            linkToProof: "string",
            full:false,
            dateCreated: new Date()
        },
    ])
    const [search, setSearch] = useState("")
    const [fullDesc,setFullDesc] = useState([false,false])

    const [full,setFull] = useState(false);

    const changeFull = ()=>{
        setFull(!full)
    }

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
            <>{news.filter((value:NewsCardInfo)=> value.title.match(search)).map((value:NewsCardInfo, index) => {
                return <NewsCard newsCardInfo={value} fullDesc={fullDesc[index]} key={index}/>
            })}
            </>
        </IonPage>
    )
} 
export default News;