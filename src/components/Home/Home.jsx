import React from 'react'
import styles from './Home.module.css';
import Recent from '../Recent/Recent';
import Slider from '../Slider/Slider';
import CategorySlider from '../CategorySlider/CategorySlider';
export default function Home() {
  return (
    <>
    <Slider/>
    <CategorySlider/>
    <Recent/>
    </>
  )
}
