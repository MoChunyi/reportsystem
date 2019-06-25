import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import ChartContainer from './ChartContainer';
import { connect } from 'react-redux';


const useStyles = makeStyles(theme => ({
    gContent: {
        width: '100%',
        height: '600px',
        overflow: 'auto',
        backgroundColor: '#dbdbdb',
    },
    mDashRegion: (sliderCount) => ({
        position: 'relative',
        padding: '15px 25px',
        minWidth: '100%',
        minHeight: '100%',
        overflow: 'hidden',
        width: `${sliderCount * 1920}px`,
        height: `${sliderCount * 1080}px`,
    }),
    mCanvas: (sliderCount) => ({
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '1920px',
        height: '1080px',
        backgroundColor: '#b3e5fc',
        transform: `translate(-50%,-50%) scale(${sliderCount})`,        
    }),
}))

const mapStateToProps = (state) => {
    console.log("state",state);
    return ({
        graphitems: state.XYdatasReducer.graphitems
    })
}

const BigScreenPanel = (props) => {  
    const classes = useStyles(props.slidercount);
    return (
        <div>
            <div className={classes.gContent}>
                <div className={classes.mDashRegion}>
                    <div className={classes.mCanvas}>
                        {
                            props.graphitems.map(item => {
                                return (
                                    <ChartContainer id={item.id} graphitemtype={item.graphitemtype} key={item.id} slidercount={props.slidercount}>1</ChartContainer>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )  
}

export default connect(mapStateToProps)(BigScreenPanel);