import { useEffect, useState } from 'react'
import { MainTitle } from './Components/MainTitle'
import {
  getLastTemperatures,
  getLastYears,
  getLastMonths,
  getLastDays,
  getLastMinutes,
  getLastHours
} from './firebase'

import { ProgressSpinner } from 'primereact/progressspinner'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Chart } from 'primereact/chart'

const formatData = (
  temperatures: number[],
  years: number[],
  month: number[],
  days: number[],
  hours: number[],
  minutes: number[]
) => {
  const datesArray = years.map((_, i) => {
    return new Date(years[i], month[i], days[i], hours[i], minutes[i], 0, 0)
  })

  return datesArray.map((date, i) => {
    return {
      date: date.toLocaleString('es-VE'),
      temperature: temperatures[i]
    }
  })
}

interface IData {
  date: string
  temperature: number
}
const App = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true)
  const [temperatures, setTemperatures] = useState<number[]>([])
  const [years, setYears] = useState<number[]>([])
  const [months, setMonths] = useState<number[]>([])
  const [days, setDays] = useState<number[]>([])
  const [hours, setHours] = useState<number[]>([])
  const [minutes, setMinutes] = useState<number[]>([])
  const [data, setData] = useState<Array<IData>>([])
  const [charData, setCharData] = useState({})
  useEffect(() => {
    const initializeDataFetcher = async () => {
      try {
        setLoading(true)
        await getLastTemperatures(setTemperatures)
        await getLastYears(setYears)
        await getLastMonths(setMonths)
        await getLastDays(setDays)
        await getLastHours(setHours)
        await getLastMinutes(setMinutes)
      } catch (e) {
        console.error(e)
      }
    }

    initializeDataFetcher()
  }, [])

  useEffect(() => {
    if (
      temperatures.length &&
      years.length &&
      months.length &&
      days.length &&
      hours.length &&
      minutes.length
    ) {
      setData(() => [...formatData(temperatures, years, months, days, hours, minutes)])
      setLoading(false)
    }
  }, [temperatures, years, months, days, hours, minutes])

  useEffect(() => {
    const parsedData = data.slice(-6)
    console.log(parsedData)

    if (parsedData) {
      setCharData(() => {
        return {
          labels: parsedData.map((item) => item.date),
          datasets: [
            {
              label: 'Temperatura',
              data: parsedData.map((item) => item.temperature),
              fill: false,
              borderColor: '#FF6D32',
              tension: 0.4
            }
          ]
        }
      })
    }
  }, [data])
  return (
    <main>
      <MainTitle />

      {loading ? (
        <div className='container-spinner'>
          <ProgressSpinner />
        </div>
      ) : (
        <>
          <DataTable
            style={{ marginBottom: '100px' }}
            responsiveLayout='scroll'
            value={data}
            stripedRows
            scrollable
            scrollHeight='400px'
            showGridlines
          >
            <Column field='date' header='Fecha' sortable></Column>
            <Column field='temperature' header='Temperatura (°C)' sortable></Column>
          </DataTable>
          <h1 className='dashboard-main-title'>
            Comportamiento de los ultimos registros de temperatura
          </h1>
          <Chart type='line' data={charData} style={{ background: '#fff' }} />
        </>
      )}
    </main>
  )
}

export default App
