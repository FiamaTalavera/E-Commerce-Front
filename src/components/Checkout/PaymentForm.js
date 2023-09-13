import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Detalles de pago
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField required id="cardName" label="Nombre del titular" fullWidth autoComplete="cc-name" variant="standard" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="cardNumber" label="Numero de la tarjeta" fullWidth autoComplete="cc-number" variant="standard" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="expDate" label="Fecha de expiración" fullWidth autoComplete="cc-exp" variant="standard" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="cvv" label="CVV" helperText="Codigo en el dorso" fullWidth autoComplete="cc-csc" variant="standard" />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
