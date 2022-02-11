import {createSlice} from '@reduxjs/toolkit';

export const productReducer = createSlice({
    name: 'productReducer',
    initialState: {
        isAuth: false,
        productsPerPage: 6,
        visibleProducts: [],
        filteredProducts: [],
        filtersAll: [],
        sortType: '',
        filterAndSortValues: {},
        searchResults: [],
        paginationCurrentPage: 1,
        favoritesProducts: localStorage.getItem('favorites')
            ? JSON.parse(localStorage.getItem('favorites'))
            : [],
    },
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },

        setFavoritesProducts: (state, action) => {
            state.favoritesProducts = state.favoritesProducts.includes(action.payload)
                ? state.favoritesProducts.filter(item => item !== action.payload)
                : [...state.favoritesProducts, action.payload];
        },

        setVisibleProducts: (state, action) => {
            state.visibleProducts = action.payload;
        },

        setFilteredProducts: (state, action) => {
            state.filteredProducts = action.payload.products;
            state.numberFilteredProducts = action.payload.productsQuantity;
        },

        setFiltersAll: (state, action) => {
            state.filtersAll = action.payload;
        },

        setProductsPerPage: (state, action) => {
            state.productsPerPage = action.payload;
        },

        setSortType: (state, action) => {
            state.sortType = action.payload;
        },

        setFilterAndSortValues: (state, action) => {

            state.filterAndSortValues =
                Object.keys(action.payload).length === 0
                    ? action.payload
                    : {...state.filterAndSortValues, ...action.payload};
        },

        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },

        setPaginationCurrentPage: (state, action) => {
            state.paginationCurrentPage = action.payload;
        },
    },
});

export const {
    setIsAuth,
    setVisibleProducts,
    setFilteredProducts,
    setFiltersAll,
    setSortType,
    setFilterAndSortValues,
    setPaginationCurrentPage,
    setFavoritesProducts,
    setProductsPerPage,
    setSearchResults,
} = productReducer.actions;

export default productReducer.reducer;
