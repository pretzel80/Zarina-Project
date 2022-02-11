import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Container, Grid} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {ProductCard} from '../ProductCard/ProductCard';
import {FiltersProducts} from '../../components/filtersProducts/FiltersProducts';
import BarFilterAndSort
    from '../../components/barFiltersAndSort/BarFilterAndSort';
import PaginationList from '../../components/pagination/Pagination';
import ActiveFilterBar from '../../components/activeFilterBar/ActiveFilterBar';
import {
    setFilterAndSortValues,
    setFilteredProducts,
    setFiltersAll, setPaginationCurrentPage,
} from './index';
import {useHistory} from 'react-router-dom';

export const ProductsPage = () => {
    //определяем разрешение
    const breakpointMobile = window.innerWidth < 600;

    const dispatch = useDispatch();
    const history = useHistory();

    const filteredProducts = useSelector(state => state.productReducer.filteredProducts);
    const [productsQuantity, setProductsQuantity] = useState(null);
    const [sortIcon, setSortIcon] = useState('');
    const filterAndSortValues = useSelector(state => state.productReducer.filterAndSortValues);
    const [isVisibleLeftFilters, setIsVisibleLeftFilters] = useState(!breakpointMobile);
    const [isVisibleTopFilterBar, setIsVisibleTopFilterBar] = useState(true);
    const [isVisibleFilteredProducts, setIsVisibleFilteredProducts] = useState(true);

    //Пагинация
    const paginationCurrentPage = useSelector(
        state => state.productReducer.paginationCurrentPage,
    );

    //Количество товаров на странице
    const productsPerPage = useSelector(
        state => state.productReducer.productsPerPage,
    );

    //кнопка фильтрации
    const [closeBtn, setCloseBtn] = useState(!breakpointMobile);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST}/filters`).then(res => {
            dispatch(setFiltersAll(res.data));
        });
    }, []);


    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        let paramsFromQuery = Object.fromEntries(urlSearchParams.entries());
        let params = {...paramsFromQuery}

        for (let paramsKey in params) {
            if (paramsKey !== 'perPage' && paramsKey !== 'maxPrice' && paramsKey !== 'minPrice' && paramsKey !== 'startPage') {
                params = {
                    ...params,
                    [paramsKey]: params[paramsKey].split(',').filter(Boolean)
                }
            } else {
                params = {...params, [paramsKey]: Number(params[paramsKey])}
            }
        }

        Object.keys(params).forEach(key => {
            if (Array.isArray(params[key]) && !params[key].length) {
                delete params[key];
            }
        });

        dispatch(setFilterAndSortValues({...filterAndSortValues, ...params}));
        dispatch(setPaginationCurrentPage(params.startPage));

        if(params.sort) {
            setSortIcon(params.sort[0])
        }

    }, [])


    useEffect(() => {

        let objFilter = {
            ...filterAndSortValues,
            perPage: productsPerPage,
            startPage: paginationCurrentPage
        }

        Object.keys(objFilter).forEach(key => {
            if (Array.isArray(objFilter[key]) && !objFilter[key].length) {
                delete objFilter[key];
            }
        });

        let queryObject = (Object.entries(objFilter).map(i => [i[0], encodeURIComponent(i[1]).replace(/%20/g, "+")].join('=')).join('&'))

        history.push(decodeURIComponent(`/products/filter?${queryObject}`))

        axios
            .get(decodeURIComponent(`${process.env.REACT_APP_HOST}/products/filter?${queryObject}`))
            .then(res => {
                setProductsQuantity(res.data.productsQuantity);
                dispatch(setFilteredProducts(res.data));
            });
        window.scrollTo(0, 0);

    }, [filterAndSortValues, paginationCurrentPage, productsPerPage])

    const deleteActiveFilter = (filterName, value) => {
        let res = {...filterAndSortValues};
        dispatch(
            setFilterAndSortValues({
                [filterName]: res[filterName].filter(i => i !== value),
            }),
        );
    };

    return (
        <Container
            maxWidth={'xl'}
        >
            {isVisibleTopFilterBar && (
                <BarFilterAndSort
                    sortIcon={sortIcon}
                    setSortIcon={setSortIcon}
                    closeBtn={closeBtn}
                    setCloseBtn={setCloseBtn}
                    isVisibleLeftFilters={isVisibleLeftFilters}
                    setIsVisibleLeftFilters={setIsVisibleLeftFilters}
                    setIsVisibleFilteredProducts={setIsVisibleFilteredProducts}
                    breakpointMobile={breakpointMobile}
                />
            )}
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
                maxWidth={'xl'}
            >
                <Grid
                    sx={{
                        width: {
                            xs: !isVisibleLeftFilters ? '0' : '90%',
                            sm: !isVisibleLeftFilters ? '0' : '57%',
                            md: !isVisibleLeftFilters ? '0' : '36%',
                        },
                    }}
                >
                    {isVisibleLeftFilters && (
                        <FiltersProducts
                            setSortIcon={setSortIcon}
                            breakpointMobile={breakpointMobile}
                            isVisibleLeftFilters={isVisibleLeftFilters}
                            setIsVisibleLeftFilters={setIsVisibleLeftFilters}
                            isVisibleTopFilterBar={isVisibleTopFilterBar}
                            setIsVisibleTopFilterBar={setIsVisibleTopFilterBar}
                            setCloseBtn={setCloseBtn}
                            setIsVisibleFilteredProducts={setIsVisibleFilteredProducts}
                        />
                    )}
                </Grid>
                <Grid
                    item
                >
                    {isVisibleFilteredProducts && (
                        <ActiveFilterBar
                            sx={{
                                display: {
                                    xs: 'none',
                                    sm: 'block'
                                }
                            }}
                            deleteActiveFilter={deleteActiveFilter}
                        />
                    )}
                    {isVisibleFilteredProducts && (
                        <Grid
                            container
                            margin={0}
                            spacing={2}
                            justifyContent={'space-around'}>
                            {filteredProducts.length !== 0 &&
                            filteredProducts.map((item, index) => (
                                <Grid
                                    item
                                    key={item.name}
                                    xs={6}
                                    sm={isVisibleLeftFilters ? 6 : 4}
                                    md={isVisibleLeftFilters ? 4 : 3}
                                    onClick={() => history.push(`/product/${item._id}`)}>
                                    <ProductCard key={index} product={item}/>
                                </Grid>
                            ))}
                            {filteredProducts.length === 0 && (
                                <div>
                                    There are no products with the specified
                                    characteristics...
                                </div>
                            )}
                        </Grid>
                    )}
                    {isVisibleFilteredProducts && (
                        <PaginationList
                            totalProducts={productsQuantity}
                            productsPerPage={productsPerPage}
                        />
                    )}
                </Grid>
            </Container>
        </Container>
    );
};
