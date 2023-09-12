import {FC} from 'react'
import {NAVIGATION_ITEMS_COUNT} from "./constants.ts";

type Props = {};

const TheHeader: FC<Props> = ({}) => {
   return (<header className='bg-cyan-800 rounded-md text-xl shadow-lg text-white py-5 px-7 flex justify-between'>
      <h1>Logo</h1>
      <nav>
         <ul className='flex gap-5'>
            {[...Array(NAVIGATION_ITEMS_COUNT)].map((_, i) => (
                <li key={i}>
                   <div className='underline'>Item {i + 1}</div>
                </li>
            ))}
         </ul>
      </nav>
   </header>);
};

export default TheHeader;
