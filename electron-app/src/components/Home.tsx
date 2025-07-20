import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';


const Home: React.FC = () => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }}>
                <Card sx={{ minWidth: 300, minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', cursor: 'pointer' }} onClick={() => window.location.href = '/generate-bills'}>
                    <CardContent>
                        <Typography variant="h4" component="div" align="center">
                            Generate Bills
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ minWidth: 300, minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', cursor: 'pointer' }} onClick={() => window.location.href = '/view-bills'}>
                    <CardContent>
                        <Typography variant="h4" component="div" align="center">
                            View Bills
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default Home;