import React from 'react';
import Footer from '../Footer/Footer';
import SearchBar from '../SearchBar/SearchBar';
import AboutBikeConnect from '../AboutBikeConnect/AboutBikeConnect';
import './HomePage.css';
import NameService from '../NameService/NameService';
import ServiceGrid from '../ServiceGrid/ServiceGrid';
import ServiceBenefits from '../ServiceBenefits/ServiceBenefits';
import CycleTips from '../CycleTips/CycleTips';
import RentalSignup from '../RentalSignup/RentalSignup';
import CycleRentalSteps from '../CyCleRentalSteps/CycleRentalSteps';
import CyclerentalGrid from '../MotorcycleGrid/CyclerentalGrid';
import HeaderAfterLogin from '../Header/HeaderAfterLogin';
import HeaderNoLogin from '../Header/HeaderNoLogin';


const HomePage = () => {
    return (
        <div className="page-wrapper">
            <NameService />
            <main className="main-content">
                <div className="container">
                    <SearchBar />
                    <AboutBikeConnect />
                    <CyclerentalGrid />
                    <ServiceGrid />
                    <CycleRentalSteps />
                    <ServiceBenefits />
                    <CycleTips />
                    <RentalSignup />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;