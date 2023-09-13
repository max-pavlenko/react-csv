import TheAppLayout from "../shared/layout";
import CsvDownloadGrid from "../features/orders/components/CsvDownloadGrid.tsx";
import {useEffect} from "react";
import CurrencyService from "../features/orders/services/currency.service.ts";

function App() {
   useEffect(() => {
      CurrencyService.getCurrencies();
   }, []);

   return (
       <TheAppLayout>
          <CsvDownloadGrid/>
       </TheAppLayout>
   )
}

export default App
