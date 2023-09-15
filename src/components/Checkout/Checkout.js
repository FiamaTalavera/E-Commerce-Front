import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                En el horno
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Datos de envío', 'Detalles de pago', 'Finalización'];

function getStepContent(step, cartItems) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review cartItems={cartItems} />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout({ cartItems }) {
    const [activeStep, setActiveStep] = React.useState(0);
    const navigate = useNavigate()

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleCheckout = () => {
        setActiveStep(steps.length);
        axios
            .post(`${process.env.REACT_APP_URLBACK}/order/checkout`, {}, { withCredentials: true })
            .then((res) => {
                toast.success('Orden pagada!')
            })
            .catch((error) => {
                toast.error('Error al pagar')
                console.error('Fallo en el pago --->', error);
            });
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        En el horno
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography style={{textAlign:'center'}} variant="h5" gutterBottom>
                                ¡Gracias por tu compra!
                            </Typography>
                            <button onClick={()=>navigate('/')}>Volver al home</button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep, cartItems)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Volver atrás
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        if (activeStep === steps.length - 1) {
                                            handleCheckout();
                                        } else {
                                            handleNext();
                                        }
                                    }}
                                    sx={{ mt: 3, ml: 1 }}>
                                    {activeStep === steps.length - 1 ? 'Pagar' : 'Siguiente'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <Copyright />
            </Container>
        </React.Fragment>
    );
}
