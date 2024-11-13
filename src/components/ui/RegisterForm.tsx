// src/components/RegisterForm.tsx
import React from 'react';
import { Box, TextField, Typography, Button, Link, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const RegisterForm: React.FC = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="#4CAF50"
        >
            <Paper elevation={3} style={{ padding: '30px', width: '400px', borderRadius: '10px' }}>
                <Typography 
                    variant="h4" 
                    align="center" 
                    gutterBottom 
                    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: '#1D415D' }}
                >
                    Register
                </Typography>
                <Typography 
                    variant="subtitle1" 
                    align="center" 
                    color="textSecondary" 
                    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: '#666876' }}
                >
                    Create your account
                </Typography>
                <Box mt={3} display="flex" flexDirection="column" gap={2}>
                    <TextField
                        variant="outlined"
                        placeholder="Username"
                        InputProps={{
                            startAdornment: <AccountCircleIcon style={{ marginRight: '8px' }} />
                        }}
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Email"
                        InputProps={{
                            startAdornment: <EmailIcon style={{ marginRight: '8px' }} />
                        }}
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Password"
                        type="password"
                        InputProps={{
                            startAdornment: <LockIcon style={{ marginRight: '8px' }} />
                        }}
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Confirm Password"
                        type="password"
                        InputProps={{
                            startAdornment: <LockIcon style={{ marginRight: '8px' }} />
                        }}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="success"
                        style={{ marginTop: '20px', borderRadius: '20px', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                        fullWidth
                    >
                        Register
                    </Button>
                </Box>
                <Typography 
                    variant="body2" 
                    align="center" 
                    style={{ marginTop: '20px', fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: '#666876' }}
                >
                    Already have an account?{' '}
                    <Link href="#" color="primary" style={{ fontWeight: 600 }}>
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default RegisterForm;
