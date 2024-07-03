import React, {useState, useEffect} from 'react';
import './Sidebar.css';
import CheckedItem from './CheckedItem';

const Sidebar = ({handleFilterChange, categoryName, setCategoryName, categoryValue, setCategoryValue, gender, 
  setGender, checkedGenderItems, setCheckedGenderItems, lowPrice, setLowPrice, highPrice, setHighPrice, checkedPriceItems, 
  setCheckedPriceItems, brand, setBrand, checkedBrandItems, setCheckedBrandItems, sport, setSport, checkedSportItems,
  setCheckedSportItems}) => {

  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isSportOpen, setIsSportOpen] = useState(false);

  const lowPriceKeys = {
    price1: 0,
    price2: 25,
    price3: 50,
    price4: 100,
    price5: 150 
  };

  const highPriceKeys = {
    price1: 25,
    price2: 50,
    price3: 100,
    price4: 150,
    price5: Number.MAX_SAFE_INTEGER 
  };

  const categories = {
    'Shoes':"Shoes",
    'Hoodies & Pullovers':"Pullover",
    'Jackets & Vests':"Jacket",
    'Pants & Tights':"Pants",
    'Tops & T-Shirts':"T-Shirt",
    'Jerseys':"Jersey",
    'Shorts':"Shorts",
    'Tights & Leggings':"Legging",
    'Tracksuits':"Track",
    'Simwear':"Swimming",
    'Socks':"Socks",
    'Accessories & Equipment':"Accessories"
  };

  const toggleGenderAccordion = () => {
    setIsGenderOpen(!isGenderOpen);
  };

  const togglePriceAccordion = () => {
    setIsPriceOpen(!isPriceOpen);
  };

  const toggleBrandAccordion = () => {
    setIsBrandOpen(!isBrandOpen);
  }

  const toggleSportAccordion = () => {
    setIsSportOpen(!isSportOpen);
  }

  const handleGenderCheckboxChange = (event) => {
    const { name } = event.target;
    setCheckedGenderItems(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handlePriceCheckboxChange = (event) => {
    const { name } = event.target;
    setCheckedPriceItems(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleBrandCheckboxChange = (event) => {
    const { name } = event.target;
    setCheckedBrandItems(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleSportCheckboxChange = (event) => {
    const { name } = event.target;
    setCheckedSportItems(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  useEffect(() => {
    const genderNames = Object.keys(checkedGenderItems).filter(key => checkedGenderItems[key]);
    setGender(genderNames);
  }, [checkedGenderItems]);

  useEffect(() => {
    setLowPrice(getLowPrice());
    setHighPrice(getHighPrice());
  }, [checkedPriceItems]);

  useEffect(() => {
    const brandNames = Object.keys(checkedBrandItems).filter(key => checkedBrandItems[key]);
    setBrand(brandNames.map(item => item.toLowerCase()));
  }, [checkedBrandItems]);
  
  useEffect(() => {
    const sportNames = Object.keys(checkedSportItems).filter(key => checkedSportItems[key]);
    setSport(sportNames.map(item => item.toLowerCase()));
  }, [checkedSportItems]);

  useEffect(() => {
    handleFilterChange({ category: categoryValue, gender: gender, minPrice: lowPrice, maxPrice: highPrice, brand: brand, sport: sport});
  }, [gender, categoryName, categoryValue, lowPrice, highPrice, brand, sport]);

  function getLowPrice()
  {
    let ans = [];

    for(const key in checkedPriceItems){
      if(checkedPriceItems[key])
        ans.push(lowPriceKeys[key]);
    }
  
    return ans;
  }

  function getHighPrice()
  {
    let ans = [];

    for(const key in checkedPriceItems){
      if(checkedPriceItems[key])
        ans.push(highPriceKeys[key]);
    }
  
    return ans;
  }

  return (
    <div className="sidebar">
      <ul className="category-list">
        {Object.entries(categories).map(([key, value]) => (
          <li key={key} onClick={() => {
            setCategoryName(key);
            setCategoryValue(value);
          }} className="category-item">{key}
          </li>
        ))}
        <li className="divider"></li>
        <li className="category-item" onClick={toggleGenderAccordion}>
          <span>Gender</span>
          <span className={`caret-sign ${isGenderOpen ? 'open' : ''}`}></span>
        </li>
        <ul className={`accordion-content ${isGenderOpen ? 'open' : ''}`}>
          <CheckedItem id="men" checked={checkedGenderItems.men} onChange={handleGenderCheckboxChange} labelName="Men"/>
          <CheckedItem id="women" checked={checkedGenderItems.women} onChange={handleGenderCheckboxChange} labelName="Women"/>
          <CheckedItem id="unisex" checked={checkedGenderItems.unisex} onChange={handleGenderCheckboxChange} labelName="Unisex"/>
          <CheckedItem id="kids" checked={checkedGenderItems.kids} onChange={handleGenderCheckboxChange} labelName="Kids"/>
        </ul>
        <li className="divider"></li>
        <li className="category-item" onClick={togglePriceAccordion}>
          <span>Shop By Price</span>
          <span className={`caret-sign ${isPriceOpen ? 'open' : ''}`}></span>
        </li>
        <ul className={`accordion-content ${isPriceOpen ? 'open' : ''}`}>
          <CheckedItem id="price1" checked={checkedPriceItems.price1} onChange={handlePriceCheckboxChange} labelName="$0 - $25"/>
          <CheckedItem id="price2" checked={checkedPriceItems.price2} onChange={handlePriceCheckboxChange} labelName="$25 - $50"/>
          <CheckedItem id="price3" checked={checkedPriceItems.price3} onChange={handlePriceCheckboxChange} labelName="$50 - $100"/>
          <CheckedItem id="price4" checked={checkedPriceItems.price4} onChange={handlePriceCheckboxChange} labelName="$100 - $150"/>
          <CheckedItem id="price5" checked={checkedPriceItems.price5} onChange={handlePriceCheckboxChange} labelName="Over $150"/>
        </ul>
        <li className="divider"></li>
        <li className="category-item" onClick={toggleBrandAccordion}>
          <span>Brand</span>
          <span className={`caret-sign ${isBrandOpen ? 'open' : ''}`}></span>
        </li>
        <ul className={`accordion-content ${isBrandOpen ? 'open' : ''}`}>
          <CheckedItem id="Nike Sportswear" checked={checkedBrandItems["Nike Sportswear"]} onChange={handleBrandCheckboxChange}/>
          <CheckedItem id="Jordan" checked={checkedBrandItems["Jordan"]} onChange={handleBrandCheckboxChange}/>
          <CheckedItem id="Converse" checked={checkedBrandItems["Converse"]} onChange={handleBrandCheckboxChange}/>
          <CheckedItem id="ACG" checked={checkedBrandItems["ACG"]} onChange={handleBrandCheckboxChange}/>
          <CheckedItem id="Nike Pro" checked={checkedBrandItems["Nike Pro"]} onChange={handleBrandCheckboxChange}/>
        </ul>
        <li className="divider"></li>
        <li className="category-item" onClick={toggleSportAccordion}>
          <span>Activities and Sports</span>
          <span className={`caret-sign ${isSportOpen ? 'open' : ''}`}></span>
        </li>
        <ul className={`accordion-content ${isSportOpen ? 'open' : ''}`}>
        {Object.entries(checkedSportItems).map(([key, value]) => (
          <CheckedItem id={key} checked={value} onChange={handleSportCheckboxChange}/>
        ))}
        </ul>
        <li className="divider"></li>
      </ul>
    </div>
  );
};

export default Sidebar;
