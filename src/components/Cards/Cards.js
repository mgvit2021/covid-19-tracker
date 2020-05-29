import React from 'react'
import { Card,Typography,CardContent, Grid } from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cx from 'classnames' //add multiple style components [concatenates the style names]

export default function Cards({data:{confirmed,recovered,deaths,lastUpdate}}) {
    if(!confirmed){
        return "Loading..."
    }
    //console.log(confirmed);
    return (
        <div className={styles.container}>
        <Grid container spacing={3} justify="center">
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.infected)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Infected</Typography>
                    <Typography className={styles.text1} variant="h5">
                    <CountUp
                        start={0}
                        end={confirmed.value}
                        duration={2.5}
                        separator=","
                    />
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="body2">Number of active cases of COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.recovered)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                    <Typography className={styles.text2} variant="h5">
                    <CountUp
                        start={0}
                        end={recovered.value}
                        duration={2.5}
                        separator=","
                    />
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="body2">Number of recoveries from COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.deaths)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                    <Typography className={styles.text3} variant="h5">
                    <CountUp
                        start={0}
                        end={deaths.value}
                        duration={2.5}
                        separator=","
                    />
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="body2">Number of deaths due to COVID-19</Typography>
                </CardContent>
            </Grid>
        </Grid>
        </div>
    )
}
