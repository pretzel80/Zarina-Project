import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useEffect, useState} from "react";
import axios from "axios";
import {InputAdornment, Paper} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setSearchResults} from "../../pages/ProductsPage";

const SearchWithImages = () => {

    const history = useHistory()
    const dispatch = useDispatch();
    const [searchTextQuery, setSearchTextQuery] = useState({query: ''});
    const searchResults = useSelector(state => state.productReducer.searchResults)

    const [searchTimeout, setSearchTimeout] = useState();
    const [resetFlag, setResetFlag] = useState(false)

    const loadProducts = async () => {

        const response = await axios.post(`${process.env.REACT_APP_HOST}/products/search`, searchTextQuery);
        dispatch(setSearchResults(response.data))
    };

    useEffect(() => {
        if (searchTextQuery.query !== ''){
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            setSearchTimeout(
                setTimeout(() => {
                    loadProducts().then(r => {
                        // console.log(r)
                    });
                }, 400),
            );
        }
        return () => clearTimeout(searchTimeout);
    }, [searchTextQuery.query]);

    return (
        <Autocomplete
            key={resetFlag}
            id="country-select-demo"
            inputValue={searchTextQuery.query}
            autoComplete={true}
            handleHomeEndKeys={true}
            sx={{width: '100%'}}
            noOptionsText={
                (searchTextQuery.query === '')
                    ? 'Enter word '
                    : 'Sorry, nothing :('
            }
            onInputChange={(event, value) => {
                setSearchTextQuery({query: `${value}`});
            }}
            onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    setResetFlag(!resetFlag)
                    history.push(`/search/?q=${searchTextQuery.query}`);
                }
            }}
            onChange={(event, value) => {
                event.persist();
                setSearchTextQuery({query: ''});
                setResetFlag(!resetFlag)
                history.push(`/product/${value._id}`);
            }}
            clearIcon={''}
            options={searchResults}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (

                <Paper
                    elevation={3}
                    component="li"
                    sx={{'& > img': {mr: 2, flexShrink: 0}}}
                    {...props}>
                    <img
                        loading="lazy"
                        width="60"
                        src={`${option.imageUrls[0]}`}
                        alt="#"
                    />
                    <Box
                        sx={{display: "flex", flexDirection: "column"}}
                    >
                        <Box
                            sx={{
                                color: '#002D50',
                                fontSize: 16,
                                fontWeight: "bold"
                            }}
                        >
                            {option.name}
                        </Box>
                        <div>
                            <strong>{option.currentPrice}</strong> UAH
                        </div>
                    </Box>
                </Paper>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    placeholder="Search"
                    InputProps={{
                        ...params.InputProps,
                        disableUnderline: false,
                        type: 'search',
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                        endAdornment: '',
                    }}
                />
            )}
        />
    );
}

export default SearchWithImages;













// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import {useEffect, useState} from "react";
// import axios from "axios";
// import {InputAdornment, Paper} from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import {useHistory} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import {setSearchResults} from "../../pages/ProductsPage";
//
// const SearchWithImages = () => {
//
//     const history = useHistory()
//     const dispatch = useDispatch();
//     const [searchText, setSearchText] = useState('');
//     const searchResults = useSelector(state => state.productReducer.searchResults)
//
//     const [searchTimeout, setSearchTimeout] = useState();
//     const [resetFlag, setResetFlag] = useState(false)
//
//     const loadProducts = async () => {
//         const response = await axios.post(`${process.env.REACT_APP_HOST}/products/search`, searchText);
//         dispatch(setSearchResults(response.data))
//     };
//
//     useEffect(() => {
//         if (searchText !== '' || searchText.query !== ''){
//             if (searchTimeout) {
//                 clearTimeout(searchTimeout);
//             }
//             setSearchTimeout(
//                 setTimeout(() => {
//                     loadProducts().then(r => {
//                         // console.log(r)
//                     });
//                 }, 400),
//             );
//         }
//         return () => clearTimeout(searchTimeout);
//     }, [searchText]);
//
//     return (
//         <Autocomplete
//             key={resetFlag}
//             id="country-select-demo"
//             inputValue={searchText.query}
//             autoComplete={true}
//             handleHomeEndKeys={true}
//             sx={{width: '100%'}}
//             noOptionsText={
//                 !searchText.length
//                     ? 'Enter word '
//                     : 'Sorry, nothing :('
//             }
//             onInputChange={(event, value) => {
//                 setSearchText({query: `${value}`});
//             }}
//             onKeyPress={(event) => {
//                 if (event.key === 'Enter') {
//                     setResetFlag(!resetFlag)
//                     history.push(`/search/?q=${searchText.query}`);
//                 }
//             }}
//             onChange={(event, value) => {
//                 event.persist();
//                 setSearchText({});
//                 setResetFlag(!resetFlag)
//                 history.push(`/product/${value._id}`);
//             }}
//             clearIcon={''}
//             options={searchResults}
//             getOptionLabel={(option) => option.name}
//             renderOption={(props, option) => (
//
//                 <Paper
//                     elevation={3}
//                     component="li"
//                     sx={{'& > img': {mr: 2, flexShrink: 0}}}
//                     {...props}>
//                     <img
//                         loading="lazy"
//                         width="60"
//                         src={`${option.imageUrls[0]}`}
//                         alt="#"
//                     />
//                     <Box
//                         sx={{display: "flex", flexDirection: "column"}}
//                     >
//                         <Box
//                             sx={{
//                                 color: '#002D50',
//                                 fontSize: 16,
//                                 fontWeight: "bold"
//                             }}
//                         >
//                             {option.name}
//                         </Box>
//                         <div>
//                             <strong>{option.currentPrice}</strong> UAH
//                         </div>
//                     </Box>
//                 </Paper>
//             )}
//             renderInput={(params) => (
//                 <TextField
//                     {...params}
//                     variant="standard"
//                     placeholder="Search"
//                     InputProps={{
//                         ...params.InputProps,
//                         disableUnderline: false,
//                         type: 'search',
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon/>
//                             </InputAdornment>
//                         ),
//                         endAdornment: '',
//                     }}
//                 />
//             )}
//         />
//     );
// }
//
// export default SearchWithImages;
