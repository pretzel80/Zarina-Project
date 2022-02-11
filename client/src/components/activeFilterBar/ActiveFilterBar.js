import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {Box, Container, Grid} from '@mui/material';
import {useSelector} from 'react-redux';

const ActiveFilterBar = ({deleteActiveFilter}) => {
    const filterAndSortValues = useSelector(
        state => state.productReducer.filterAndSortValues,
    );

    let activeFilters = Object.entries(filterAndSortValues).filter(function (
        item,
    ) {
        return !(
            item[0] === 'minPrice' ||
            item[0] === 'maxPrice' ||
            item[0] === 'sort' ||
            !item[1].length ||
            item[1] === ''
        );
    });

    return (
        <div>
            {Object.entries(activeFilters).map((
                filters) => (
                <Container
                    key={filters}
                >
                    <Grid
                        sx={{
                            fontSize: 10,
                            color: '#2a3eb1'
                        }}
                    >
                        {filters[1][0]}
                    </Grid>
                    <Grid
                        sx={{
                            flexDirection: 'row'
                        }}
                    >
                        {filters[1][1].map((filter) => (
                            <Box
                                key={filter}
                                sx={{
                                    ml: 2,
                                    flexDirection: 'row',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    color: '#637bfe',
                                }}
                            >
                                {filter.toUpperCase()}
                                <CloseIcon
                                    fontSize={'small'}
                                    onClick={() => deleteActiveFilter(filters[1][0], filter)}
                                    sx={{
                                        color: 'black'
                                    }}
                                />
                            </Box>
                        ))}
                    </Grid>
                </Container>
            ))}
        </div>
    );
};

export default ActiveFilterBar;
