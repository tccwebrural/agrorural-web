import { ReactNode } from 'react';
//import { NotifyContext } from './NotificationProvider';
import { VaccineNotifyModel } from 'modules/private/modules/notifications/models/VaccineNotifyModel';
import { createContext } from 'react';

type NotificationContextProps = {
    children: ReactNode;
}
const initialValue ={

}


//export const NotifyContext = createContext(VaccineNotifyModel);

// export const NotifyContextProvider = ( {children} : NotificationContextProps) => {
//     return(
//         <NotifyContext.Provider value={{isOpenModal}}>
//         {children}
//         </NotifyContext.Provider>
//     )
// }