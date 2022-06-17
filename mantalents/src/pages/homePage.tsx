
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'react-big-calendar/lib/css/react-big-calendar.css';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Resúmen',
      },
    },
  };
  
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril'];
  export const data = {
    labels,
    datasets: [
      {
        label: 'Compras',
        data: labels.map(() => 800  ),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Ventas',
        data: labels.map(() => 700 ),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


export const HomePage= ()=>{
  
    return (
        <>
        {
          /**
           <Bar options={options} data={data} />
           * 
           */
        }
        
        </>
    )
}