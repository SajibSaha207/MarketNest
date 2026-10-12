import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import HeroBanner from './HeroBanner/HeroBanner';
import FlashDeals from './FlashDeals/FlashDeals';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <FlashDeals></FlashDeals>
        </div>
    );
};

export default Home;