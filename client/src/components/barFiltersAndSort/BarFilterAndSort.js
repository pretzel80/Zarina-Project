import React from 'react';
import {Button, CardActions, Container, Typography} from '@mui/material';
import SortingComponent from '../sortingComponent/SortingComponent';
import {useDispatch, useSelector} from 'react-redux';
import {setProductsPerPage} from '../../pages/ProductsPage';

const BarFilterAndSort = ({
                              sortIcon,
                              setSortIcon,
                              closeBtn,
                              setCloseBtn,
                              setIsVisibleLeftFilters,
                              isVisibleLeftFilters,
                              setIsVisibleFilteredProducts,
                              breakpointMobile,
                          }) => {
    const dispatch = useDispatch();
    const numberFilteredProducts = useSelector(
        state => state.productReducer.numberFilteredProducts,
    );

    return (
        <Container
            maxWidth={'xl'}
        >
            <CardActions
                sx={{
                    justifyContent: 'space-between'
                }}
            >
                <Button
                    variant="text"
                    disabled={closeBtn}
                    onClick={() => {
                        setIsVisibleLeftFilters(!isVisibleLeftFilters);
                        setCloseBtn(!closeBtn);
                        dispatch(setProductsPerPage(6));
                        setIsVisibleFilteredProducts(!breakpointMobile);
                    }}
                >
                    FILTER BY
                </Button>
                <Typography
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'block'
                        }
                    }}
                >
                    SELECTED PRODUCTS ({numberFilteredProducts})
                </Typography>
                <CardActions>
                    <SortingComponent
                        sortIcon={sortIcon}
                        setSortIcon={setSortIcon}
                    />
                </CardActions>
            </CardActions>
        </Container>
    );
};

export default BarFilterAndSort;
