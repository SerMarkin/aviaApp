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
import { restaurantOutline  , calendarOutline, bookOutline, newspaperOutline,  trashOutline, bookmarkOutline } from 'ionicons/icons';
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
    title: 'Библиотека',
    url: '/library',
    iosIcon: bookOutline,
    mdIcon: bookOutline
  },

  {
    title: 'Расписание',
    url: '/home',
    iosIcon: calendarOutline,
    mdIcon: calendarOutline
  },
  {
    title: 'Столовая',
    url: '/foodcort',
    disabled:true,
    iosIcon: restaurantOutline,
    mdIcon: restaurantOutline
  },
  {
    title: 'Новости',
    url: '/news',
    disabled:true,
    iosIcon: newspaperOutline,
    mdIcon: newspaperOutline
  },
  // {
  //   title: 'Тестирование',
  //   url: '/test',
  //   iosIcon: bookmarkOutline,
  //   mdIcon: bookmarkOutline,
  //   disabled:true,
  // },
];


const Menu: React.FunctionComponent<MenuProps> = ({ selectedPage }) => {

  return (
    <IonMenu contentId="main" type="overlay"  maxEdgeStart={10} >
      <IonContent >
        <IonList id="inbox-list">
          <IonListHeader>
            <IonImg src="assets/icon/logoAvia.jpg" style={{"width":"200px","margin":"20px"}} />
          </IonListHeader>
          <br/>
          <>{appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={selectedPage === appPage.title ? 'selected' : 'us'} routerLink={appPage.url} routerDirection="none" disabled={appPage.disabled}  detail={false}>
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}</>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
