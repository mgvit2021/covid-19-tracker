import React, { Component } from 'react'
import {fetchIndiaData, fetchContact} from '../../api'
import {StatePicker} from '../IndiaStats/StatePicker/StatePicker'
import {StateStats} from '../IndiaStats/StateStats/StateStats'
import styles from './CountryDetails.module.css';
import cx from 'classnames';
export class CountryDetails extends Component {
    state={
        summary:{},
        stateData:{},
        inState:"",
        helpline:'',
    }
    async componentDidMount(){
        const {summary,regional} = await fetchIndiaData();
        this.setState({
            summary: summary,
            stateData: regional
        })
        this.getContact();
        //console.log(this.state.summary.confirmedCasesIndian)
    }
    handleStateChange = async (inState)=>{
        await this.setState({
            inState:inState
        })
        this.getContact();
    }
    getContact = async()=>{
        const num = await fetchContact(this.state.inState);
        await this.setState({
            helpline: num
        });
    }

    indiaStats(){
        if(this.props.country==="India"){
            return(
                <div>
                    <h1 className={cx(["lead","text-center",styles.countryHead])}>Covid-19 stats India</h1>
                    <StatePicker data={this.state.stateData} handleStateChange={this.handleStateChange} />
                    <h5 className="lead m-4">Helpline Number: {this.state.helpline}</h5>
                    <StateStats data={this.state.stateData} state={this.state.inState} />
                </div>
            )
        }else{
            return null;
        }
    }

    render() {
                //console.log(this.state.summary)
               
        return (
            <div className={styles.container}>
                {this.indiaStats()}
            </div>
        )
    }
}

export default CountryDetails
