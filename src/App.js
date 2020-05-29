import React,{Component} from 'react';
import styles from './App.module.css';
import {Cards,Chart,CountryPicker,CountryDetails} from './components'
import {fetchData} from './api/index';
import ReactRotatingText from 'react-rotating-text';
import Corona from './images/covid19_logo.png';
import cx from 'classnames'

class App extends Component{
  state={
    data:{},
    country:'',
    quotes:[
      "Pandemic is not a word to use lightly or carelessly",
      "Wash your hands regularly and sanitize after every foreign contact",
      "Maintain social distance, atleast 1.5m should be maintained",
      "Avoid family gatherings for sometime. Be a responsible citizen"
    ],
  }
  getRandomQuote(){
    this.setState({
      quote:this.state.quotes[Math.floor(Math.random())*this.state.quotes.length]})
  }
  async componentDidMount(){
    const data = await fetchData();
    this.setState({data});
  }
  
  handleCountryChange = async(country)=>{
    const fetchedData = await fetchData(country);
    this.setState({
      data:fetchedData,
      country: country
    })
  }
  
  render(){
    return (
      <div className={styles.container}>
        <img className={styles.image} src={Corona} alt="COVID-logo"/> 
        <blockquote className={cx([styles.blockquote,"lead"])}>
          -<ReactRotatingText cursor={false} pause={2200} items={this.state.quotes} />
        </blockquote>
        <Cards data={this.state.data}/>
        <CountryPicker handleCountryChange = {this.handleCountryChange}/>
        <Chart data={this.state.data} country={this.state.country}/>
        <CountryDetails country={this.state.country}/>
      </div>
    );
  }
}

export default App;
