import React,{useState,useEffect} from 'react'
import { NativeSelect,FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';
import {fetchCountries} from '../../api';
import cx from 'classnames';
export default function CountryPicker({handleCountryChange}) {

    const [fetchedCountries,setFetchedCountries] = useState([]);

    useEffect(()=>{
        const fetchAPI = async()=>{
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();
    },[setFetchedCountries]);

    //console.log(fetchedCountries);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country,i)=> <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
            <span className={cx(["lead",styles.selectLine])}>Detailed statistics of India on select.</span>
        </FormControl>
    )
}
