import React from 'react';
import {Pagination, PaginationItem, Stack} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useDispatch, useSelector} from 'react-redux';
import {setPaginationCurrentPage} from '../../pages/ProductsPage';

const PaginationList = ({totalProducts, productsPerPage}) => {
    const dispatch = useDispatch();
    const paginationCurrentPage = useSelector(
        state => state.productReducer.paginationCurrentPage,
    );

    const handleChange = (event, value) => {
        dispatch(setPaginationCurrentPage(value));
    };

    return (
        <Stack
            spacing={2}
            sx={{
                flex: 'auto',
                alignItems: 'end',
                marginRight: 4,
                marginTop: 6
            }}
        >
            <Pagination
                count={Math.ceil(totalProducts / productsPerPage)}
                onChange={handleChange}
                defaultPage={1}
                page={paginationCurrentPage}
                renderItem={item => (
                    <PaginationItem
                        components={{
                            previous: ArrowBackIcon,
                            next: ArrowForwardIcon,
                        }}
                        {...item}
                    />
                )}
            />
        </Stack>
    );
};

export default PaginationList;

