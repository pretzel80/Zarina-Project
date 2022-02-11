import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterAndSortValues } from '../ProductsPage';

const useStyles = makeStyles(theme => ({
  categoriesItem1: {
    width: '100%',
    height: '712px',
    display: 'flex',
    backgroundSize: 'cover',
  },
  categoriesItem3: {
    height: '397px',
    marginTop: '2px',
    display: 'flex',
    backgroundSize: 'cover',
  },
  text: {
    color: 'black',
    fontSize: '40px',
    lineHeight: ' 10px',
    fontStyle: 'uppercase',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
    alignItems: 'end',
    marginBottom: '30px',
    marginLeft: '20px',
    textShadow: '3px 1px 1px white',
  },
}));

export const ExploreCategories = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filterAndSortValues = useSelector(
    state => state.productReducer.filterAndSortValues,
  );

  const viewMoreItem = event => {
    dispatch(
      setFilterAndSortValues({
        ...filterAndSortValues,
        ...{
          categories: [event],
          collections: [],
        },
      }),
    );
  };

  return (
    <div>
      <Grid container spacing={0.5} style={{ justifyContent: 'center' }}>
        <Grid item xs={12} md={4}>
          <Link
            to={'/products/filter?categories=necklaces'}
            style={{
              textDecoration: 'none',
            }}>
            <Box
              className={classes.categoriesItem1}
              style={{
                backgroundImage: `url(https://res.cloudinary.com/teamhands/image/upload/v1635863261/Jewelry%20shop/mp/categories/3_wj7bey.png)`,
              }}
              onClick={() => viewMoreItem('necklaces')}>
              <Box className={classes.text}>NECKLACES</Box>
            </Box>
          </Link>
        </Grid>
        <Grid item xs={12} md={8}>
          <Link
            to={'/products/filter?categories=bracelets'}
            style={{
              textDecoration: 'none',
            }}>
            <Box
              sx={{
                backgroundImage: `url(https://res.cloudinary.com/teamhands/image/upload/v1635863261/Jewelry%20shop/mp/categories/2_sl2wow.png)`,
                height: '312px',
                display: 'flex',
                backgroundSize: 'cover',
                flexDirection: 'row',
              }}
              onClick={() => viewMoreItem('bracelets')}>
              <span className={classes.text}>BRACELETS</span>
            </Box>
          </Link>
          <Grid
            item
            columns={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              display: { md: 'flex', sm: 'block', xs: 'block' },
              gap: { md: '2px', sm: '2px', xs: '1px' },
            }}>
            <Grid item md={6} sm={12} xs={12}>
              <Link
                to={'/products/filter?categories=rings'}
                style={{
                  textDecoration: 'none',
                }}>
                <Box
                  className={classes.categoriesItem3}
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/teamhands/image/upload/v1635863261/Jewelry%20shop/mp/categories/1_jk8e2t.png)`,
                  }}
                  onClick={() => viewMoreItem('rings')}>
                  <span className={classes.text}>RINGS</span>
                </Box>
              </Link>
            </Grid>
            <Grid item md={6} xs={12} sm={12}>
              <Link
                to={'/products/filter?categories=earrings'}
                style={{
                  textDecoration: 'none',
                }}>
                <Box
                  className={classes.categoriesItem3}
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/teamhands/image/upload/v1635863261/Jewelry%20shop/mp/categories/4_iibfyp.png)`,
                  }}
                  onClick={() => viewMoreItem('earrings')}>
                  <span className={classes.text}>EARRINGS</span>
                </Box>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default ExploreCategories;
