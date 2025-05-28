import React, {useEffect, useState} from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import {useDispatch} from 'react-redux';

import {getPosts} from './actions/posts'
import memories from './images/memories.jpg';
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts';
import useStyles from './styles'

const App = () => {
    const [currentId, setCurrentId] = useState(0);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPosts())
    }, [currentId, dispatch])
    return (
        // <div>
        // <h1> App </h1>
        // </div>
        <Container maxwidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="Memories" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify-content="space-between" alignItems="stretch">
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId= {setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>

                            <Form currentId = {currentId} setCurrentId= {setCurrentId}/>
                        </Grid>

                    </Grid>

                </Container>

            </Grow>
        </Container>
    );
}

export default App;