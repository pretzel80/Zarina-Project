import React, {useState} from 'react';
import {Button, Fade, Menu, MenuItem} from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {useDispatch, useSelector} from 'react-redux';
import {
    setFilterAndSortValues,
    setPaginationCurrentPage,
} from '../../pages/ProductsPage';

const SortingComponent = ({setSortIcon, sortIcon}) => {
    const dispatch = useDispatch();
    const filterAndSortValues = useSelector(
        state => state.productReducer.filterAndSortValues,
    );

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = event => {
        setSortIcon(event);
        dispatch(setPaginationCurrentPage(1));
        dispatch(
            setFilterAndSortValues({...filterAndSortValues, ...{sort: event}}),
        );
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls="fade-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="text"
                sx={{
                    width: 120,
                    justifyContent: 'space-around'
                }}
            >
                SORT BY
                {sortIcon === '+currentPrice' && <ArrowCircleUpIcon/>}
                {sortIcon === '-currentPrice' && <ArrowCircleDownIcon/>}
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}>
                <MenuItem
                    onClick={() => handleClose('+currentPrice')}
                    value="-currentPrice">
                    Цена, <ArrowDropUpIcon/>
                </MenuItem>
                <MenuItem
                    onClick={() => handleClose('-currentPrice')}
                    value="+currentPrice">
                    Цена, <ArrowDropDownIcon/>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default SortingComponent;
