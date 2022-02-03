import React, { useContext } from 'react';
import MetaTags from 'react-meta-tags';
import { GlobalContext } from '../../App';
import { useParams } from 'react-router-dom';
import Header from './Header'
import Section from './Section'
import { tariffTypesArray } from "../../globals/utils";


export default function TariffePage() {
  let { tariff } = useParams();
  const { darkTheme } = useContext(GlobalContext);
  const [selectedTrariff, setSelectedTrariff] = React.useState({});
  const [selectedTrariffId, setSelectedTrariffId] = React.useState({});
  React.useEffect(() => {
    console.log(tariff)
    let filteredTariff = tariffTypesArray.filter((item) => {
      if (tariff && tariff.length !== 2 && item.title.toLowerCase() === tariff.substring(1).toLowerCase()) return true
      else return false
    })

    if (filteredTariff && filteredTariff.length !== 0) {
      let id = tariffTypesArray.indexOf(filteredTariff[0])
      setSelectedTrariffId(id)
      setSelectedTrariff(filteredTariff[0])
    }
    else {
      setSelectedTrariff({})
    }




  }, [tariff])
  return (
    <div>
      <MetaTags>
        <title>Тариф {selectedTrariff.title ? selectedTrariff.title : 'Неизвестный тариф'}</title>
        <meta property="og:title" content={`Boom - Тариф ${selectedTrariff.title ? selectedTrariff.title : 'Неизвестный тариф'}`} />
      </MetaTags>
      <Header darkTheme={darkTheme} tariff={selectedTrariff} />
      <Section darkTheme={darkTheme} tariff={selectedTrariff} selectedTrariffId={selectedTrariffId} />
    </div>
  );
};


