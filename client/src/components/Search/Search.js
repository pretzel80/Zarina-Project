
// старый поиск. удалить при финальной чистке     console.log


import React, {useEffect, useState} from 'react';
import {Autocomplete, InputAdornment, Stack, TextField} from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import {useHistory} from 'react-router-dom';

const Search = () => {
    const history = useHistory();
    const [searchPhrases, setSearchPhrases] = useState({});
    const [searchProd, setSearchProd] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const loadProducts = async () => {
        const response = await axios.post(
            `${process.env.REACT_APP_HOST}/products/search`,
            searchPhrases
        );
        setSearchProd(response.data);
    };

    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        setSearchTimeout(
            setTimeout(() => {
                loadProducts();
            }, 400),
        );

        return () => clearTimeout(searchTimeout);

    }, [searchPhrases]);

    return (
        <Stack
            spacing={2}
        >
            <form
                onSubmit={event => {
                    event.preventDefault();
                    if (searchTimeout) {
                        clearTimeout(searchTimeout);
                    }
                    loadProducts().then(r => {
                    });
                }}>
                <Autocomplete
                    value={searchPhrases.query || ''}
                    disableClearable
                    noOptionsText={
                        !searchPhrases.length
                            ? 'Enter word '
                            : 'Sorry, nothing :('
                    }
                    handleHomeEndKeys={false}
                    options={searchProd.map(p => p.name)}
                    onInputChange={(event, value) => {
                        setSearchPhrases({query: `${value}`});
                    }}
                    onChange={(event, value) => {
                        event.persist();
                        const searchId = searchProd.filter(
                            item => item.name === `${value}`,
                        )[0]._id;
                        history.push(`/product/${searchId}`);
                        setSearchPhrases({});
                        setSearchProd([]);
                    }}
                    renderInput={searchParams => (
                        <TextField
                            {...searchParams}
                            key={option => option.id}
                            variant="standard"
                            placeholder="Search"
                            InputProps={{
                                ...searchParams.InputProps,
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
            </form>
        </Stack>
    );
};

export default Search;
