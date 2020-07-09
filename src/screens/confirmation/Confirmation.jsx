import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import coupons from '../../assets/coupons';
import './Confirmation.css';
import Header from '../../common/header/Header';
import BookShow from '../../screens/bookshow/BookShow';
import Home from '../../screens/home/Home';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import withStyles from '@material-ui/core/styles/withStyles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import PropTypes from 'prop-types';

const styles = theme => ({
  snackbarClose: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  snackbarMessage: {
    color: green[600],
  }
});

class Confirmation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      originalTotalPrice: 0,
      finalTotalPrice: 0,
      showSnackbar: false,
      selectedCouponCode: "",
      showCouponError: false,
      showCouponSuccess: false,
    }
  }

  componentDidMount() {
    const { bookingDetails } = this.props;
    const totalPrice = parseInt(bookingDetails.ticketUnitPrice) * parseInt(bookingDetails.selectedTickets);
    this.setState({ 
      originalTotalPrice: totalPrice,
      finalTotalPrice: totalPrice
    });
  }

  backToBookShowHandler = () => {
    ReactDOM.render(<BookShow bookingDetails={this.props.bookingDetails} />, document.getElementById('root'));
  }

  confirmBookingHandler = () => {
    this.setState({ showSnackbar: true });
  }

  snackbarCloseHandler = () => {
    ReactDOM.render(<Home />, document.getElementById('root'));
  }

  couponCodeChangeHandler = (e) => {
    e.persist();
    this.setState(oldState => ({ 
      selectedCouponCode: e.target.value,
      showCouponError: false,
      showCouponSuccess: false,
      finalTotalPrice: oldState.originalTotalPrice
   }));
  }

  couponApplyHandler = () => {
    const couponObject = coupons.find(coupon =>  coupon.code === this.state.selectedCouponCode);
    if (couponObject && couponObject.discountPercent > 0) {
      this.setState(oldState => ({ 
        finalTotalPrice: oldState.originalTotalPrice * ((100 - couponObject.discountPercent) / 100),
        showCouponError: false,
        showCouponSuccess: true
      }));
    } else {
      this.setState(oldState => ({ 
        finalTotalPrice: oldState.originalTotalPrice,
        showCouponError: true,
        showCouponSuccess: false
      }));
    }
  }

  render() {
    const { classes } = this.props;
    const { bookingDetails } = this.props;
    return (
      <div className="Details">
        <Header />
        <div className="confirmation marginTop16">
          <Typography className="back" onClick={this.backToBookShowHandler}>
            &#60; Back to Book Show
          </Typography>
          <br />

          <Card className="cardStyle">
            <CardContent>
              <Typography variant="headline" component="h2">
                SUMMARY
              </Typography>
              <br />

              <div className="coupon-container">
                <div className="confirmLeft">
                  <Typography>Location:</Typography>
                </div>
                <Typography>{bookingDetails.selectedLocation}</Typography>
              </div>
              <br />
              <div className="coupon-container">
                <div className="confirmLeft">
                  <Typography>Language:</Typography>
                </div>
                <Typography>{bookingDetails.selectedLanguage}</Typography>
              </div>
              <br />
              <div className="coupon-container">
                <div className="confirmLeft">
                  <Typography>Show Date:</Typography>
                </div>
                <Typography>{bookingDetails.selectedShowDate}</Typography>
              </div>
              <br />
              <div className="coupon-container">
                <div className="confirmLeft">
                  <Typography>Show Time:</Typography>
                </div>
                <Typography>{bookingDetails.selectedShowTime}</Typography>
              </div>
              <br />
              <div className="coupon-container">
                <div className="confirmLeft">
                  <Typography>Tickets:</Typography>
                </div>
                <Typography>{bookingDetails.selectedTickets}</Typography>
              </div>
              <br />
              <div className="coupon-container">
                <div className="confirmLeft">
                  <Typography>Unit Price:</Typography>
                </div>
                <Typography>{bookingDetails.ticketUnitPrice}</Typography>
              </div>
              <br />
              <div className="coupon-container">
                <div>
                  <FormControl className="formControl">
                    <InputLabel htmlFor="coupon">
                      <Typography>Coupon Code</Typography>
                    </InputLabel>
                    <Input id="coupon" onChange={this.couponCodeChangeHandler} />
                  </FormControl>
                </div>
                <div className="marginApply">
                  <Button variant="contained" onClick={this.couponApplyHandler.bind(this)} color="primary">Apply</Button>
                </div>
              </div>
              {this.state.showCouponError ? 
                <span className='red'>Invalid coupon code</span> : ''
              }
              {this.state.showCouponSuccess ? 
                <span className='green'>{this.state.selectedCouponCode} applied</span> : ''
              }
              <br />
              <br />
              <div className="coupon-container">
                <div className="confirmLeft">
                  <span className="bold">Total Price:</span>
                </div>
                <Typography>{this.state.finalTotalPrice}</Typography>
              </div>
              <br />
              <Button variant="contained" onClick={this.confirmBookingHandler} color="primary">
                Confirm Booking
              </Button>
            </CardContent>
          </Card>
        </div>

        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          className="snackbar"
          open={this.state.showSnackbar}
          onClose={this.snackbarCloseHandler}
          message={
            <span className={classes.snackbarMessage}>
              <div className="confirm">
                <CheckCircleIcon />
                <div className="message">Booking Confirmed!</div>
              </div>
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.snackbarClose}
              onClick={this.snackbarCloseHandler}
            >
              <Close />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

Confirmation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Confirmation); 