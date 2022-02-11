import React, {useEffect, useState} from 'react';
import {Box, Container, Divider, Grid, Paper, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {ProductCard} from "../ProductCard/ProductCard";
import {useHistory, withRouter} from "react-router-dom";


const uniqKey = ['description', 'collections', 'itemNo', 'name', 'categories', 'color', 'brand',
    'manufacturer', 'manufacturerCountry', 'seller', 'material']

const SearchResultsPage = () => {

    const history = useHistory();
    const searchResults = useSelector(state => state.productReducer.searchResults)
    const [visualizationSelectedResults, setVisualizationSelectedResults] = useState(searchResults ? searchResults : [])
    const searchPhrase = new URLSearchParams(window.location.search)
    const [sortAndSumRes, setSortAndSumRes] = useState([])

    useEffect(() => {
        setSortAndSumRes(filtersAndSortSearch(searchResults))
        setVisualizationSelectedResults(searchResults)
    }, [searchResults, (searchPhrase.get('q'))])

    const filtersAndSortSearch = (searchArray) => {
        let resCount = {}

        searchArray.map((item) => {
            uniqKey.map((elem) => {

                if (!resCount[elem]) {
                    resCount[elem] = 0
                }
                if (item[elem].toString().toLowerCase().includes(`${searchPhrase.get('q').toLowerCase()}`)) {
                    resCount[elem]++
                }
            })
        })

        return  Object.entries(resCount).sort((a, b) => {
            return b[1] - a[1]
        })
    }

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: "flex",
                flexDirection: {
                    xs: visualizationSelectedResults ? 'column' : 'column',
                    sm: visualizationSelectedResults ? 'column' : 'column',
                    md: visualizationSelectedResults ? 'column' : 'column',
                },
                justifyContent: "space-between",
                mt: 3
            }}
        >
            <Grid
                item
                margin={0}
                xs={12}
                sm={12}
                md={12}
                sx={{
                    display: "flex", flexDirection: "column",
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: {
                            xs: 20,
                            sm: 23,
                            md: 32,
                        },
                        color: '#002d50',
                    }}>
                    Found in product properties...
                </Typography>
                <Divider variant="middle"/>
                <Box
                    component={"div"}
                    sx={{
                        display: "flex",
                        alignSelf: "center",
                        alignItems: "baseline",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setVisualizationSelectedResults(searchResults)
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 22,
                                sm: 25,
                                md: 35,
                            },
                            color: '#002d50',
                        }}>
                        Total
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 25,
                                sm: 30,
                                md: 40,
                            },
                            fontWeight: "bold",
                            marginLeft: 1,
                            marginRight: 1,
                        }}
                    >
                        {searchResults.length}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 22,
                                sm: 25,
                                md: 35,
                            },
                            color: '#002d50',
                        }}>
                        results on request
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 25,
                                sm: 30,
                                md: 40,
                            },
                            fontWeight: "bold",
                            marginLeft: 1,
                        }}
                    >
                        {`${(searchPhrase.get('q')).toString().toLowerCase()}`}
                    </Typography>
                </Box>
                <Divider variant="middle"/>
            </Grid>
            <Grid
                container
                sx={{display: "flex", flexDirection: "column"}}
            >
                {(visualizationSelectedResults.length !== 0)
                &&
                <Typography>
                    Search results for "{`${searchPhrase.get('q')}`}"
                </Typography>}

                <Grid
                    container
                    spacing={2}
                    sx={{display: "flex", flexDirection: "row"}}
                >
                    {sortAndSumRes.map((item) => (
                        <Grid
                            item
                            key={item}
                            sx={{display: "flex", flexDirection: "column"}}
                        >
                            {(item[1] > 0) &&
                            <Paper
                                component={"div"}
                                sx={{
                                    cursor: "pointer",
                                    display: "flex",
                                    border: '1px solid #002d50',
                                    margin: 1,
                                    padding: 1
                                }}
                                onClick={() => {
                                    setVisualizationSelectedResults(searchResults
                                        .filter((elem) => elem[item[0]].toString().toLowerCase()
                                            .includes(`${searchPhrase.get('q').toLowerCase()}`)))
                                }}
                            >
                                <Typography
                                    mr={2}
                                >
                                    In "{item[0]}"
                                </Typography>
                                <Typography>
                                    {item[1]}
                                </Typography>
                            </Paper>}
                        </Grid>
                    ))}
                    <Grid
                        item
                        margin={0}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            flexFlow: "wrap"
                        }}
                    >
                        {visualizationSelectedResults.length !== 0 &&
                        visualizationSelectedResults.map((item, index) => (
                            <Grid
                                item
                                key={item.name}
                                xs={4}
                                sm={3}
                                md={3}
                                onClick={() => history.push(`/product/${item._id}`)}>
                                <ProductCard
                                    key={index}
                                    product={item}
                                    keyCart={false}
                                />
                            </Grid>
                        ))}
                        {visualizationSelectedResults.length === 0 && <></>}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default withRouter(SearchResultsPage);

