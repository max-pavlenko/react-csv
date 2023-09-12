import TheHeader from "./TheHeader";
import {FC, PropsWithChildren} from "react";

const AppLayout: FC<PropsWithChildren<{}>> = ({children}) => {
   return (
       <main className='p-5'>
          <TheHeader/>
          {children}
       </main>
   );
};

export default AppLayout;
