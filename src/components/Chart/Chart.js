import React,{useState,useEffect} from 'react'
import {fetchDailyData} from '../../api'
import {Line, Bar} from 'react-chartjs-2'; 
import styles from './Chart.module.css';

const Chart = ({data,country}) => {
    const [dailyData,setDailyData] = useState([]);

    useEffect(() =>{
        const fetchAPI = async ()=>{
            const dailyData = await fetchDailyData();
            setDailyData(dailyData);
        }

        //console.log(dailyData);

        fetchAPI();
    },[]);

    const lineChart = (
        dailyData ? (

        <Line 
            data={{
                labels: dailyData.map(({date})=>date),
                datasets:[
                    {
                        data: dailyData.map(({confirmed})=>confirmed),
                        label: "Infected",
                        borderColor: "#3333ff",
                        fill:true,
                    },
                    {
                        data: dailyData.map(({deaths})=>deaths),
                        label: "Deaths",
                        borderColor: "red",
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill:true,
                    }
                ],
            }}
        />) : null
    );

    const barChart = (
        data.confirmed ? (
            <Bar 
                data={{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            "rgba(0,0,255,0.5)",
                            "rgba(0,255,0,0.5)",
                            "rgba(255,0,0,0.5)"
                        ],
                        data: [data.confirmed.value,data.recovered.value,data.deaths.value]
                    }]
                }}
                options={{
                    legend :{display:false},
                    title : {display:true, text: `Current state in ${country}`},
                }}
            />
        ) : null
    );


    const compareChart = (
        dailyData ? (

        <Line 
            data={{
                labels: dailyData.map(({date})=>date),
                datasets:[
                    {
                        data: dailyData.map(({mainChina})=>mainChina),
                        label: "Mainland China",
                        borderColor: "#bd2fff",
                        backgroundColor: '#bd2fff60',
                        fill:true,
                    },
                    {
                        data: dailyData.map(({otherLocations})=>otherLocations),
                        label: "Rest of the World",
                        borderColor: "green",
                        backgroundColor: 'rgba(0,255,0,0.5)',
                        fill:true,
                    }
                ],
            }}
        />
        ) : null
    );

    return (
        <div className={styles.container}>
            <div className={styles.chart}>
                {country ? barChart : lineChart}
            </div>
            <div className={styles.chart}>
                {country ? null : compareChart}
            </div>
        </div>
    )
}
export default Chart;