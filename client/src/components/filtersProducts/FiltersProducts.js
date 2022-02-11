import React, {useState} from 'react';
import {
    Button,
    CardActions,
    FormGroup,
    Grid,
    Input,
    Slider,
    Typography,
} from '@mui/material';
import {Formik} from 'formik';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';

import {useDispatch, useSelector} from 'react-redux';
import ChekBoxFilter from '../checkBoxFilter/ChekBoxFilter';
import {
    setFilterAndSortValues,
    setPaginationCurrentPage,
    setProductsPerPage,
} from '../../pages/ProductsPage';
import {makeStyles} from '@mui/styles';
import {useHistory} from "react-router-dom";

const FILTER_DATA = {
    priceSlider: {
        min: 0,
        max: 20000,
    },
};

const useStyles = makeStyles(theme => ({
    label: {
        width: 65,
    },
}));

export const FiltersProducts = ({
                                    setSortIcon,
                                    setIsVisibleLeftFilters,
                                    breakpointMobile,
                                    setCloseBtn,
                                    setIsVisibleFilteredProducts,
                                }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory()


    const filterAndSortValues = useSelector(
        state => state.productReducer.filterAndSortValues,
    );

    //для слайдера цен
    const {min, max} = FILTER_DATA.priceSlider;
    const [priceRange, setPriceRange] = useState({min, max});
    const [filtersOpen, setFiltersOpen] = useState([]);
    const filters = useSelector(state => state.productReducer.filtersAll);

    const filterStateToggle = filterName => {
        filtersOpen.includes(filterName)
            ? setFiltersOpen(filtersOpen.filter(item => item !== filterName))
            : setFiltersOpen([...filtersOpen, filterName]);
    };

    //для слайдера товара.
    const updateRange = ({target: {name, value}}) => {
        setPriceRange({
            ...priceRange,
            [name]: Math.min(max, Math.max(min, value)),
        });
    };

    return (
        <Grid
            sx={{
                width: {
                    xs: '90%',
                    sm: 220,
                    md: 220
                },
            }}
            style={{
                inlineSize: '-webkit-fill-available'
            }}
        >
            <CloseIcon
                fontSize={'medium'}
                onClick={() => {
                    setIsVisibleLeftFilters(false);
                    setIsVisibleFilteredProducts(true);
                    if (!breakpointMobile) {
                        dispatch(setProductsPerPage(8));
                        setCloseBtn(false);
                    } else {
                        setCloseBtn(false);
                    }
                }}
            />
            <Formik
                enableReinitialize
                initialValues={{
                    categories: filterAndSortValues['categories'] || '',
                    slide: [priceRange.min, priceRange.max],
                    // slide: [min, max],
                    material: filterAndSortValues['material'] || '',
                    sizes: filterAndSortValues['sizes'] || '',
                    brand: filterAndSortValues['brand'] || '',
                    collections: filterAndSortValues['collections'] || '',
                    color: '',
                    manufacturer: '',
                    manufacturerCountry: '',
                    seller: '',
                    date: '',
                }}
                onSubmit={(values, {setSubmitting}) => {

                    setSubmitting(false);
                    let minPrice = '';
                    let maxPrice = '';
                    Object.keys(values).forEach(key => {
                        if (key === 'slide') {
                            minPrice = +values[key][0];
                            maxPrice = +values[key][1];
                            delete values[key];
                        }

                        if (values[key] === '') {
                            delete values[key];
                        }
                    });
                    values.minPrice = minPrice;
                    values.maxPrice = maxPrice;

                    dispatch(setPaginationCurrentPage(1));
                    dispatch(
                        setFilterAndSortValues({...filterAndSortValues, ...values}),
                    );
                }}
            >
                {({
                      values,
                      handleSubmit,
                      isSubmitting,
                      setFieldValue,
                      resetForm
                  }) => (
                    <form
                        onSubmit={handleSubmit}
                    >
                        <ChekBoxFilter
                            filterGroupTitle={'CATEGORIES'}
                            filterGroupName={'categories'}
                            filtersOpen={filtersOpen}
                            filterStateToggle={filterStateToggle}
                            filters={filters}
                            checkedValue={filterAndSortValues['categories'] || []}
                        />

                        <ChekBoxFilter
                            filterGroupTitle={'COLLECTIONS'}
                            filterGroupName={'collections'}
                            filtersOpen={filtersOpen}
                            filterStateToggle={filterStateToggle}
                            filters={filters}
                            checkedValue={filterAndSortValues['collections'] || []}
                        />

                        <FormGroup>
                            <CardActions
                                sx={{
                                    justifyContent: 'space-between',
                                    width: {
                                        xs: '100%',
                                        sm: 220,
                                        md: 220
                                    },
                                }}>
                                <Typography
                                    id="prices"
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                    sx={{
                                        fontSize: {
                                            xs: 20,
                                            sm: 14,
                                            md: 14
                                        },
                                    }}>
                                    PRICES
                                </Typography>
                                <Typography>
                                    {!filtersOpen.includes('prices') ? (
                                        <KeyboardArrowUpIcon
                                            fontSize={'medium'}
                                            onClick={() => filterStateToggle('prices')}
                                        />
                                    ) : (
                                        <KeyboardArrowDownIcon
                                            fontSize={'medium'}
                                            onClick={() => filterStateToggle('prices')}
                                        />
                                    )}
                                </Typography>
                            </CardActions>
                            {!filtersOpen.includes('prices') && (
                                <FormGroup>
                                    <CardActions
                                        sx={{
                                            justifyContent: 'space-between',
                                            marginTop: -2,
                                            marginBottom: -2,
                                            width: {
                                                xs: '90%',
                                                sm: 220,
                                                md: 220
                                            },
                                            alignItems: 'center',
                                        }}>
                                        <div>₴</div>
                                        <div>₴ 20’000</div>
                                    </CardActions>
                                    <Slider
                                        name="slide"
                                        id="slide"
                                        valueLabelDisplay="auto"
                                        value={[priceRange.min, priceRange.max]}
                                        onChange={(e, v) => {
                                            setFieldValue('slide', v);
                                            setPriceRange({
                                                min: v[0],
                                                max: v[1],
                                            });
                                        }}
                                        sx={{
                                            width: {
                                                xs: '90%',
                                                sm: 220,
                                                md: 220
                                            },
                                            alignSelf: {
                                                xs: 'center',
                                                sm: 'self-start',
                                            },
                                            color: '#002D50',
                                        }}
                                        min={0}
                                        max={20000}
                                    />
                                    <FormGroup
                                        sx={{
                                            width: {
                                                xs: '100%',
                                                sm: 220,
                                                md: 220
                                            },
                                            flexDirection: 'row',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            paddingLeft: 1,
                                            paddingRight: 1,
                                            fontSize: {
                                                xs: 10,
                                                sm: 14,
                                                md: 14
                                            },
                                        }}>
                                        From ₴
                                        <label className={classes.label}>
                                            <Input
                                                id="min-input"
                                                style={{
                                                    textAlignLast: 'center',
                                                }}
                                                type="number"
                                                name="min"
                                                value={priceRange.min}
                                                onChange={e => {
                                                    updateRange(e);
                                                    setFieldValue('slide', [
                                                        +e.target.value,
                                                        values.slide[1],
                                                    ]);
                                                }}
                                            />
                                        </label>
                                        To ₴
                                        <label className={classes.label}>
                                            <Input
                                                id="min-max"
                                                style={{
                                                    textAlignLast: 'center',
                                                }}
                                                type="number"
                                                name="max"
                                                value={priceRange.max}
                                                onChange={e => {
                                                    updateRange(e);
                                                    setFieldValue('slide', [
                                                        values.slide[0],
                                                        +e.target.value,
                                                    ]);
                                                }}
                                            />
                                        </label>
                                    </FormGroup>
                                </FormGroup>
                            )}
                        </FormGroup>

                        <ChekBoxFilter
                            filterGroupTitle={'PRODUCT MATERIAL'}
                            filterGroupName={'material'}
                            filtersOpen={filtersOpen}
                            filterStateToggle={filterStateToggle}
                            filters={filters}
                            checkedValue={filterAndSortValues['material'] || []}
                        />

                        <ChekBoxFilter
                            filterGroupTitle={'SIZES'}
                            filterGroupName={'sizes'}
                            filtersOpen={filtersOpen}
                            filterStateToggle={filterStateToggle}
                            filters={filters}
                            checkedValue={filterAndSortValues['sizes'] || []}
                        />

                        <ChekBoxFilter
                            filterGroupTitle={'BRAND'}
                            filterGroupName={'brand'}
                            filtersOpen={filtersOpen}
                            filterStateToggle={filterStateToggle}
                            filters={filters}
                            checkedValue={filterAndSortValues['brand'] || []}
                        />

                        <CardActions
                            sx={{
                                justifyContent: 'space-between',
                                marginTop: 2,
                            }}>
                            <Button
                                type="submit"
                                style={{
                                    background: '#002D50',
                                    width: 100,
                                    fontSize: 10,
                                    padding: 6,
                                }}
                                variant="contained"
                                disabled={isSubmitting}>
                                APPLY FILTERS
                            </Button>
                            <Button
                                type="reset"
                                style={{
                                    border: '1px solid #002D50',
                                    color: '#002D50',
                                    width: 100,
                                    fontSize: 10,
                                    padding: '6 10',
                                }}
                                variant="outlined"
                                onClick={() => {
                                    resetForm();
                                    setPriceRange({
                                        ...priceRange,
                                        min: min,
                                        max: max,
                                    });
                                    dispatch(setPaginationCurrentPage(1));
                                    dispatch(setFilterAndSortValues({}));
                                    setSortIcon('');
                                }}>
                                CLEAR ALL
                            </Button>
                        </CardActions>
                    </form>
                )}
            </Formik>
        </Grid>
    );
};
