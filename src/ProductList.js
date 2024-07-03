import React, { useEffect, useState, useRef } from 'react';
//import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import NavBar from './NavBar';
import nikeData from './nike.json';
import Sidebar from './Sidebar';
import Product from './Product';

const ProductList = () => {

  const [products, setProducts] = useState([]);                 //stores all the products
  const [currentProducts, setCurrentProducts] = useState([]);   //stores the products that are being shown to the user
  const [filteredProducts, setFilteredProducts] = useState([]); //stores the products due to searching
  const [searchValue, setSearchValue] = useState("");           //stores the user search value
  const [filterValue, setFilterValue] = useState("");           //stores the custom filter value
  const [error, setError] = useState(null);                     //if any error occurs
  const [currentPage, setCurrentPage] = useState(0);            //stores the current page number
  const [loading, setLoading] = useState(false);                //if data is being loaded
  const [searchActive, setSearchActive] = useState(false);      //for checking if the user is currently searching something
  const searchInputRef = useRef(null);                          //for focusing the search bar
  const [atBottom, setAtBottom] = useState(false);              //for loading more products if the user reaches the bottom
  const mainContentRef = useRef(null);                          //used for scrolling in the main content
  const [categoryName, setCategoryName] = useState("");         //stores the category that the user wants
  const [categoryValue, setCategoryValue] = useState("");       //stores the category value that the user wants
  const [gender, setGender] = useState([]);                     //stores the gender filter
  const [lowPrice, setLowPrice] = useState([]);                 //stores the min price filter
  const [highPrice, setHighPrice] = useState([]);               //stores the max price filter
  const [brand, setBrand] = useState([]);                       //stores the brand filter
  const [sport, setSport] = useState([]);                       //stores the sports filter
  const PRODUCTS_PER_PAGE = 48;                                 //the number of products per page
  const [checkedGenderItems, setCheckedGenderItems] = useState({
    men: false,
    women: false,
    unisex: false,
    kids: false
  });
  const [checkedPriceItems, setCheckedPriceItems] = useState({
    price1: false,
    price2: false,
    price3: false,
    price4: false,
    price5: false
  });
  const [checkedBrandItems, setCheckedBrandItems] = useState({
    "Nike Sportswear": false,
    "Jordan": false,
    "Converse": false,
    "ACG":false,
    "Nike Pro":false
  });
  const [checkedSportItems, setCheckedSportItems] = useState({
    "Lifestyle": false,
    "Running": false,
    "Workout": false,
    "Basketball": false,
    "Football": false,
    "Soccer": false,
    "Yoga": false,
    "Baseball": false,
    "Golf": false,
    "Skateboarding": false,
    "Tennis": false,
    "Track & Field": false,
    "Lacrosse": false,
    "Walking": false,
    "Outdoor": false,
    "Volleyball": false,
    "Swimming": false,
    "Hiking": false,
    "Hockey": false,
    "Dance": false,
    "Cheerleading": false,
    "Cycling": false,
    "Interval Training": false,
    "Softball": false,
  }); 

  //If I were to use npx json-server --watch nike.json --port 3001, I would make the API call using this statement
  /*
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        for(let index = 1; index <= 20911; index++){
          const response = await fetch(`http://127.0.0.1:3001/${index}`);
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);
  */

  //loads all the data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsWithIds = nikeData.map(response => ({
          ...response,
          id: uuidv4()
        }));

        const products = [...productsWithIds];

        setProducts(products);
        setFilteredProducts(products);
        setCurrentPage(1);
        setLoading(false);
        setSearchActive(false);

      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };
    
    fetchProducts();
  }, []);

  //used for scrolling in the main content
  useEffect(() => {
    const mainContent = mainContentRef.current;

    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = mainContent;

      if (scrollTop + clientHeight >= scrollHeight - 20) {
        setAtBottom(true);
      } else {
        setAtBottom(false);
      }
    }

    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  
  //if the user reaches the bottom, load more products
  useEffect(() => {
    if (atBottom) {
      loadMoreProducts();
    }
  }, [atBottom]);

  //sets the current products whenever the page number or the filteredProducts changes
  useEffect(() => {
    const endIndex = (currentPage) * PRODUCTS_PER_PAGE;
    setCurrentProducts(filteredProducts.slice(0, Math.min(endIndex, filteredProducts.length)));
  }, [currentPage, filteredProducts]);

  //is used for the search bar
  useEffect(() => {
    if (searchActive && searchInputRef.current) {
      searchInputRef.current.focus();

      const items = document.querySelectorAll('.popular-searches li');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 100);
      });
    }
  }, [searchActive]);
  
  const loadMoreProducts = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  //is used when somebody searches an item
  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    setCategoryName("");
    setCategoryValue("");
    setGender("");
    setCheckedGenderItems({
      men: false,
      women: false,
      unisex: false,
      kids: false
    });
    setCheckedPriceItems({
      price1: false,
      price2: false,
      price3: false,
      price4: false,
      price5: false
    });
    setLowPrice([]);
    setHighPrice([]);
    setCheckedBrandItems({
      "Nike Sportswear": false,
      "Jordan": false,
      "Converse": false,
      "ACG":false,
      "Nike Pro":false
    });
    setCheckedSportItems({
      "Lifestyle": false,
      "Running": false,
      "Workout": false,
      "Basketball": false,
      "Football": false,
      "Soccer": false,
      "Yoga": false,
      "Baseball": false,
      "Golf": false,
      "Skateboarding": false,
      "Tennis": false,
      "Track & Field": false,
      "Lacrosse": false,
      "Walking": false,
      "Outdoor": false,
      "Volleyball": false,
      "Swimming": false,
      "Hiking": false,
      "Hockey": false,
      "Dance": false,
      "Cheerleading": false,
      "Cycling": false,
      "Interval Training": false,
      "Softball": false,
    });
    
    setFilteredProducts(products.filter(product => {
      const productName = product.productName || '';
      const category = product.category || '';
      const subCategory = product.subCategory || '';
      const division = product.division || '';

      return productName.toLowerCase().includes(lowerCaseSearchTerm) ||
        division.toLowerCase().includes(lowerCaseSearchTerm) ||
        category.toLowerCase().includes(lowerCaseSearchTerm) ||
        subCategory.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.url.includes(lowerCaseSearchTerm) || 
        product.imageUrl.includes(lowerCaseSearchTerm);
    }));
    
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }

    setSearchValue(searchTerm);
    setFilterValue(searchTerm);
    setCurrentPage(1);
    setSearchActive(false);
  };

  //is used when somebody searches an item through the filters
  const handleFilterChange = ({ category, gender, minPrice, maxPrice, brand, sport }) => {
    const lowerCaseSearchTerm = searchValue.toLowerCase();

    const lowerCaseCategory = Array.isArray(category)
      ? category.map(item => item.toString().toLowerCase())
      : category ? [category.toLowerCase()] : [];
    
    const lowerCaseBrand = Array.isArray(brand)
      ? brand.map(item => item.toString().toLowerCase())
      : brand ? [brand.toLowerCase()] : [];
    
    const lowerCaseSport = Array.isArray(sport)
      ? sport.map(item => item.toString().toLowerCase())
      : sport ? [sport.toLowerCase()] : [];

    const lowerCaseGender = Array.isArray(gender)
      ? gender.map(item => item.toLowerCase())
      : gender ? [gender.toLowerCase()] : [];

    const filtered = products.filter(product => {

      const name = product.productName ? product.productName.toLowerCase() : "";
      const category = product.category ? product.category.toLowerCase() : "";
      const subCategory = product.subCategory ? product.subCategory.toLowerCase() : "";
      const gender = product.division ? product.division.toLowerCase() : "";
      const listPrice = product.salePrice ? product.salePrice : product.listPrice ? product.listPrice : 0;

      const categoryMatch = lowerCaseCategory.length === 0 ||
        lowerCaseCategory.some(item =>
          category.toLowerCase().includes(item) || name.toLowerCase().includes(item) || subCategory.toLowerCase().includes(item)
      );
      
      const brandMatch = lowerCaseBrand.length === 0 ||
        lowerCaseBrand.some(item =>
          category.toLowerCase().includes(item) || name.toLowerCase().includes(item) || subCategory.toLowerCase().includes(item)
        );  
      
      const sportMatch = lowerCaseSport.length === 0 ||
        lowerCaseSport.some(item =>
          category.toLowerCase().includes(item) || name.toLowerCase().includes(item) || subCategory.toLowerCase().includes(item)
        );

      let genderMatch = lowerCaseGender.length === 0 || lowerCaseGender.includes(gender);

      let minPriceMatch = minPrice.length === 0;
      for(let i = 0; i < minPrice.length; i++){
          minPriceMatch = minPriceMatch || listPrice >= minPrice[i];
      }
      
      let maxPriceMatch = maxPrice.length === 0;
      for(let i = 0; i < maxPrice.length; i++){
        maxPriceMatch = maxPriceMatch || listPrice <= maxPrice[i];
      }

      const search = name.toLowerCase().includes(lowerCaseSearchTerm) ||
        gender.toLowerCase().includes(lowerCaseSearchTerm) ||
        category.toLowerCase().includes(lowerCaseSearchTerm) ||
        subCategory.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.url.includes(lowerCaseSearchTerm) || product.imageUrl.includes(lowerCaseSearchTerm)
  
      return categoryMatch && brandMatch && sportMatch && genderMatch && minPriceMatch && maxPriceMatch && search;
    });
    
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }

    if(searchValue.length === 0)
      setFilterValue(category.toString());
    else if(category.length === 0)
      setFilterValue(searchValue);
    else
      setFilterValue(searchValue + " and " + category.toString());

    setFilteredProducts(filtered);
    setCurrentPage(1);
    setSearchActive(false);
  };
  

  const handleSearchClick = () => {
    setSearchActive(true);
  };

  const handleCancelClick = () => {
    setSearchActive(false);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid-container">
      <header className="grid-header">
        <NavBar 
          onSearch={handleSearch} 
          handleCancelClick={handleCancelClick} 
          searchActive={searchActive} 
          handleSearchClick={handleSearchClick} 
          searchInputRef={searchInputRef}
          setCheckedGenderItems={setCheckedGenderItems}
        />
        <h3>{filterValue === "" ? "" : "Search results for"}</h3>
        <h1>{(filterValue === "" ? "All Products " : filterValue + " ") + "(" + filteredProducts.length + ")"}</h1>
      </header>

      <aside className="grid-sidebar">
        <Sidebar 
          handleFilterChange={handleFilterChange}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          categoryValue={categoryValue}
          setCategoryValue={setCategoryValue}
          gender={gender}
          setGender={setGender}
          checkedGenderItems={checkedGenderItems}
          setCheckedGenderItems={setCheckedGenderItems}
          lowPrice={lowPrice}
          setLowPrice={setLowPrice}
          highPrice={highPrice}
          setHighPrice={setHighPrice}
          checkedPriceItems={checkedPriceItems}
          setCheckedPriceItems={setCheckedPriceItems}
          brand={brand}
          setBrand={setBrand}
          checkedBrandItems={checkedBrandItems}
          setCheckedBrandItems={setCheckedBrandItems}
          sport={sport}
          setSport={setSport}
          checkedSportItems={checkedSportItems}
          setCheckedSportItems={setCheckedSportItems}
        />
      </aside>

      <main className="grid-main" ref={mainContentRef}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {currentProducts.map(product => (
            <Product product={product} />
          ))}
        </div>
        {loading && <p>Loading...</p>}
        {!loading && currentProducts.length !== filteredProducts.length && (
          <div className="loading-container">
            <div className="loader"></div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductList;
