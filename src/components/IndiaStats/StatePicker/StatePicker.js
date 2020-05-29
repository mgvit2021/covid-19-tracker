import React from 'react'
import { NativeSelect,FormControl } from '@material-ui/core';
import styles from './StatePicker.module.css'
export const StatePicker = ({data,handleStateChange}) => {
    const allStates = data.map(({loc})=> loc);
    return (
        <div className="text-center">
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleStateChange(e.target.value)}>
                <option value="">None</option>
                {allStates.map((state,i)=> <option key={i} value={state}>{state}</option>)}
            </NativeSelect>
        </FormControl>
        </div>
    )
}