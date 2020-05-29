import axios from 'axios';

const url = "https://covid19.mathdro.id/api";
const inUrl = "https://api.rootnet.in/covid19-in/stats/latest"
const contactApi = "https://api.rootnet.in/covid19-in/contacts"
export const fetchData = async(country)=>{
    let changeableUrl = url;
    //undefined when called without country
    if(country){
        changeableUrl = `${url}/countries/${country}`;
    }
    try{
        const {data:{confirmed,recovered,deaths,lastUpdate}} = await axios.get(changeableUrl);
        
        return {confirmed,deaths,recovered,lastUpdate}
    }
    catch(error){
        console.log(error);
    }

}
//toDateString()
export const fetchDailyData = async() =>{
    try{
        const {data} = await axios.get(`${url}/daily`);
        //need an array of objects ?
        const modifiedData = data.map(dailyData =>({
            confirmed : dailyData.confirmed.total,
            deaths : dailyData.deaths.total,
            date : new Date(dailyData.reportDate).toDateString().split(" ").slice(1,3).join(),
            mainChina: dailyData.mainlandChina,
            otherLocations: dailyData.otherLocations,
            
        }));
        return modifiedData;
    }
    catch(error){
        console.log(error);
    }
}

export const fetchCountries = async() =>{
    try{
        const {data: { countries } } = await axios.get(`${url}/countries`)
        const countryList = countries.map(country=> country.name);
        
        return countryList;
    }catch(error){
        console.log(error);
    }
}
/* Indian Data API */
export const fetchIndiaData = async() =>{
    try{
        const {data:{data}} = await axios.get(inUrl)
        return data;
    }catch(error){
        console.log(error);
    }
}

export const fetchContact = async(state) =>{
    try{
        const {data:{data:{contacts}}} = await axios.get(contactApi)
        if(state===""){
            return contacts.primary.number
        }
        const contact = await contacts.regional.filter((obj) => obj.loc===state);
        return contact[0].number;
    }catch(error){
        console.log(error);
    }
}

