import React from 'react'
import {Doughnut} from 'react-chartjs-2'
import styles from './ChartComponent.module.css'
export const ChartComponent = ({data}) => {
    return (
            <div>
                    <div className={styles.chart}>
                        <Doughnut 
                        data={{
                            labels: ["Indian","Foreign","Unknown"],
                            datasets:[{
                                    data: [data.confirmedCasesIndian,data.confirmedCasesForeign,data.confirmedButLocationUnidentified],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.5)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255,99,132,1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)'
                                    ],
                                    borderWidth: 1
                                }],
                            }}
                        options={{
                            title : {display:true, text: "Indian vs Foreign Cases"},
                        }}
                        height={230}
                        />
                    </div>
            </div>
    )
}
