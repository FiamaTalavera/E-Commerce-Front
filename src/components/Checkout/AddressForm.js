import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function AddressForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Datos de envío
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField required id="firstName" name="firstName" label="Nombre" fullWidth autoComplete="given-name" variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required id="lastName" name="lastName" label="Apellido" fullWidth autoComplete="family-name" variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="address1" name="address1" label="Dirección" fullWidth autoComplete="shipping address-line1" variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required id="city" name="city" label="Ciudad" fullWidth autoComplete="shipping address-level2" variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required id="zip" name="zip" label="Codigo Postal" fullWidth autoComplete="shipping postal-code" variant="standard" />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
