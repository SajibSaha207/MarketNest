import  { useEffect, useState } from 'react';
import HeroBanner from './HeroBanner/HeroBanner';
import FlashDeals from './FlashDeals/FlashDeals';

const Home = () => {


   const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/Data/products.json')
            .then(res => res.json())
            .then(data => 
                // console.log(data)
                setProducts(data) 
            )
    }, [])

    return (
        <div>
            <HeroBanner></HeroBanner>
            <FlashDeals products={products}></FlashDeals>
        </div>
    );
};

export default Home;