import React from 'react'
import { Card,Typography,CardContent, Grid } from '@material-ui/core';
import styles from './StateStats.module.css';
import CountUp from 'react-countup';
import cx from 'classnames'


export const StateStats = ({data,state}) => {

    if(state!==""){
        var result = data.filter((obj)=> obj.loc===state);
        var discharged = result[0].discharged;
        var active = result[0].confirmedCasesIndian - discharged;
        var cards = (
                <div className="text-center">
                <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={4} className={cx(styles.card,styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Active</Typography>
                        <Typography className={styles.text1} variant="h5">
                        <CountUp
                            start={0}
                            end={active}
                            duration={2.5}
                            separator=","
                        />
                        </Typography>
                        <Typography variant="body2">Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={4} className={cx(styles.card,styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography className={styles.text2} variant="h5">
                        <CountUp
                            start={0}
                            end={discharged}
                            duration={2.5}
                            separator=","
                        />
                        </Typography>
                        <Typography variant="body2">Number of recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
            </div>
        )
    }
    return (
        <div>
            {cards}
        </div>
    )
}
