import React from 'react';
import {
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    Box,
} from '@mui/material';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {
    setFilterAndSortValues
} from "../ProductsPage";

const collections = [
    {
        itemNo: 1,
        name: 'Story',
        categories: '/products/filter?collections=Story',
        imageUrls:
            'https://res.cloudinary.com/teamhands/image/upload/v1635863283/Jewelry%20shop/mp/collections/1_eupagk.png',
        color: 'gold',
        sizes: 'all',
        brand: 'Zarina',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo suscipit debitis voluptas. Est possimus autem, nobis assumenda tempora quisquam cum inventore',
    },
    {
        itemNo: 2,
        name: 'Jewel',
        categories: '/products/filter?collections=Jewel',
        imageUrls:
            'https://res.cloudinary.com/teamhands/image/upload/v1635863283/Jewelry%20shop/mp/collections/2_laadrp.png',
        color: 'gold',
        sizes: 'all',
        brand: 'Zarina',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo suscipit debitis voluptas. Est possimus autem, nobis assumenda tempora quisquam cum inventore',
    },
    {
        itemNo: 3,
        name: 'Fine',
        categories: '/products/filter?collections=Fine',
        imageUrls:
            'https://res.cloudinary.com/teamhands/image/upload/v1635863284/Jewelry%20shop/mp/collections/3_bdhmqj.png',
        color: 'gold',
        sizes: 'all',
        brand: 'Zarina',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo suscipit debitis voluptas. Est possimus autem, nobis assumenda tempora quisquam cum inventore',
    },
];
export const SelectedCollections = () => {

    const dispatch = useDispatch();
    const filterAndSortValues = useSelector(
        state => state.productReducer.filterAndSortValues,
    );

    const viewMoreItem = (event) => {
        dispatch(setFilterAndSortValues({
            ...filterAndSortValues, ...{
                collections: [event],
                categories: []
            }
        }))
    };

    return (
        <Container
            xs={12}
            sm={6}
            md={3}
            maxWidth="md"
        >
            <Box
                sx={{
                    display: {
                        xs: 'block',
                        sm: 'block',
                        md: 'flex'
                    },
                    gap: {
                        sm: '10px',
                        md: '10px'
                    },
                }}
            >
                {collections.map(collections => (
                    <Link
                        key={collections.itemNo}
                        style={{
                            width: '100%',
                            textDecoration: 'none',
                        }}
                        to={`${collections.categories}`}
                    >
                        <Box
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            onClick={() => viewMoreItem(`${collections.name}`)}
                        >
                            <Card
                                style={{
                                    width: '100%',
                                    marginBottom: '15px',
                                }}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image={`${collections.imageUrls}`}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="div"
                                            align="center">
                                            {collections.name.toUpperCase()}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Box>
                    </Link>
                ))}
            </Box>
        </Container>
    );
};
export default SelectedCollections;
