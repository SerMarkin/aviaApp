import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonImg,
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { restaurantOutline  , calendarOutline, bookOutline, newspaperOutline,  trashOutline } from 'ionicons/icons';
import './Menu.css';

interface MenuProps extends RouteComponentProps {
  selectedPage: string;
}

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  disabled?: boolean;
}

const appPages: AppPage[] = [
  {
    title: 'Расписание',
    url: '/home',
    iosIcon: calendarOutline,
    mdIcon: calendarOutline
  },
  {
    title: 'Библиотека',
    url: '/library',
    iosIcon: bookOutline,
    mdIcon: bookOutline
  },
  {
    title: 'Новости',
    url: '/news',
    iosIcon: newspaperOutline,
    mdIcon: newspaperOutline
  },
  {
    title: 'Столовая',
    url: '/foodcort',
    iosIcon: restaurantOutline,
    mdIcon: restaurantOutline
  },
  {
    title: 'Тестирование',
    url: '/test',
    iosIcon: trashOutline,
    mdIcon: trashOutline,
    disabled:true,
  },
];

// const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FunctionComponent<MenuProps> = ({ selectedPage }) => {

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent >
        <IonList id="inbox-list">
          <IonListHeader>
            <IonImg src="assets/icon/logoAvia.jpg" style={{"width":"200px","margin":"20px"}} />
          </IonListHeader>
          <br/>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={selectedPage === appPage.title ? 'selected' : 'us'} routerLink={appPage.url} routerDirection="none" disabled={appPage.disabled}  detail={false}>
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        {/* <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
