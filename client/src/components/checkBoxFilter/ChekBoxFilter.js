import React from 'react';
import {CardActions, FormGroup, Typography} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Field} from 'formik';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles(theme => ({
    label: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const ChekBoxFilter = ({
                           filterGroupTitle,
                           filterGroupName,
                           filtersOpen,
                           filterStateToggle,
                           filters,
                       }) => {
    const classes = useStyles();

    return (
        <FormGroup
            sx={{
                flexDirection: 'column',
                marginTop: 1,
                fontSize: 14,
            }}>
            <CardActions
                sx={{
                    justifyContent: 'space-between',
                    width: {
                        xs: '100%',
                        sm: 220, md:
                            220
                    },
                }}>
                <Typography
                    id={`${filterGroupName}`}
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
                    {filterGroupTitle}
                </Typography>
                <Typography>
                    {!filtersOpen.includes(`${filterGroupName}`) ? (
                        <KeyboardArrowUpIcon
                            fontSize={'medium'}
                            onClick={() => filterStateToggle(`${filterGroupName}`)}
                        />
                    ) : (
                        <KeyboardArrowDownIcon
                            fontSize={'medium'}
                            onClick={() => filterStateToggle(`${filterGroupName}`)}
                        />
                    )}
                </Typography>
            </CardActions>
            {!filtersOpen.includes(`${filterGroupName}`) && (
                <FormGroup
                    sx={{
                        display: 'flex',
                    }}>
                    {[
                        ...new Set(
                            filters.filter(filter => filter.type === `${filterGroupName}`),
                        ),
                    ].map(item => (
                        <label key={item.name} className={classes.label}>
                            <Field
                                type="checkbox"
                                style={{
                                    marginRight: 15,
                                }}
                                name={`${filterGroupName}`}
                                value={item.name}
                            />
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: 20,
                                        sm: 14,
                                        md: 14
                                    },
                                }}>
                                {item.name.toLowerCase()}
                            </Typography>
                        </label>
                    ))}
                </FormGroup>
            )}
        </FormGroup>
    );
};

export default ChekBoxFilter;
