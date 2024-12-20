import React from 'react';
import CarDealerSearchForm from '../SearchForm';

const MyHero = () => {
  return (
    <>
      <div
        className="w-full bg-cover bg-center flex items-center justify-center myhero"
        style={{ backgroundImage: "url('/img/68.jpg')", height: '100vh' }}
      >
        <div className="text-white text-4xl font-bold myheroinner">
          <CarDealerSearchForm navMenuClass="d-none" customClasses="" />
        </div>
      </div>
    </>
  );
};

export default MyHero;
