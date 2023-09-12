import {useState} from 'react'
import Card from "../../../shared/ui/atoms/Card.tsx";
import Button from "../../../shared/ui/atoms/Button.tsx";
import Loader from "../../../shared/ui/atoms/Loader.tsx";
import OrdersService from "../services/orders.service.ts";
import {downloadWithAnchor} from "../../../shared/utils/downloadWithAnchor.ts";
import {toCsvString} from "../../../shared/utils/toCsvString.ts";

const CARDS_AMOUNT = 4;
const CsvDownloadGrid = () => {
   const [isLoadingOrders, setIsLoadingOrders] = useState(false);

   async function handleCsvDownloadClick() {
      setIsLoadingOrders(true);
      const orders = await OrdersService.fetchOrders();
      const csvContent = toCsvString(OrdersService.formatOrdersToCsvArray(orders));
      downloadWithAnchor(csvContent, "orders.csv");
      setIsLoadingOrders(false);
   }

   return (
       <div className='grid mt-6 gap-6 grid-cols-1 sm:grid-cols-2'>
          {[...Array(CARDS_AMOUNT)].map((_, i) => (
              <Card key={i} className='flex-1 grid place-content-center h-[35dvh]'>
                 <Button disabled={isLoadingOrders} onClick={handleCsvDownloadClick} className='px-12'>
                    {isLoadingOrders ? (
                        <div className='flex gap-3'>
                           <Loader/>
                           Loading...
                        </div>
                    ) : 'Download'}
                 </Button>
              </Card>
          ))}
       </div>
   );
};

export default CsvDownloadGrid;
