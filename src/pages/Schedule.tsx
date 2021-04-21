import { IonPage, IonCard, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSelect, IonSelectOption, IonItem, IonLabel, useIonViewWillEnter, IonRefresher, IonRefresherContent, IonRow, IonCol, IonButton, IonBackButton, IonIcon } from "@ionic/react"
import { AxiosResponse } from "axios"
import React, { MouseEventHandler, useCallback, useEffect, useState } from "react"
import { get, post } from "../api/base"
import moment from 'moment'
import 'moment/locale/ru';
import { RefresherEventDetail } from '@ionic/core';
import { arrowBackOutline, arrowForwardOutline } from 'ionicons/icons'
import './Schedule.css';
moment.locale("ru")

interface YearDigit {
    id: number,
    name: string,
    year_digit: number
}

interface Group {
    id: number,
    name: string,
    short_name: string,
    year_digit: YearDigit,
    number_group: number
}

interface TimeForLessons {
    order_num: number,
    time_start: Date,
    time_end: Date
}

interface Discipline {
    name: string,
    description: string,
    short_name: string
}

interface Lesson {
    id: number,
    place: string,
    teacher: string,
    times_for_lessons: TimeForLessons,
    discipline: Discipline
}

interface StudyDay {
    id: number,
    date_actual: Date,
    group: Group,
    lessons: Lesson[]
}

interface CalendarDaysCircleProps {
    weekNumber: number,
    studyDays: StudyDay[],
    updateWeekNumber: Function
}

interface CalendarDaysCircleState {
    currentDay: number
}
interface LessonBlockProps {
    lesson: Lesson
}
const LessonBlock = (props: LessonBlockProps) => {
    console.log("props")
    console.log(props)
    const { lesson } = props
    return (
        <IonRow className="blockScroll">
            <IonCol>{moment(lesson.times_for_lessons.time_start, "HH:mm:ss").format("HH:mm")} - {moment(lesson.times_for_lessons.time_end, "HH:mm:ss").format("HH:mm")}</IonCol>
            <IonCol>{lesson.discipline.name}</IonCol>
            <IonCol>{lesson.place}</IonCol>
            <IonCol>{lesson.teacher}</IonCol>
        </IonRow>
    )
}

class CalendarDaysCircle extends React.Component<CalendarDaysCircleProps, CalendarDaysCircleState>{

    constructor(props: CalendarDaysCircleProps) {
        super(props)
        this.state = {
            currentDay: moment().isoWeekday()
        };
    }

    updateWeekDay = (currentDay: number) => {
        this.setState({
            currentDay: currentDay
        })
    }


    render() {
        const listDays = [0, 1, 2, 3, 4, 5, 6]
        const { currentDay } = this.state
        const { weekNumber, studyDays, updateWeekNumber } = this.props
        console.log(weekNumber)
        console.log(studyDays)
        const date = moment().isoWeek(weekNumber).startOf('week')
        console.log(date)
        return (
            <>
                <IonCard>
                    <IonRow className="blockScroll">

                        <IonButton onClick={() => { updateWeekNumber(-1) }} size="small" className="startButton" >
                            <IonIcon slot="icon-only" icon={arrowBackOutline} />
                        </IonButton>
                        {
                            listDays.map(val => {
                                const m = moment(date)
                                m.add(val, 'days')
                                return (
                                    <IonButton onClick={() => { this.updateWeekDay(val) }} key={"key" + val} size="small" className="middleButton">
                                        {m.format("DD \n ddd")}
                                    </IonButton>
                                )
                            })
                        }
                        <IonButton onClick={() => { updateWeekNumber(+1) }} size="small" className="endButton">
                            <IonIcon slot="icon-only" icon={arrowForwardOutline} />
                        </IonButton>
                    </IonRow>
                </IonCard>
                <IonCard className="lessonCard">
                    <IonHeader className="headerCard">на {moment(date).day(currentDay + 1).format("DD.MM")}</IonHeader>
                    <IonRow className="blockScroll">
                        <IonCol>Время</IonCol>
                        <IonCol>Дисциплина</IonCol>
                        <IonCol>Место</IonCol>
                        <IonCol>Преподаватель</IonCol>
                    </IonRow>
                    {
                        !!studyDays[currentDay] ? studyDays[currentDay].lessons.sort((a, b) => a.times_for_lessons.order_num - b.times_for_lessons.order_num).map((lesson) => <LessonBlock lesson={lesson} key={"lesson" + lesson.id} />)
                            :
                            <IonTitle size="small" className="noDataBlock">Отсутствует</IonTitle>
                    }

                </IonCard>
            </>
        )
    }
}


const Schedule: React.FC = () => {

    const [groups, setGroups] = useState<Group[]>([])
    const [currentGroup, setCurrentGroup] = useState<Group>()
    const [loadingState, setLoadingState] = useState<Boolean>(true)
    const [currentWeekNumber, setCurrentWeekNumber] = useState<number>(moment().week())
    const [studyDays, setStudyDays] = useState<StudyDay[]>([])


    useIonViewWillEnter(() => {
        get("polls/groups").then((resp: AxiosResponse) => {
            setGroups(resp.data);
        })
        updateStudyDays()
    })

    const updateStudyDays = useCallback(() => {
        if (!currentGroup) return;
        get(`polls/studydays?number_week=${currentWeekNumber}&group_short_name=${currentGroup}`).then((resp: AxiosResponse) => {
            setStudyDays(resp.data);
            
        })
    },[currentGroup, currentWeekNumber])

    const updateWeekNumber = (a: number) => {
        setCurrentWeekNumber(currentWeekNumber + a)
        setLoadingState(true)
    }

    useEffect(() => {
        if (loadingState){
            setLoadingState(false)
            updateStudyDays()
        }
    },[loadingState, updateStudyDays]);



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
            <IonContent>
                <IonItem>
                    <IonLabel>Группа</IonLabel>
                    <IonSelect value={currentGroup} placeholder="Номер группы" onIonChange={e => {setCurrentGroup(e.detail.value);setLoadingState(true)}}>
                        ({
                            groups.map(group => <IonSelectOption value={group.short_name} key={"group" + group.id}>{group.short_name}</IonSelectOption>)
                        })
                    </IonSelect>
                </IonItem>
                <CalendarDaysCircle weekNumber={currentWeekNumber} studyDays={studyDays} updateWeekNumber={updateWeekNumber} />
            </IonContent>
        </IonPage>
    )
}
export default Schedule;