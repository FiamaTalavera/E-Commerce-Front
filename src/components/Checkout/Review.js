import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';

export default function Review() {
    const cartItems = useSelector((state) => state.cart.cartItems)
    const totalPrice = useSelector((state)=>state.cart.total)
    
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {cartItems.map((order) => (
                    <ListItem key={order.product.id} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={order.product.name + ' x ' + order.quantity} secondary={order.product.description} />
                        <Typography variant="body2">{order.quantity * order.product.price}</Typography>
                    </ListItem>
                ))}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        ${totalPrice}
                    </Typography>
                </ListItem>
            </List>
        </React.Fragment>
    );
}
